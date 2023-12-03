<template>
  <div v-bind="c">
    <li
      v-for="item in items"
      :key="item.productId"
      class="cart__item product"
    >
      <div class="product__pic">
        <img
          :src="`img/${item.image}`"
          width="120"
          height="120"
          :alt="item.title"
        >
      </div>
      <h3 class="product__title">
        {{ item.amount }}
        {{ item.title }}
      </h3>
      <span class="product__code">
        Артикул: {{ item.productId }}
      </span>

      <div class="product__counter form__counter">
        <button type="button" aria-label="Убрать один товар">
          <svg width="10" height="10" fill="currentColor">
            <use xlink:href="#icon-minus"></use>
          </svg>
        </button>

        <input
          v-model.number="item.amount"
          type="text"
          name="count">

        <button type="button" aria-label="Добавить один товар">
          <svg width="10" height="10" fill="currentColor">
            <use xlink:href="#icon-plus"></use>
          </svg>
        </button>
      </div>

      <b class="product__price">
        {{ (item.amount * item.price) | numberFormat }} ₽
      </b>

      <button
        class="product__del button-del" type="button"
        aria-label="Удалить товар из корзины"
        @click.prevent="deleteProduct(item.productId)"
      >
        <svg width="20" height="20" fill="currentColor">
          <use xlink:href="#icon-close"></use>
        </svg>
      </button>
    </li>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'cart-item',
  props: ['items'],
  filters: {
    numberFormat,
  },
  computed: {
    c() {
      console.log('computed', this.items);
      return false;
    },
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', {
          productId: this.item.productId,
          amount: value,
        });
      },
    },
  },
  methods: {
    ...mapMutations({ deleteProduct: 'deleteCartProduct' }),
  },
};
</script>
