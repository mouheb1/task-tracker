// -- ./src/services/organizations/organizations.scenarios.ts
import type { Prisma, Organization } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.OrganizationCreateArgs>({
  organization: {
    one: {
      data: { name: 'String4335605', updatedAt: '2024-09-26T08:17:02.297Z' },
    },
    two: {
      data: { name: 'String1604700', updatedAt: '2024-09-26T08:17:02.297Z' },
    },
  },
})

export type StandardScenario = ScenarioData<Organization, 'organization'>
