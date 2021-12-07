import { createSlice } from '@reduxjs/toolkit';

const wellsSlice = createSlice({
  name: 'wells',
  initialState: {},
  reducers: {
    updateWells(state, actions) {
      state.wells = [...actions.payload];
    }
  }
})

export const { updateWells } = wellsSlice.actions;

export default wellsSlice.reducer