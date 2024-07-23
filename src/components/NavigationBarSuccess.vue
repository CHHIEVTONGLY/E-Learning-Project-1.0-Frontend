<template>
  <div class="bg-gray-950 text-white text-larger font-Helvetica">
    <div class="flex justify-end gap-10 mr-4">
      <div class="flex justify-start">
        <button @click="goCourse" class="text-larger mt-4">Course</button>
      </div>
      <div>
        <button @click="goProfile" class="text-larger mt-4">
          <div
          v-if="!user.picture"
            class="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
          >
            <svg
              class="absolute w-8 h-8 text-gray-400 -left-1"
              fill="currentColor"
              viewBox="0 0 15 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <img
            v-if="user.picture"
            class="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
            :src="user.picture"
            alt=""
          />
        </button>
      </div>

      <button
        @click="logout"
        class="bg-gradient-to-r from-cyan-500 to-purple-500 px-2 mt-4 rounded-lg"
      >
        Log out
      </button>
    </div>
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

  methods: {
    logout() {
      sessionStorage.removeItem("e-token");
      this.$router.push("/");
    },
    goProfile() {
      this.$router.push("/course/profile");
    },
    goCourse() {
      this.$router.push("/course/all");
    },
  },
};
</script>
