import { createSlice } from '@reduxjs/toolkit';

const formationsSlice = createSlice({
  name: 'formations',
  initialState: {},
  reducers: {
    updateFormations(state, actions) {
      state.formations = [...actions.payload];
    }
  }
})

export const { updateFormations } = formationsSlice.actions;

export default formationsSlice.reducer