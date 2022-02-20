<template>
  <q-page class="cards-page">
    <!-- add card modal -->
    <q-dialog v-model="showAddCardModal">
      <AddCardModal
        @addCard="addNewCard"
      />
    </q-dialog>
    <div class="cards-page-container">
      <!-- The header wrapper is hidden in mobile -->
      <div class="cards-header-wrapper">
        <!-- Card Balance -->
        <CardBalance
          :activeCardDetails="activeCardDetails"

          @addNewCard="showAddCardModal = true"
        />

        <CardTabOptions
          v-model="tabInput"
          class="card-tab-options"

          @input="onTabInput"
        />
      </div>

      <!-- card content wrapper -> hidden in mobile -->
      <q-card
        class="card-content"

        v-if="activeCardDetails.id"
      >
        <div class="card-left-grid">
          <CardsCarousel
            v-model="activeCardIndex"

            :allCards="filteredCards"
          />

          <BankCardActions
            :isCardFreezed="activeCardDetails.isFreezed"

            @freeze="onFreezeCard"
            @cancel="onCancelCard"
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

          @addNewCard="showAddCardModal = true"
        />

        <CardTabOptions
          v-model="tabInput"

          @input="onTabInput"
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

// Lodash
import findIndex from 'lodash/findIndex';
import cloneDeep from 'lodash/cloneDeep';

// npm
import { vTeleport } from '@desislavsd/vue-teleport';

// constants
import { CARD_TAB_OPTOINS, CARD_TYPES } from 'boot/constants';

export default {
  name: 'CardsPage',
  data() {
    return {
      /** To view the active card details */
      activeCardIndex: 0,
      /** boolean to show add card modal */
      showAddCardModal: false,
      /** We store tabInput to filter debit cards or all company cards */
      tabInput: CARD_TAB_OPTOINS.DEBIT_CARDS.name,
    };
  },
  components: {
    vTeleport,
    CardBalance: () => import('components/CardBalance'),
    CardTabOptions: () => import('components/CardTabOptions'),
    CardsCarousel: () => import('components/CardsCarousel'),
    BankCardActions: () => import('components/BankCardActions'),
    AddCardModal: () => import('components/Modals/AddCard'),
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
  methods: {
    onTabInput() {
      this.activeCardIndex = 0;
    },
    updateAllCardsStore(allCards) {
      // update the store
      this.$store.commit('applicant/setField', {
        field: 'allCards',
        value: allCards,
      });
    },
    addNewCard(newCardDetails) {
      /** We clone it to prevent the vuex store mutating directly not from store */
      const clonedAllCards = cloneDeep(this.allCards);
      clonedAllCards.push(newCardDetails);
      // update the store
      this.updateAllCardsStore(clonedAllCards);

      // close the modal
      this.showAddCardModal = false;

      // successs toaster
      this.$q.notify({
        position: 'top-right',
        type: 'positive',
        message: 'Added successfully',
      });

      /** The latest card added should be the active card */
      this.activeCardIndex = this.filteredCards.length - 1;
    },
    onFreezeCard() {
      const arrayIndex = findIndex(this.allCards, (data) => data.id === this.activeCardDetails.id);
      /** We clone it to prevent the vuex store mutating directly not from store */
      const clonedAllCards = cloneDeep(this.allCards);
      /** We find index because we filter the cards by their type and thus
       * the index changes
       */
      clonedAllCards[arrayIndex].isFreezed = !clonedAllCards[arrayIndex].isFreezed;
      // update the store
      this.updateAllCardsStore(clonedAllCards);
    },
    onCancelCard() {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure to cancel the card? This cannot be undone.',
        cancel: true,
      }).onOk(() => {
        const arrayIndex = findIndex(
          this.allCards, (data) => data.id === this.activeCardDetails.id,
        );
        /** We clone it to prevent the vuex store mutating directly not from store */
        const clonedAllCards = cloneDeep(this.allCards);
        // remove the card
        clonedAllCards.splice(arrayIndex, 1);
        /** reset the active card index to the next card index */
        this.activeCardIndex = this.activeCardIndex
          ? this.activeCardIndex - 1 : 0;
        // update the store
        this.updateAllCardsStore(clonedAllCards);
      });
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
