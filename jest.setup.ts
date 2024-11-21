import "@testing-library/jest-dom";
import "jest-axe/extend-expect";

if (typeof structuredClone === "undefined") {
  global.structuredClone = (value) => JSON.parse(JSON.stringify(value));
}

jest.mock("@chakra-ui/react", () => {
  const originalChakra = jest.requireActual("@chakra-ui/react");
  return {
    ...originalChakra,
    useAnimationState: () => ({ present: true }),
  };
});
