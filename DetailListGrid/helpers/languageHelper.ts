import * as lcid from 'lcid';
import { IInputs } from '../generated/ManifestTypes';

export const getUserLanguage = (pcfContext: ComponentFramework.Context<IInputs>): string => {
    const language = lcid.from(pcfContext.userSettings.languageId);
    return language.substring(0, language.indexOf('_'));
};