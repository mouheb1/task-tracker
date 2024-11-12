import type {
  QueryResolvers,
  MutationResolvers,
  TaskRelationResolvers,
} from 'types/graphql'
import { cloneDeep } from 'lodash';

import { db } from 'src/lib/db'
import { prismaBuildWhereClause } from '../../tools/prismaUtils'
import { applyPagination } from '../../tools/pagination'
import { CurrentUser, requireAuth } from 'src/lib/auth'
import { UserRole } from '../users/types'
import { TaskNotFoundError } from 'src/errors/TaskErrors'

export const tasks: QueryResolvers['tasks'] = async ({ limit = 10, page = 1, sortBy, filter = {} }, { context }) => {
  let { orgId } = context.currentUser as unknown as CurrentUser
  requireAuth({
    roles: [
      UserRole.ADMIN
    ]
  })

  const where = prismaBuildWhereClause({ ...filter, orgId }, ['title', 'description']) || {}
  where.deletedAt = null

  const orderBy = sortBy ? { [sortBy.field]: sortBy.direction.toLowerCase() } : { createdAt: 'desc' }

  const [totalCount, items] = await Promise.all([
    db.task.count({ where }),
    db.task.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: true,
        client: true,
        taskHistories: true,
      },
    }),
  ])

  return applyPagination({ items, totalCount, limit, page })
}

export const task: QueryResolvers['task'] = async ({ id }, { context }) => {
  let { orgId } = context.currentUser as unknown as CurrentUser
  requireAuth({
    roles: [
      UserRole.ADMIN
    ]
  })

  const task = await db.task.findUnique({
    where: { id, orgId },
    include: {
      user: true,
      client: true,
      taskHistories: {
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });

  if (!task) {
    throw new Error('Task not found');
  }

  const taskData = cloneDeep(task);

  return taskData;

};

export const createTask: MutationResolvers['createTask'] = async ({ input }, { context }) => {
  const { id: userId, orgId } = context.currentUser as unknown as CurrentUser

  requireAuth({ roles: [UserRole.ADMIN] });

  const newTask = await db.task.create({
    data: {
      title: input.title,
      description: input.description,
      status: input.status,
      dueDate: input.dueDate,
      user: {
        connect: { id: userId },
      },
      organization: {
        connect: { id: orgId },
      },
      client: {
        connect: { id: input.clientId },
      },
      createdBy: {
        connect: { id: userId }
      },
      updatedBy: {
        connect: { id: userId }
      },
      taskHistories: {
        create: input.taskHistories.map((th) => ({
          action: th.action,
          details: th.details,
          price: th.price,
          createdAt: th.createdAt,
          user: {
            connect: { id: userId },
          },
          client: {
            connect: { id: input.clientId },
          },
          organization: {
            connect: { id: orgId },
          },
          createdBy: {
            connect: { id: userId }
          },
          updatedBy: {
            connect: { id: userId }
          },
        })),
      },
    },
  });

  return newTask;
};
export const updateTask: MutationResolvers['updateTask'] = async ({ id, input }, { context }) => {
  const { id: userId, orgId } = context.currentUser as unknown as CurrentUser;

  requireAuth({ roles: [UserRole.ADMIN] });

  const taskSource = await db.task.findUnique({
    where: { id },
    include: { taskHistories: true },
  });

  if (!taskSource || taskSource.orgId !== orgId) {
    throw new TaskNotFoundError();
  }

  // Extract taskHistories from input
  const { taskHistories, clientId, ...taskData } = input;

  // Update the task without taskHistories
  const updatedTask = await db.task.update({
    where: { id },
    data: {
      ...taskData,
      organization: {
        connect: { id: orgId },
      },
      client: clientId ? { connect: { id: clientId } } : undefined,
      updatedBy: {
        connect: { id: userId },
      },
    },
  });

  // Handle taskHistories updates
  if (taskHistories && taskHistories.length > 0) {
    const existingHistoryIds = taskSource.taskHistories.map((history) => history.id);
    const inputHistoryIds = taskHistories.map((history) => history.id).filter(Boolean);

    // Find histories to delete (those that exist in the database but not in the input)
    const historiesToDelete = existingHistoryIds.filter((id) => !inputHistoryIds.includes(id));

    // Set deletedAt for histories that are removed
    for (const historyId of historiesToDelete) {
      await db.taskHistory.update({
        where: { id: historyId },
        data: { deletedAt: new Date(), updatedBy: { connect: { id: userId } } },
      });
    }

    // Process updates and additions for histories present in the input
    for (const historyInput of taskHistories) {
      if (historyInput.id) {
        // Update existing history
        await db.taskHistory.update({
          where: { id: historyInput.id },
          data: {
            action: historyInput.action,
            details: historyInput.details,
            price: historyInput.price,
            createdAt: historyInput.createdAt,
            updatedBy: {
              connect: { id: userId },
            },
          },
        });
      } else {
        // Create new history
        await db.taskHistory.create({
          data: {
            action: historyInput.action,
            details: historyInput.details,
            price: historyInput.price,
            createdAt: historyInput.createdAt,
            task: { connect: { id } },
            user: { connect: { id: userId } },
            client: { connect: { id: input.clientId } },
            organization: { connect: { id: orgId } },
            createdBy: { connect: { id: userId } },
            updatedBy: { connect: { id: userId } },
          },
        });
      }
    }
  } else {
    // If no task histories provided in input, delete all existing histories
    await db.taskHistory.updateMany({
      where: { taskId: id, deletedAt: null },
      data: { deletedAt: new Date(), deletedByUserId: userId },
    });
  }

  return updatedTask;
};



export const deleteTask: MutationResolvers['deleteTask'] = async ({ id }, { context }) => {
  let { id: userId, orgId } = context.currentUser as unknown as CurrentUser

  requireAuth({
    roles: [
      UserRole.ADMIN
    ]
  })

  return db.task.update({
    where: { id, orgId, deletedAt: null },
    data: {
      deletedAt: new Date(),
      deletedByUserId: userId
    },
  })
}

export const Task: TaskRelationResolvers = {
  user: (_obj, { root }) => db.task.findUnique({ where: { id: root.id } }).user(),
  client: (_obj, { root }) => db.task.findUnique({ where: { id: root.id } }).client(),
  taskHistories: (_obj, { root }) => db.task.findUnique({ where: { id: root.id } }).taskHistories(),
}
