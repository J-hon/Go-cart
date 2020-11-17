<template>
  <div id="app" class="container mt-5">
    <router-view
      :cart="cart"
      :cartQty="cartQty"
      :cartTotal="cartTotal"
      :sliderStatus="sliderStatus"
      :products="products"
      v-model="maximum"
      @add="addItem"
      @toggle="toggleSliderStatus"
      @delete="deleteItem"></router-view>
  </div>
</template>

<script>
  export default {
    name: "App",
    data: function () {
      return {
        sliderStatus: true,
        maximum: 99,
        products: null,
        cart: [],

      }
    },
    computed: {
      cartTotal: function () {
        let sum = 0;
        for (let key in this.cart) {
          sum += this.cart[key].product.price * this.cart[key].qty;
        }

        return sum;
      },
      cartQty: function () {
        let qty = 0;
        for (let key in this.cart) {
          qty += this.cart[key].qty;
        }

        return qty;
      },
      sliderState: function () {
        return this.sliderStatus ? "d-flex" : "d-none";
      }
    },
    methods: {
      toggleSliderStatus: function () {
        this.sliderStatus = !this.sliderStatus;
      },
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
      });
    }
  };
</script>

<style>
  * {
    font-family: 'Source Sans Pro', sans-serif;
  }
</style>
