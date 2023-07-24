import { APIContext } from "astro";
import * as contentfulUtils from "lib/contentful.js";

export async  function get(context: APIContext) {
  const locale = context.url.searchParams.get('locale')
 
  const contentItems = await contentfulUtils.getContentCollectionBySlug("opening-hours", locale)

  return new Response(JSON.stringify(contentItems), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}