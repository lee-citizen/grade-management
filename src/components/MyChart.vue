<script setup lang="ts">
import echarts from '~/common/ts/echarts'

const props = defineProps(['options'])
const chartRef = ref<HTMLDivElement>()
let chart: echarts.ECharts | null = null
function resizeHandler() {
  chart?.resize()
}
onMounted(() => {
  setTimeout(() => {
    initChart()
  }, 20)
  window.addEventListener('resize', resizeHandler)
})

function initChart() {
  chart = echarts.init(chartRef.value as HTMLDivElement)
  chart.setOption({
    ...props.options,
  })
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
  chart?.dispose()
})
</script>

<template>
  <div ref="chartRef" class="my-chart wfull" />
</template>

<style lang="scss" scoped></style>
