Vue.component('price', {
    data: function () {
        return {

        }
    },
    props: {
        value: Number,
        prefix: {
            type: String,
            default: '$'
        },
        precision: {
            type: Number,
            default: 2
        },
        conversion: {
            type: Number,
            default: 1
        }
    },
    template: '<span>{{ this.prefix + Number.parseFloat(this.value * this.conversion).toFixed(this.precision) }}</span>',
});

Vue.component('products-list', {
    props: ['products', 'maximum'],
    template: `
        <transition-group name="fade"
                          tag="div"
                          @beforeEnter="beforeEnter"
                          @enter="enter"
                          @leave="leave">
            <div class="row d-flex mb-3 align-items-center"
                v-for="(item, index) in products" :key="item.id"
                v-if="item.price <= Number(maximum)"
                :data-index="index">
                <div class="col-1 m-auto">
                    <button class="btn btn-info" v-on:click="$emit('add', item)">+</button>
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
    `,
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
});

const app = new Vue({
    el: '#app',
    data: {
        inputWidth: 60,
        sliderStatus: false,
        labelArr: ['font-weight-bold', 'mr-2'],
        maximum: 99,
        products: null,
        cart: [],
    },
    filters: {
        currency: function (value) {
            return `$ ${Number.parseFloat(value).toFixed(2)}`;
        }
    },
    computed: {
        cartTotal: function () {
            let sum = 0;
            for (key in this.cart) {
                sum += this.cart[key].product.price * this.cart[key].qty;
            }

            return sum;
        },
        cartQty: function () {
            let qty = 0;
            for (key in this.cart) {
                qty += this.cart[key].qty;
            }

            return qty;
        },
        sliderState: function () {
            return this.sliderStatus ? 'd-flex' : 'd-none';
        }
    },
    methods: {
        addItem: function (product) {
            let whichProduct;
            let existing = this.cart.filter(function (item, index) {
                if (item.product.id == Number(product.id))
                {
                    whichProduct = index;
                    return true;
                }
                else {
                    return false;
                }
            });

            if (existing.length)
            {
                this.cart[whichProduct].qty++;
            }
            else {
                this.cart.push({
                    product: product,
                    qty: 1
                });
            }
        },
        deleteItem: function (id) {
            if (this.cart[id].qty > 1)
            {
                this.cart[id].qty--;
            }
            else {
                this.cart.splice(id, 1);
            }
        }
    },
    mounted: function () {
        fetch('https://hplussport.com/api/products/order/price')
            .then(response => response.json())
            .then(data => {
                this.products = data;
            })
    }
});