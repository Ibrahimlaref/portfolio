// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './reducers/ThemeReducer';
import localeReducer from './reducers/LocaleReducer';
// import otherReducer from './reducers/OtherReducer';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    locale: localeReducer,
    // other: otherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;