import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  selectedIds: []
}

const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    updateLogs(state, actions) {
      state.data = [...actions.payload];
    },
    updateSelections(state, actions) {
      state.selectedIds = [...actions.payload];
    }
  }
})

export const { updateLogs, updateSelections } = logsSlice.actions;

export default logsSlice.reducer