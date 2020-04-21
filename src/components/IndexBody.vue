<template>
  <el-container class="indexRoot">
    <div class="card">
      <el-carousel class="mainCard" trigger="click" height="471px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <el-carousel class="subCard" trigger="click" height="471px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </el-container>
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
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.mainCard {
  width: 70%;
  /*margin: 0 4px 0 0;*/
}

.card {
  display: flex;
  flex-flow: row nowrap;
  margin: 62px 100px 0 100px;
  width: 100%;
}

.subCard {
  width: 30%;
  margin: 0 0 0 20px;
}
</style>
