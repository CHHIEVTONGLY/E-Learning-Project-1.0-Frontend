<template>
  <div class="flex items-center justify-center bg-gray-950">
    <div
      class="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-full max-w-sm"
    >
      <div class="flex items-center justify-center mb-4">
        <img
          v-if="user.picture"
          class="w-24 h-24 rounded-full border-2 border-gray-600"
          :src="user.picture"
          alt="User Avatar"
        />
        <div
          v-if="!user.picture"
          class="relative w-24 h-24 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
        >
          <svg
            class="absolute w-20 h-24 text-gray-400"
            fill="currentColor"
            viewBox="0 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
      <h2 class="text-2xl font-bold mb-2 text-center">{{ user.username }}</h2>
      <p class="text-gray-400 text-center mb-4">{{ user.email }}</p>
      <p class="text-gray-400 text-center">{{ user.bio }}</p>
      <div class="flex justify-center my-4">
        <button
          @click="editProfile"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit Profile
        </button>
      </div>
    </div>

    <!-- Edit -->

    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-100 z-50 flex items-center justify-center"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-lg mx-4 sm:mx-0"
      >
        <div class="p-6">
          <div class="flex justify-between">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Edit Profile
            </h2>
            <button class="text-white" @click="editProfile">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <form class="mt-6 space-y-6">
            <!-- Profile Picture -->
            <div class="flex items-center space-x-4">
              <div class="w-full">
                <label
                  for="profilePicture"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Profile Picture
                </label>
                <input
                  type="url"
                  v-model="updateProfile.pictureURL"
                  placeholder="Profile Picture URL"
                  class="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                />

                <!-- Drag & Drop file -->

                <div class="flex items-center justify-center w-full mt-4">
                  <label
                    for="dropzone-file"
                    @dragover.prevent="handleDragOver"
                    @drop.prevent="handleDrop"
                    class="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-500"
                  >
                    <div
                      class="flex flex-col items-center justify-center pt-5 pb-6"
                    >
                      <svg
                        class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p class="text-gray-300" v-if="!updateProfile.pictureFile">
                        <span class="font-semibold">Drag & drop</span> or click
                        to upload thumbnail
                      </p>
                      <p v-else>{{ updateProfile.pictureFile.name }}</p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      class="hidden"
                      @change="handleFileChange"
                    />
                  </label>
                </div>
              </div>
            </div>

            <!-- Personal Information -->
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Name
                </label>
                <input
                  v-model="updateProfile.username"
                  type="text"
                  id="name"
                  name="name"
                  autocomplete="name"
                  class="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Email
                </label>
                <input
                  v-model="updateProfile.email"
                  type="email"
                  id="email"
                  name="email"
                  autocomplete="email"
                  class="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>
            </div>

            <!-- Password Update -->
            <div v-if="user.isSSO != true">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Change Password
              </h3>
              <div class="mt-4 space-y-4">
                <div>
                  <label
                    for="currentPassword"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Current Password
                  </label>
                  <input
                    v-model="updateProfile.password"
                    type="password"
                    autocomplete="current-password"
                    class="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                  />
                </div>

                <div>
                  <label
                    for="newPassword"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    New Password
                  </label>
                  <input
                    v-model="updateProfile.newPassword"
                    type="password"
                    autocomplete="new-password"
                    class="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                  />
                </div>

                <div>
                  <label
                    for="confirmPassword"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Confirm New Password
                  </label>
                  <input
                    v-model="updateProfile.confirmPassword"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    autocomplete="new-password"
                    class="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                  />
                </div>
              </div>
              <!-- Display the success message if it exists -->
              <div
                v-if="sucessMessage"
                class="mt-4 text-green-500 absolute bottom-4 right-0"
              >
                <div
                  class="bg-green-200 px-6 py-4 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg"
                >
                  <svg
                    viewBox="0 0 24 24"
                    class="text-green-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                  >
                    <path
                      fill="currentColor"
                      d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                    ></path>
                  </svg>
                  <span class="text-green-800"
                    >Your account has been changed.</span
                  >
                </div>
              </div>

              <!-- Display the error message if it exists -->
              <div
                v-else-if="errorMessage"
                class="mt-4 text-red-500 absolute bottom-4 right-0"
              >
                <div
                  class="bg-red-200 px-6 py-4 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg"
                >
                  <svg
                    viewBox="0 0 24 24"
                    class="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                  >
                    <path
                      fill="currentColor"
                      d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
                    ></path>
                  </svg>
                  <span class="text-red-800">
                    {{ errorMessage }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end">
              <button
                @click.prevent="saveChanges"
                class="inline-block rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </form>
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
      token: sessionStorage.getItem("e-token"),
      user: [],
      isOpen: false,
      updateProfile: {
        pictureFile: null,
        pictureURL: "",
        username: "",
        email: "",
        password: "",
        newPassword: "",
        confirmPassword: "",
      },
      errorMessage: "",
      sucessMessage: "",
      userID: "",
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
        this.errorMessage = response.data.message;
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
    handleFile(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.updateProfile.pictureURL = e.target.result; // Store the image data URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    },
    handleDragOver(event) {
      event.preventDefault(); // Prevent default behavior
      event.dataTransfer.dropEffect = "copy"; // Show copy cursor
    },
    handleDrop(event) {
      const file = event.dataTransfer.files[0];
      if (file) {
        this.updateProfile.pictureFile = file; // Store the file in the form data
      }
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      this.updateProfile.pictureFile = file; // Store the file in the form data
    },
    editProfile() {
      // Add your edit profile logic here
      this.isOpen = !this.isOpen;
      this.userID = this.user._id;
    },
    async saveChanges() {
      const formData = new FormData();

      // Append form fields
      formData.append("username", this.updateProfile.username);
      formData.append("password", this.updateProfile.password);
      formData.append("email", this.updateProfile.email);

      if (this.updateProfile.pictureFile) {
        formData.append("picture", this.updateProfile.pictureFile);
      } else if (this.updateProfile.pictureURL) {
        formData.append("picture", this.updateProfile.pictureURL);
      }

      try {
        const response = await axios.put(
          process.env.VUE_APP_BASE_URL + `/user/profile/${this.userID}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + this.token,
            },
          }
        );
        this.user = response.data;
        this.sucessMessage = response.data.message;
        this.errorMessage = "";

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error(error);
        this.sucessMessage = "";
        this.errorMessage = error.response.data.message;
        setTimeout(() => {
          this.sucessMessage = "";
          this.errorMessage = "";
        }, 2000);
      }
    },
  },
};
</script>
