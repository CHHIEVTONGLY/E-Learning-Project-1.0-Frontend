<template>
  <div>
    <h1 class="text-white">Successfully pay</h1>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      courseID: localStorage.getItem("courseID"),
      token: localStorage.getItem("e-token"),
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
    localStorage.removeItem("courseID");
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
