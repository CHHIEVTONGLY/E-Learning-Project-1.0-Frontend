<template>
  <div class="text-white flex flex-col md:flex-row px-4 md:px-20">
    <div class="md:basis-3/4">
      <h1
        class="text-title font-Roboto font-bold text-center md:text-left mb-4"
      >
        {{ courseData.title }}
      </h1>
      <iframe
        class="w-full h-64 md:h-96 mb-4"
        :src="URL"
        frameborder="0"
        allowfullscreen
      ></iframe>
      <h1 class="break-all mb-4">{{ URL }}</h1>
      <h1 class="text-xl font-semibold mb-2">Description</h1>
      <p class="mb-4">{{ courseData.description }}</p>
    </div>

    <div class="md:basis-1/4 mt-6 md:mt-0 md:ml-6">
      <div class="text-larger font-Roboto">
        <h1 class="font-bold text-yellow-400 mb-4">
          Course Video (Warning: Disclaimer)
        </h1>
        <div
          class="border border-gray-300 py-4 bg-white mb-4"
          v-for="x in courseData.video"
          :key="x._id"
        >
          <div class="cursor-pointer" @click="getVideoUrl(x.url)">
            <h1 class="ml-4 text-black">{{ x.title }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      courseData: [],
      token: sessionStorage.getItem("e-token"),
      URL: "",
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const courseID = this.$route.params.id;

        const response = await axios.get(
          process.env.VUE_APP_BASE_URL + `/course/${courseID}`,
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        );

        this.courseData = response.data;
      } catch (e) {
        console.error(e.message);
      }
    },
    async getVideoUrl(id) {
      this.URL = id;
    },
  },
};
</script>
