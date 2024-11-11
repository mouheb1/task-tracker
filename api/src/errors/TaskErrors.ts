// -- ./src/errors/TimetableErrors.ts
import { ErrorSeverity, ServiceError } from "./GenericErrors";

/**********************************************************
 *   E03XXX: Timetables errors class                      *
 **********************************************************/


export class TaskNotFoundError extends ServiceError {
    constructor() {
        super({
            code: 'E03001',
            httpStatusCode: 400,
            severity: ErrorSeverity.ERROR,
            message: "Task does not exist.",
        });
    }
}

export class TaskConflictError extends ServiceError {
    constructor() {
        super({
            code: 'E03002',
            httpStatusCode: 400,
            severity: ErrorSeverity.ERROR,
            message: "A conflicting task entry exists",
        });
    }
}