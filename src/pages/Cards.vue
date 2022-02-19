<template>
  <q-page class="cards-page">
    <div class="cards-page-container">
      <!-- The header wrapper is hidden in mobile -->
      <div class="cards-header-wrapper">
        <!-- Card Balance -->
        <CardBalance
          :activeCardDetails="activeCardDetails"
        />

        <CardTabOptions
          v-model="tabInput"
          class="card-tab-options"
        />
      </div>

      <!-- card content wrapper -> hidden in mobile -->
      <q-card class="card-content">
        <div class="card-left-grid">
          <CardsCarousel
            v-model="activeCardIndex"

            :allCards="filteredCards"
          />
        </div>

        <div class="card-right-grid">

        </div>
      </q-card>
    </div>

    <!-- Header teleport to the app layout -->
    <v-teleport
      to="appHeaderTeleport"
      v-if="$q.screen.lt.sm"
    >
      <div class="card-header-for-mobile">
        <!-- Card Balance -->
        <CardBalance
          :activeCardDetails="activeCardDetails"
        />

        <CardTabOptions
          v-model="tabInput"
        />

        <CardsCarousel
          v-model="activeCardIndex"

          :allCards="filteredCards"
        />
      </div>
    </v-teleport>
  </q-page>
</template>

<script>
// vuex
import { mapGetters } from 'vuex';

// npm
import { vTeleport } from '@desislavsd/vue-teleport';

// constants
import { CARD_TAB_OPTOINS, CARD_TYPES } from 'boot/constants';

export default {
  name: 'CardsPage',
  data() {
    return {
      activeCardIndex: 0,

      tabInput: CARD_TAB_OPTOINS.DEBIT_CARDS.name,
    };
  },
  components: {
    vTeleport,
    CardBalance: () => import('components/CardBalance'),
    CardTabOptions: () => import('components/CardTabOptions'),
    CardsCarousel: () => import('components/CardsCarousel'),
  },
  computed: {
    ...mapGetters({
      allCards: 'applicant/allCards',
      recentTransactions: 'applicant/recentTransactions',
    }),
    filteredCards() {
      /** We filter the cards here. If debit cards tab, we render only
       * the debit cards. Else, we render all the cards.
       */
      if (this.tabInput === CARD_TAB_OPTOINS.DEBIT_CARDS.name) {
        return this.allCards.filter((card) => card.type === CARD_TYPES.DEBIT);
      }
      return this.allCards;
    },
    activeCardDetails() {
      return this.filteredCards[this.activeCardIndex] || {};
    },
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
      .card-tab-options {
        margin-top: 34px;
        margin-bottom: 16px;
      }
    }

    .card-content {
      display: grid;
      padding: 32px 40px;
      border-radius: 8px;
      border-radius: rgba(252, 252, 252, 1);
      box-shadow: 8px 8px 8px 8px rgba($color: $black, $alpha: 0.08);

      @media (min-width: $breakpoint-md-min) {
        grid-template-columns: 414px 366px;
      }

      .card-left-grid {
        display: grid;
        grid-row-gap: 32px;
      }

      .card-right-grid {
        display: grid;
        grid-row-gap: 24px;
      }
    }

    .card-content, .cards-header-wrapper {
      @media (max-width: $breakpoint-xs-max) {
        display: none;
      }
    }
  }
}
</style>

<style lang="scss">
.cards-page {
  @media (max-width: $breakpoint-xs-max) {
    background: $dark;
  }
  .cards-page-container {
    .card-content {
      .bank-card-block {
        .bank-card {
          box-shadow: unset;
        }
      }
    }
  }
}

/** We're teleporting the header. Thus, it has no parent element. */
.card-header-for-mobile {
  width: 100%;
  padding: 32px 24px;
  background: $dark;
  .card-balance-block {
    .card-balance-text {
      font-weight: 600;
    }
    .amount-text, .card-balance-text {
      /** SORRY, we need to add important here to update the
      CSS of the parent component */
      color: $white !important;
    }
    .new-card-btn {
      /** SORRY, we need to add important here to update the
      CSS of the parent component */
      background: $dark !important;
      .add-circle-icon {
        path {
          fill: $secondary;
        }
      }
      .new-card-btn-text {
        /** SORRY, we need to add important here to update the
          CSS of the parent component */
        color: $secondary !important;
        font-weight: 600;
      }
    }
  }

  .custom-tabs {
    margin-top: 16px;
    margin-bottom: 24px;
    .q-tabs__content {
      .q-tab {
        &.q-tab--active {
          .q-tab__label {
            color: $white;
          }
        }

        &.q-tab--inactive {
          .q-tab__label {
            color: rgba($color: $white, $alpha: 0.5);
          }
        }
      }
    }
  }
}
</style>
