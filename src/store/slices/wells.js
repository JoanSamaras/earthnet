import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  selectedIds: []
}

const wellsSlice = createSlice({
  name: 'wells',
  initialState,
  reducers: {
    updateWells(state, actions) {
      const { data } = actions.payload;
      state.data = [...data];
    },
    updateSelections(state, actions) {
      const { selections } = actions.payload;
      state.selectedIds = [...selections];
    }
  }
})

export const { updateWells, updateSelections } = wellsSlice.actions;

export default wellsSlice.reducer