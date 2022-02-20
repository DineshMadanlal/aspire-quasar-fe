<template>
  <q-expansion-item
    v-model="expanded"
    class="recent-transactions-expansion"
    header-class="recent-transactions-expanded-header"
  >
    <!-- Expansion Panel Header Slot -->
    <template v-slot:header>
      <div class="flex no-wrap items-center full-width">
        <img
          src="assets/icons/transaction.svg"
          svg-inline
          class="no-outline"
        />
        <p class="recent-transactions-text">
          Recent Transactions
        </p>
        <q-space />
        <!-- down arrow -->
        <div
          class="down-arrow-block"
          :class="{ expanded: expanded }"
        >
          <img
            src="assets/icons/down-arrow.svg"
            svg-inline
            class="no-outline"
          />
        </div>
      </div>
    </template>
    <!--  -->
    <q-card flat class="bg-white expanded-card">
      <div class="transaction-item-grid">
        <q-item
          v-for="(data, index) in allTransactions"
          :key="`transaction-${data.transactionId}-${index}`"

          class="transaction-item"
        >
          <div
            v-if="transactionIconConstant[data.category]"
            class="category-circle"
            :style="{ backgroundColor: transactionIconConstant[data.category].bgColor }"
          >
            <img
              :src="require(`../assets/icons/${transactionIconConstant[data.category].icon}.svg`)"
              alt="category-icon"
              class="no-outline category-icon"
            >
          </div>

          <!-- transaction data -->
          <div class="transaction-data">
            <!-- name -->
            <p class="transaction-name-text">
              {{ data.transactionTo }}
            </p>
            <!-- date -->
            <p class="transaction-date-text">
              {{ momentDateFormat(data.date) }}
            </p>

            <div class="flex no-wrap items-center">
              <!-- icon -->
              <div class="bnf-icon-block">
                 <img
                  src="assets/icons/business-and-finance.svg"
                  svg-inline
                  class="no-outline"
                />
              </div>

              <!-- description -->
              <p class="transaction-desc-text">
                {{ data.transactionDescription }}
              </p>
            </div>
          </div>

          <q-space />

          <p
            :class="['transaction-amount-text', { 'text-positive': data.isCredit }]"
          >
            {{ data.isCredit ? '+' : '-' }}{{ data.currency }}{{ data.amount }}
          </p>
        </q-item>
      </div>
       <!-- Show/Hide transaction -->
      <q-btn
        flat
        no-caps
        unelevated

        color="positive"
        class="transaction-btn"
        @click="onTransactionBtnClick"
      >
        <p>
          {{ showAllCardTransactions
            ? 'View less transactions'
            : 'View all card transactions'
          }}
        </p>
      </q-btn>
    </q-card>
  </q-expansion-item>
</template>

<script>
// moment
import moment from 'moment';

// constants
import { MAX_CARD_TRANSACTIONS_LIST, TRANSACTION_ICONS } from 'boot/constants';

export default {
  name: 'RecentTransactions',
  data() {
    return {
      expanded: true,
      showAllCardTransactions: false,
    };
  },
  props: {
    recentTransactions: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    allTransactions() {
      if (this.showAllCardTransactions) {
        return this.recentTransactions;
      }
      /** Show only top 4 */
      return this.recentTransactions.slice(0, MAX_CARD_TRANSACTIONS_LIST);
    },
    transactionIconConstant() {
      return TRANSACTION_ICONS;
    },
    momentDateFormat() {
      return (date) => moment(date).format('DD MMM YYYY');
    },
  },
  methods: {
    onTransactionBtnClick() {
      this.showAllCardTransactions = !this.showAllCardTransactions;

      /** next tick is required here for smooth scrolling to the bottom */
      this.$nextTick(() => {
        if (this.showAllCardTransactions) {
        /** scroll down to the bottom of the page */
          window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.recent-transactions-expansion {
  border-radius: 8px;
  height: fit-content;
  background-color: rgb(245, 249, 255);
  // header
  .recent-transactions-expanded-header {
    padding: 24px;
    border-radius: 8px;
    border: 1px solid #f5f5f5;
    border-bottom: 0px;
    box-shadow: 8px 8px 8px 8px rgba($color: $black, $alpha: 0.04);
    .recent-transactions-text {
      margin-left: 14px;
      font-size: 14px;
      line-height: 18px;
      color: $dark;
    }
    .down-arrow-block {
      line-height: 0;
      transition: 150ms ease-in;
      &.expanded {
        transform: rotate(180deg);
      }
    }
  }
  .expanded-card {
    width: 100%;
    transition: all 300ms ease-in-out;
    .transaction-btn {
      width: 100%;
      border: 1px solid #DDFFEC;
      border-radius: 0px 0px 8px 8px;
      background: #EDFFF5;
    }
    .transaction-item-grid {
      padding: 8px 24px;
      border: 1px solid #f5f5f5;
      .transaction-item {
        display: flex;
        align-items: flex-start;
        padding: 16px 0px;
        border-bottom: 1px solid #f5f5f5;
        &:last-child {
          border-bottom: none;
        }

        .category-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          height: 48px;
          min-width: 48px;
          max-width: 48px;
          border-radius: 100%;
          .category-icon {
            width: 16px;
            height: 16px;
          }
        }

        .transaction-data {
          margin: 0px 12px;
          .transaction-name-text {
            font-size: 14px;
            line-height: 18px;
            color: $text-color;
            font-weight: 600;
          }
          .transaction-date-text {
            font-size: 13px;
            line-height: 18px;
            color: #aaaaaa;
            margin-bottom: 12px;
            margin-top: 4px;
          }
          .bnf-icon-block {
            height: 20px;
            min-width: 24px;
            max-width: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background: $primary;
            border-radius: 12px;
          }
          .transaction-desc-text {
            font-size: 12px;
            line-height: 18px;
            color: $primary;
            font-weight: 600;
            margin-left: 8px;
          }
        }
        .transaction-amount-text {
          font-size: 14px;
          line-height: 18px;
          font-weight: 700;
          color: $text-color;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.recent-transactions-expansion {
  .recent-transactions-expanded-header {
    .q-item__section--side {
      display: none;
    }
  }
}
</style>
