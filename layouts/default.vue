<template>
  <v-layout class="rounded rounded-md">
    <v-system-bar
      color="grey-darken-3"
      class="d-flex align-start justify-start"
    >
      <v-icon>mdi-cellphone-sound</v-icon>
      &nbsp;036.365.4126&emsp;
      <a
        href="https://web.facebook.com/chithuong.cao.16"
        style="color: white; text-decoration: none"
      >
        <v-icon>mdi-facebook</v-icon>
        &nbsp;https://web.facebook.com/chithuong.cao.16
      </a>
    </v-system-bar>

    <!-- nav 1 -->
    <v-navigation-drawer
      v-model="navidation_left_1"
      theme="dark"
      permanent
      rail
    >
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/75.jpg"
        nav
      ></v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <span v-for="(item, i) in n1s" :key="i">
          <v-list-item
            :prepend-icon="item.mdi"
            :value="item.hint"
            @click="
              navidation_left_2 = true;
              n1_id = item.id;
            "
          ></v-list-item>
        </span>
      </v-list>
    </v-navigation-drawer>

    <!-- nav 2 -->
    <v-navigation-drawer
      v-model="navidation_left_2"
      image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      theme="dark"
      permanent
    >
      <v-list-item nav>
        <template v-slot:append>
          <v-btn
            icon="mdi-chevron-left"
            variant="text"
            @click.stop="navidation_left_2 = !navidation_left_2"
          ></v-btn>
        </template>
      </v-list-item>
      <v-list nav>
        <span v-for="(item, i) in n2s" :key="i">
          <span v-if="item.n1_id === n1_id">
            <v-list-item
              v-if="!item.action"
              :prepend-icon="item.mdi"
              :title="item.text"
              :value="item.id"
            ></v-list-item>

            <v-switch
              v-if="item.action === 'theme'"
              v-model="store.state.theme"
              color="black"
              :label="`Switch: ${store.state.theme}`"
              false-value="light"
              true-value="dark"
              hide-details
            ></v-switch>
          </span>
        </span>
      </v-list>
    </v-navigation-drawer>

    <!-- head -->
    <v-app-bar color="primary" density="compact">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="lookNavigationLeft()"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Photos</v-app-bar-title>

      <template v-slot:append>
        <v-btn
          icon="mdi-apps"
          @click="navidation_right = !navidation_right"
        ></v-btn>
      </template>
    </v-app-bar>

    <!-- nav right -->
    <v-navigation-drawer
      v-model="navidation_right"
      color="grey-lighten-1"
      location="right"
      width="150"
      image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      theme="dark"
      permanent
    ></v-navigation-drawer>

    <!-- foot -->
    <v-app-bar height="48" location="bottom" flat></v-app-bar>

    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 100vh"
    >
      <v-parallax
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
        height="100vh"
      >
        <div
          class="d-flex flex-column fill-height justify-center align-center text-white"
        >
          <slot />
        </div>
      </v-parallax>
    </v-main>
  </v-layout>
</template>

<script>
import { storeToRefs } from "pinia";
import { useStore } from "~/store";
export default {
  data() {
    return {
      store: storeToRefs(useStore()),
      storeMethod: useStore(),

      navidation_right: false,
      navidation_left_1: true,
      navidation_left_2: false,
      n1s: [
        {
          id: 1,
          mdi: "mdi-forum",
          hint: "contact",
        },
        {
          id: 2,
          mdi: "mdi-view-dashboard",
          hint: "setting",
        },
      ],
      n1_id: 1,
      n2s: [
        {
          id: 1,
          n1_id: 1,
          mdi: "mdi-email",
          text: "Inbox",
        },
        {
          id: 2,
          n1_id: 1,
          mdi: "mdi-account-supervisor-circle",
          text: "Inbox",
        },
        {
          id: 3,
          n1_id: 2,
          mdi: "mdi-clock-start",
          text: "Inbox",
        },
        {
          id: 4,
          n1_id: 2,
          mdi: "",
          text: "Theme",
          action: "theme",
        },
      ],
    };
  },
  methods: {
    lookNavigationLeft() {
      this.navidation_left_1 = !this.navidation_left_1;
      if (this.navidation_left_1 === false) {
        this.navidation_left_2 = false;
      }
    },
  },
};
</script>

<style>
</style>