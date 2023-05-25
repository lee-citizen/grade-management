<script setup lang="ts">
import api from '~/data/mock'
import { useStore } from '~/store'

defineOptions({
  name: 'IndexPage',
})
interface TestData {
  list?: any[]
  totalCount?: number
  totalPage?: number
  hasNext?: boolean
}

const clientInfo = computed(() => {
  return useStore().state.clientInfo
})
const router = useRouter()
const currentpage: Ref<number> = ref(1)
const limit: Ref<number> = ref(10)
const keyword: Ref<string> = ref('')
const testData: Ref<TestData> = ref({})
const layout = 'total, sizes, prev, pager, next, jumper'
function getTestData() {
  api.request({ type: 'tests', page: currentpage.value, limit: limit.value, keyword: keyword.value }).then((res: any) => {
    testData.value = res
  })
}

onMounted(() => {
  getTestData()
})

function handleSizeChange(e: number) {
  limit.value = e
  getTestData()
}
function handleCurrentChange(e: number) {
  currentpage.value = e
  getTestData()
}
function go(path: string) {
  router.push(path)
}
</script>

<template>
  <div hfull overflow-x-auto px-2 pb-10 pt-2 sm:px-4 sm:pt-4>
    <div mb-3 w-300px flex items-center>
      <el-input v-model="keyword" clearable placeholder="请输入名称" h32px />
      <ElButton class="ml-2" type="primary" @click="getTestData">
        搜索
      </ElButton>
    </div>
    <el-card class="box-card">
      <el-table :data="testData.list" style="width: 100%">
        <el-table-column prop="name" :width="clientInfo.width > 768 ? 'auto' : 190" label="考试名称" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <div flex items-center text-center>
              <span>{{ scope.row.status ? '进行中' : '已结束' }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="参考人数" />
        <el-table-column prop="total_score" label="总分" />
        <el-table-column fixed="right" label="操作" width="80">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="go(`/analysis/${scope.row.name}`)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div mt-4 flex flex-col items-center>
        <el-pagination
          background :current-page="currentpage" :page-size="limit"
          :layout="clientInfo.width > 768 ? layout : 'prev, pager, next'" :total="testData.totalCount"
          @size-change="handleSizeChange" @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
// 媒体查询当屏幕小于768像素时
@media screen and (max-width: 768px) {
  .box-card {
    :deep(.el-card__body) {
      padding: 5px !important;
    }

    :deep(.cell) {
      font-size: 14px;
    }
  }

}
</style>
