<template>
  <li class="catalog__item">
    <router-link
      class="catalog__pic"
      :to="{ name: 'product', params: { id: item.id } }"
    >
      <img :src="item.image" :alt="item.title">
    </router-link>

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
};
</script>
