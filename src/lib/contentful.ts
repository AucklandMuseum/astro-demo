import * as contentful from "contentful";
import { EntrySkeletonType } from "contentful";
import { TypeContentCollectionSkeleton, TypeLocalisedStringSkeleton, TypeMenuGroupSkeleton, TypeMenuItemSkeleton } from "types/contentful";

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_PREVIEW_TOKEN,
  host: "preview.contentful.com"
});

export function getMenuGroupMenuItemsByName(
  name: string, 
  locale?: string
): Promise<(contentful.UnresolvedLink<"Entry"> | contentful.Entry<TypeMenuItemSkeleton, undefined, string>)[]> {
  return contentfulClient
    .getEntries({
      locale: locale, content_type: "menuGroup", "fields.name": name, "include": 3
    }).then((response: contentful.EntryCollection<TypeMenuGroupSkeleton, undefined, string>) => response.items[0].fields.menuItems)

}

export function getMenuGroupMenuGroupsByName(
  name: string, 
  locale?: string
): Promise<(contentful.UnresolvedLink<"Entry"> | contentful.Entry<TypeMenuGroupSkeleton, undefined, string>)[]> {
  return contentfulClient
    .getEntries({
      locale: locale, content_type: "menuGroup", "fields.name": name, "include": 3
    }).then((response: contentful.EntryCollection<TypeMenuGroupSkeleton, undefined, string>) => response.items[0].fields.menuGroups)

}

export function getContentCollectionBySlug(
  slug: string, 
  locale?: string
): Promise<any> {
  return contentfulClient
    .getEntries({ locale: locale, "content_type": "contentCollection", "fields.slug": slug })
    .then((response: any) => response.items[0].fields.contentBlocks)
}


export function getLocalisedStringByName(
  name: string, 
  locale?: string
): Promise<contentful.Entry<TypeLocalisedStringSkeleton>> {
  return contentfulClient
    .getEntries({ locale: locale, "content_type": "localisedString", "fields.name": name })
    .then((response: contentful.EntryCollection<TypeLocalisedStringSkeleton>) => response.items[0])
}


export function getPageBySlug(
  contentfulSlug: string, 
  locale?: string
): Promise<contentful.Entry<EntrySkeletonType>> {
  return contentfulClient
    .getEntries({ locale: locale, "content_type": "page", "fields.slug": contentfulSlug, "include": 10 })
    .then((response: contentful.EntryCollection<EntrySkeletonType>) => response.items[0])
}

export function getPageByAltURL(
  altURL: string, 
  locale?: string
): Promise<contentful.Entry<EntrySkeletonType>> {
  return contentfulClient
    .getEntries({ locale: locale, "content_type": "page", "fields.alternateUrls[in]": "/" + altURL, "include": 10 })
    .then((response: contentful.EntryCollection<EntrySkeletonType>) => response.items[0])
}

export function getSectionByID(
  contentfulID: string, 
  locale?: string
): Promise<contentful.Entry<EntrySkeletonType>> {
  if (contentfulID)
    return contentfulClient
      .getEntries(
        { locale: locale, "content_type": "section", "sys.id": contentfulID }
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



