export class ValidationService {
  private balance: number;

  constructor(balance: number) {
    this.balance = balance;
  }

  private static errorMessages = {
    numeric: "Only numeric values are allowed.",
    divisionByZero: "Division by zero is not allowed.",
    negativeSquareRoot: "Square root of a negative number is not allowed.",
    insufficientBalance: "Insufficient balance to perform this operation.",
    invalidOperation: (operationType: string) =>
      `Invalid operation type: ${operationType}`,
  };

  validateInput(value: string): string | undefined {
    return /^-?\d*\.?\d*$/.test(value)
      ? undefined
      : ValidationService.errorMessages.numeric;
  }

  validateOperation(
    type: string,
    value1: number,
    value2?: number,
    operationCost?: number
  ): string | undefined {
    const supportedOperations = [
      "ADDITION",
      "SUBTRACTION",
      "MULTIPLICATION",
      "DIVISION",
      "SQUARE_ROOT",
      "RANDOM_STRING",
    ];

    if (!supportedOperations.includes(type)) {
      return ValidationService.errorMessages.invalidOperation(type);
    }

    if (operationCost !== undefined && this.balance < operationCost) {
      return ValidationService.errorMessages.insufficientBalance;
    }

    const operationType = type.toUpperCase();

    switch (operationType) {
      case "DIVISION":
        if (value2 === 0) {
          return ValidationService.errorMessages.divisionByZero;
        }

        break;

      case "SQUARE_ROOT":
        if (value1 < 0) {
          return ValidationService.errorMessages.negativeSquareRoot;
        }
        break;

      default:
        break;
    }

    return undefined;
  }
}
