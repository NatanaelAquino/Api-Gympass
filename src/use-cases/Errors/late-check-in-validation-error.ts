export class LateCheckInValidationError extends Error {
  constructor() {
    super("Check-in is too old to be validated until 20 minutes after creation")
  }
} 