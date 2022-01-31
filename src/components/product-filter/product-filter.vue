<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form
      class="filter__form form"
      action="#"
      method="get"
      @submit.prevent="submit"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            v-model.number="currentPriceFrom"
            class="form__input"
            type="text"
            name="min-price"
            value="0"
          >
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            v-model.number="currentPriceTo"
            class="form__input"
            type="text"
            name="max-price"
            value="12345"
          >
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            v-model.number="currentCategoryId"
            class="form__select"
            type="text"
            name="category"
          >
            <option value="0">Все категории</option>
            <option
              v-for="(category, idx) in categories"
              :key="idx"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item">
            <label class="colors__label">
              <input v-model="currentColor" class="colors__radio sr-only"
                type="radio" name="color" value="#73B6EA" checked="">
              <span class="colors__value" style="background-color: #73B6EA;">
              </span>
            </label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input v-model="currentColor"
                class="colors__radio sr-only" type="radio" name="color" value="#FFBE15">
              <span class="colors__value" style="background-color: #FFBE15;">
              </span>
            </label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input v-model="currentColor"
                class="colors__radio sr-only" type="radio" name="color" value="#939393">
              <span class="colors__value" style="background-color: #939393;">
            </span></label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input v-model="currentColor"
                class="colors__radio sr-only" type="radio" name="color" value="#8BE000">
              <span class="colors__value" style="background-color: #8BE000;">
            </span></label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input v-model="currentColor"
                class="colors__radio sr-only" type="radio" name="color" value="#FF6B00">
              <span class="colors__value" style="background-color: #FF6B00;">
            </span></label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input v-model="currentColor"
                class="colors__radio sr-only" type="radio" name="color" value="#FFF">
              <span class="colors__value" style="background-color: #FFF;">
            </span></label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input v-model="currentColor"
                class="colors__radio sr-only" type="radio" name="color" value="#000">
              <span class="colors__value" style="background-color: #000;">
            </span></label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Объемб в ГБ</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only"
                type="checkbox" name="volume" value="8" checked="">
              <span class="check-list__desc">
                8
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">
              <span class="check-list__desc">
                16
                <span>(461)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">
              <span class="check-list__desc">
                32
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="64">
              <span class="check-list__desc">
                64
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only"
                type="checkbox" name="volume" value="128">
              <span class="check-list__desc">
                128
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only"
                type="checkbox" name="volume" value="264">
              <span class="check-list__desc">
                264
                <span>(313)</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button
        class="filter__reset button button--second"
        type="button"
        @click.prevent="reset"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from 'axios';
import API_BASE_URL from '@/config';
// import categories from '../../data/categories';

export default {
  name: 'product-filter',
  props: ['priceFrom', 'priceTo', 'categoryId', 'color'],
  data() {
    return {
      currentCategoryId: 0,
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentColor: null,
      categoriesData: [],
    };
  },
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData : [];
    },
  },
  created() {
    this.loadCategories();
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    color(value) {
      this.currentColor = value;
    },
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:color', this.currentColor);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
    },
    loadCategories() {
      axios.get(`${API_BASE_URL}/products/categories`)
        .then((response) => {
          this.categoriesData = response.data;
        });
    },
  },
};
</script>
