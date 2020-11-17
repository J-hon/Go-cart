<template>
    <transition-group name="fade"
                      tag="div"
                      @beforeEnter="beforeEnter"
                      @enter="enter"
                      @leave="leave">
        <div class="row d-flex mb-3 align-items-center"
             v-for="(item, index) in products" :key="item.id"
             :data-index="index">
            <div class="col-1 m-auto">
                <button class="btn btn-info" v-on:click="$parent.$emit('add', item)">+</button>
            </div>
            <div class="col-sm-4">
                <img class="img-fluid d-block" :src="item.image" :alt="item.name">
            </div>
            <div class="col">
                <h3 class="text-info">
                    {{ item.name }}
                </h3>
                <p class="mb-0">
                    {{ item.description }}
                </p>
                <div class="h5 float-right font-weight-bold">
                    <price :value="Number(item.price)"></price>
                </div>
            </div>
        </div>
    </transition-group>
</template>

<script>
    import Price from "./Price";

    export default {
        name: "product-list",
        components: { Price },
        props: ['products', 'maximum'],
        methods: {
            beforeEnter: function (element) {
                element.className = 'd-none';
            },
            enter: function (element) {
                const delay = element.dataset.index * 100;
                setTimeout(function () {
                    element.className = 'row d-flex mb-3 align-items-center animate__animated animate__fadeInRight';
                }, delay);
            },
            leave: function(element) {
                const delay = element.dataset.index * 100;
                setTimeout(function () {
                    element.className = 'row d-flex mb-3 align-items-center animate__animated animate__fadeOutRight';
                }, delay);
            },
        }
    }
</script>