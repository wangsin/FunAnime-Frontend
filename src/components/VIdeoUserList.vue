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
              <el-button v-if="row.status !== 1" type="primary" size="mini">
                编辑
              </el-button>
              <el-button v-if="row.status === 2" size="mini">
                重新提交
              </el-button>
              <el-button v-if="row.status === 4" type="warning" size="mini" @click="() => {row.status = 3}">
                隐藏
              </el-button>
              <el-button v-if="row.status === 3" type="warning" size="mini" @click="() => {row.status = 4}">
                取消隐藏
              </el-button>
              <el-button v-if="row.status !== 1" type="danger" size="mini">
                删除
              </el-button>
              <el-button v-if="row.status === 1" type="text" disabled>
                审核中 无法操作
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import * as configApi from '../api/config'
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
  data () {
    return {
      list: [],
      page: 1,
      size: 100,
      count: 1
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
