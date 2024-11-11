import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { prismaBuildWhereClause } from '../../tools/prismaUtils'
import { applyPagination } from '../../tools/pagination'
import { hashPassword } from '@redwoodjs/auth-dbauth-api'
import { UserAlreadyExistsError, UserNotFoundError } from 'src/errors'
import { UserRole } from './types'
import { cleanObject } from '../../tools/object'
import { CurrentUser, requireAuth } from 'src/lib/auth'

export const users: QueryResolvers['users'] = async ({ limit = 10, page = 1, sortBy, filter = {} }, { context }) => {
  const { orgId } = context.currentUser as unknown as CurrentUser
  requireAuth({
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  })

  const where = prismaBuildWhereClause({ ...filter, orgId }, ['username', 'email']) || {}
  where.deletedAt = null

  const orderBy = sortBy ? { [sortBy.field]: sortBy.direction.toLowerCase() } : { createdAt: 'desc' }

  const [totalCount, items] = await Promise.all([
    db.user.count({ where }),
    db.user.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        clients: true,
        tasks: true,
        taskHistories: true,
      },
    }),
  ])

  return applyPagination({ items, totalCount, limit, page })
}

export const user: QueryResolvers['user'] = async ({ id }, { context }) => {
  const { orgId } = context.currentUser as unknown as CurrentUser

  requireAuth({
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  })

  const user = await db.user.findUnique({
    where: { id, orgId, deletedAt: null },
    include: {
      clients: true,
      tasks: true,
      taskHistories: true,
    },
  })

  if (!user) {
    throw new UserNotFoundError()
  }

  return user
}

export const createUser: MutationResolvers['createUser'] = async ({ input }, { context }) => {
  const { orgId } = context.currentUser as unknown as CurrentUser
  requireAuth({
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  })

  const { email, password, ...userData } = input

  const existingUser = await db.user.findUnique({
    where: { email, orgId, deletedAt: null },
  })

  if (existingUser) {
    throw new UserAlreadyExistsError()
  }

  const data = {
    ...userData,
    email,
    role: input.role || UserRole.EMPLOYEE,
  } as any

  if (password) {
    const [hashedPassword, salt] = hashPassword(password)
    data.hashedPassword = hashedPassword
    data.salt = salt
  }

  const newUser = await db.user.create({
    data,
  })

  return newUser
}

export const updateUser: MutationResolvers['updateUser'] = async ({ id, input }, { context }) => {
  const { orgId } = context.currentUser as unknown as CurrentUser
  requireAuth({
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  })

  const user = await db.user.findUnique({
    where: { id, orgId, deletedAt: null },
  })

  if (!user) {
    throw new UserNotFoundError()
  }

  const { password, ...userData } = cleanObject(input)

  // if (password) {
  //   const [hashedPassword, salt] = hashPassword(password)
  //   userData.hashedPassword = hashedPassword
  //   userData.salt = salt
  // }

  const updatedUser = await db.user.update({
    where: { id, deletedAt: null },
    data: userData,
  })

  return updatedUser
}

export const deleteUser: MutationResolvers['deleteUser'] = async ({ id }, { context }) => {
  const { orgId } = context.currentUser as unknown as CurrentUser
  requireAuth({
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  })

  return db.user.update({
    where: { id, orgId, deletedAt: null },
    data: {
      deletedAt: new Date()
    },
  })
}

export const User: UserRelationResolvers = {
  clients: (_obj, { root }) => db.user.findUnique({ where: { id: root.id } }).clients(),
  tasks: (_obj, { root }) => db.user.findUnique({ where: { id: root.id } }).tasks(),
  taskHistories: (_obj, { root }) => db.user.findUnique({ where: { id: root.id } }).taskHistories(),
  createdTasks: (_obj, { root }) => db.user.findUnique({ where: { id: root.id } }).createdTasks(),
  updatedTasks: (_obj, { root }) => db.user.findUnique({ where: { id: root.id } }).updatedTasks(),
  deletedTasks: (_obj, { root }) => db.user.findUnique({ where: { id: root.id } }).deletedTasks(),
  createdClients: (_obj, { root }) => db.user.findUnique({ where: { id: root.id } }).createdClients(),
  updatedClients: (_obj, { root }) => db.user.findUnique({ where: { id: root.id } }).updatedClients(),
  deletedClients: (_obj, { root }) => db.user.findUnique({ where: { id: root.id } }).deletedClients(),
  createdTaskHistories: (_obj, { root }) => db.user.findUnique({ where: { id: root.id } }).createdTaskHistories(),
  updatedTaskHistories: (_obj, { root }) => db.user.findUnique({ where: { id: root.id } }).updatedTaskHistories(),
  deletedTaskHistories: (_obj, { root }) => db.user.findUnique({ where: { id: root.id } }).deletedTaskHistories(),
}
