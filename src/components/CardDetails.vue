<template>
  <q-expansion-item
    v-model="expanded"
    class="card-details-expansion"
    header-class="card-details-expanded-header"
  >
    <!-- Expansion Panel Header Slot -->
    <template v-slot:header>
      <div class="flex no-wrap items-center full-width">
        <img
          src="assets/icons/card-details.svg"
          svg-inline
          class="no-outline"
        />
        <p class="card-details-text">
          Card Details
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
  </q-expansion-item>
</template>

<script>
export default {
  name: 'CardDetails',
  data() {
    return {
      expanded: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.card-details-expansion {
  border-radius: 8px;
  height: fit-content;
  background-color: rgb(245, 249, 255);
  .card-details-expanded-header {
    padding: 24px;
    border-radius: 8px;
    border: 1px solid #f5f5f5;
    box-shadow: 8px 8px 8px 8px rgba($color: $black, $alpha: 0.04);
    .card-details-text {
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
}
</style>

<style lang="scss">
.card-details-expansion {
  .card-details-expanded-header {
    .q-item__section--side {
      display: none;
    }
  }
}
</style>
