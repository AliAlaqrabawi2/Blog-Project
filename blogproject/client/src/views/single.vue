<template>
  <div id="single">
    <div class="container">
      <singlepost />
      <sidebar />
    </div>
  </div>
</template>

<script>
import sidebar from "../components/sidebar";
import singlepost from "../components/singlepost";
export default {
  components: {
    sidebar,
    singlepost,
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-evenly;
  padding-top: 60px;
}
</style>