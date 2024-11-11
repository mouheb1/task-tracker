import type {
  QueryResolvers,
  MutationResolvers,
  TaskHistoryRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { prismaBuildWhereClause } from '../../tools/prismaUtils'
import { applyPagination } from '../../tools/pagination'
import { requireAuth } from 'src/lib/auth'

export const taskHistories: QueryResolvers['taskHistories'] = async ({ limit = 10, page = 1, sortBy, filter = {} }) => {
  requireAuth()

  const where = prismaBuildWhereClause(filter, ['details']) || {}
  where.deletedAt = null

  const orderBy = sortBy ? { [sortBy.field]: sortBy.direction.toLowerCase() } : { createdAt: 'desc' }

  const [totalCount, items] = await Promise.all([
    db.taskHistory.count({ where }),
    db.taskHistory.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        task: true,
        client: true,
        user: true,
      },
    }),
  ])

  return applyPagination({ items, totalCount, limit, page })
}

export const taskHistory: QueryResolvers['taskHistory'] = async ({ id }) => {
  requireAuth()

  const taskHistory = await db.taskHistory.findUnique({
    where: { id, deletedAt: null },
    include: {
      task: true,
      client: true,
      user: true,
    },
  })

  if (!taskHistory) {
    throw new Error('Task history not found')
  }

  return taskHistory
}

export const createTaskHistory: MutationResolvers['createTaskHistory'] = async ({ input }) => {
  requireAuth()

  const newTaskHistory = await db.taskHistory.create({
    data: input,
  })

  return newTaskHistory
}

export const updateTaskHistory: MutationResolvers['updateTaskHistory'] = async ({ id, input }) => {
  requireAuth()

  const updatedTaskHistory = await db.taskHistory.update({
    where: { id, deletedAt: null },
    data: input,
  })

  return updatedTaskHistory
}

export const deleteTaskHistory: MutationResolvers['deleteTaskHistory'] = async ({ id }) => {
  requireAuth()

  return db.taskHistory.update({
    where: { id, deletedAt: null },
    data: { deletedAt: new Date() },
  })
}

export const TaskHistory: TaskHistoryRelationResolvers = {
  task: (_obj, { root }) => db.taskHistory.findUnique({ where: { id: root.id } }).task(),
  client: (_obj, { root }) => db.taskHistory.findUnique({ where: { id: root.id } }).client(),
  user: (_obj, { root }) => db.taskHistory.findUnique({ where: { id: root.id } }).user(),
}
