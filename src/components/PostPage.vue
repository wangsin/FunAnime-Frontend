<template>
<el-container class="componentRoot">
  <div id="content">
    <div class="container">
      <div class="row">
        <span style="font-size: 30px;text-align: left;font-weight: bold;">上传您的作品</span>
        <el-steps :space="200" :active="step - 1" finish-status="success" simple style="width: 40%; margin-left: auto; height: 15px;">
          <el-step title="完善信息" ></el-step>
          <el-step title="上传视频" ></el-step>
          <el-step title="大功告成！" ></el-step>
        </el-steps>
      </div>
      <el-divider></el-divider>
      <div class="row">
        <el-form label-width="150px" class="form">
          <el-form-item v-if="checkStep(1)" label="视频标题">
            <el-input v-model="form.name" placeholder="请填写视频标题，字数控制在20字以内~"></el-input>
          </el-form-item>
          <el-form-item v-if="checkStep(1)" label="分区">
            <el-select v-model="form.region" placeholder="请选择一级分区">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select v-model="form.region" placeholder="请选择二级分区">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="checkStep(1)" label="视频描述">
            <el-input type="textarea" autosize v-model="form.desc"></el-input>
          </el-form-item>
          <div style="display: none;">
            <input type="file" style="display:none;" ref="videoFile" @change="setVideoName"/>
            <input type="file" style="display:none;" ref="videoCover" @change="setCover"/>
          </div>
          <el-form-item v-if="checkStep(2)" label="视频">
            <div style="margin-left: 20px;">
              <el-button icon="el-icon-upload2" class="submitButton" @click="selectVideo">
                <span style="font-size: 20px;">点击选择视频</span>
                <br>
              </el-button>
              <el-button class="submitButton" disabled>{{ this.$data.form.fileName || "请选择mp4,mkv,avi等合适的视频格式~" }}</el-button>
            </div>
          </el-form-item>
          <el-form-item v-if="checkStep(2)" label="封面">
            <div style="margin-left: 20px;">
              <el-button icon="el-icon-upload2"  class="submitButton" @click="selectCover">
                <span style="font-size: 20px;">点击选择封面</span>
              </el-button>
              <el-button class="submitButton" @click="uploadVideo">{{ this.$data.form.coverFileName || "请选择jpg,png等合适的图片格式~" }}</el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-if="canLast()" @click="lastStep" plain>上一步</el-button>
            <el-button type="primary" v-if="!canSubmit()" @click="nextStep">下一步</el-button>
            <el-button type="primary" v-if="canSubmit()" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</el-container>
</template>

<script>
import * as configApi from '../api/config/index.js'
import TcVod from 'vod-js-sdk-v6'

function getSignature () {
  return configApi.getVideoUploadSign().then(function (response) {
    return response.data.sign
  })
}

export default {
  created () {
    this.tcVod = new TcVod({
      getSignature: getSignature
    })
  },
  name: 'PostPage',
  data () {
    return {
      step: 1,
      uploaderInfos: [],
      form: {
        name: '',
        fileName: '',
        coverFileName: '',
        region1: '',
        region2: '',
        resource: {
          videoLink: '',
          videoCode: '',
          coverLink: ''
        },
        desc: ''
      }
    }
  },
  methods: {
    selectVideo: function () {
      this.$refs.videoFile.click()
    },
    selectCover: function () {
      this.$refs.videoCover.click()
    },
    setVideoName: function () {
      this.$data.form.fileName = this.$refs.videoFile.files[0].name
    },
    setCover: function () {
      this.$data.form.coverFileName = this.$refs.videoCover.files[0].name
    },
    /* eslint-disable */
    uploadVideo: function () {
      let mediaFile = this.$refs.videoFile.files[0];
      let coverFile = this.$refs.videoCover.files[0];

      let uploader = this.tcVod.upload({
        mediaFile: mediaFile,
        coverFile: coverFile
      });
      uploader.on("media_progress", function(info) {
        uploaderInfo.progress = info.percent;
      });
      uploader.on("media_upload", function(info) {
        uploaderInfo.isVideoUploadSuccess = true;
      });
      uploader.on("cover_progress", function(info) {
        uploaderInfo.coverProgress = info.percent;
      });
      uploader.on("cover_upload", function(info) {
        uploaderInfo.isCoverUploadSuccess = true;
      });
      console.log(uploader, "uploader");

      let uploaderInfo = {
        videoInfo: uploader.videoInfo,
        coverInfo: uploader.coverInfo,
        isVideoUploadSuccess: false,
        isVideoUploadCancel: false,
        isCoverUploadSuccess: false,
        progress: 0,
        coverProgress: 0,
        fileId: "",
        videoUrl: "",
        coverUrl: "",
        cancel: function() {
          uploaderInfo.isVideoUploadCancel = true;
          uploader.cancel();
        }
      };

      this.uploaderInfos.push(uploaderInfo);

      uploader
        .done()
        .then(function(doneResult) {
          console.log("doneResult", doneResult);

          uploaderInfo.fileId = doneResult.fileId;

          uploaderInfo.coverUrl = doneResult.cover.url;
          console.log()
        }).catch()
    },
    canLast: function () {
      return this.$data.step !== 1
    },
    canSubmit: function () {
      return this.$data.step === 3
    },
    checkStep: function (i) {
      return this.$data.step === i
    },
    lastStep: function () {
      if (this.$data.step > 1) {
        this.$data.step -= 1
      } else {
        this.$data.step = 3
      }
    },
    nextStep: function () {
      if (this.$data.step < 3) {
        this.$data.step += 1
      } else {
        this.$data.step = 1
      }
    },
    onSubmit: function () {
      this.$data.step = 4
    }
  }
}
</script>

<style scoped>
.componentRoot {
  margin: 30px 100px 30px 100px;
}

#content {
  width: 100%;
}

.row {
  display: flex;
  flex-direction: row;
}

.row .form {
  width: 50%;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.el-form-item div {
  display: flex;
  margin: 0 0 10px 0;
}

.submitButton {
  width: 360px;
  height: 180px;
  margin: 0 10px;
}
</style>
