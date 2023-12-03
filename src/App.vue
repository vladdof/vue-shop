<template>
  <div>
    <header-cmp />
    <router-view />
    <footer-cmp />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import HeaderCmp from '@/components/header.vue';
import FooterCmp from '@/components/footer.vue';

export default {
  name: 'App',
  components: {
    HeaderCmp,
    FooterCmp,
  },
  created() {
    // dispatch вызывает действие
    // this.$store.dispatch('loadCart');
    // or
    // после подмешивания с помощью mapActions
    this.loadCart();

    const userId = localStorage.getItem('userId');

    if (userId) {
      this.updateUserId(userId);
    }
  },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserId']),
  },
};
</script>
