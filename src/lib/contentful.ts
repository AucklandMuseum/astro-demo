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
    .getEntries({"locale":"en-NZ","content_type":"page", "fields.slug":contentfulSlug, "include":10})
    .then((response: contentful.EntryCollection<TypePage>) => response.items[0])
}

export function getPageByAltURL(
  altURL: string
): Promise<contentful.Entry<TypePage>> {
  return client
    .getEntries({"locale":"en-NZ","content_type":"page", "fields.alternateUrls[in]":"/"+altURL, "include":10})
    .then((response: contentful.EntryCollection<TypePage>) => response.items[0])
}

export function getSectionByID(
  contentfulID: string
): Promise<contentful.Entry<TypeContentSection>> {
  if(contentfulID)
  return client
    .getEntries(
      {"locale":"en-NZ","content_type":"section", "sys.id": contentfulID}
    )
    .then((response: contentful.EntryCollection<TypeContentSection>) => response.items[0])
}

export function getEntryByID(
  contentfulID: string
): Promise<contentful.Entry> {
  return client
    .getEntry(contentfulID)
    .then((response: contentful.Entry) => response)
}



