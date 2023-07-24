import { APIContext } from "astro";
import * as contentfulUtils from "lib/contentful.js";

export async function get(context: APIContext) {
  const locale = context.url.searchParams.get('locale')
  const mainNavDefault = await contentfulUtils.getMenuGroupMenuGroupsByName("main", !locale.includes("en") ? locale : "en-NZ")
  const mainNavMI = await contentfulUtils.getMenuGroupMenuGroupsByName("main", locale.includes("en") ? "mi-NZ" : "en-NZ")

  const contentItems = { "default": mainNavDefault, "alt": mainNavMI }

  return new Response(JSON.stringify(contentItems), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}