<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-950">
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
      <div class="text-green-400">
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
            d="M9 12l2 2l4-4m0 0l6-6m-6 6v12m-6-6H3m12 0h6"
          />
        </svg>
      </div>
      <h2 class="text-2xl font-bold mb-2 text-white">Payment Successful!</h2>
      <p class="text-gray-400 mb-4">
        Thank you for your payment. Your transaction has been completed.
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      courseID: sessionStorage.getItem("courseID"),
      token: sessionStorage.getItem("e-token"),
      user: [],
    };
  },
  async mounted() {
    setTimeout(() => {
      this.$router.push("/course/all");
    }, 3000);
    this.getUser();
  },
  unmounted() {
    sessionStorage.removeItem("courseID");
  },
  methods: {
    async getUser() {
      const response = await axios.get(
        process.env.VUE_APP_BASE_URL + "/user/me",
        {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        }
      );
      this.user = response.data;

      const userID = this.user._id;

      try {
        await axios.put(
          process.env.VUE_APP_BASE_URL +
            `/user/${userID}/purchase/${this.courseID}`
        );
        console.log("Course added:", response.data);
      } catch (e) {
        console.error("Course already purchased:", e);
        this.$router.push("/course/all");
      }
    },
  },
};
</script>

<style></style>
