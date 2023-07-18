import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful/dist/contentful.browser.min.js";

export interface TypeWidgetHtmlCodeFields {
    name?: EntryFieldTypes.Symbol;
    htmlContent: EntryFieldTypes.Text;
}

export type TypeWidgetHtmlCodeSkeleton = EntrySkeletonType<TypeWidgetHtmlCodeFields, "widgetHtmlCode">;
export type TypeWidgetHtmlCode<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeWidgetHtmlCodeSkeleton, Modifiers, Locales>;
