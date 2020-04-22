<template>
  <el-container class="root" direction="vertical">
    <div class="processBar">
      <el-progress :percentage="percentage" :color="customColors"></el-progress>
    </div>
    <el-row type="flex" style="margin: 40px 100px 0 100px;height: 999px;">
      <el-col :span="4">
        <h2>补充用户信息</h2>
        <div style="display: flex; flex-direction: column;">
          <el-button type="primary" v-if="canLast()" @click="lastStep" style="margin: 20px 0 0 0;" plain>上一步</el-button>
          <el-button type="primary" v-if="!canSubmit()" @click="nextStep" style="margin: 20px 0 0 0;">下一步</el-button>
          <el-button type="primary" v-if="canSubmit()" @click="nextStep" style="margin: 20px 0 0 0;">提交</el-button>
        </div>
      </el-col>
      <el-col :span="16" style="margin: 0 10px 10px 0;">
        <el-form ref="form" :model="form" label-width="250px" class="basicForm">
          <el-form-item v-if="checkStep(1)" label="昵称" style="margin: 10px 8px 10px 0;">
            <el-input v-model="form.title"  style="margin: 10px 0 10px 0;"></el-input>
          </el-form-item>

          <el-form-item v-if="checkStep(1)"  label="用户名" style="margin: 10px 8px 10px 0;">
            <el-input type="url" v-model="form.username" disabled style="margin: 10px 0 10px 0;"></el-input>
          </el-form-item>

          <el-form-item v-if="checkStep(1)"  label="个性签名" style="margin: 10px 8px 10px 0;">
            <el-input type="textarea" v-model="form.info" style="margin: 10px 0 10px 0;"></el-input>
          </el-form-item>

          <el-form-item v-if="checkStep(1)"  label="出生年月" style="margin: 10px 8px 10px 0;">
            <el-date-picker
              v-model="form.birthday"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="timestamp"
              :picker-options="pickerOptions"
              style="margin: 10px 0 10px 0; width: 100%">
            </el-date-picker>
          </el-form-item>

          <el-form-item v-if="checkStep(1)"  label="性别" style="margin: 10px 8px 10px 0;">
            <el-radio-group v-model="form.sex" size="medium" style="margin: 10px 0 10px 0; width: 100%">
              <el-radio-button label="男"></el-radio-button>
              <el-radio-button label="女"></el-radio-button>
              <el-radio-button label="保密"></el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item v-if="checkStep(2)" label="头像">
            <el-upload
              class="avatar-uploader avatar"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

        </el-form>
      </el-col>
      <el-col :span="4" style="">
        <div style="height: 60%;">
          <el-steps direction="vertical" :active="step">
            <el-step title="基本信息" description="用户基本信息完善"></el-step>
            <el-step title="头像信息" description="用户基本信息完善"></el-step>
            <el-step title="其他信息" description="用户基本信息完善"></el-step>
            <el-step title="确认信息" description="用户基本信息完善"></el-step>
          </el-steps>
        </div>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: 'SupplePage',
  data () {
    return {
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      percentage: 25,
      step: 1,
      customColors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ],
      form: {
        nickname: '',
        username: '',
        sign: '',
        birthday: 0,
        avatar: '',
        sex: '男'
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  methods: {
    checkStep (step) {
      switch (step) {
        case 1:
          return this.$data.percentage === 25 && this.$data.step === 1
        case 2:
          return this.$data.percentage === 50 && this.$data.step === 2
        case 3:
          return this.$data.percentage === 75 && this.$data.step === 3
        case 4:
          return this.$data.percentage === 100 && this.$data.step === 4
        default:
          return false
      }
    },
    canSubmit () {
      return this.$data.percentage === 100 && this.$data.step === 4
    },
    canLast () {
      return this.$data.step !== 1 && this.$data.percentage !== 25
    },
    nextStep () {
      if (this.$data.percentage < 100) {
        this.$data.percentage += 25
      } else {
        this.$data.percentage = 25
      }

      if (this.$data.step < 4) {
        this.$data.step += 1
      } else {
        this.$data.step = 1
      }
    },
    lastStep () {
      if (this.$data.percentage > 0) {
        this.$data.percentage -= 25
      } else {
        this.$data.percentage = 100
      }

      if (this.$data.step > 0) {
        this.$data.step -= 1
      } else {
        this.$data.step = 4
      }
    }
  }
}
</script>

<style scoped>
.processBar {
  margin: 30px 150px 0 150px;
}

.basicForm {
  margin: 0 250px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
