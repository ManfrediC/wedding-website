import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  // Preserve the HTML whitespace handling used before Astro 7.
  compressHTML: true,
  trailingSlash: 'always',
  devToolbar: {
    enabled: false,
  },
});
