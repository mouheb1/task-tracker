// -- ./src/services/users/users.scenarios.ts
import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String5166121',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2024-09-26T08:16:54.221Z',
        organization: {
          create: {
            name: 'String886736',
            updatedAt: '2024-09-26T08:16:54.221Z',
          },
        },
      },
    },
    two: {
      data: {
        email: 'String4699329',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2024-09-26T08:16:54.221Z',
        organization: {
          create: {
            name: 'String9338498',
            updatedAt: '2024-09-26T08:16:54.221Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
