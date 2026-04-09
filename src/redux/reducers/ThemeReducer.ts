// redux/reducers/ThemeReducer.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: (localStorage.getItem('theme') as 'dark' | 'light') || 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;