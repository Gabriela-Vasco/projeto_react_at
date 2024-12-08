import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import livereload from "vite-plugin-live-reload";

export default defineConfig(() => {
    return {
        build: {
            outDir: "build",
            sourcemap: process.env.NODE_ENV === 'development',
        },
        plugins: [
            react(),
            livereload('src/**/*.{js,jsx,ts,tsx}')
        ],
    };
})