<template>
  <div id="header">
    <div class="header-container">
      <p class="header-description">Node & Vue js</p>
      <h3 class="header-title">Blog</h3>
    </div>
    <div class="header-img">
      <img src="../assets/header.jpg" />
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
};
</script>

<style scoped>
#header {
  padding-top: 60px;
  position: relative;
}
.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: absolute;
  color: #ccc;
}
.header-title {
  font-size: 80px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.header-description {
  font-size: 30px;
  margin-top: 10px;
}

.header-img {
  width: 100%;
  height: calc(100vh - 100px);
}
.header-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
