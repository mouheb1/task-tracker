
import { PrismaClient } from '@prisma/client'
import { logger } from './logger'
import { LogLevel } from '@redwoodjs/api/logger'


const logLevels: LogLevel[] = process.env.DB_LOG === 'true'
  ? ['query', 'info', 'warn', 'error']
  : ['info', 'warn', 'error']

const prismaClient = new PrismaClient({
  log: logLevels.map((level) => ({ emit: 'event', level })),
})

// Custom event handlers for logging
prismaClient.$on('query', (e) => {
  logger.debug(`Query: ${e.query}`)
  logger.debug(`Params: ${e.params}`)
  logger.debug(`Duration: ${e.duration}ms`)
})

prismaClient.$on('info', (e) => {
  logger.info(e.message)
})

prismaClient.$on('warn', (e) => {
  logger.warn(e.message)
})

prismaClient.$on('error', (e) => {
  logger.error(e.message)
})

export const db = prismaClient
