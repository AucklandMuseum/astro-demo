import contentful from "contentful";
import { TypeContentSection } from "types/TypeContentSection";
import { TypePage } from "types/TypePage";

const baseClient = contentful.createClient({
  host: "preview.contentful.com",
  accessToken: import.meta.env.CONTENTFUL_PREVIEW_TOKEN,
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  resolveLinks: true,
})

const client = baseClient;

export function getPageBySlug(
  contentfulSlug: string,
): Promise<contentful.Entry<TypePage>> {
  return client
    .getEntries({"locale":"en-NZ","content_type":"page", "fields.slug":contentfulSlug})
    .then((response: contentful.EntryCollection<TypePage>) => response.items[0])
}

export function getPageByAltURL(
  altURL: string
): Promise<contentful.Entry<TypePage>> {
  return client
    .getEntries({"locale":"en-NZ","content_type":"page", "fields.alternateUrls[exists]":altURL})
    .then((response: contentful.EntryCollection<TypePage>) => response.items[0])
}

export function getSectionByID(
  contentfulID: string
): Promise<contentful.Entry<TypeContentSection>> {
  return client
    .getEntries(
      {"locale":"en-NZ","content_type":"contentSection", "sys.id": contentfulID}
    )
    .then((response: contentful.EntryCollection<TypeContentSection>) => response.items[0])
}
