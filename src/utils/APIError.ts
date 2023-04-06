import { Error } from 'mongoose';
import { Response } from 'express';

export default class APIError {
  constructor(
    public path: string | undefined,
    public message: string | undefined
  ) {}

  static fromValidationError(
    validationError: Error.ValidationError
  ): APIError[] {
    return Object.values(validationError.errors).map(
      (error) => new APIError(error.path, error.message)
    );
  }

  static errorMessage(err: unknown): err is { message: string } {
    if (err && typeof err === 'object' && 'message' in err) {
      return true;
    } else {
      return false;
    }
  }

  static handleErrorResponse(res: Response, err: unknown): void {
    if (err instanceof Error.ValidationError) {
      const apiErrors = APIError.fromValidationError(err);
      const errors = apiErrors.map(error => ({ path: error.path, message: error.message }));
      res.status(400).json({ errors });
    } else if (APIError.errorMessage(err)) {
      res.status(400).json({ error: (err as { message: string }).message });
    } else {
      res.status(500).send("Internal server error.");
    }
  }
}
