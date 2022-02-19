<template>
  <q-page class="cards-page">
    <div class="cards-page-container">
      <div class="cards-header-wrapper">
        <!-- Card Balance -->
        <CardBalance />

        <CardTabOptions
          v-model="tabInput"
          class="card-tab-options"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
// constants
import { CARD_TAB_OPTOINS } from 'boot/constants';

export default {
  name: 'CardsPage',
  data() {
    return {
      tabInput: CARD_TAB_OPTOINS.DEBIT_CARDS.name,
    };
  },
  components: {
    // BankCard: () => import('components/BankCard'),
    CardBalance: () => import('components/CardBalance'),
    CardTabOptions: () => import('components/CardTabOptions'),
  },
};
</script>

<style lang="scss" scoped>
.cards-page {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 60px;
  @media (max-width: $breakpoint-xs-max) {
    padding: 0px;
  }

  .cards-page-container {
    width: 100%;
    max-width: 905px;
    .cards-header-wrapper {
      @media (max-width: $breakpoint-xs-max) {
        display: none;
      }

      .card-tab-options {
        margin-top: 34px;
        margin-bottom: 16px;
      }
    }
  }
}
</style>
