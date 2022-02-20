<template>
  <q-card class="add-card-modal">
    <!-- header -->
    <div class="flex no-wrap items-center add-card-modal-header">
      <h4 class="card-header-text">
        Add Card
      </h4>

      <q-space />

      <!-- close icon -->
      <q-icon name="close" class="close-icon" color="dark" v-close-popup />
    </div>

    <!-- content -->
    <div class="add-card-modal-content">
      <q-form
        @submit.stop="onSubmit"
      >
        <!-- Input -->
        <q-input
          ref="cardName"
          name="cardName"
          outlined
          autofocus
          hide-bottom-space
          v-model="cardName"
          label="Card name"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Card name is missing']"
        />

        <q-btn
          dense
          no-caps
          unelevated

          label="Add"
          class="full-width q-mt-lg"
          color="primary"

          type="submit"
        />
      </q-form>
    </div>
  </q-card>
</template>

<script>
// npm
import { v4 as uuidv4 } from 'uuid';

// constants
import { CARD_TYPES } from 'boot/constants';

// helpers
import { randomFixedInteger, randomMonth, randomYear } from 'boot/helpers';

export default {
  name: 'AddCardModal',
  data() {
    return {
      cardName: '',
    };
  },
  methods: {
    onSubmit() {
      const last4 = randomFixedInteger(4);
      const newCardDetails = {
        id: uuidv4(),
        number: `${randomFixedInteger(12)}${last4}`,
        last4,
        exp_year: randomYear(),
        exp_month: randomMonth(),
        name: this.cardName,
        isFreezed: false,
        currency: 'S$',
        accountBalance: randomFixedInteger(5),
        type: CARD_TYPES.DEBIT,
      };

      this.$emit('addCard', newCardDetails);
    },
  },
};
</script>

<style lang="scss" scoped>
.add-card-modal {
  width: 100%;
  max-width: 380px;
  background: $white;
  box-shadow: 0px 9px 18px rgba(30, 41, 59, 0.15);
  border-radius: 10px;
  // header
  .add-card-modal-header {
    padding: 16px 20px;
    .card-header-text {
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      color: $text-color;
    }
    .close-icon {
      font-size: 18px;
      cursor: pointer;
      transition: all 250ms ease-in;
      z-index: 2;

      &:hover {
        transform: rotate(90deg) scale(1.5);
      }
    }
  }
  // content
  .add-card-modal-content {
    padding: 16px 20px;
  }
}
</style>
