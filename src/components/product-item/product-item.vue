<template>
  <li class="catalog__item">
    <a
      class="catalog__pic"
      href="#"
      @click.prevent="goToPage('product', { id: item.id })"
    >
      <img :src="`img/${item.image}`" :alt="item.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ item.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ item.price | numberFormat }} ₽
    </span>

    <colors-list v-model="color" />
  </li>
</template>

<script>
import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/numberFormat';
import ColorsList from '../colors-list/colors-list.vue';

export default {
  name: 'product-item',
  components: {
    ColorsList,
  },
  props: ['item'],
  data() {
    return {
      color: '#fb1717',
    };
  },
  filters: {
    numberFormat,
  },
  methods: {
    goToPage,
  },
};
</script>
