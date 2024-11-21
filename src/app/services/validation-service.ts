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
  };

  validateInput(value: string): string | undefined {
    return /^\d*\.?\d*$/.test(value)
      ? undefined
      : ValidationService.errorMessages.numeric;
  }

  validateOperation(
    type: string,
    value1: number,
    value2?: number
  ): string | undefined {
    switch (type.toUpperCase()) {
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

    if (this.balance < 10) {
      return ValidationService.errorMessages.insufficientBalance;
    }

    return undefined;
  }
}
