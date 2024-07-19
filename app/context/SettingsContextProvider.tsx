import {
  createContext,
  useContext,
  Dispatch,
  ReactNode,
  useReducer,
} from "react";

type LanguageMode = "esp" | "eng";
type QuestionMode = "typed" | "multi";

type SettingsContextType = {
  languageMode: LanguageMode;
  questionMode: QuestionMode;
};
export type ActionType = "toggle_language" | "toggle_questionMode";
type Action = { type: ActionType };

const intialSettingsContext: SettingsContextType = {
  languageMode: "esp",
  questionMode: "typed",
};

const SettingsContext = createContext<{
  state: SettingsContextType;
  dispatch: Dispatch<Action>;
}>({
  state: intialSettingsContext,
  dispatch: () => {},
});

const settingsReducer = (
  state: SettingsContextType,
  action: Action
): SettingsContextType => {
  switch (action.type) {
    case "toggle_language":
      if (state.languageMode === "esp") {
        return { ...state, languageMode: "eng" };
      } else {
        return { ...state, languageMode: "esp" };
      }
    case "toggle_questionMode":
      if (state.questionMode === "typed") {
        return { ...state, questionMode: "multi" };
      } else {
        return { ...state, questionMode: "typed" };
      }
    default:
      return state;
  }
};

export default function SettingsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(settingsReducer, intialSettingsContext);

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
