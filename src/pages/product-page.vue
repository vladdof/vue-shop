<template>
  <div>
    <div v-if="productLoading">
      Загрузка товара...
    </div>
    <div v-else-if="!productData">
      <p>Произошла ошибка загрузки товара!</p>
      <button @click.prevent="loadProduct">Попробовать еще раз</button>
    </div>
    <main
      v-else
      class="content container"
    >
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link
              class="breadcrumbs__link"
              :to="{ name: 'main' }"
            >
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link
              class="breadcrumbs__link"
              :to="{ name: 'main' }"
            >
              {{ category }}
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              {{ product.title }}
            </a>
          </li>
        </ul>
      </div>

      <section class="item">
        <div class="item__pics pics">
          <div class="pics__wrapper">
            <img
              width="570"
              height="570"
              :src="product.image"
              :alt="product.title"
            >
          </div>
        </div>

        <div class="item__info">
          <span class="item__code">Артикул: {{ product.id }}</span>
          <h2 class="item__title">
            {{ product.title }}
          </h2>
          <div class="item__form">
            <form
              class="form"
              action="#"
              method="POST"
              @submit.prevent="addToCart"
            >
              <b class="item__price">
                {{ product.price | numberFormat }} ₽
              </b>

              <fieldset class="form__block">
                <legend class="form__legend">
                  Цвет:
                </legend>
                <ul class="colors">
                  <li class="colors__item">
                    <label class="colors__label">
                      <input
                        class="colors__radio sr-only"
                        type="radio"
                        name="color-item"
                        value="blue"
                        checked=""
                      >
                      <span
                        class="colors__value"
                        style="background-color: #73B6EA;"
                      />
                    </label>
                  </li>
                  <li class="colors__item">
                    <label class="colors__label">
                      <input
                        class="colors__radio sr-only"
                        type="radio"
                        name="color-item"
                        value="yellow"
                      >
                      <span
                        class="colors__value"
                        style="background-color: #FFBE15;"
                      />
                    </label>
                  </li>
                  <li class="colors__item">
                    <label class="colors__label">
                      <input
                        class="colors__radio sr-only"
                        type="radio"
                        name="color-item"
                        value="gray"
                      >
                      <span
                        class="colors__value"
                        style="background-color: #939393;"
                      /></label>
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">
                  Объемб в ГБ:
                </legend>

                <ul class="sizes sizes--primery">
                  <li class="sizes__item">
                    <label class="sizes__label">
                      <input
                        class="sizes__radio sr-only"
                        type="radio"
                        name="sizes-item"
                        value="32"
                      >
                      <span class="sizes__value">
                        32gb
                      </span>
                    </label>
                  </li>
                  <li class="sizes__item">
                    <label class="sizes__label">
                      <input
                        class="sizes__radio sr-only"
                        type="radio"
                        name="sizes-item"
                        value="64"
                      >
                      <span class="sizes__value">
                        64gb
                      </span>
                    </label>
                  </li>
                  <li class="sizes__item">
                    <label class="sizes__label">
                      <input
                        class="sizes__radio sr-only"
                        type="radio"
                        name="sizes-item"
                        value="128"
                        checked=""
                      >
                      <span class="sizes__value">
                        128gb
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <div class="item__row">
                <div class="form__counter">
                  <button
                    type="button"
                    aria-label="Убрать один товар"
                    @click.prevent="changeProductAmount('less')"
                  >
                    <svg
                      width="12"
                      height="12"
                      fill="currentColor"
                    >
                      <use xlink:href="#icon-minus" />
                    </svg>
                  </button>

                  <input
                    v-model.number="productAmount"
                    type="text"
                    value="1"
                    name="count"
                  >

                  <button
                    type="button"
                    aria-label="Добавить один товар"
                    @click.prevent="changeProductAmount('more')"
                  >
                    <svg
                      width="12"
                      height="12"
                      fill="currentColor"
                    >
                      <use xlink:href="#icon-plus" />
                    </svg>
                  </button>
                </div>

                <button
                  class="button button--primery"
                  type="submit"
                  :disabled="productAddSending"
                >
                  В корзину
                </button>
              </div>

              <div v-show="productAdded">Товар добавлен в корзину</div>
              <div v-show="productAddSending">Добавляем товар в корзину</div>
            </form>
          </div>
        </div>

        <div class="item__desc">
          <ul class="tabs">
            <li class="tabs__item">
              <a class="tabs__link tabs__link--current">
                Описание
              </a>
            </li>
            <li class="tabs__item">
              <a
                class="tabs__link"
                href="#"
              >
                Характеристики
              </a>
            </li>
            <li class="tabs__item">
              <a
                class="tabs__link"
                href="#"
              >
                Гарантия
              </a>
            </li>
            <li class="tabs__item">
              <a
                class="tabs__link"
                href="#"
              >
                Оплата и доставка
              </a>
            </li>
          </ul>

          <div class="item__content">
            <p>Рейтинг: {{ product.rating.rate }}</p>
            <br>
            {{ product.description }}
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import API_BASE_URL from '@/config';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'product-page',
  filters: {
    numberFormat,
  },
  data() {
    return {
      productAmount: 1,
      productData: null,
      productLoading: false,
      productLoadingFailed: false,
      productAdded: false,
      productAddSending: false,
    };
  },
  computed: {
    product() {
      return this.productData ? this.productData : [];
    },
    category() {
      return this.productData.category;
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),

    addToCart() {
      // this.$store.commit - это мутация
      // this.$store.dispatch - это действие
      // теперь вместо dispatch можем обратиться
      // к методу addProductToCart
      this.productAdded = false;
      this.productAddSending = true;

      this.addProductToCart(
        {
          productId: this.product.id,
          amount: this.productAmount,
          title: this.productData.title,
          price: this.productData.price,
          image: this.productData.image,
        },
      ).then(() => {
        this.productAdded = true;
        this.productAddSending = false;
      });
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;

      const productId = this.$route.params.id;

      setTimeout(() => {
        axios.get(`${API_BASE_URL}/products/${productId}`)
          .then((response) => {
            this.productData = response.data;
          })
          .catch(() => {
            this.productLoadingFailed = true;
          })
          .then(() => {
            this.productLoading = false;
          });
      }, 0);
    },

    changeProductAmount(event) {
      if (this.productAmount < 1 && event === 'less') {
        return;
      }

      const eventByType = {
        less: () => this.productAmount - 1,
        more: () => this.productAmount + 1,
      };
      this.productAmount = eventByType[event]();
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>
