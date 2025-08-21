import { defineConfig } from "@4399ywkf/js";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],
  npmClient: '{{{ npmClient }}}',
});
