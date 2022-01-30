<template>
  <component
    :is="currentPageComponent"
    :page-params="currentPageParams"
  />
</template>

<script>
import eventBus from '@/eventBus';
import MainPage from '@/pages/main-page.vue';
import ProductPage from '@/pages/product-page.vue';
import NotFoundPage from '@/pages/not-found-page.vue';

const routes = {
  main: 'main-page',
  product: 'product-page',
  default: 'not-found-page',
};

export default {
  name: 'App',
  components: {
    MainPage,
    ProductPage,
    NotFoundPage,
  },
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {

      },
    };
  },
  created() {
    eventBus.$on('goToPage', (pageName, pageParams) => this.goToPage(pageName, pageParams));
  },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || routes.default;
    },
  },
  methods: {
    goToPage(pageName, pageParams) {
      console.log(pageName, pageParams);
      this.currentPage = pageName;
      this.currentPageParams = pageParams || {};
    },
  },
};
</script>
