<template>
  <el-container direction="vertical" style="margin: 60px 100px 0 100px;">
    <div class="head">
      <div class="title">
        <span class="mainTitle">{{video.name}}</span>
        <span class="mainTime">创建时间：{{video.date}}</span>
      </div>
      <div class="uploader">
        <img v-if="video.uploader.avatar" :src="video.uploader.avatar" style="height: 70px; margin-right: 20px;" alt=""/>
        <img v-else src="../assets/logo.png" alt="" style="height: 70px; margin-right: 20px;">
        <div class="textArea">
          <span class="nickname">{{video.uploader.nickname}}</span>
<!--          <div style="display: flex; align-self: flex-end; margin-top: 10px;">-->
<!--            <span class="mainTime">粉丝数：{{video.uploader.followers}}</span>-->
<!--            <el-button @click="unsubscribe" v-if="video.uploader.isFollow" class="btn" type="info" round>取消关注</el-button>-->
<!--            <el-button @click="subscribe" v-else class="btn" type="primary" round>+ 关注</el-button>-->
<!--          </div>-->
        </div>
      </div>
    </div>

    <div class="player" id="barrage">
      <video id="player-container-id" preload="auto" playsinline webkit-playsinline controls></video>
    </div>
    <div class="barrageArea">
      <el-input v-model="barrageText" placeholder="请输入弹幕~" @keyup.enter.native="submitBarrage"></el-input>
      <el-color-picker class="barBtn" v-model="barrageColor"></el-color-picker>
      <el-button @click="submitBarrage" class="barBtn" >发射</el-button>
    </div>

    <el-row style="margin-top: 50px;">
      <el-col :span="18" class="comment subInfo">
        <span class="mainTitle" style="text-align: start; float: left;">视频描述</span>
        <span class="desc">{{this.video.describe}}</span>
      </el-col>
      <el-col :span="18" class="comment">
        <span class="mainTitle" style="text-align: start; float: left;">评论</span>
        <span style="text-align: start; float: left; font-size: 10px; margin-bottom: 14px;">楼中楼功能暂不支持 未来版本迭代</span>
        <el-form style="display: flex; flex-direction: row;margin:14px 0;">
          <el-input
            type="textarea"
            id="inputCommentArea"
            style="resize: none; margin-right: 10px;"
            :rows="4"
            placeholder="请输入评论"
            v-model="inputComment">
          </el-input>
          <el-button icon="el-icon-edit" size="small" @click="submitComment"></el-button>
        </el-form>
        <div v-for="(c, i) in this.$data.comment">
          <div class="commentSingle">
            <img :src="c.author.avatar" style="height: 40px;margin: 0 10px 0 0;" alt="">
            <div style="display: flex; flex-direction: column; justify-content: start; width: 100%;">
              <span style="font-size: 7px;text-align: start;float: start;margin: 2px;"><span style="font-size: 20px;">{{c.author.nickname}}</span> {{c.parseTime(c.time)}}</span>
              <span style="text-align: start;float: start;margin: 2px;">{{c.text}}</span>
              <div style="display: flex; flex-direction: row;margin: 7px 0 7px auto; justify-content: end;">
                <el-button icon="el-icon-edit" size="small" @click="noFollowComment"></el-button>
                <el-button type="primary" icon="el-icon-star-off" size="small" ></el-button>
              </div>
              <el-divider></el-divider>
            </div>
          </div>
        </div>
<!--        <el-pagination-->
<!--          style="width: 100%;"-->
<!--          :page-size="14"-->
<!--          :pager-count="1"-->
<!--          layout="prev, pager, next"-->
<!--          :total="1000">-->
<!--        </el-pagination>-->
      </el-col>
      <el-col :span="6" class="comment">
        <div class="subInfo">
          <el-button-group style="width: 100%;">
            <el-button v-if="this.video.isCollect" type="primary" icon="el-icon-star-on" @click="uncollect" plain>取消收藏</el-button>
            <el-button v-else type="primary" icon="el-icon-star-off" @click="collect">收藏</el-button>
            <el-button type="primary" icon="el-icon-share">分享</el-button>
          </el-button-group>
        </div>
        <div class="subInfo">
          <span class="mainTitle" style="text-align: start; float: left;">视频信息</span>
          <span class="desc">播放：{{this.video.pv}}</span>
          <span class="desc">收藏：1w</span>
        </div>
        <div class="subInfo">
          <span class="mainTitle" style="text-align: start; float: left;">分类</span>
          <span class="desc">{{this.video.category}}</span>
        </div>
