<template>
  <el-container direction="vertical" style="margin: 60px 100px 0 100px;">
    <div class="head">
      <div class="title">
        <span class="mainTitle">{{video.name}}</span>
        <span class="mainTime">创建时间：{{video.date}}</span>
      </div>
      <div class="uploader">
        <img v-if="video.uploader.avatar" :src="video.uploader.avatar" alt=""/>
        <img v-else src="../assets/logo.png" alt="" style="height: 70px; margin-right: 20px;">
        <div class="textArea">
          <span class="nickname">{{video.uploader.nickname}}</span>
          <div style="display: flex; align-self: flex-end; margin-top: 10px;">
            <span class="mainTime">粉丝数：{{video.uploader.followers}}</span>
            <el-button @click="unsubscribe" v-if="video.uploader.isFollow" class="btn" type="info" round>取消关注</el-button>
            <el-button @click="subscribe" v-else class="btn" type="primary" round>+ 关注</el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="player" id="barrage">
      <video id="player-container-id" preload="auto" playsinline webkit-playsinline controls></video>
    </div>
    <div style="display: inline-flex; flex-direction: row; margin-top: 5px;">
      <el-input v-model="barrageText" placeholder="请输入弹幕~"></el-input>
      <el-button @click="submitBarrage" style="margin-left: 5px;">发射</el-button>
    </div>

    <div style="height: 200px;">

    </div>
  </el-container>
</template>

<script>
import Barrage from 'barrage-ui';
import example from 'barrage-ui/example.json'; // 组件提供的示例数据
import { v4 as uuidv4 } from 'uuid';

let player = {}
let barrage = {}
export default {
  name: 'VideoPage',
  mounted() {
    player = TCPlayer('player-container-id', { // player-container-id 为播放器容器 ID，必须与 html 中一致
      fileID: '5285890801762352687', // 请传入需要播放的视频 filID（必须）
      appID: '1252888782' // 请传入点播账号的 appID（必须）
    })

    barrage = new Barrage({
      container: document.getElementById('player-container-id'), // 父级容器
      data: example, // 弹幕数据
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
  },
  beforeDestroy() {
    player.dispose()
  },
  data () {
    return {
      video: {
        id: 1,
        name: '测试视频标题',
        fileId: '5285890801762352687',
        appId: '1252888782',
        date: new Date().toLocaleString(),
        uploader: {
          avatar: '',
          nickname: 'fuckerfucker',
          followers: 100,
          isFollow: false,
          level: 1
        },
        describe: '',
        tag: ['']
      },
      comment: [{
        author: {
          avatar: '',
          nickname: '',
          level: 1
        },
        text: '',
        createTime: ''
      }],
      barrageText: ''
    }
  },
  methods: {
    submitBarrage: function () {
      let currTime = player.currentTime()
      let nowTime = currTime * 1000
      console.log(nowTime)
      barrage.add({
        key: uuidv4(),
        time: nowTime,
        text: this.$data.barrageText,
        fontSize: 26,
        color: '#0ff',
      })
      this.$data.barrageText = ''
    },
    subscribe: function () {
      console.log("su:" + this.$data.video.uploader.isFollow)
      this.$data.video.uploader.isFollow = true
    },
    unsubscribe: function () {
      console.log("un:" + this.$data.video.uploader.isFollow)
      this.$data.video.uploader.isFollow = false
    }
  }
}
</script>

<style scoped>
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
  align-self: center;
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
</style>
