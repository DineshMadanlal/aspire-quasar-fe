<template>
  <div class="app-footer-routes">
    <q-item
      v-for="(feature, index) in appRoutes"
      :key="`app-footer-routes-${index}-${feature.label}`"

      class="app-footer-route"
      :class="{ active: activeRoutePath === feature.route }"
      :to="feature.route"

      clickable
      v-ripple
    >
      <!-- home icon -->
      <img
        v-if="feature.icon === 'home'"
        src="assets/icons/home.svg"
        svg-inline
        class="no-outline feature-icon"
      />
      <!-- card icon -->
      <img
        v-if="feature.icon === 'card'"
        src="assets/icons/card.svg"
        svg-inline
        class="no-outline feature-icon"
      />
      <!-- credit icon -->
      <img
        v-if="feature.icon === 'credit'"
        src="assets/icons/credit.svg"
        svg-inline
        class="no-outline feature-icon"
      />
      <!-- payments icon -->
      <img
        v-if="feature.icon === 'payments'"
        src="assets/icons/payments.svg"
        svg-inline
        class="no-outline feature-icon"
      />
      <!-- settings icon -->
      <img
        v-if="feature.icon === 'settings'"
        src="assets/icons/settings.svg"
        svg-inline
        alt="settings"
        class="no-outline feature-icon"
      />
      <!-- Route label -->
      <p class="feature-label-text">
        {{ feature.label }}
      </p>
    </q-item>
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
  props: {
    appRoutes: {
      type: Array,
      default: () => [],
    },
    activeRoutePath: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.app-footer-routes {
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  justify-content: space-between;
  grid-column-gap: 12px;
  .app-footer-route {
    padding: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .feature-icon {
      path {
        fill: #dddddd;
      }
    }
    .feature-label-text {
      font-size: 9px;
      line-height: 13px;
      color: #DDDDDD;
      margin-top: 4px;
    }

    &.active {
      .feature-icon {
        path {
          fill: $positive;
        }
      }
      .feature-label-text {
        color: $positive;
        font-weight: 700;
      }
    }
  }
}
</style>
