import * as contentfulUtils from "lib/contentful.js";

export async function get({ params }) {
  const locale = params.locale;
  const mainNavDefault = await contentfulUtils.getMenuGroupMenuGroupsByName("main", locale)
  const mainNavMI = await contentfulUtils.getMenuGroupMenuGroupsByName("main", "mi-NZ")
  
  const contentItems = { "default": mainNavDefault, "mi": mainNavMI }

  return new Response(JSON.stringify(contentItems), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}