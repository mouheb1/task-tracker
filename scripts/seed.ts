// -- ./api/db/seeds.ts

import { db } from 'api/src/lib/db'
import { hashPassword } from '@redwoodjs/auth-dbauth-api'

export default async () => {
  try {
    // 1. Create 1 Organization
    const organization = await db.organization.create({
      data: {
        name: 'Main Organization',
        address: '123 Main Street',
        phone: '123-456-7890',
        email: 'contact@mainorg.com',
        website: 'https://www.mainorg.com',
        description: 'This is the main organization.',
        active: true,
      },
    })
    console.log('Organization created:', organization)

    // 2. Create 1 User linked to the Organization
    const [hashedPassword, salt] = hashPassword('securepassword')
    const user = await db.user.create({
      data: {
        username: 'mainuser',
        givenName: 'John',
        familyName: 'Doe',
        email: 'johndoe@example.com',
        hashedPassword: hashedPassword,
        salt: salt,
        role: 'ADMIN', // Ensure this matches your UserRole enum
        orgId: organization.id, // Associate user with organization
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
    console.log('User created:', user)

    // 3. Create 3 Clients linked to the User and Organization
    const clientsData = [
      {
        givenName: 'Client',
        familyName: 'One',
        email: 'client1@example.com',
        phone: '987-654-3210',
        address: '456 Client Road',
        notes: 'Important client one.',
        active: true,
        ownerId: user.id,
        orgId: organization.id,
      },
      {
        givenName: 'Client',
        familyName: 'Two',
        email: 'client2@example.com',
        phone: '987-654-3211',
        address: '457 Client Road',
        notes: 'Important client two.',
        active: true,
        ownerId: user.id,
        orgId: organization.id,
      },
      {
        givenName: 'Client',
        familyName: 'Three',
        email: 'client3@example.com',
        phone: '987-654-3212',
        address: '458 Client Road',
        notes: 'Important client three.',
        active: true,
        ownerId: user.id,
        orgId: organization.id,
      },
    ]

    const clients = []
    for (const clientData of clientsData) {
      const client = await db.client.create({
        data: clientData,
      })
      console.log('Client created:', client)
      clients.push(client)
    }

    // 4. Create 2 Tasks per Client, each with 5 TaskHistories
    for (const client of clients) {
      for (let i = 1; i <= 2; i++) {
        const task = await db.task.create({
          data: {
            title: `Task ${i} for ${client.givenName} ${client.familyName}`,
            description: `Description for Task ${i} of ${client.givenName} ${client.familyName}`,
            status: 'PENDING', // Ensure this matches your TaskStatus enum
            dueDate: new Date(Date.now() + i * 7 * 24 * 60 * 60 * 1000), // Due dates staggered by weeks
            ownerId: user.id, // Assign task to the user
            clientId: client.id, // Assign task to the client
            orgId: organization.id, // Associate task with organization
          },
        })
        console.log(`Task ${i} for ${client.givenName} ${client.familyName} created:`, task)

        // Create 5 TaskHistories for each Task
        for (let j = 1; j <= 5; j++) {
          const taskHistory = await db.taskHistory.create({
            data: {
              action: 'CREATED', // Ensure this matches your TaskAction enum
              details: `Task ${i} for ${client.givenName} ${client.familyName} history ${j}`,
              createdAt: new Date(),
              updatedAt: new Date(),
              taskId: task.id,
              clientId: client.id,
              userId: user.id,
              orgId: organization.id, // Associate task history with organization
            },
          })
          console.log(`Task History ${j} for Task ${i} of ${client.givenName} ${client.familyName} created:`, taskHistory)
        }
      }
    }

    console.log('Database has been seeded successfully.')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}
