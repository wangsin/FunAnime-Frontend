<template>
  <el-container class="root" direction="vertical">
    <div class="processBar">
      <el-progress :percentage="percentage" :color="customColors"></el-progress>
    </div>
    <el-row type="flex" style="margin: 40px 100px 0 100px;height: 999px;">
      <el-col :span="4">
        <h2>补充用户信息</h2>
      </el-col>
      <el-col :span="16" style="margin: 0 10px 10px 0;">
        <el-form ref="form" :model="form" label-width="250px" class="basicForm">
          <el-form-item label="昵称">
            <el-input v-model="form.title"></el-input>
          </el-form-item>

          <el-form-item label="个性名称">
            <el-input type="url" v-model="form.url"></el-input>
          </el-form-item>

          <el-form-item label="描述">
            <el-input type="textarea" v-model="form.info"></el-input>
          </el-form-item>

          <el-form-item label="头像">
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

          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
          </el-form-item>

        </el-form>
      </el-col>
      <el-col :span="4" style="">
        <div style="height: 60%;">
          <el-steps direction="vertical" :active="1">
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
      customColors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ],
      form: {
        title: '',
        info: '',
        url: '',
        avatar: ''
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
