import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeWidgetYouTubeResponsiveFields {
    name?: EntryFieldTypes.Symbol;
    videoUrl?: EntryFieldTypes.Symbol;
    aspectRatio?: EntryFieldTypes.Symbol<"Landscape 16:9" | "Landscape 4:3" | "Portait 16:9" | "Square">;
    width?: EntryFieldTypes.Integer<100 | 25 | 33 | 50>;
    autoplay?: EntryFieldTypes.Boolean;
    relatedVideos?: EntryFieldTypes.Boolean;
}

export type TypeWidgetYouTubeResponsiveSkeleton = EntrySkeletonType<TypeWidgetYouTubeResponsiveFields, "widgetYouTubeResponsive">;
export type TypeWidgetYouTubeResponsive<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeWidgetYouTubeResponsiveSkeleton, Modifiers, Locales>;
