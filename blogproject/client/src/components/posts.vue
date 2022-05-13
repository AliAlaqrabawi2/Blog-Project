<template>
  <div id="posts">
    <post v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import post from "../components/post";
export default {
  components: {
    post,
  }, 
  props:["posts"]
};
</script>

<style scoped>
#posts {
  flex: 9;
  display: flex; 
  flex-wrap:wrap ;
  align-items:center; 
  justify-content:space-around ;
}
</style>