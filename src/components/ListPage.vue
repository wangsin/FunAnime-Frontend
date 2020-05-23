<template>
  <div>
    <div class="top">
      <el-row :gutter="20" class="subCard"
              style="margin-left: 0;margin-right: 0;"
              v-infinite-scroll="load"
              infinite-scroll-disabled="disabled"
              infinite-scroll-distance="0">
        <el-col :xs="24" :sm="6" :md="6" v-for="(video, i) in videoList" :key="i">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" style="margin-bottom: 20px;cursor: pointer;">
            <img @click="toVideo(video.video_id)" :src="video.true_img" class="image">
            <div @click="toVideo(video.video_id)" style="padding: 14px; display: flex; flex-direction: column;">
              <span style="font-size: 15px;text-align: left">{{video.title}}</span>
              <time class="time">播放量：{{video.volume}} 投稿时间：{{video.date}}</time>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <p v-if="loading" v-loading="loading"></p>
      <p v-if="noMore">没有更多了</p>
    </div>
  </div>
</template>

<script>
import * as configApi from '../api/config'

export default {
  name: 'ListPage',
  beforeMount: function () {
    configApi.getBasicConfig().then((resp) => {
      if (resp.errno !== 0) {
        this.$data.carouseList = []
        return
      }
      this.$data.carouseList = resp.data.video_list
    }).catch((err) => {
      console.log(err)
    })

    configApi.getVideoList({
      params: {
        page: this.$data.page,
        size: this.$data.size,
        category: 0
      }
    }).then((resp) => {
      if (resp.errno !== 0) {
        this.$notify.error({
          title: '请求失败',
          message: resp.errmsg
        })
        return
      }
      this.$data.videoList = resp.data.video_list
      this.$data.count = resp.data.page_data.count
    }).catch((err) => {
      this.$notify.error({
        title: '请求失败',
        message: err
      })
    })
  },
  data () {
    return {
      carouseList: [],
      videoList: [],
      currentDate: new Date(),
      page: 1,
      size: 16,
      count: 0,
      videos: [],
      loading: false
    }
  },
  computed: {
    noMore () {
      return this.videoList.length >= this.count
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    load () {
      this.loading = true
      setTimeout(() => {
        configApi.getVideoList({
          params: {
            page: this.$data.page + 1,
            size: this.$data.size,
            category: 0
          }
        }).then((resp) => {
          if (resp.errno !== 0) {
            console.log('fuck_server')
            this.$notify.error({
              title: '请求失败',
              message: resp.errmsg
            })
            return
          }
          resp.data.video_list.forEach((data) => {
            this.$data.videoList.push(data)
          })
          this.$data.loading = false
          this.$data.page++
          this.$data.count = resp.data.page_data.count
        }).catch((err) => {
          console.log('fuck_server_twice')
          this.$notify.error({
            title: '请求失败',
            message: err
          })
        })
      }, 1500)
    },
    toVideo (id) {
      let newPage = this.$router.resolve({
        path: '/video/' + id
      })
      window.open(newPage.href, '_blank')
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
  cursor: pointer;
}

.card {
  display: flex;
  flex-flow: row nowrap;
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
  margin-top: 12px;
}

.image {
  height: 250px;
  display: block;
}

.top {
  margin: 30px 100px 30px 100px;
}
</style>
