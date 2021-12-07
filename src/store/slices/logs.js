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
      const { data } = actions.payload;
      state.data = [...data];
    },
    updateSelections(state, actions) {
      const { selections } = actions.payload;
      state.selectedIds = [...selections];
    }
  }
})

export const { updateLogs, updateSelections } = logsSlice.actions;

export default logsSlice.reducer