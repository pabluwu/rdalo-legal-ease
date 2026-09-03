import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  // Congela el año en build: evaluarlo en runtime da un valor distinto en el HTML
  // prerenderizado y en el cliente, lo que rompe la hidratación (React #418).
  define: {
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssgOptions: {
    entry: "src/main.tsx",
    // URLs limpias sin trailing slash: /foo -> /foo/index.html
    dirStyle: "nested",
    formatting: "none",
    beastiesOptions: false,
  },
}));
