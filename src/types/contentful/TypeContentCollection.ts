import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful/dist/contentful.browser.min.js";
import type { TypeCopyBlockSkeleton } from "./TypeCopyBlock";
import type { TypeImageMetadataSkeleton } from "./TypeImageMetadata";
import type { TypeMarketingPanelSkeleton } from "./TypeMarketingPanel";
import type { TypePageSkeleton } from "./TypePage";
import type { TypeWidgetHtmlCodeSkeleton } from "./TypeWidgetHtmlCode";
import type { TypeWidgetImageWithCaptionSkeleton } from "./TypeWidgetImageWithCaption";
import type { TypeWidgetLinkimagebuttonSkeleton } from "./TypeWidgetLinkimagebutton";
import type { TypeWidgetYouTubeResponsiveSkeleton } from "./TypeWidgetYouTubeResponsive";

export interface TypeContentCollectionFields {
    name?: EntryFieldTypes.Symbol;
    behaviour?: EntryFieldTypes.Symbol<"Belt" | "Columns" | "Image Gallery" | "Logo Cloud" | "What's Next">;
    title?: EntryFieldTypes.Symbol;
    heading?: EntryFieldTypes.Symbol;
    linkUrl?: EntryFieldTypes.Symbol;
    linkText?: EntryFieldTypes.Symbol;
    contentBlocks?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCopyBlockSkeleton | TypeImageMetadataSkeleton | TypeMarketingPanelSkeleton | TypePageSkeleton | TypeWidgetHtmlCodeSkeleton | TypeWidgetImageWithCaptionSkeleton | TypeWidgetLinkimagebuttonSkeleton | TypeWidgetYouTubeResponsiveSkeleton>>;
}

export type TypeContentCollectionSkeleton = EntrySkeletonType<TypeContentCollectionFields, "contentCollection">;
export type TypeContentCollection<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeContentCollectionSkeleton, Modifiers, Locales>;
