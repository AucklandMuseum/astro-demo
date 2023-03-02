import * as Contentful from "contentful";

/**
 * Fields type definition for content type 'TypeTitle'
 * @name TypeTitleFields
 * @type {TypeTitleFields}
 * @memberof TypeTitle
 */
export interface TypeTitleFields {
    /**
     * Field type definition for field 'title' (Title)
     * @name Title
     * @localized true
     */
    title: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'subtitle' (Subtitle)
     * @name Subtitle
     * @localized true
     */
    subtitle?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'boldSubtitle' (Bold Subtitle)
     * @name Bold Subtitle
     * @localized true
     */
    boldSubtitle?: Contentful.EntryFields.Symbol;
}

/**
 * Entry type definition for content type 'title' (Widget - Title Block)
 * @name TypeTitle
 * @type {TypeTitle}
 * @author Max Gilbert<mgilbert@aucklandmuseum.com>
 * @since 2023-02-08T01:14:30.797Z
 * @version 25
 * @link https://app.contentful.com/spaces/ocrj77v5idm0/environments/master/content_types/title
 */
export type TypeTitle = Contentful.Entry<TypeTitleFields>;
