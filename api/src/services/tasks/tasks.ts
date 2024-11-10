import type {
  QueryResolvers,
  MutationResolvers,
  TaskRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { prismaBuildWhereClause } from '../../tools/prismaUtils'
import { applyPagination } from '../../tools/pagination'
import { requireAuth } from 'src/lib/auth'

export const tasks: QueryResolvers['tasks'] = async ({ limit = 10, page = 1, sortBy, filter = {} }) => {
  requireAuth()

  const where = prismaBuildWhereClause(filter, ['title', 'description']) || {}
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
        owner: true,
        client: true,
        taskHistories: true,
      },
    }),
  ])

  return applyPagination({ items, totalCount, limit, page })
}

export const task: QueryResolvers['task'] = async ({ id }) => {
  requireAuth()

  const task = await db.task.findUnique({
    where: { id, deletedAt: null },
    include: {
      owner: true,
      client: true,
      taskHistories: true,
    },
  })

  if (!task) {
    throw new Error('Task not found')
  }

  return task
}

export const createTask: MutationResolvers['createTask'] = async ({ input }) => {
  requireAuth()

  const newTask = await db.task.create({
    data: input,
  })

  return newTask
}

export const updateTask: MutationResolvers['updateTask'] = async ({ id, input }) => {
  requireAuth()

  const updatedTask = await db.task.update({
    where: { id, deletedAt: null },
    data: input,
  })

  return updatedTask
}

export const deleteTask: MutationResolvers['deleteTask'] = async ({ id }) => {
  requireAuth()

  return db.task.update({
    where: { id, deletedAt: null },
    data: { deletedAt: new Date() },
  })
}

export const Task: TaskRelationResolvers = {
  owner: (_obj, { root }) => db.task.findUnique({ where: { id: root.id } }).owner(),
  client: (_obj, { root }) => db.task.findUnique({ where: { id: root.id } }).client(),
  taskHistories: (_obj, { root }) => db.task.findUnique({ where: { id: root.id } }).taskHistories(),
}
