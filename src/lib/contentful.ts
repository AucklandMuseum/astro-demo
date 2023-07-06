import * as contentful from "contentful";
import { ChainModifiers, EntryCollection, EntrySkeletonType, LocaleCode } from "contentful";
import { TypeLocalisedStringSkeleton, TypeMenuGroupFields, TypeMenuGroupSkeleton, TypeMenuItem, TypeMenuItemFields, TypeMenuItemSkeleton } from "types/contentful";

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});

export function getMenuGroupMenuItemsByName(
  name: string,
): Promise<Array<TypeMenuItemSkeleton>> {
  return contentfulClient.getEntries<TypeMenuGroupSkeleton>({
    content_type: "menuGroup", "fields.name": name
  }).then((response: EntryCollection<TypeMenuGroupSkeleton>) => response.items[0].fields.menuItems)
}

export function getMenuGroupMenuGroupsByName(
  name: string,
): Promise<Array<TypeMenuGroupSkeleton>> {

  return contentfulClient.getEntries<TypeMenuGroupSkeleton>({
    content_type: "menuGroup", "fields.name": name
  }).then((response: EntryCollection<TypeMenuGroupSkeleton>) => response.items[0].fields.menuGroups)

}

export function getLocalisedStringByName(
  name: string,
): Promise<contentful.Entry<TypeLocalisedStringSkeleton>> {
  return contentfulClient
    .getEntries({ "locale": "en-NZ", "content_type": "localisedString", "fields.name": name })
    .then((response: contentful.EntryCollection<TypeLocalisedStringSkeleton>) => response.items[0])
}


export function getPageBySlug(
  contentfulSlug: string,
): Promise<contentful.Entry<EntrySkeletonType>> {
  return contentfulClient
    .getEntries({ "locale": "en-NZ", "content_type": "page", "fields.slug": contentfulSlug, "include": 10 })
    .then((response: contentful.EntryCollection<EntrySkeletonType>) => response.items[0])
}

export function getPageByAltURL(
  altURL: string
): Promise<contentful.Entry<EntrySkeletonType>> {
  return contentfulClient
    .getEntries({ "locale": "en-NZ", "content_type": "page", "fields.alternateUrls[in]": "/" + altURL, "include": 10 })
    .then((response: contentful.EntryCollection<EntrySkeletonType>) => response.items[0])
}

export function getSectionByID(
  contentfulID: string
): Promise<contentful.Entry<EntrySkeletonType>> {
  if (contentfulID)
    return contentfulClient
      .getEntries(
        { "locale": "en-NZ", "content_type": "section", "sys.id": contentfulID }
      )
      .then((response: contentful.EntryCollection<EntrySkeletonType>) => response.items[0])
}

export function getEntryByID(
  contentfulID: string
): Promise<contentful.Entry> {
  return contentfulClient
    .getEntry(contentfulID)
    .then((response: contentful.Entry) => response)
}



