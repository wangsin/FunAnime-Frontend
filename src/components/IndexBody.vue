<template>
    <el-main>
      <el-row :gutter="5">
        <el-col :span="16">
          <el-card class="main-pic"></el-card>
        </el-col>
        <el-col :span="8" style="height: 100%">
          <div style="height: 50%">
            <el-card class="single-box"></el-card>
            <el-card class="single-box"></el-card>
          </div>
        </el-col>
      </el-row>
    </el-main>
</template>

<script>
export default {
  name: 'IndexBody',
  data () {
    return {
      currentDate: new Date()
    }
  }
}
</script>

<style scoped>
  .main-pic {
    height: 100%;
  }

  .single-box {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
