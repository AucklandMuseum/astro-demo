import * as CFRichTextTypes from "@contentful/rich-text-types";
import * as Contentful from "contentful";
import { TypeBiographyFields } from "./TypeBiography";
import { TypeContentSectionFields } from "./TypeContentSection";
import { TypeSectionFields } from "./TypeSection";

/**
 * Fields type definition for content type 'TypePage'
 * @name TypePageFields
 * @type {TypePageFields}
 * @memberof TypePage
 */
export interface TypePageFields {
    /**
     * Field type definition for field 'parentSiteSection' (Parent Site Section)
     * @name Parent Site Section
     * @localized false
     */
    parentSiteSection?: Contentful.Entry<TypeSectionFields>;
    /**
     * Field type definition for field 'title' (Title)
     * @name Title
     * @localized true
     */
    title: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'slug' (Slug)
     * @name Slug
     * @localized false
     */
    slug?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'behaviour' (Behaviour)
     * @name Behaviour
     * @localized false
     */
    behaviour: "Article" | "Blog" | "Cenotaph" | "Event" | "Exhibition" | "Homepage" | "Listing" | "Standard" | "Tickets" | "Topic" | "What's On";
    /**
     * Field type definition for field 'publishDate' (Publish Date)
     * @name Publish Date
     * @localized false
     */
    publishDate?: Contentful.EntryFields.Date;
    /**
     * Field type definition for field 'schedule' (Schedule)
     * @name Schedule
     * @localized false
     */
    isSearchable?: Contentful.EntryFields.Boolean;
    /**
     * Field type definition for field 'alternateTitle' (Alternate Title)
     * @name Alternate Title
     * @localized true
     */
    alternateTitle?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'displaySummary' (Display Summary)
     * @name Display Summary
     * @localized true
     */
    displaySummary?: CFRichTextTypes.Block | CFRichTextTypes.Inline;
    /**
     * Field type definition for field 'contentSections' (Content Sections)
     * @name Content Sections
     * @localized true
     */
    contentSections?: Contentful.Entry<TypeContentSectionFields>[];
    /**
     * Field type definition for field 'coreImage' (Core Image)
     * @name Core Image
     * @localized false
     */
    coreImage?: Contentful.Asset;
    /**
     * Field type definition for field 'facebookImage' (Facebook Image)
     * @name Facebook Image
     * @localized false
     */
    facebookImage?: Contentful.Asset;
    /**
     * Field type definition for field 'headerImage' (Header Image)
     * @name Header Image
     * @localized false
     */
    headerImage?: Contentful.Asset;
    /**
     * Field type definition for field 'alternateUrls' (Alternate URLs)
     * @name Alternate URLs
     * @localized false
     */
    alternateUrls?: Contentful.EntryFields.Symbol[];
    /**
     * Field type definition for field 'redirect' (Redirect)
     * @name Redirect
     * @localized false
     */
    redirect?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'metaDescription' (Meta Description)
     * @name Meta Description
     * @localized true
     */
    metaDescription?: Contentful.EntryFields.Text;
    /**
     * Field type definition for field 'metaTitle' (Meta Title)
     * @name Meta Title
     * @localized true
     */
    metaTitle?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'authors' (Authors)
     * @name Authors
     * @localized false
     */
    authors?: Contentful.Entry<TypeBiographyFields>[];
    /**
     * Field type definition for field 'cloudimage' (Cloudimage)
     * @name Cloudimage
     * @localized false
     */
    cloudimage?: Contentful.EntryFields.Object;
}

/**
 * Entry type definition for content type 'page' (Page)
 * @name TypePage
 * @type {TypePage}
 * @author Max Gilbert<mgilbert@aucklandmuseum.com>
 * @since 2023-02-01T22:39:50.532Z
 * @version 253
 * @link https://app.contentful.com/spaces/ocrj77v5idm0/environments/master/content_types/page
 */
export type TypePage = Contentful.Entry<TypePageFields>;
