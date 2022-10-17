import { defineConfig } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vueJsx(),
    AutoImport({
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [AntDesignVueResolver()],
    }),
    Components({
      dirs: [".vitepress/components"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [AntDesignVueResolver()],
    }),
  ],
  ssr: { noExternal: ["ant-design-vue"] },
  server: {
    port: 3000,
  },
});
