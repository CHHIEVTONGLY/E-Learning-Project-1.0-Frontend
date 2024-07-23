<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-950">
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
      <div class="text-red-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <h2 class="text-2xl font-bold mb-2 text-white">Order Cancelled</h2>
      <p class="text-gray-400 mb-4">
        Your order has been successfully cancelled.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    setTimeout(() => {
      this.$router.push("/course/all");
    }, 3000);
  },
};
</script>

<style></style>
