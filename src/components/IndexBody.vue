<template>
    <div class="head-show">
      <img src="../assets/BS_PIC_2020-03-02-19-11-59.png" alt="" class="img">
      <div class="head-img-desc">{{currentDate}}</div>
    </div>
</template>

<script>
export default {
  name: 'IndexBody',
  data () {
    return {
      currentDate: new Date()
    }
  }
}
</script>

<style scoped>
  .head-show {
    padding-top: 0;
    height: 400px;
    margin: 0 10%;
    /*background-color: #8c8c;*/
    border: #000;
  }

  .head-pic {
    height: 100%;
    margin: 0 10%;
    background-color: #000000;
  }

  .img {
    height: 100%;
    float: left;
  }

  .head-img-desc {
    background: #fff;
    float: left;
  }
</style>
