<script setup lang="ts">
const props = defineProps<{ id: string }>()
const router = useRouter()
const tabList = ref([
  {
    label: '考试监控',
    name: 'monitor',
  },
  {
    label: '答案分布',
    name: 'answer',
  },
  {
    label: '得分统计',
    name: 'statistics',
  },

])
</script>

<template>
  <div hfull overflow-x-auto p-4 pb-20>
    <el-card class="box-card">
      <el-button link type="primary" @click="router.back()">
        返回
      </el-button>
      <div mb-3>
        <p mt-3 font-bold>
          当前试题《{{ props.id }}》
        </p>
      </div>
      <el-tabs type="border-card">
        <el-tab-pane v-for="item in tabList" :key="item.name" :label="item.label">
          <div v-if="item.name === 'monitor'">
            <Monitor />
          </div>
          <div v-if="item.name === 'answer'">
            <Answer />
          </div>
          <div v-if="item.name === 'statistics'">
            <Statistics />
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
