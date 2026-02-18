import React from "react";
import { Strings } from "../localizations/loadStrings";


export const StringsContext = React.createContext<Strings | null>(null);

export const useStrings = () => {
    const ctx = React.useContext(StringsContext);
    if(!ctx) throw new Error("useStrings must be used inside a StringsContext.Provider");

    return ctx;
}