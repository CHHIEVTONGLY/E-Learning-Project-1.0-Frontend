<template>
  <div>
    <navigation-bar></navigation-bar>
    <div>
      <section class="bg-gray-950 text-white">
        <div
          class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center"
        >
          <div class="mx-auto max-w-3xl text-center">
            <h1
              class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
            >
              Understand Website Flow.

              <span class="sm:block"> Boost Your Knowledge. </span>
            </h1>

            <p class="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              Best E-Learning Website for Developers.
            </p>

            <div class="mt-8 flex flex-wrap justify-center gap-4">
              <router-link to="/login"
                class="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              >
                Get Started
              </router-link>

              <a
                class="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import NavigationBar from "../components/NavigationBar.vue";

export default {
  components: {
    NavigationBar,
  },
};
</script>
