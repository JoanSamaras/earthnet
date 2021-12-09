import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  selectedIds: []
}

const formationsSlice = createSlice({
  name: 'formations',
  initialState,
  reducers: {
    updateFormations(state, actions) {
      state.data = [...actions.payload];
    },
    updateSelections(state, actions) {
      state.selectedIds = [...actions.payload];
    }
  }
})

export const { updateFormations, updateSelections } = formationsSlice.actions;

export default formationsSlice.reducer