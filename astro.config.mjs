import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  // docs for react to preact
  // https://preactjs.com/guide/v10/switching-to-preact/
  integrations: [preact(), image()]
});