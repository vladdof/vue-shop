<template>
  <ul class="colors colors--black">
    <li
      v-for="color in $options.colorsArr"
      :key="color"
      class="colors__item"
    >
      <label class="colors__label">
        <input
          class="colors__radio sr-only"
          type="radio"
          :value="color"
        >
        <span
          class="colors__value"
          :style="`background-color: ${color};`">
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
import colors from '../../data/colors';

export default {
  name: 'colors-list',
  props: ['color'],
  colorsArr: colors,
};
</script>
