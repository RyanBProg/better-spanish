import {
  createContext,
  useContext,
  Dispatch,
  ReactNode,
  useReducer,
} from "react";

export type LanguageMode = "esp" | "eng";
export type QuestionMode = "typed" | "multi";

type SettingsContextType = {
  languageMode: LanguageMode;
  questionMode: QuestionMode;
};
export type ActionType =
  | "language_spanish"
  | "language_english"
  | "question_typed"
  | "question_multi";
type Action = {
  type: ActionType;
};

const intialSettingsContext: SettingsContextType = {
  languageMode: "esp",
  questionMode: "typed",
};

export const SettingsContext = createContext<{
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
    case "language_spanish":
      return { ...state, languageMode: "esp" };
    case "language_english":
      return { ...state, languageMode: "eng" };
    case "question_typed":
      return { ...state, questionMode: "typed" };
    case "question_multi":
      return { ...state, questionMode: "multi" };
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
