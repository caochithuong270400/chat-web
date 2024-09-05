<template>
  <v-app :theme="store.state.theme">
    <div>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </v-app>
</template>
<script>
import { defineComponent } from "@vue/composition-api";
import { storeToRefs } from "pinia";
import { useStore } from "~/store";
export default defineComponent({
  setup() {},
  data() {
    return {
      store: storeToRefs(useStore()),
      storeMethod: useStore(),
    };
  },
});
</script>

