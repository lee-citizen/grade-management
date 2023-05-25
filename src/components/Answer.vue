<script lang="ts" setup>
import api from '~/data/mock'
import { useStore } from '~/store'

const questionsData = ref([])
onMounted(() => {
  getQuestionsData()
})

const clientInfo = computed(() => {
  return useStore().state.clientInfo
})

function getQuestionsData() {
  api.request({ type: 'questions', page: 1, limit: 20, keyword: '' }).then((res: any) => {
    questionsData.value = res.list
  })
}

const options = computed(() => {
  // 取出questionsData中的answer字段去重返回新数组
  const arr = questionsData.value.map((item: any) => item.answer)
  const xAxis = Array.from(new Set(arr)).sort()

  // 取出xAxis中的每个值在questionsData中answer出现的次数返回数组
  const series = xAxis.map((item: any) => {
    return questionsData.value.filter((item2: any) => item === item2.answer).length
  })

  return {
    title: {
      text: '答案分布情况以及出现次数',
    },
    tooltip: {
      formatter(params: any) {
        const value: number = params.value
        // const datas = option.series.data
        const htmlStr = `
      <div style='font-size:16px;'> ${params.name}</div>
      <p style='text-align:left;margin-top:4px;'>
        出现次数：${value}<br/>百分比：${Number(value / questionsData.value.length).toFixed(2) * 100}%
      </p>`
        return htmlStr
      },
      backgroundColor: '#324057', // 提示标签背景颜色
      textStyle: { color: '#fff' }, // 提示标签字体颜色
    },
    xAxis: {
      data: xAxis,
    },
    yAxis: {},
    series: [
      {
        name: '出现次数',
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
