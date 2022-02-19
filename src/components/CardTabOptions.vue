<template>
  <!-- Tabs -->
  <q-tabs
    v-model="tabInput"

    dense
    no-caps
    narrow-indicator

    align="left"
    indicator-color="secondary"

    class="custom-tabs"

    @input="onTabInput"
  >
    <q-tab
      :name="cardTabConstants.DEBIT_CARDS.name"
      :label="cardTabConstants.DEBIT_CARDS.label"
    />
    <q-tab
      :name="cardTabConstants.COMPANY_CARDS.name"
      :label="cardTabConstants.COMPANY_CARDS.label"
    />
  </q-tabs>
</template>

<script>
// constants
import { CARD_TAB_OPTOINS } from 'boot/constants';

export default {
  name: 'CardTabOptions',
  data() {
    return {
      tabInput: CARD_TAB_OPTOINS.DEBIT_CARDS.name,
    };
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    // ---- STATIC DATA BEGIN ----
    cardTabConstants() {
      return CARD_TAB_OPTOINS;
    },
    // ---- STATIC DATA END ----
  },
  mounted() {
    this.tabInput = this.value;
  },
  methods: {
    onTabInput() {
      this.$emit('input', this.tabInput);
    },
  },
};
</script>

<style lang="scss">
/** Should not be scoped for the css to be applied */
.custom-tabs {
  width: fit-content;
  .q-tabs__content {
    .q-tab {
      padding: 0px;
      width: fit-content;
      &:first-child {
        margin-right: 32px;
      }

      &.q-tab--active {
        .q-tab__label {
          font-size: 14px;
          line-height: 20px;
          color: $text-color;
          font-weight: 600;
        }
      }

      &.q-tab--inactive {
        .q-tab__label {
          font-size: 14px;
          line-height: 20px;
          color: rgba($color: $text-color, $alpha: 0.3);
        }
      }
    }
  }
}
</style>
