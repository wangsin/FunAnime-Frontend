<template>
  <div>
    <el-container class="indexRoot">
      <div class="card">
        <el-carousel class="mainCard" trigger="click" height="455px" indicator-position="outside">
          <el-carousel-item v-for="item in 4" :key="item">
            <img src="../assets/material.jpg" alt="material">
          </el-carousel-item>
        </el-carousel>
        <el-container style="display: flex; flex-direction: column; height: 100%; width: 30%; margin-left: 25px;">
          <el-row :gutter="20" class="subCard">
            <el-col :xs="24" :sm="12" :md="12" v-for="i in 4" :key="i">
              <el-card :body-style="{ padding: '0px' }" shadow="hover" style="margin-bottom: 30px;">
                <img src="../assets/material.jpg" class="image">
                <div style="padding: 14px; display: flex; flex-direction: column;">
                  <span style="font-size: 15px;text-align: left">【罗翔】7岁？14岁？刑事责任年龄要不要下调？</span>
                  <time class="time">1998-01-01 01:00</time>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-container>
      </div>
    </el-container>
    <div class="top">
      <el-row :gutter="20" class="subCard"
              v-infinite-scroll="load"
              infinite-scroll-disabled="disabled"
              infinite-scroll-distance="10">
        <el-col :xs="24" :sm="6" :md="6" v-for="i in count" :key="i">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" style="margin-bottom: 20px;">
            <img src="../assets/material.jpg" class="image">
            <div style="padding: 14px; display: flex; flex-direction: column;">
              <span style="font-size: 15px;text-align: left">【罗翔】7岁？14岁？刑事责任年龄要不要下调？</span>
              <time class="time">1998-01-01 01:00</time>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexBody',
  data () {
    return {
      currentDate: new Date(),
      count: 12,
      videos: [],
      loading: false
    }
  },
  computed: {
    noMore () {
      return this.count >= 40
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 4
        this.loading = false
      }, 2000)
    }
  }
}
</script>

<style scoped>
a{
    text-decoration: none;
}

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
}

.card {
  display: flex;
  flex-flow: row nowrap;
  margin: 40px 100px 0 100px;
  width: 100%;
}

.subCard {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.time {
  font-size: 10px;
  text-align: right;
  color: #999;
  justify-items: left;
}

.image {
  width: 100%;
  display: block;
}

.top {
  margin: 30px 100px 30px 100px;
}
</style>
