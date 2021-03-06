<template>
  <q-layout view="LHh lpR lFf" class="app-layout">
    <!-- Header -->
    <q-header
      v-if="showAppheader"
      class="app-layout-header"
    >
      <q-toolbar class="app-header-toolbar">
        <!-- All teleport heaer -->
        <v-teleport-location
          name="appHeaderTeleport"
          tag="div"
          class="full-width"
        />
      </q-toolbar>
    </q-header>

    <!-- Drawer/Sidebar -->
    <q-drawer
      dark
      :width="340"
      show-if-above
      v-model="sidebarOpen"
      :breakpoint="930"

      side="left"
      class="app-layout-sidebar"
    >
      <router-link
        to="/cards"
        class="router-home-link"
      >
        <img
          src="assets/app-full-logo.svg"
          svg-inline
          class="no-outline"
        />
      </router-link>

      <p class="app-desc-text">
        Trusted way of banking for 3,000+ SMEs and startups in Singapore
      </p>

      <!-- routes grid -->
      <div class="app-routes-grid">
        <q-item
          v-for="(feature, index) in appRoutes"
          :key="`app-routes-${index}-${feature.label}`"

          class="flex items-center no-wrap app-project-route"
          :class="{ active: activeRoutePath === feature.route }"
          :to="feature.route"

          clickable
          v-ripple
        >
          <!-- Adding if else because we use svg-inline-loader
            and thus, we change the icon color based on if the route is
            active. We do this way to prevent storing multiple icons for
            active and normal state
          -->
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
    </q-drawer>

    <!-- Page Container/Content -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Footer -->
    <q-footer class="app-layout-footer">
      <q-toolbar class="app-footer-toolbar">
        <AppFooter
          :appRoutes="appRoutes"
          :activeRoutePath="activeRoutePath"
        />
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
// npm
import { vTeleportLocation } from '@desislavsd/vue-teleport';

export default {
  name: 'AppLayout',
  data() {
    return {
      sidebarOpen: false,
    };
  },
  components: {
    vTeleportLocation,
    AppFooter: () => import('components/AppFooter'),
  },
  computed: {
    activeRoutePath() {
      return this.$route.path;
    },
    showAppheader() {
      /** For now, the header is visible only for the cards page */
      return this.activeRoutePath === '/cards';
    },
    // ----- STATIC DATA BEGIN ----
    appRoutes() {
      return [
        {
          icon: 'home',
          label: 'Home',
          route: '/home',
        },
        {
          icon: 'card',
          label: 'Cards',
          route: '/cards',
        },
        {
          icon: 'payments',
          label: 'Payments',
          route: '/payments',
        },
        {
          icon: 'credit',
          label: 'Credit',
          route: '/credit',
        },
        {
          icon: 'settings',
          label: 'Settings',
          route: '/settings',
        },
      ];
    },
    // ----- STATIC DATA END -------
  },
};
</script>

<style lang="scss" scoped>
.app-layout {
  /** Header and footer visible only for mobile devices. */
  .app-layout-header, .app-layout-footer {
    display: none;
    @media (max-width: $breakpoint-xs-max) {
      display: flex;
    }
  }

  .app-layout-footer {
    display: none;
    @media only screen and (max-width: 930px) {
      display: flex;
      /** zindex is important here to show footer on the
      top of the page content */
      z-index: 2002;
    }
  }

  .app-layout-header {
    background: $dark;
    .app-header-toolbar {
      padding: 0px;
    }
  }

  .app-layout-footer {
    padding: 8px 24px;
    background: $white;
    box-shadow: 0px 0px 2px 1px rgba($color: $black, $alpha: 0.08)
  }
}
</style>

<style lang="scss">
/** The sidebar CSS should not be scoped for it to reflect in the browser */
.app-layout {
  .app-layout-sidebar {
    @media only screen and (max-width: 930px) {
      display: none;
    }
    .q-drawer--left {
      padding: 48px;

      .router-home-link {
        display: block;
        line-height: 0;
      }

      .app-desc-text {
        color: rgba($color: $white, $alpha: 0.3);
        font-size: 14px;
        line-height: 20px;
        margin-top: 19px;
      }

      .app-routes-grid {
        display: grid;
        grid-row-gap: 40px;
        margin-top: 61px;

        .app-project-route {
          border-radius: 4px;
          .feature-label-text {
            font-size: 16px;
            line-height: 32px;
            color: $white;
            margin-left: 16px;
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
    }
  }
}
</style>
