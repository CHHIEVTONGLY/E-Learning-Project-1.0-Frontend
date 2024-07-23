<template>
  <div class="text-white">
    <h1>{{ user.username }}</h1>
    <h1>{{ user.email }}</h1>
    <h1>{{ user.purchasedCourse }}</h1>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      token: sessionStorage.getItem("e-token"),
      user: [],
    };
  },
  async mounted() {
    if (this.token) {
      try {
        const response = await axios.get(
          process.env.VUE_APP_BASE_URL + "/user/me",
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        );
        this.user = response.data;
      } catch (error) {
        console.error(error);
        // Handle specific error messages or redirect as needed
        if (error.response.status === 401 || error.response.status === 403) {
          // Unauthorized or forbidden, likely due to invalid token
          sessionStorage.removeItem("e-token");
          this.$router.push("/login");
        }
      }
    } else {
      // No token found, redirect to login
      this.$router.push("/login");
    }
  },
};
</script>
