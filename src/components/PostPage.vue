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
          <el-form-item v-if="checkStep(2)" label="视频">
            <el-upload
              style="display: block;"
              class="upload-demo"
              drag
              :limit="1"
              action="https://jsonplaceholder.typicode.com/posts/"
              :auto-upload="true">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text" style="display: block;">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-form-item>
          <el-form-item v-if="checkStep(2)" label="封面">
            <el-upload
              style="display: block;"
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              :limit="1"
              :auto-upload="false">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text" style="display: block;">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" style="display: block;" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
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
export default {
  name: 'PostPage',
  data () {
    return {
      step: 1,
      form: {
        name: '',
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
</style>
