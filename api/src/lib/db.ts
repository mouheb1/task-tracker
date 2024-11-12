
// import { PrismaClient } from '@prisma/client'
// import { LogLevel } from '@redwoodjs/api/logger'


// const logLevels: LogLevel[] = process.env.DB_LOG === 'true'
//   ? ['query', 'info', 'warn', 'error']
//   : ['info', 'warn', 'error']

// const prismaClient = new PrismaClient({
//   log: logLevels.map((level) => ({ emit: 'event', level })),
// })

// export const db = prismaClient


// works for soft delete



import { PrismaClient } from '@prisma/client';
import { createSoftDeleteExtension } from 'prisma-extension-soft-delete';
import { logger } from './logger';
import { LogLevel } from '@redwoodjs/api/logger';

const logLevels: LogLevel[] = process.env.DB_LOG === 'true'
  ? ['query', 'info', 'warn', 'error']
  : ['info', 'warn', 'error'];

// Initialize Prisma Client
const prismaClient = new PrismaClient({
  log: logLevels.map((level) => ({ emit: 'event', level })),
});

// Custom event handlers for logging
prismaClient.$on('query', (e) => {
  // Parse the parameters
  const params = JSON.parse(e.params);

  // Interpolate parameters into the query
  let query = e.query;
  if (params && params.length > 0) {
    query = interpolateQuery(query, params);
  }

  // Log the complete query
  logger.debug(`Query: ${query}`);
  logger.debug(`Duration: ${e.duration}ms`);
});

prismaClient.$on('info', (e) => {
  logger.info(e.message);
});

prismaClient.$on('warn', (e) => {
  logger.warn(e.message);
});

prismaClient.$on('error', (e) => {
  logger.error(e.message);
});

// Apply the soft delete extension and assign the result to a new client
const db = prismaClient.$extends(
  createSoftDeleteExtension({
    models: {
      Organization: true,
      User: true,
      Client: true,
      Task: true,
      TaskHistory: true,
    },
    defaultConfig: {
      field: "deletedAt",
      createValue: (deleted) => {
        if (deleted) return new Date();
        return null;
      },
      allowToOneUpdates: true,
      allowCompoundUniqueIndexWhere: true,
    },
  })
);

export { db };

// Helper function to interpolate parameters
function interpolateQuery(query: string, params: any[]): string {
  let index = 0;
  const paramRegex = /(\?|\$\d+)/g; // Matches '?' or '$1', '$2', etc.

  return query.replace(paramRegex, (match) => {
    const param = params[index++];
    return formatParam(param);
  });
}

function formatParam(param: any): string {
  if (param === null || param === undefined) {
    return 'NULL';
  }
  if (typeof param === 'number' || typeof param === 'bigint') {
    return param.toString();
  }
  if (typeof param === 'boolean') {
    return param ? 'TRUE' : 'FALSE';
  }
  if (param instanceof Date) {
    return `'${param.toISOString()}'`;
  }
  if (typeof param === 'object') {
    return `'${JSON.stringify(param).replace(/'/g, "''")}'`;
  }
  // Assume string for all other types
  return `'${param.replace(/'/g, "''")}'`; // Escape single quotes
}


