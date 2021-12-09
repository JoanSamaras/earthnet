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
      state.data = [...actions.payload];
    },
    updateSelections(state, actions) {
      state.selectedIds = [...actions.payload];
    }
  }
})

export const { updateWells, updateSelections } = wellsSlice.actions;

export default wellsSlice.reducer