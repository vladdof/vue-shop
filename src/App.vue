<template>
  <div>
    <header-cmp />
    <router-view />
    <footer-cmp />
  </div>
</template>

<script>
import HeaderCmp from '@/components/header.vue';
import FooterCmp from '@/components/footer.vue';

export default {
  name: 'App',
  components: {
    HeaderCmp,
    FooterCmp,
  },
};
</script>