<!--        <div class="subInfo">-->
<!--          <span class="mainTitle" style="text-align: start; float: left;">相关视频</span>-->
<!--          <span class="desc">智能推荐相关待未来版本迭代</span>-->
<!--        </div>-->
      </el-col>
    </el-row>

  </el-container>
</template>

<script>
import Barrage from 'barrage-ui';
import example from 'barrage-ui/example.json'; // 组件提供的示例数据
import { v4 as uuidv4 } from 'uuid';
import * as configApi from '../api/config/index.js'

let player = {}
let barrage = {}
let conn = {}
export default {
  name: 'VideoPage',
  mounted() {
    console.log(this.$route.params)
    configApi.getVideoDetail({
      id: this.$route.params.videoID
    }).then((resp) => {
      if (resp.errno !== 0) {
        if (resp.errno === -2000003) {
          this.$router.push('/notFound')
          return
        }

        this.$notify.error({
          title: '请求失败',
          message: resp.errmsg
        })
        return
      }

      this.video.videoId = this.$route.params.videoID
      this.barrageList = resp.data.barrage_list
      this.video.name = resp.data.video_name
      this.video.describe = resp.data.video_desc
      this.video.fileId = resp.data.video_remote_id
      this.video.date = resp.data.create_time
      this.video.isCollect = resp.data.is_collect
      this.video.pv = resp.data.pv
      this.video.category = resp.data.category
      this.video.uploader = {
        avatar: resp.data.creator_img,
        nickname: resp.data.creator
      }

      player = TCPlayer('player-container-id', { // player-container-id 为播放器容器 ID，必须与 html 中一致
        fileID: resp.data.video_remote_id, // 请传入需要播放的视频 filID（必须）
        appID: '1252888782', // 请传入点播账号的 appID（必须）
        QualitySwitcherMenuButton: true
      })

      barrage = new Barrage({
        container: document.getElementById('player-container-id'), // 父级容器
        data: this.$data.barrageList, // 弹幕数据
        config: {
          // 全局配置项
          duration: -1, // 弹幕循环周期(单位：毫秒)
          defaultColor: '#fff', // 弹幕默认颜色
        },
      });

      let viCanvas = document.getElementById('player-container-id')

      window.onresize = (function () {
        barrage.canvas.height = viCanvas.offsetHeight;
        barrage.canvas.width = viCanvas.offsetWidth;
      })

      player.on('playing', function () {
        barrage.play()
      })

      player.on('pause', function () {
        barrage.pause()
      })

      player.on('fullscreenchange', function () {
        if (player.isFullscreen()) {
          barrage.canvas.height = screen.height;
          barrage.canvas.width = screen.width;
        } else {
          barrage.canvas.height = viCanvas.offsetHeight;
          barrage.canvas.width = viCanvas.offsetWidth;
        }
      })

      player.on('seeking', function () {
        barrage.pause()
      })

      player.on('seeked', function () {
        barrage.goto(player.currentTime() * 1000)
      })

      player.on('loadstart', function () {
        barrage.pause()
      })

      player.on('ratechange', function () {
        console.log('rate change')
        // barrage.goto(player.currentTime() * 1000)
        barrage.setConfig({
          speed: 100 * viCanvas.playbackRate
        })
        console.log(player.currentTime() * 1000)
      })

      // websocket相关
      if (window["WebSocket"]) {
        conn = new WebSocket("ws://127.0.0.1:8090/ws")
        this.supportBarrage = true
        conn.onclose = function (evt) {
          console.log('webSocket closed')
        }
        conn.onmessage = function (evt) {
          console.log(evt.data)
          barrage.add(JSON.parse(evt.data))
        }
      } else {
        this.supportBarrage = false
      }

    }).catch((err) => {
      console.log(err)
      this.$notify.error({
        title: '请求失败',
        message: err
      })
    })
  },
  beforeDestroy() {
    player.dispose()
  },
  data () {
    return {
      barrageColor: '#fff',
      inputComment: '',
      supportBarrage: true,
      barrageList: [],
      video: {
        videoId: 1,
        isCollect: false,
        pv: '',
        category: '',
        name: '加载中...',
        fileId: '',
        appId: '',
        date: new Date().toLocaleString(),
        uploader: {
          avatar: '',
          nickname: '加载中...',
        },
        describe: '',
        tag: ['']
      },
      comment: [{
        author: {
          avatar: 'http://192.168.127.130:4869/5a7e1f23a2db5512896fb0a97fb4fbbc',
          nickname: 'TestUser',
          level: 1
        },
        text: '这个视频真实太傻掉了',
        time: new Date(),
        parseTime: (time) => {
          const now = time
          return now.getFullYear().toString() + '/' + (now.getMonth() + 1).toString() + '/' + now.getDate().toString() + ' ' + now.getHours() + ':' + now.getMinutes()
        }
      }],
      barrageText: ''
    }
  },
  methods: {
    collect: function () {
      configApi.collectVideo({
        video_id: parseInt(this.$data.video.videoId)
      }).then((res) => {
        if (res.errno !== 0) {
          this.$notify.error({
            title: '发送失败',
            message: res.errmsg
          })
        } else {
          this.$data.video.isCollect = true
        }
      }).catch((error) => {
        console.log(error)
        this.$notify.error({
          title: '发送失败',
          message: '服务器开小差了，请稍后再试~'
        })
      })
    },
    uncollect: function () {
      configApi.uncollectVideo({
        video_id: parseInt(this.$data.video.videoId)
      }).then((res) => {
        if (res.errno !== 0) {
          this.$notify.error({
            title: '发送失败',
            message: res.errmsg
          })
        } else {
          this.$data.video.isCollect = false
        }
      }).catch((error) => {
        console.log(error)
        this.$notify.error({
          title: '发送失败',
          message: '服务器开小差了，请稍后再试~'
        })
      })
    },
    submitBarrage: function () {
      if (!conn) {
        this.$notify.error({
          title: '请求失败',
          message: '与弹幕服务器失去连接',
        })
        return
      }

      conn.send(JSON.stringify({
        key: uuidv4(),
        time: player.currentTime() * 1000,
        text: this.$data.barrageText,
        fontSize: 26,
        color: this.$data.barrageColor,
        videoId: this.$data.video.videoId,
        creatorId: JSON.parse(this.$store.state.userInfo).user_id
      }))

      this.$data.barrageText = ''
    },
    subscribe: function () {
      console.log("su:" + this.$data.video.uploader.isFollow)
      this.$data.video.uploader.isFollow = true
    },
    unsubscribe: function () {
      console.log("un:" + this.$data.video.uploader.isFollow)
      this.$data.video.uploader.isFollow = false
    },
    noFollowComment: function () {
      this.$message({
        showClose: true,
        message: '评论回复功能暂不支持~',
        type: 'error'
      });
    },
    submitComment: function () {
      console.log(JSON.parse(this.$store.state.userInfo))
      this.$data.comment.unshift({
        author: {
          avatar: 'http://192.168.127.130:4869/' + JSON.parse(this.$store.state.userInfo).user_avatar,
          nickname: JSON.parse(this.$store.state.userInfo).nick_name,
          level: 1
        },
        text: this.$data.inputComment,
        time: new Date(),
        parseTime: (time) => {
          const now = time
          return now.getFullYear().toString() + '/' + (now.getMonth() + 1).toString() + '/' + now.getDate().toString() + ' ' + now.getHours() + ':' + now.getMinutes()
        }
      })
    }
  }
}
</script>

