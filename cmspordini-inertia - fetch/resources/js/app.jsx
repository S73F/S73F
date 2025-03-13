import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { renderApp } from "@inertiaui/modal-react";
import { putConfig } from "@inertiaui/modal-react";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        const components = import.meta.glob("./Components/**/*.jsx", {
            eager: true,
        });

        return (
            pages[`./Pages/${name}.jsx`] ||
            components[`./Components/${name}.jsx`]
        );
    },
    setup({ el, App, props }) {
        createRoot(el).render(renderApp(App, props));
    },
});
