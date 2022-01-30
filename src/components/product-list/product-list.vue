<template>
  <ul class="catalog__list">
    <product-item
      v-for="product in products"
      :key="product.title"
      :item="product"
    />
  </ul>
</template>

<script>
import ProductItem from '../product-item/product-item.vue';

export default {
  name: 'product-list',
  components: {
    ProductItem,
  },
  props: ['products'],
};
</script>
