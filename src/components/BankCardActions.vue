<template>
  <q-card flat class="bank-card-actions">
    <q-item
      v-for="(feature, index) in cardActions"
      :key="`app-card-actions-${index}-${feature.label}`"

      class="card-action-item"

      clickable
      v-ripple

      @click="$emit(feature.emitAction)"
    >
      <!-- home icon -->
      <img
        v-if="feature.icon === 'freeze'"
        src="assets/icons/freeze.svg"
        svg-inline
        class="no-outline card-action-icon"
      />
      <!-- card icon -->
      <img
        v-if="feature.icon === 'speed'"
        src="assets/icons/speed.svg"
        svg-inline
        class="no-outline card-action-icon"
      />
      <!-- credit icon -->
      <img
        v-if="feature.icon === 'gpay'"
        src="assets/icons/gpay.svg"
        svg-inline
        class="no-outline card-action-icon"
      />
      <!-- payments icon -->
      <img
        v-if="feature.icon === 'replace'"
        src="assets/icons/replace.svg"
        svg-inline
        class="no-outline card-action-icon"
      />
      <!-- settings icon -->
      <img
        v-if="feature.icon === 'cancel'"
        src="assets/icons/cancel.svg"
        svg-inline
        alt="settings"
        class="no-outline card-action-icon"
      />
      <!-- Route label -->
      <p
        class="card-label-text"
        :style="{ maxWidth: feature.maxWidth || '40px' }"
      >
        {{ feature.label }}
      </p>
    </q-item>
  </q-card>
</template>

<script>
export default {
  name: 'BankCardActions',
  props: {
    isCardFreezed: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // ---- STATIC DATA BEGIN ----
    cardActions() {
      return [
        {
          icon: 'freeze',
          label: this.isCardFreezed ? 'Unfreeze card' : 'Freeze card',
          emitAction: 'freeze',
          maxWidth: this.isCardFreezed ? '50px' : '40px',
        },
        {
          icon: 'speed',
          label: 'Set spend limit',
          emitAction: 'setSpendLimit',
          maxWidth: '60px',
        },
        {
          icon: 'gpay',
          label: 'Add to GPay',
          emitAction: 'addToGPay',
        },
        {
          icon: 'replace',
          label: 'Replace card',
          emitAction: 'replace',
        },
        {
          icon: 'cancel',
          label: 'Cancel card',
          emitAction: 'cancel',
        },
      ];
    },
    // ---- STATIC DATA END ------
  },
};
</script>

<style lang="scss" scoped>
.bank-card-actions {
  width: 100%;
  border-radius: 16px;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-column-gap: 14px;
  background-color: #EDF3FF;
  padding: 20px;

  .card-action-item {
    padding: 8px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .card-label-text {
      font-size: 13px;
      line-height: 14px;
      color: $dark;
      margin-top: 7px;
      text-align: center;
    }
  }
}
</style>
