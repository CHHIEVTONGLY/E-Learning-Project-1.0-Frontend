<template>
  <div>
    <navigation-bar-success></navigation-bar-success>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavigationBarSuccess from "../components/NavigationBarSuccess.vue";
export default {
  components: { NavigationBarSuccess },
};
</script>
