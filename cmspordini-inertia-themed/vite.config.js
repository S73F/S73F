import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/js/app.jsx",
                "resources/css/app.css",
                "resources/css/modal.css",
            ],
            refresh: true,
        }),
    ],
});
