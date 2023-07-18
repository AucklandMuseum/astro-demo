import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful/dist/contentful.browser.min.js";
import type { TypeCopyBlockSkeleton } from "./TypeCopyBlock";
import type { TypeImageWithColourBoxSkeleton } from "./TypeImageWithColourBox";
import type { TypeImageWithTrainSkeleton } from "./TypeImageWithTrain";
import type { TypeMarketingPanelSkeleton } from "./TypeMarketingPanel";
import type { TypePromoWithBorderSkeleton } from "./TypePromoWithBorder";
import type { TypeTitleSkeleton } from "./TypeTitle";
import type { TypeWidgetHtmlCodeSkeleton } from "./TypeWidgetHtmlCode";
import type { TypeWidgetImageWithCaptionSkeleton } from "./TypeWidgetImageWithCaption";
import type { TypeWidgetLinkimagebuttonSkeleton } from "./TypeWidgetLinkimagebutton";
import type { TypeWidgetYouTubeResponsiveSkeleton } from "./TypeWidgetYouTubeResponsive";

export interface TypeLeftAndRightPanelsFields {
    name?: EntryFieldTypes.Symbol;
    verticalAlignment?: EntryFieldTypes.Symbol<"Bottom" | "Middle" | "Top">;
    leftPanelWidth?: EntryFieldTypes.Symbol<"25" | "33" | "50" | "75">;
    leftPanelAlignment?: EntryFieldTypes.Symbol<"Center" | "Left" | "Right">;
    leftPanelBackground?: EntryFieldTypes.Symbol<"Dark" | "Light" | "Standard">;
    rightPanelAlignment?: EntryFieldTypes.Symbol<"Center" | "Left" | "Right">;
    rightPanelBackground?: EntryFieldTypes.Symbol<"Dark" | "Light" | "Standard">;
    leftContentBlockMargin?: EntryFieldTypes.Symbol<"Content" | "None">;
    leftContentBlock?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCopyBlockSkeleton | TypeImageWithColourBoxSkeleton | TypeImageWithTrainSkeleton | TypeMarketingPanelSkeleton | TypePromoWithBorderSkeleton | TypeTitleSkeleton | TypeWidgetHtmlCodeSkeleton | TypeWidgetImageWithCaptionSkeleton | TypeWidgetLinkimagebuttonSkeleton | TypeWidgetYouTubeResponsiveSkeleton>>;
    rightContentBlockMargin?: EntryFieldTypes.Symbol<"Content" | "None">;
    rightContentBlock?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCopyBlockSkeleton | TypeImageWithColourBoxSkeleton | TypeImageWithTrainSkeleton | TypeMarketingPanelSkeleton | TypePromoWithBorderSkeleton | TypeTitleSkeleton | TypeWidgetHtmlCodeSkeleton | TypeWidgetImageWithCaptionSkeleton | TypeWidgetLinkimagebuttonSkeleton | TypeWidgetYouTubeResponsiveSkeleton>>;
}

export type TypeLeftAndRightPanelsSkeleton = EntrySkeletonType<TypeLeftAndRightPanelsFields, "leftAndRightPanels">;
export type TypeLeftAndRightPanels<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeLeftAndRightPanelsSkeleton, Modifiers, Locales>;
