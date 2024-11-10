// -- ./src/lib/logger.ts
// api/src/lib/logger.ts
import { createLogger } from '@redwoodjs/api/logger'

const isDevelopment = process.env.NODE_ENV === 'development'

export const logger = createLogger({
  options: {
    level: 'debug',
    ...(isDevelopment && {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
          singleLine: true,
          messageFormat: false,
        },
      },
    }),
  },
})
