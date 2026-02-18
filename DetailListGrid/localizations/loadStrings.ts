import { IInputs } from "../generated/ManifestTypes";
import { StringKeys } from "./stringKeys";

// Typ som speglar alla keys i StringKeys, men med stringvärden
export type Strings = {
    [K in keyof typeof StringKeys]: string;
};

/**
 * Loads all stringts from resx files and returns object with same keys as StringKeys
 */
export const loadStrings = (context: ComponentFramework.Context<IInputs>): Strings => {
    const entries = Object.entries(StringKeys).map(
        ([key, resxKey]) => [key, context.resources.getString(resxKey)]
    );

    const res = Object.fromEntries(entries) as Strings;
    return res;
};
