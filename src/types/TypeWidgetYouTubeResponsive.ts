import * as Contentful from "contentful";

export interface TypeWidgetYouTubeResponsiveFields {
    name?: Contentful.EntryFields.Symbol;
    videoUrl?: Contentful.EntryFields.Symbol;
    aspectRatio?: "Landscape 16:9" | "Landscape 4:3" | "Portait 16:9" | "TikTok/Shorts";
    width?: 100 | 25 | 33 | 50;
    autoplay?: Contentful.EntryFields.Boolean;
    relatedVideos?: Contentful.EntryFields.Boolean;
}

export type TypeWidgetYouTubeResponsive = Contentful.Entry<TypeWidgetYouTubeResponsiveFields>;
