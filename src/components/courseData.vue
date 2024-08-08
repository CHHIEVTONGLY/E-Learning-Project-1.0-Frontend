<template>
  <div
    class="text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
  >
    <div
      v-for="x in courseData"
      :key="x._id"
      class="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:translate-y-1 transform transition-transform duration-200"
    >
      <img
        class="w-full h-64 object-cover"
        src="https://thevarsity.ca/wp-content/uploads/2018/07/Comment_Course-Selection_Troy-Lawrence-scaled.jpg"
        alt="Course Image"
      />
      <div class="p-4" @click="getCourseData">
        <h2 class="text-xl font-bold mb-2">{{ x.title }}</h2>
        <p class="text-gray-400">{{ x.description }}</p>
        <strong class="block mt-2">{{ x.price }} $</strong>
        <button
          v-if="coursePurchase[x._id]"
          @click="viewingCourse(x._id)"
          class="mt-4 inline-block px-6 py-2 border border-indigo-600 text-indigo-600 font-medium text-sm leading-tight uppercase rounded hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        >
          Learn now
        </button>
        <div v-else>
          <button
            @click="CreateABAPayment(x)"
            class="mt-4 inline-block px-6 py-2 border border-indigo-600 text-indigo-600 font-medium text-sm leading-tight uppercase rounded hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            Buy via ABA Bank
          </button>

          <button
            @click="createOrder(x._id, x.title, x.description, x.price)"
            class="mt-4 inline-block px-6 py-2 border border-indigo-600 text-indigo-600 font-medium text-sm leading-tight uppercase rounded hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            Buy via PayPal
          </button>
        </div>

        <div v-html="formData"></div>
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
      user: [],
      coursePurchase: {},
      item: null,
      formData: null,
    };
  },
  mounted() {
    this.getCourseData();
    this.checkingCourse();
  },
  methods: {
    async getCourseData() {
      try {
        const response = await axios.get(
          process.env.VUE_APP_BASE_URL + "/course/all"
        );
        this.courseData = response.data;
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    },
    async createOrder(id, itemname, itemdes, itemprice) {
      try {
        const response = await axios.post(
          process.env.VUE_APP_BASE_URL + "/paypal/create-order",
          {
            itemName: itemname,
            itemDescription: itemdes,
            itemPrice: itemprice,
          }
        );
        sessionStorage.setItem("courseID", id);
        window.location.href = response.data.approveUrl;
      } catch (error) {
        console.error("Error creating order:", error);
      }
    },
    async checkingCourse() {
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

        const userCourseIds = this.user.purchasedCourses.map((course) =>
          course.toString()
        );

        // Initialize coursePurchase object
        this.courseData.forEach((course) => {
          if (userCourseIds.includes(course._id)) {
            // Set course as purchased
            this.coursePurchase[course._id] = true;
          } else {
            // Set course as not purchased
            this.coursePurchase[course._id] = false;
          }
        });
      } catch (e) {
        console.error("Error fetching user data:", e);
      }
    },
    async viewingCourse(id) {
      this.$router.push({
        name: "courseShowing",
        params: { id: id },
      });
    },
    async CreateABAPayment(x) {
      this.item = {
        name: x.title,
        quantity: 1,
        price: x.price,
      };

      sessionStorage.setItem("courseID", x._id);

      try {
        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}/aba/checkout`,
          { item: this.item }
        );
        this.formData = response.data;

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
