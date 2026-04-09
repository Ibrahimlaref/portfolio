// redux/selectors/themeSelector.ts
import { RootState } from '../store';

export const selectTheme = (state: RootState) => state.theme.theme;