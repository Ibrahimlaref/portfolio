// redux/reducers/LocaleReducer.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  locale: (localStorage.getItem('locale') as 'en' | 'fr' | 'ar') || 'en',
};

const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
      localStorage.setItem('locale', action.payload);
      document.documentElement.lang = action.payload;
      document.documentElement.dir = action.payload === 'ar' ? 'rtl' : 'ltr';
    },
  },
});

export const { setLocale } = localeSlice.actions;
export default localeSlice.reducer;