import * as Contentful from "contentful";
import { TypeMenuItemFields } from "./TypeMenuItem";

export interface TypeMenuGroupFields {
    name: Contentful.EntryFields.Symbol;
    title?: Contentful.EntryFields.Symbol;
    secondaryTitle?: Contentful.EntryFields.Symbol;
    menuGroups?: Contentful.Entry<TypeMenuGroupFields>[];
    menuItems?: Contentful.Entry<TypeMenuItemFields>[];
}

export type TypeMenuGroup = Contentful.Entry<TypeMenuGroupFields>;
