<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <product-filter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :color.sync="filterColor"
      />

      <section class="catalog">
        <product-list :products="products" />
        <pagination
          v-model="page"
          :count="getProductsLength"
          :per-page="productsPerPage"
        />
      </section>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import API_BASE_URL from '@/config';
import Pagination from '../components/pagination/pagination.vue';
import ProductList from '../components/product-list/product-list.vue';
import ProductFilter from '../components/product-filter/product-filter.vue';

export default {
  name: 'main-page',
  components: {
    Pagination,
    ProductList,
    ProductFilter,
  },
  data() {
    return {
      page: 1,
      productsPerPage: 6,
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: null,
      productsData: null,
    };
  },
  created() {
    this.loadProducts();
  },
  computed: {
    products() {
      // start for slice
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filterProducts.slice(offset, offset + this.productsPerPage);
    },
    getProductsLength() {
      return this.filterProducts.length;
    },
    filterProducts() {
      let filterProducts = this.productsData ? this.productsData : [];

      if (this.filterPriceFrom > 0) {
        filterProducts = filterProducts
          .filter((product) => product.price > this.filterPriceFrom);
      }

      if (this.filterPriceTo > 0) {
        filterProducts = filterProducts
          .filter((product) => product.price > this.filterPriceTo);
      }

      if (this.filterCategoryId > 0) {
        filterProducts = filterProducts
          .filter((product) => product.categoryId === this.filterCategoryId);
      }

      if (this.filterColor) {
        filterProducts = filterProducts
          .filter((product) => product.colors.includes(this.filterColor.toLowerCase()));
      }

      return filterProducts;
    },
  },
  methods: {
    loadProducts() {
      axios.get(`${API_BASE_URL}/products`)
        .then((response) => {
          this.productsData = response.data;
        });
    },
  },
};
</script>
