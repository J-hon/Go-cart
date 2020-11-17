<template>
    <h1>My shop</h1>

    <nav-bar :cart="cart" :cartQty="cartQty" :cartTotal="cartTotal"></nav-bar>

    <price-slider :sliderStatus="sliderStatus" v-model="maximum"></price-slider>

    <product-list :maximum="maximum" :products="products"></product-list>
</template>

<script>
    import ProductList from "./ProductList";
    import PriceSlider from "./PriceSlider";
    import NavBar from "./NavBar";

    export default {
        name: "products",
        props: [
            'products',
            // 'maximum',
            'cart',
            'cartQty',
            'cartTotal',
            'sliderStatus',
            'sliderState',
        ],
        components: {
            ProductList, PriceSlider, NavBar
        }
    }
</script>

<style scoped>

</style>