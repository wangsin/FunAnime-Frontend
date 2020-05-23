<template>
  <div id="content">
    <div class="container">
      <div class="row">
        <span style="font-size: 30px;text-align: left;font-weight: bold;">收藏的视频</span>
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
          <el-table-column label="封面图" width="150px" align="center">
            <template slot-scope="{row}">
              <img :src="row.true_img" alt="head" style="width: 100%;">
            </template>
          </el-table-column>
          <el-table-column label="视频标题">
            <template slot-scope="scope">
              {{ scope.row.title }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button type="danger" size="mini">
                取消收藏
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
    name: 'CollectList',
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
