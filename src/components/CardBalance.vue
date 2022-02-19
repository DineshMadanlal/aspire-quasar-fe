<template>
  <div class="card-balance-block">
    <div>
      <p class="card-balance-text">
        Account Balance
      </p>

      <div class="flex no-wrap items-center">
        <p class="currency-text">
          S$
        </p>

        <h4 class="amount-text">
          {{ mx$getAmount(12500) }}
        </h4>
      </div>
    </div>
    <q-space />
    <q-btn
      dense
      no-caps
      unelevated
      color="primary"
      class="new-card-btn"

      @click="$emit('addNewCard')"
    >
      <div class="flex no-wrap items-center">
        <img
          src="assets/icons/add-circle.svg"
          svg-inline
          class="no-outline add-circle-icon"
        />
        <p class="new-card-btn-text">
          New card
        </p>
      </div>
    </q-btn>
  </div>
</template>

<script>
// Mixins
import NumbersMixin from 'src/mixins/numbers.mixin';

export default {
  name: 'CardBalance',
  mixins: [NumbersMixin],
};
</script>

<style lang="scss" scoped>
.card-balance-block {
  width: 100%;
  display: flex;
  align-items: center;

  .card-balance-text {
    font-size: 14px;
    line-height: 16px;
    color: $text-color;
    margin-bottom: 16px;
  }

  .currency-text {
    border-radius: 4px;
    background: $positive;

    font-size: 13px;
    color: $white;
    line-height: 16px;
    font-weight: 700;

    padding: 2px 13px 4px 13px;
  }

  .amount-text {
    font-size: 26px;
    color: $text-color;
    margin-left: 12px;
    font-weight: 700;
    line-height: 32px;
  }

  .new-card-btn {
    min-width: 110px;
    @media (max-width: $breakpoint-xs-max) {
      min-width: unset;
    }
    .new-card-btn-text {
      color: $white;
      font-weight: 500;
      margin-left: 8px;
    }
  }
}
</style>
