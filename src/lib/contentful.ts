import contentful from "contentful";

const client = contentful.createClient({
  host: "preview.contentful.com" ,
  accessToken: import.meta.env.CONTENTFUL_PREVIEW_TOKEN,
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  resolveLinks: true,
})

export function getContentBySlug<T>(
  contentfulLocale: string, 
  contentType: string,
  contentfulSlug: string
): Promise<contentful.Entry<T>> {
  return client
    .getEntries({ content_type: contentType, locale: contentfulLocale, "fields.slug": contentfulSlug })
    .then((response: contentful.EntryCollection<T>) => response.items[0])
}
