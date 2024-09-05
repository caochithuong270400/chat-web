<template>
  <div>
    <input v-model="message" placeholder="Type a message" />
    <button @click="sendMessage">Send Message</button>
    <v-list style="background-color: #ffffff00">
      <v-list-item v-for="(item, i) in chat" :key="i">
        <v-row v-if="item.user === store.data.user.name">
          <v-col> {{ store.data.user.name }}: {{ item.message }} </v-col>
        </v-row>
        <v-row v-else style="text-align: right">
          <v-col> {{ item.message }} :{{ item.user }}</v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "~/store/index.ts";
import { storeToRefs } from "pinia";

const message = ref("");
const reply = ref("");
const chat = ref([]);
const store = ref(storeToRefs(useStore()));
const storeMethods = ref(useStore());
const router = ref(useRouter());

const { $socket } = useNuxtApp();

const sendMessage = () => {
  console.log("store.value", store.value.data.user.name);
  if (message.value) {
    $socket.emit("message", {
      message: message.value,
      user: store.value.data.user.name,
    });
    message.value = null;
  }
};

onMounted(() => {
  if (store?.value?.data?.user?.name) {
    $socket.on("reply", (data) => {
      reply.value = data;
      if (data) {
        console.log(data.user);
        console.log("user val2", store.value.data.user.name);

        chat.value.push(data);
      }
    });
  } else {
    router.value.push("/login");
  }
});
</script>
