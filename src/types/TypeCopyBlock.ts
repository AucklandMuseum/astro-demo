import * as CFRichTextTypes from "@contentful/rich-text-types";
import * as Contentful from "contentful";

/**
 * Fields type definition for content type 'TypeCopyBlock'
 * @name TypeCopyBlockFields
 * @type {TypeCopyBlockFields}
 * @memberof TypeCopyBlock
 */
export interface TypeCopyBlockFields {
    /**
     * Field type definition for field 'name' (Name)
     * @name Name
     * @localized false
     */
    name?: Contentful.EntryFields.Symbol;
    /**
     * Field type definition for field 'content' (Content)
     * @name Content
     * @localized true
     */
    content?: CFRichTextTypes.Block | CFRichTextTypes.Inline;
}

/**
 * Entry type definition for content type 'copyBlock' (Widget - Copy Block)
 * @name TypeCopyBlock
 * @type {TypeCopyBlock}
 * @author Max Gilbert<mgilbert@aucklandmuseum.com>
 * @since 2023-02-07T23:58:40.295Z
 * @version 21
 * @link https://app.contentful.com/spaces/ocrj77v5idm0/environments/master/content_types/copyBlock
 */
export type TypeCopyBlock = Contentful.Entry<TypeCopyBlockFields>;
