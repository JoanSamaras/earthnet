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
      const { data } = actions.payload;
      state.data = [...data];
    },
    updateSelections(state, actions) {
      const { selections } = actions.payload;
      state.selectedIds = [...selections];
    }
  }
})

export const { updateFormations, updateSelections } = formationsSlice.actions;

export default formationsSlice.reducer