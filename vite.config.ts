import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
// import fs from 'fs'; // Not needed if using path.resolve with __dirname

export default defineConfig({
  plugins: [
    {
      name: 'debug-log-useauth-content',
      enforce: 'pre', // Run this plugin before others like react-swc
      transform(code, id) {
        // Define the absolute path to the useAuth.ts file
        const useAuthPath = path.resolve(__dirname, 'src/hooks/useAuth.ts');

        if (id === useAuthPath) {
          console.log(`\n--- DEBUG: Content of ${useAuthPath} as seen by Vite transform hook (before SWC/esbuild) ---`);
          console.log(code); // This will print the raw code string
          console.log(`--- END DEBUG: ${useAuthPath} ---\n`);
        }
        return null; // Pass through to other plugins
      }
    },
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

