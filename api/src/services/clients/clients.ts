import type {
  QueryResolvers,
  MutationResolvers,
  ClientRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { prismaBuildWhereClause } from '../../tools/prismaUtils'
import { applyPagination } from '../../tools/pagination'
import { requireAuth } from 'src/lib/auth'

export const clients: QueryResolvers['clients'] = async ({ limit = 10, page = 1, sortBy, filter = {} }) => {
  requireAuth()

  const where = prismaBuildWhereClause(filter, ['name', 'email', 'phone']) || {}
  where.deletedAt = null

  const orderBy = sortBy ? { [sortBy.field]: sortBy.direction.toLowerCase() } : { createdAt: 'desc' }

  const [totalCount, items] = await Promise.all([
    db.client.count({ where }),
    db.client.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        owner: true,
        tasks: true,
      },
    }),
  ])

  return applyPagination({ items, totalCount, limit, page })
}

export const client: QueryResolvers['client'] = async ({ id }) => {
  requireAuth()

  const client = await db.client.findUnique({
    where: { id, deletedAt: null },
    include: {
      owner: true,
      tasks: true,
    },
  })

  if (!client) {
    throw new Error('Client not found')
  }

  return client
}

export const createClient: MutationResolvers['createClient'] = async ({ input }) => {
  requireAuth()

  const newClient = await db.client.create({
    data: input,
  })

  return newClient
}

export const updateClient: MutationResolvers['updateClient'] = async ({ id, input }) => {
  requireAuth()

  const updatedClient = await db.client.update({
    where: { id, deletedAt: null },
    data: input,
  })

  return updatedClient
}

export const deleteClient: MutationResolvers['deleteClient'] = async ({ id }) => {
  requireAuth()

  return db.client.update({
    where: { id, deletedAt: null },
    data: { deletedAt: new Date() },
  })
}

export const Client: ClientRelationResolvers = {
  owner: (_obj, { root }) => db.client.findUnique({ where: { id: root.id } }).owner(),
  tasks: (_obj, { root }) => db.client.findUnique({ where: { id: root.id } }).tasks(),
  taskHistories: (_obj, { root }) => db.client.findUnique({ where: { id: root.id } }).taskHistories(),
}
