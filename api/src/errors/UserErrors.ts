// -- ./src/errors/UserErrors.ts
import { ErrorSeverity, ServiceError } from "./GenericErrors";

/**********************************************************
 *   E01XXX: User errors class                           *
 **********************************************************/

export class UserNotFoundError extends ServiceError {
    constructor() {
        super({
            code: 'E01000',
            httpStatusCode: 404,
            severity: ErrorSeverity.ERROR,
            message: 'User does not exist.',
        });
    }
}

export class InvalidCredentialsError extends ServiceError {
    constructor() {
        super({
            code: 'E01001',
            httpStatusCode: 401,
            severity: ErrorSeverity.ERROR,
            message: 'Invalid credentials: your username or password is incorrect.',
        });
    }
}

export class UserAlreadyExistsError extends ServiceError {
    constructor() {
        super({
            code: 'E01002',
            httpStatusCode: 409,
            severity: ErrorSeverity.ERROR,
            message: 'User already exists.',
        });
    }
}

export class UserNotConfirmedError extends ServiceError {
    constructor() {
        super({
            code: 'E01003',
            httpStatusCode: 403,
            severity: ErrorSeverity.ERROR,
            message: 'User account not confirmed.',
        });
    }
}

export class UserAlreadyConfirmedError extends ServiceError {
    constructor() {
        super({
            code: 'E01004',
            httpStatusCode: 400,
            severity: ErrorSeverity.ERROR,
            message: 'User account already confirmed.',
        });
    }
}

export class InvalidUserTokenError extends ServiceError {
    constructor() {
        super({
            code: 'E01005',
            httpStatusCode: 404,
            severity: ErrorSeverity.ERROR,
            message: 'Invalid user token.',
        });
    }
}

export class UserAccountDisabledError extends ServiceError {
    constructor() {
        super({
            code: 'E01006',
            httpStatusCode: 403,
            severity: ErrorSeverity.ERROR,
            message: 'The user account has been disabled.',
        });
    }
}

export class RoleNotFoundError extends ServiceError {
    constructor() {
        super({
            code: 'E01007',
            httpStatusCode: 404,
            severity: ErrorSeverity.ERROR,
            message: 'Role does not exist.',
        });
    }
}

export class InvalidUserIdError extends ServiceError {
    constructor() {
        super({
            code: 'E01008',
            httpStatusCode: 400,
            severity: ErrorSeverity.ERROR,
            message: 'Invalid user ID.',
        });
    }
}

export class DeleteUserError extends ServiceError {
    constructor() {
        super({
            code: 'E01009',
            httpStatusCode: 500,
            severity: ErrorSeverity.CRITICAL,
            message: 'Failed to delete user.',
        });
    }
}

export class UpdatePasswordError extends ServiceError {
    constructor() {
        super({
            code: 'E01010',
            httpStatusCode: 500,
            severity: ErrorSeverity.ERROR,
            message: 'Failed to set new password for user.',
        });
    }
}

export class InvalidParentRoleError extends ServiceError {
    constructor() {
        super({
            code: 'E01011',
            httpStatusCode: 500,
            severity: ErrorSeverity.ERROR,
            message: 'User role is invalid.',
        });
    }
}

export class UserSelfAssignedParentError extends ServiceError {
    constructor() {
        super({
            code: 'E01012',
            httpStatusCode: 400,
            severity: ErrorSeverity.ERROR,
            message: "A user cannot be assigned as their own parent.",
        });
    }
}
