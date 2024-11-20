import { Record } from "@/shared/interfaces/records";
import { RecordsState } from "@/shared/types/record-state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RecordsState = {
  records: [],
  totalPages: 0,
  isFirst: true,
  isLast: true,
};

const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    setRecords(state, action: PayloadAction<RecordsState>) {
      state.records = action.payload.records;
      state.totalPages = action.payload.totalPages;
      state.isFirst = action.payload.isFirst;
      state.isLast = action.payload.isLast;
    },

    removeRecord: (state, action: PayloadAction<string>) => {
      state.records = state.records.filter(
        (record: Record) => record.id !== action.payload
      );
    },
  },
});

export const { setRecords, removeRecord } = recordsSlice.actions;
export default recordsSlice.reducer;
