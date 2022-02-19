<template>
  <q-carousel
    v-model="slide"

    swipeable
    animated
    navigation

    height="360px"
    ref="carousel"
    class="cards-carousel"
    navigation-position="bottom"
    transition-prev="slide-right"
    transition-next="slide-left"

    @input="onCarouselInput"
  >
    <!-- navigation control template -->
    <template
      v-slot:navigation-icon="{ active, onClick }"
    >
      <q-btn
        v-if="active"

        dense
        no-caps
        unelevated
        color="positive"
        @click="onClick"
        class="active-navigation"
      />
      <!-- Inactive navigation -->
      <q-btn
        v-else

        flat
        dense
        round
        no-caps
        unelevated

        color="positive"
        @click="onClick"
        class="inactive-navigation"
      />
    </template>
    <q-carousel-slide
      v-for="(data, index) in allCards"
      :key="`card-details-${data.id}-${index}`"

      :name="index + 1"
      class="testimonial-carousel-slide"
    >
      <BankCard
        :cardObject="data"
      />
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
export default {
  name: 'CardsCarousel',
  data() {
    return {
      slide: 1,
    };
  },
  components: {
    BankCard: () => import('components/BankCard'),
  },
  props: {
    allCards: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Number,
      default: null,
    },
  },
  methods: {
    onCarouselInput() {
      /** Here, we update the parent component of which
       * index is active in the carousel
       */
      this.$emit('input', this.slide - 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.cards-carousel {
  width: 100%;
  .active-navigation {
    min-width: 16px;
    max-width: 16px;
    min-height: 8px;
    max-height: 8px;
    border-radius: 8px;
  }
  .inactive-navigation {
    min-width: 8px;
    max-width: 8px;
    min-height: 8px;
    max-height: 8px;
    background: rgba($color: $positive, $alpha: 0.2);
  }
}
</style>