<style scoped>
@import "../../node_modules/element-ui/lib/theme-chalk/index.css";
.head {
  display: flex;
  flex-direction: row;
}

.title {
  justify-content: flex-start;
  text-align: start;
  display: inline-flex;
  flex-direction: column;
}

.mainTitle {
  text-align: start;
  font-size: 25px;
  font-weight: bold;
  margin: 0 0 10px 0;
}

.mainTime {
  font-size: 16px;
  font-weight: normal;
  /*align-self: center;*/
}

.uploader {
  display: inline-flex;
  margin-left: auto;
}

.uploader .textArea {
  display: inline-flex;
  flex-direction: column;
}

.uploader .nickname {
  text-align: start;
  font-size: 25px;
  font-weight: normal;
}

.btn {
  margin-left: 10px;
  width: 120px;
}

.player {
  margin: 50px 0 0 0;
  background-color: #000;
  border: #409EFF;
  width: 100%;
  height: 43vw;
}

.player > video {
  height: 100%;
  width: 100%;
}

#player-container-id {
  height: 100%;
  width: 100%;
}

.barrageArea {
  display: inline-flex;
  flex-direction: row;
  margin-top: 5px;
}

.barrageArea .barBtn {
  margin-left: 5px;
}

.comment {
  float: left;
  display: flex;
  flex-direction: column;
  padding-right: 90px;
}

.commentSingle {
  display: flex;
  flex-direction: row;
  margin: 14px 0 0 0;
}

.subInfo {
  float: left;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
}

.subInfo .desc {
  text-align: start;
  float: left;
  font-size: 17px;
}

#inputCommentArea {
  resize: none !important;
}

.el-textarea .el-textarea__inner{
   resize: none !important;
}

</style>
