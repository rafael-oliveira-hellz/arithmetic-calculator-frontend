import { Operation } from "@/shared/interfaces/operations";
import { OperationsState } from "@/shared/types/operations-state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: OperationsState = {
  operations: [],
};

const operationsSlice = createSlice({
  name: "operations",
  initialState,
  reducers: {
    setOperations(state, action: PayloadAction<Operation[]>) {
      state.operations = action.payload;
    },
  },
});

export const { setOperations } = operationsSlice.actions;
export default operationsSlice.reducer;
