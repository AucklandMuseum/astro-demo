import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful/dist/contentful.browser.min.js";
import type { TypeContentCollectionSkeleton } from "./TypeContentCollection";
import type { TypeCopyBlockSkeleton } from "./TypeCopyBlock";
import type { TypeImageWithColourBoxSkeleton } from "./TypeImageWithColourBox";
import type { TypeImageWithTrainSkeleton } from "./TypeImageWithTrain";
import type { TypeLeftAndRightPanelsSkeleton } from "./TypeLeftAndRightPanels";
import type { TypeMarketingPanelSkeleton } from "./TypeMarketingPanel";
import type { TypeTitleSkeleton } from "./TypeTitle";
import type { TypeWidgetHtmlCodeSkeleton } from "./TypeWidgetHtmlCode";
import type { TypeWidgetImageWithCaptionSkeleton } from "./TypeWidgetImageWithCaption";
import type { TypeWidgetLinkimagebuttonSkeleton } from "./TypeWidgetLinkimagebutton";
import type { TypeWidgetYouTubeResponsiveSkeleton } from "./TypeWidgetYouTubeResponsive";

export interface TypeContentItemsFields {
    name?: EntryFieldTypes.Symbol;
    sectionWidth?: EntryFieldTypes.Symbol<"Fullwidth" | "Standard">;
    sectionStyle?: EntryFieldTypes.Symbol<"Dark" | "Light" | "Standard">;
    sectionMarginTop?: EntryFieldTypes.Symbol<"Large" | "None" | "Small" | "Standard">;
    sectionMarginBottom?: EntryFieldTypes.Symbol<"Large" | "None" | "Small" | "Standard">;
    contentWidth?: EntryFieldTypes.Symbol<"Fullwidth" | "Medium" | "Narrow" | "Standard">;
    contentBlocks?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeContentCollectionSkeleton | TypeCopyBlockSkeleton | TypeImageWithColourBoxSkeleton | TypeImageWithTrainSkeleton | TypeLeftAndRightPanelsSkeleton | TypeMarketingPanelSkeleton | TypeTitleSkeleton | TypeWidgetHtmlCodeSkeleton | TypeWidgetImageWithCaptionSkeleton | TypeWidgetLinkimagebuttonSkeleton | TypeWidgetYouTubeResponsiveSkeleton>>;
}

export type TypeContentItemsSkeleton = EntrySkeletonType<TypeContentItemsFields, "contentItems">;
export type TypeContentItems<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeContentItemsSkeleton, Modifiers, Locales>;
