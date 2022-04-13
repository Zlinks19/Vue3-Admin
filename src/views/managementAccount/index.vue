<template>
  <div class="userLog">
    <el-row :gutter="10">
      <el-col :span="1.5">
        <el-input v-model="queryParams.value" placeholder="Please input" />
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary" @click="searchKeyWord(queryParams.value)">查询</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button @click="handleReset">重置</el-button>
      </el-col>
    </el-row>
    <el-table class="mt20" :data="state.tableData" border style="width: 100%">
      <el-table-column prop="id" label="id" align="center" />
      <el-table-column prop="name" label="名字" align="center" />
      <el-table-column prop="sex" label="性别" align="center" />
      <el-table-column prop="time" label="时间" align="center" />
      <el-table-column prop="addr" label="地址" align="center" />
    </el-table>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, reactive } from 'vue-demi'
const queryParams = reactive({ value: "" })
let state = reactive({ tableData: [], backTableData: [] })

const getList = () => {
  axios.get('/mock/system/log.json').then(res => {
    state.tableData = res.data.list
    state.backTableData = res.data.list
  })
}

const searchKeyWord = (val) => {
    if(!val) return
    console.log(val);
    state.tableData = state.tableData.filter(item => item.name.indexOf(val)>-1)
}

const handleReset = () => {
    state.tableData = JSON.parse(JSON.stringify(state.backTableData))
    queryParams.value = ""
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped>
.userLog {
  padding: 20px;
}
</style>