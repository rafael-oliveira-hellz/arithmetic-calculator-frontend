import { ValidationService } from "@/app/services/validation-service";

describe("ValidationService", () => {
  it("should validate numeric input correctly", () => {
    const service = new ValidationService(50);

    expect(service.validateInput("123")).toBeUndefined();
    expect(service.validateInput("abc")).toBe(
      "Only numeric values are allowed."
    );
    expect(service.validateInput("12.3")).toBeUndefined();
  });

  it("should validate division by zero", () => {
    const service = new ValidationService(50);

    expect(service.validateOperation("DIVISION", 10, 0)).toBe(
      "Division by zero is not allowed."
    );
    expect(service.validateOperation("DIVISION", 10, 2)).toBeUndefined();
  });

  it("should validate square root of a negative number", () => {
    const service = new ValidationService(50);

    expect(service.validateOperation("SQUARE_ROOT", -9)).toBe(
      "Square root of a negative number is not allowed."
    );
    expect(service.validateOperation("SQUARE_ROOT", 9)).toBeUndefined();
  });

  it("should validate insufficient balance", () => {
    const service = new ValidationService(2);

    expect(service.validateOperation("ADDITION", 10)).toBe(
      "Insufficient balance to perform this operation."
    );
    expect(service.validateOperation("ADDITION", 10, 5)).toBe(
      "Insufficient balance to perform this operation."
    );
  });
});
