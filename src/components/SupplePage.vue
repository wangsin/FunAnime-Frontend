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
        <el-form ref="form" :model="form" label-width="150px" class="basicForm">
          <el-form-item v-if="checkStep(1)" label="昵称" style="margin: 10px 8px 10px 0;">
            <el-input v-model="form.nickname"  style="margin: 10px 0 10px 0;"></el-input>
          </el-form-item>

          <el-form-item v-if="checkStep(1)"  label="用户名" style="margin: 10px 8px 10px 0;">
            <el-input v-model="form.username" disabled style="margin: 10px 0 10px 0;"></el-input>
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
            <el-radio-group v-model="form.sex" size="medium" style="margin: 10px 0 10px 0; float: left;" @change="onChange()">
              <el-radio-button :label=1>男</el-radio-button>
              <el-radio-button :label=2>女</el-radio-button>
              <el-radio-button :label=3>保密</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item v-if="checkStep(2)" label="头像">
            <el-upload
              class="avatar-uploader avatar"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" alt="headImg">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span style="text-align: start; float:left; font-size: 11px;">仅支持png/jpeg/jpg格式图片，大小需控制在500k以内～</span>
          </el-form-item>

          <el-form-item v-if="checkStep(3)" label="兴趣标签">
            <div>
              <el-tag
                :key="tag"
                v-for="(tag, i) in form.dynamicTags"
                closable
                :disable-transitions="false"
                style="float: left;margin:7px 2px 0 2px;"
                v-if="checkStep(3)"
                @close="handleClose(i)">
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="form.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </div>
            <br>
          </el-form-item>
          <span v-if="checkStep(3)" style="margin: 0 0 0 150px; text-align: start; font-size: 11px;">目前采集标签信息中，个性化推荐功能即将上线～</span>

          <el-form-item v-if="checkStep(3)"  label="邀请码" style="margin: 10px 8px 10px 0;">
            <el-input v-model="form.inviteCode" style="margin: 10px 0 10px 0;"></el-input>
          </el-form-item>
        </el-form>

        <div v-if="checkStep(4)" class="finalArea">
          <p>确认个人信息</p>
          <div><b>昵称：</b>{{form.nickname}}</div>
          <div><b>用户名：</b>{{form.username}}</div>
          <div><b>出生年月：</b>{{getBirthdayStr()}}</div>
          <div><b>个性签名：</b>{{form.info}}</div>
          <div><b>性别：</b>{{toSexStr()}}</div>
          <div><b>头像：</b><img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" alt="headImg">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i></div>
          <b>兴趣标签：</b>
          <div>
            <el-tag
              v-for="(tag, i) in form.dynamicTags"
              :key="tag"
              style="margin:7px 2px 0 2px; color: #fff"
              :color="getTagColor(i)"
              v-if="checkStep(4)">
              {{tag}}
            </el-tag>
          </div>
          <div><b>邀请码：</b>{{form.inviteCode}}</div>
        </div>
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
      dialogImageUrl: '',
      dialogVisible: false,
      inputVisible: false,
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
        imageUrl: '',
        birthday: 0,
        avatar: '',
        sex: 3,
        dynamicTags: ['aaaaaaaaaa', 'bbbbbbbbbbbbb', 'cccccccccccccc', 'ddddddddddddddd', 'eeeeeeeeeeeee', 'f', 'g', 'h', 'i', 'j', 'k'],
        inputValue: '',
        inviteCode: ''
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
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.$data.form.inputValue
      if (inputValue) {
        this.$data.form.dynamicTags.push(inputValue)
      }
      this.$data.inputVisible = false
      this.$data.form.inputValue = ''
    },
    handleClose (index) {
      this.$data.form.dynamicTags.splice(index, 1)
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
    },
    getBirthdayStr () {
      let birthDate = new Date(this.$data.form.birthday)
      return birthDate.getFullYear() + '年' + (birthDate.getMonth() + 1) + '月' + birthDate.getDate() + '日'
    },
    toSexStr () {
      let mMap = new Map([[1, '男'], [2, '女'], [3, '保密']])
      return mMap.get(this.$data.form.sex)
    },
    getTagColor (i) {
      let colorMap = new Map([[0, '#6f7ad3'], [1, '#f56c6c'], [2, '#e6a23c'], [3, '#1989fa']])
      return colorMap.get(i % 4)
    },
    onChange () {
      window.console.log(this.$data.form.sex)
    }
  }
}
</script>

<style scoped>
.processBar {
  margin: 30px 150px 0 150px;
}

.basicForm {
  margin: 0 100px 0 0;
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
.el-tag + .el-tag {
  margin-left: 10px;
  float:left;
}
.button-new-tag {
  margin:7px 2px 0 2px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  float:left;
}
.input-new-tag {
  width: 90px;
  vertical-align: bottom;
  padding: 0;
  float: left;
  margin: 7px 2px 0 2px;
  height: 32px;
  line-height: 30px;
}

.finalArea {
  display: flex;
  margin: 0 0 0 100px;
  flex-direction: column;
  justify-content: flex-start;
  text-align: start;
}

.finalArea > * {
  margin: 4px 0 0 4px;
}

.finalArea > p {
  margin: 4px 0 0 4px;
  font-size: 20px;
}

.finalArea b {
  margin: 4px 0 0 4px;
  font-size: 20px;
}

.finalArea > div {
  font-size: 18px;
  word-break: break-all;
}

</style>
