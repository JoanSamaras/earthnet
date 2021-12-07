import { createSlice } from '@reduxjs/toolkit';

const logsSlice = createSlice({
  name: 'logs',
  initialState: {},
  reducers: {
    updateLogs(state, actions) {
      state.logs = [...actions.payload];
    }
  }
})

export const { updateLogs } = logsSlice.actions;

export default logsSlice.reducer