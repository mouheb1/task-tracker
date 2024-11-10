// -- ./src/errors/GenericErrors.ts
import { RedwoodGraphQLError } from "@redwoodjs/graphql-server"

// -- ./src/errors/GenericErrors.ts
export enum ErrorSeverity {
    WARN = 'WARN', // alert for something is not conform to a rule / format
    ERROR = 'ERROR', // error causing application crash
    CRITICAL = 'CRITICAL', // A severe error that causes system crash, resulting in the loss or corruption of unsaved data.
}
export class ServiceError extends RedwoodGraphQLError {
    code: string
    httpStatusCode?: number // in case of REST API
    message: string
    metas?: any
    severity: ErrorSeverity

    constructor(extensions?: Record<string, any>) {
        super(null, {
            ...extensions,
            message: extensions?.message,
            code: extensions?.code || 'Internal server Error',
            httpStatusCode: extensions?.httpStatusCode || 500,
            severity: extensions?.severity || ErrorSeverity.ERROR,
        });

    }

    getErrorDetails(): Record<'code' | 'message', string> {
        return {
            code: this.code,
            message: this.message,
        }
    }

    logError() {
        console.error({
            code: this.code,
            message: this.message,
            severity: this.severity,
        })
    }
}

/**********************************************************
 *   E00XXX: Generic errors class                         *
 **********************************************************/

export class InternalServerError extends ServiceError {
    constructor() {
        super({
            code: 'E00000',
            httpStatusCode: 500,
            severity: ErrorSeverity.CRITICAL,
            message: 'Internal Server Error',
        });
    }
}

export class AccessDeniedError extends ServiceError {
    constructor(message?: string) {
        super({
            code: 'E00010',
            httpStatusCode: 403,
            severity: ErrorSeverity.ERROR,
            message: message ?? 'Access denied',
        });
        this.logError();
    }
}

export class OperationNotPermittedError extends ServiceError {
    constructor(message?: string) {
        super({
            code: 'E00011',
            httpStatusCode: 403,
            severity: ErrorSeverity.ERROR,
            message: message ?? 'Operation not permitted',
        });
        this.logError();
    }
}

export class MissingParametersError extends ServiceError {
    constructor(parameters: string[]) {
        super({
            code: 'E00020',
            httpStatusCode: 400,
            severity: ErrorSeverity.ERROR,
            message: `Missing parameters ${parameters.join(' ').trim()}`,
        });
    }
}

export class BadParametersError extends ServiceError {
    constructor(parameters: string[], message?: string) {
        super({
            code: 'E00021',
            httpStatusCode: 422,
            severity: ErrorSeverity.ERROR,
            message: message ?? `Bad parameters ${parameters.join(' ').trim()}`,
        });
    }
}

export class RemoveItemError extends ServiceError {
    constructor() {
        super({
            code: 'E00021',
            httpStatusCode: 400,
            severity: ErrorSeverity.ERROR,
            message: 'Item cannot be deleted due to dependencies from other entities',
        });
    }
}

export class AddItemError extends ServiceError {
    constructor() {
        super({
            code: 'E00022',
            httpStatusCode: 400,
            severity: ErrorSeverity.ERROR,
            message: 'Item cannot be added due to dependencies from other entities',
        });
    }
}

export class UpdateItemError extends ServiceError {
    constructor() {
        super({
            code: 'E00023',
            httpStatusCode: 400,
            severity: ErrorSeverity.ERROR,
            message: 'Item cannot be updated due to dependencies from other entities',
        });
    }
}

export class SmsError extends ServiceError {
    constructor(message: string) {
        super({
            code: 'E00024',
            httpStatusCode: 400,
            severity: ErrorSeverity.ERROR,
            message: message,
        });
    }
}

export class ProcessInProgressError extends ServiceError {
    constructor(parameter: Record<string, any>) {
        super({
            code: 'E00025',
            httpStatusCode: 400,
            severity: ErrorSeverity.ERROR,
            message: `Process already running ${JSON.stringify(parameter, null, 2)}`,
        });
    }
}

export class ProcessAlreadyExecuted extends ServiceError {
    constructor(parameter: Record<string, any>) {
        super({
            code: 'E00026',
            httpStatusCode: 400,
            severity: ErrorSeverity.ERROR,
            message: `Process already executed ${JSON.stringify(parameter, null, 2)}`,
        });
    }
}

export class RequiredParametersError extends ServiceError {
    constructor(parameters: string[]) {
        super({
            code: 'E00027',
            httpStatusCode: 400,
            severity: ErrorSeverity.ERROR,
            message: `Required parameters ${parameters.join(' ').trim()}`,
        });
    }
}
