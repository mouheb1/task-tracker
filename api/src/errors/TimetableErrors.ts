// -- ./src/errors/TimetableErrors.ts
import { ErrorSeverity, ServiceError } from "./GenericErrors";

/**********************************************************
 *   E03XXX: Timetables errors class                      *
 **********************************************************/

export class TimtableConflictError extends ServiceError {
    constructor() {
        super({
            code: 'E03001',
            httpStatusCode: 400,
            severity: ErrorSeverity.ERROR,
            message: "A conflicting timetable entry exists for the given teacher, class, or room.",
        });
    }
}
