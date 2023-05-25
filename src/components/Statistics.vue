<script lang="ts" setup>
import api from '~/data/mock'
import { useStore } from '~/store'

const studentData = ref([])
onMounted(() => {
  getStudentData()
})

const clientInfo = computed(() => {
  return useStore().state.clientInfo
})

function getStudentData() {
  api.request({ type: 'students', page: 1, limit: 20, keyword: '' }).then((res: any) => {
    studentData.value = res.list
  })
}

const options = computed(() => {
  const xAxis = studentData.value.map((item: any) => item.name)
  const series = studentData.value.map((item: any) => {
    return item.score
  })
  return {
    title: {
      text: '学生得分统计',
    },
    tooltip: {

    },
    xAxis: {
      data: xAxis,
    },
    yAxis: {},
    series: [
      {
        name: '姓名 分数',
        type: 'line',
        data: series,
      },

    ],
  }
})
</script>

<template>
  <div wfull flex>
    <MyChart :options="options" class="h-right-three-chart" :style="{ width: `${clientInfo.width - 100}px` }" />
  </div>
</template>

<style scoped>
.h-right-three-chart {
  height: 500px;
}
</style>
