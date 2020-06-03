<template>
  <div id="content">
    <div class="container">
      <div class="row">
        <span style="font-size: 30px;text-align: left;font-weight: bold;">管理您的作品</span>
      </div>
      <el-divider></el-divider>
      <div class="row">
        <el-table
          :data="list"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column align="center" label="VID" width="95">
            <template slot-scope="scope">
              {{ scope.row.video_id }}
            </template>
          </el-table-column>
          <el-table-column label="视频标题">
            <template slot-scope="scope">
              {{ scope.row.title }}
            </template>
          </el-table-column>
          <el-table-column label="封面图" width="150px" align="center">
            <template slot-scope="{row}">
              <img :src="row.true_img" alt="head" style="width: 100%;">
            </template>
          </el-table-column>
          <el-table-column label="点击量" width="110" align="center">
            <template slot-scope="scope">
              {{ scope.row.volume }}
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="状态" width="110" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusNameFilter }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="380" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button v-if="row.status !== 1" type="primary" size="mini" @click="handleUpdate(row.video_id, row.title, row.video_desc)">
                编辑
              </el-button>
              <el-button v-if="row.status === 2" size="mini" @click="handleReSubmit(row.video_id)">
                重新提交
              </el-button>
              <el-button v-if="row.status === 4" type="warning" size="mini" @click="handleHide(row.video_id)">
                隐藏
              </el-button>
              <el-button v-if="row.status === 3" type="warning" size="mini" @click="handleShow(row.video_id)">
                取消隐藏
              </el-button>
              <el-button v-if="row.status !== 1" type="danger" size="mini" @click="handleRemove(row.video_id)">
                删除
              </el-button>
              <el-button v-if="row.status === 1" type="text" disabled>
                审核中 无法操作
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
          <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
            <el-form-item label="视频标题" prop="title">
              <el-input v-model="temp.name" />
            </el-form-item>
            <el-form-item label="视频描述" prop="title">
              <el-input v-model="temp.desc" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">
              取消
            </el-button>
            <el-button type="primary" @click="handleSubmit">
              确定
            </el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import * as configApi from '../api/config'
import axios from "axios";
export default {
  name: 'VideoUserList',
  beforeMount: function () {
    console.log('start request')
    configApi.getVideoManageList({}).then((resp) => {
      console.log(resp)
      if (resp.errno !== 0) {
        this.$data.list = []
        return
      }
      this.$data.list = resp.data.video_list
      this.$data.count = resp.data.page_data.count
    }).catch((err) => {
      console.log(err)
    })
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1 :'info',
        2 :'danger',
        3 :'warning',
        4 :'success'
      }
      return statusMap[status]
    },
    statusNameFilter(status) {
      const statusNameMap = {
        1 :'审核中',
        2 :'审核失败',
        3 :'被隐藏',
        4 :'正常'
      }
      return statusNameMap[status]
    }
  },
  methods: {
    load: function() {
      console.log('start request')
      configApi.getVideoManageList({}).then((resp) => {
        console.log(resp)
        if (resp.errno !== 0) {
          this.$data.list = []
          return
        }
        this.$data.list = resp.data.video_list
        this.$data.count = resp.data.page_data.count
      }).catch((err) => {
        console.log(err)
      })
    },
    statusOp: function(path, id) {
      axios.post(path, {
        video_id: id,
      }).then((res) => {
        console.log(res)
        if (res.data.errno !== 0) {
          this.$notify.error({
            title: '发送失败',
            message: res.errmsg
          })
          return
        }
        console.log("submitted")
        this.$notify.info({
          title: '状态变更完成',
          message: ''
        })
        this.load()
      }).catch((error) => {
        console.log(error)
        this.$notify.error({
          title: '发送失败',
          message: '服务器开小差了，请稍后再试~'
        })
      })
    },
    handleUpdate: function (id, videoName, videoDesc) {
      this.$data.dialogFormVisible = true
      this.$data.temp.id = id
      this.$data.temp.name = videoName
      this.$data.temp.desc = videoDesc
    },
    handleCancel: function () {
      this.$data.dialogFormVisible = false
      this.$data.temp.id = 0
      this.$data.temp.name = ''
      this.$data.temp.desc = ''
    },
    handleReSubmit: function (id) {
      this.statusOp('/funanime/server/api/outer/video/manage/reSubmit', id)
    },
    handleHide: function(id) {
      this.statusOp('/funanime/server/api/outer/video/manage/hide', id)
    },
    handleRemove: function(id) {
      this.statusOp('/funanime/server/api/outer/video/manage/remove', id)
    },
    handleShow: function (id) {
      this.statusOp('/funanime/server/api/outer/video/manage/show', id)
    },
    handleSubmit: function () {
      console.log(this.$data.temp)
      axios.post('/funanime/server/api/outer/video/manage/update', {
        video_id: this.$data.temp.id,
        video_name: this.$data.temp.name,
        video_desc: this.$data.temp.desc
      }).then((res) => {
        console.log(res)
        if (res.data.errno !== 0) {
          this.$notify.error({
            title: '发送失败',
            message: res.errmsg
          })
          return
        }
        console.log("submitted")
        this.$notify.info({
          title: '更新完成',
          message: '重新推送审核中，请等待审核通过'
        })
        this.handleCancel()
        this.load()
      }).catch((error) => {
        console.log(error)
        this.$notify.error({
          title: '发送失败',
          message: '服务器开小差了，请稍后再试~'
        })
      })
    }
  },
  data () {
    return {
      list: [],
      page: 1,
      size: 100,
      count: 1,
      dialogFormVisible: false,
      dialogTitle: "编辑视频信息",
      temp:{
        id: 0,
        name: "",
        desc: ""
      }
    }
  }
}
</script>

<style scoped>
  #content {
    margin: 30px 100px 30px 100px;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .el-form-item div {
    display: flex;
    margin: 0 0 10px 0;
  }
</style>
