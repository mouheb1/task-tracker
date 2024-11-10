// -- ./src/services/organizations/organizations.ts
import type {
  QueryResolvers,
  MutationResolvers,
  OrganizationRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import { UserRole } from '../users/types'

export const organizations: QueryResolvers['organizations'] = () => {
  requireAuth({
    roles: [
      UserRole.SUPER_ADMIN,
    ]
  })
  return db.organization.findMany()
}

export const organization: QueryResolvers['organization'] = ({ id }) => {
  requireAuth({
    roles: [
      UserRole.SUPER_ADMIN,
    ]
  })
  return db.organization.findUnique({
    where: { id },
  })
}

export const createOrganization: MutationResolvers['createOrganization'] = ({
  input,
}) => {
  requireAuth({
    roles: [
      UserRole.SUPER_ADMIN,
    ]
  })
  return db.organization.create({
    data: input,
  })
}

export const updateOrganization: MutationResolvers['updateOrganization'] = ({
  id,
  input,
}) => {
  requireAuth({
    roles: [
      UserRole.SUPER_ADMIN,
    ]
  })
  return db.organization.update({
    data: input,
    where: { id },
  })
}

export const deleteOrganization: MutationResolvers['deleteOrganization'] = ({
  id,
}) => {
  requireAuth({
    roles: [
      UserRole.SUPER_ADMIN,
    ]
  })
  return db.organization.delete({
    where: { id },
  })
}

export const Organization: OrganizationRelationResolvers = {
  users: (_obj, { root }) => {
    return db.organization.findUnique({ where: { id: root?.id } }).users()
  },
  grades: (_obj, { root }) => {
    return db.organization.findUnique({ where: { id: root?.id } }).grades()
  },
  tasks: (_obj, { root }) => {
    return db.organization.findUnique({ where: { id: root?.id } }).tasks()
  },
  rooms: (_obj, { root }) => {
    return db.organization.findUnique({ where: { id: root?.id } }).rooms()
  },
}
