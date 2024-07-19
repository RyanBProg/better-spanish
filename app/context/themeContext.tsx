import { createContext } from "react";

type ThemeContextType = "light" | "dark";

const intialThemeContext: ThemeContextType = "light";

export const settingsContext = createContext(intialThemeContext);
