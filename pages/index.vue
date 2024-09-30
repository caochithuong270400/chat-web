<template>
  <v-card>
    <v-card-title>
      <h1>WELCOME</h1>

      <v-progress-linear
        :value="0"
        :location="false"
        bg-color="#92aed9"
        color="transparent"
        height="12"
        rounded
      >
        <template v-slot:default="{ value, buffer }">
          <div class="multi-buffer">
            <div
              class="buffer red"
              :style="{ width: redBufferWidth + '%' }"
            ></div>
            <div
              class="buffer green"
              :style="{ width: greenBufferWidth + '%' }"
            ></div>
            <div
              class="buffer yellow"
              :style="{ width: yellowBufferWidth + '%' }"
            ></div>
            <div
              class="buffer purple"
              :style="{ width: purpleBufferWidth + '%' }"
            ></div>
          </div>
        </template>
      </v-progress-linear>
    </v-card-title>
    <v-card-actions>
      <v-btn @click="getData()"> GET DATA </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      redBufferWidth: 30, // Phần trăm chiều rộng của màu đỏ
      greenBufferWidth: 20, // Phần trăm chiều rộng của màu xanh
      yellowBufferWidth: 15, // Phần trăm chiều rộng của màu vàng
      purpleBufferWidth: 15, // Phần trăm chiều rộng của màu vàng
    };
  },
  methods: {
    async getData() {
      try {
        const { resultsBills } = await $fetch("/api/test/schedue-hasura", {
          method: "post",
          body: {
            user: "a",
          },
        });
        if (resultsBills) {
          console.log("resultsBills", resultsBills);
        }
      } catch (error) {
        console.log("lỗi:", error);
      }
    },
  },
};
</script>

<style scoped>
.multi-buffer {
  display: flex;
  height: 100%;
  width: 100%;
}

.buffer {
  height: 100%;
}

.buffer.red {
  background-color: red;
}

.buffer.green {
  background-color: green;
}

.buffer.yellow {
  background-color: yellow;
}
.buffer.purple {
  background-color: purple;
}
</style>