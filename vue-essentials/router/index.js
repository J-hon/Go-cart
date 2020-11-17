import { createWebHistory, createRouter } from "vue-router";
import Products from "../src/components/Products";
import Checkout from "../src/components/Checkout";

const routes = [
    {
        path: "/:catchAll(.*)",
        component: Products,
    },
    {
        path: "/checkout",
        name: 'checkout',
        component: Checkout,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;