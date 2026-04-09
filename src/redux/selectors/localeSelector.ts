// redux/selectors/localeSelector.ts
import { RootState } from '../store';

export const selectLocale = (state: RootState) => state.locale.locale;