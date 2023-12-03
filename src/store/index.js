import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],

    userId: null,
    cartProductsData: [],

    productsData: [],
  },
  // мутации синхронные
  // мутации нужны для изменения состояния
  mutations: {
    updateCartProductAmount(state, { productId, amount }) {
      const product = state.cartProducts.find((item) => item.productId === productId);

      if (product) {
        product.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts
        .filter((item) => item.productId !== productId);
    },
    updateUserId(state, userId) {
      state.userId = userId;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => (
        {
          productId: item.productId,
          amount: item.quantity,
          price: item.price,
          title: item.title,
          image: this.image,
        }
      ));
    },
    productsDataInfo(state, productData) {
      state.productsData = productData;
    },
    updateProductsDataInfo(state, productData) {
      state.productsData = productData;
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: state.cartProductsData.find((p) => p.productId === item.productId),
      }));
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (
        item.product.price * item.amount + acc
      ), 0);
    },

    productsDataInfo(state) {
      return state.productsData;
    },
  },
  // можно применять для асинхронных действий
  actions: {
    loadCart(context) {
      return axios.get(`${API_BASE_URL}/carts/1`)
        .then((response) => {
          if (!context.state.userId) {
            localStorage.setItem('userId', response.data.userId);
            context.commit('updateUserId', response.data.userId);
          }
          console.log('loadCart', response);
          context.commit('updateCartProductsData', response.data.products);
          context.commit('syncCartProducts');
        })
        .catch();
    },
    addProductToCart(context, {
      productId, amount, title, price, image,
    }) {
      return axios
        .post(`${API_BASE_URL}/carts`,
          {
            userId: context.state.userId,
            products: [{
              productId,
              quantity: amount,
              title,
              price,
              image,
            }],
          })
        .then((response) => {
          console.log('/carts', response);
          context.commit('updateCartProductsData', response.data.products);
          context.commit('syncCartProducts');
        });
    },
    updateCartProductAmount(context, {
      productId, amount, title, price, image,
    }) {
      // след строчка для быстрого подсчетов в корзине
      context.commit('updateCartProductAmount', { productId, amount });

      if (amount < 1) {
        return false;
      }

      // а потом в фоне отправляем запрос
      return axios
        .put(`${API_BASE_URL}/carts`,
          {
            userId: context.state.userId,
            products: [{
              productId,
              quantity: amount,
              title,
              price,
              image,
            }],
          })
        .then((response) => {
          console.log('updateCartProductAmount', response);
          context.commit('updateCartProductsData', response.data.products);
        })
        .cath(() => {
          context.commit('syncCartProducts');
        });
    },

    loadProducts(context) {
      // return axios
      //   .get(`${API_BASE_URL}/products`)
      //   .then((response) => {
      //     console.log(response);
      //     context.commit('updateProductList', response.data);
      //   });

      return axios
        .get(`${API_BASE_URL}/products`)
        .then((response) => {
          console.log(response);
          context.commit('updateProductsDataInfo', response.data);
        });
    },
  },
});
