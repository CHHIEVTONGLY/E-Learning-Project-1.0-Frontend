<template>
  <div class="text-white">
    <div v-html="formData"></div>
    <button @click="createOrder">Check out</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      formData: null,
    };
  },
  methods: {
    async createOrder() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}/aba/checkout`
        );
        this.formData = response.data;

        // Debugging lines
        console.log("Form data:", this.formData);

        // Wait until the form is rendered and then submit it
        this.$nextTick(() => {
          const form = document.querySelector("#aba_merchant_url");
          if (form) {
            form.submit();
          } else {
            console.error("Form element not found.");
          }
        });
      } catch (error) {
        console.error("Error creating order:", error);
        alert("Failed to create order. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
.text-white {
  color: white;
}
</style>
