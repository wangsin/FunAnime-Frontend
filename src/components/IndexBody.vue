<template>
  <div>
    <el-container class="indexRoot">
      <div class="card">
        <el-carousel class="mainCard" trigger="click" height="580px" indicator-position="outside">
          <el-carousel-item v-for="(item, k) in carouselList" :key="k">
            <img :src="item.true_img" @click="toVideo(item.video_id)" alt="material">
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-container>
    <div class="top">
      <el-row :gutter="20" class="subCard"
              style="margin-left: 0;margin-right: 0;"
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
import * as configApi from '../api/config'

export default {
  name: 'IndexBody',
  beforeMount: function () {
    configApi.getBasicConfig().then((resp) => {
      if (resp.errno !== 0) {
        console.log('fuck_server')
        this.$data.carouseList = [{
          true_img: 'http://192.168.127.130:4869/f5bcefc53fd9ca8df8c7f583effa50fa',
          video_id: 11
        }]
        return
      }
      this.$data.carouseList = resp.data.carousel_img
    }).catch((err) => {
      console.log('fuck_server_twice')
      console.log(err)
    })
  },
  data () {
    return {
      carouselList: [{
        true_img: 'http://192.168.127.130:4869/f5bcefc53fd9ca8df8c7f583effa50fa',
        video_id: 11
      },
      {
        true_img: 'http://192.168.127.130:4869/36efcb7af804a59267bdd14fe7409862',
        video_id: 12
      },
      {
        true_img: 'http://192.168.127.130:4869/5d88693b5749a36a6750f50d4ad90ee8',
        video_id: 13
      }],
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
    },
    toVideo (id) {
      this.$router.push('/video/' + id)
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
  width: 100%;
}

.card {
  display: flex;
  flex-flow: row nowrap;
  margin: 40px 0 0 0;
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
