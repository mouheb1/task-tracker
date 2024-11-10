// -- ./src/errors/OrganizationErrors.ts
import { ErrorSeverity, ServiceError } from "./GenericErrors";

/**********************************************************
 *   E02XXX: Organization errors class                    *
 **********************************************************/

export class OrganizationNotFoundError extends ServiceError {
    constructor() {
        super({
            code: 'E02000',
            httpStatusCode: 404,
            severity: ErrorSeverity.ERROR,
            message: 'Organization does not exist',
        });
    }
}
