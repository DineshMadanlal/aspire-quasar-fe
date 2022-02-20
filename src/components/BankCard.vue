<template>
  <div class="full-width bank-card-block">
    <div class="full-width flex no-wrap">
      <q-space />
      <!-- Show card number -->
      <q-btn
        dense
        no-caps
        unelevated
        color="white"
        class="card-number-btn"

        v-ripple:positive
        @click="canShowCardNumber = !canShowCardNumber"
      >
        <div
          class="flex no-wrap items-center"
        >
          <q-icon
            :name="canShowCardNumber ? 'visibility_off' : 'visibility'"
            class="cursor-pointer action-btn-text"
          />
          <p class="action-btn-text q-ml-xs">
            {{ canShowCardNumber ? 'Hide card number' : 'Show card number' }}
          </p>
        </div>
      </q-btn>
    </div>
    <q-card
      class="bank-card"
      :class="{ 'card-freeze' : cardObject.isFreezed }"
    >
      <!-- aspire app logo -->
      <div class="flex no-wrap">
        <q-space />

        <img
          src="assets/app-full-logo.svg"
          svg-inline
          class="no-outline app-logo"
        />
      </div>

      <!-- Card Details -->
      <div class="card-details-block">
        <h4 class="card-name-text">
          {{ cardObject.name }}
        </h4>

        <!-- Show card numbers -->
        <div
          v-if="canShowCardNumber"
          class="card-number-grid"
        >
          <p
            v-for="(digits, index) in arrayOfCardDigits"
            :key="`card-digit-${digits}-${index}`"
            class="card-number-text"
          >
            {{ digits }}
          </p>
        </div>
        <!-- Show circle dots and last four digits -->
        <div
          v-else
          class="card-number-grid"
        >
          <!-- We show 4 white dots(3 times) if the card is hidden -->
          <div
            v-for="(n, index) in 3"
            :key="`circle-digit-${n}-${index}`"
            class="circle-dot-grid"
          >
            <p
              v-for="(dot, index) in 4"
              :key="`circle-dot-${dot}-${index}`"
              class="white-circle-dot"
            />
          </div>
          <!-- Last 4 digits -->
          <p
            class="card-number-text"
          >
            {{ lastFourDigits }}
          </p>
        </div>

        <!-- Card Validity -->
        <div class="card-validity-grid">
          <p class="card-validity-text">
            Thru: {{ cardExpiry }}
          </p>

          <p class="card-validity-text">
            CVV: ***
          </p>
        </div>
      </div>

      <!-- visa logo -->
      <div class="flex no-wrap">
        <q-space />

        <img
          src="assets/icons/visa.svg"
          svg-inline
          class="no-outline"
        />
      </div>
    </q-card>
  </div>
</template>

<script>
// moment
import moment from 'moment';

export default {
  name: 'BankCard',
  data() {
    return {
      canShowCardNumber: false,
    };
  },
  props: {
    cardObject: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  computed: {
    lastFourDigits() {
      return this.cardObject.last4;
    },
    arrayOfCardDigits() {
      /** Return array of length 4. Each element has 4 digits */
      return this.cardObject.number.match(/.{1,4}/g);
    },
    cardExpiry() {
      /** We reduce the year format from 4 digit to 2 digit here */
      return moment(`${this.cardObject.exp_month} ${this.cardObject.exp_year}`, 'MM YYYY').format('MM/YY');
    },
  },
};
</script>

<style lang="scss" scoped>
.bank-card-block {
  .card-number-btn {
    min-width: 130px;
    border-radius: 6px 6px 0px 0px;
  }
  .action-btn-text {
    font-size: 12px;
    color: $positive;
    line-height: 20px;
    font-weight: 700;
    @media (max-width: $breakpoint-xs-max) {
      font-weight: 500;
    }
  }
  .bank-card {
    width: 100%;
    padding: 27px;
    color: $white;
    border-radius: 12px;
    @media (max-width: $breakpoint-xs-max) {
      padding: 24px;
      border-radius: 12px 0px 12px 12px;
    }

    background: $positive;
    box-shadow: 12px 12px 12px 12px rgba($color: $black, $alpha: 0.08);

    &.card-freeze {
      background: $secondary;
    }

    .app-logo {
      path {
        fill: $white;
      }
    }

    .card-details-block {
      margin-top: 28px;
      margin-bottom: 4px;
      @media (max-width: $breakpoint-xs-max) {
        margin-top: 24px;
      }

      .card-name-text {
        font-size: 24px;
        font-weight: 700;
        line-height: 20px;
        letter-spacing: 0.8px;
        @media (max-width: $breakpoint-xs-max) {
          font-size: 22px;
          letter-spacing: 0.7px;
        }
      }

      .card-number-grid {
        display: grid;
        grid-column-gap: 24px;
        grid-template-columns: auto auto auto auto;
        margin-top: 32px;
        margin-bottom: 22px;
        align-items: center;
        justify-content: flex-start;
        @media (max-width: $breakpoint-xs-max) {
          font-size: 22px;
          letter-spacing: 0.7px;

          margin-top: 29px;
          margin-bottom: 19px;
        }

        .circle-dot-grid {
          display: grid;
          height: fit-content;
          grid-column-gap: 6px;
          grid-template-columns: auto auto auto auto;

          .white-circle-dot {
            min-width: 9px;
            max-width: 9px;
            height: 9px;
            border-radius: 100%;
            background: $white;
          }
        }

        .card-number-text {
          font-size: 14px;
          line-height: 19px;
          letter-spacing: 3.46px;
          font-weight: 700;
        }
      }

      .card-validity-grid {
        display: grid;
        align-items: center;
        justify-content: flex-start;
        grid-column-gap: 36px;
         grid-template-columns: auto auto;

        @media (max-width: $breakpoint-xs-max) {
          grid-column-gap: 30px;
        }

        .card-validity-text {
          font-size: 13px;
          line-height: 24px;
          letter-spacing: 0.31px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
