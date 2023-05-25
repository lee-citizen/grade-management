<script lang="ts" setup>
import api from '~/data/mock'
import { useStore } from '~/store'

interface StudentData {
  list: any[]
  totalCount?: number
  totalPage?: number
  hasNext?: boolean
  questions?: any[]
  index: number
}
const editVisible = ref(false)
// const router = useRouter()

const clientInfo = computed(() => {
  return useStore().state.clientInfo
})

const currentpage: Ref<number> = ref(1)
const limit: Ref<number> = ref(6)
const studentData: Ref<StudentData> = ref({ list: [], index: 0 })
const layout = 'total, sizes, prev, pager, next, jumper'

function getStudentData() {
  api.request({ type: 'students', page: currentpage.value, limit: limit.value, keyword: '' }).then((res: any) => {
    studentData.value = res
    studentData.value.list?.forEach((item: StudentData, index: number) => {
      item.index = index
    })
  })
}
function getQuestionsData(index: number) {
  api.request({ type: 'questions', page: 1, limit: 20, keyword: '' }).then((res: any) => {
    studentData.value.list[index] = {
      ...studentData.value.list?.[index],
      questions: res.list,
    }
  })
}
onMounted(() => {
  getStudentData()
})

function expandChange(e: StudentData) {
  getQuestionsData(e.index)
}
function handleSizeChange(e: number) {
  limit.value = e
  getStudentData()
}
function handleCurrentChange(e: number) {
  currentpage.value = e
  getStudentData()
}
const rules = {
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
    { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' },
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
  ],

}
const formData = ref(null)
const editInfo: Ref<StudentData> = ref({ list: [], index: 0 })
function editHandle(e: StudentData) {
  editInfo.value = e
  editVisible.value = true
}
function affirm() {
  // 表单校验
  formData.value.validate((valid) => {
    if (valid) {
      // 提交表单
      console.log(editInfo.value)

      editVisible.value = false

      ElMessage.success('提交成功！')
    }
    else {
      return false
    }
  })
}
</script>

<template>
  <div>
    <el-table :data="studentData.list" style="width: 100%" row-key="id" @expand-change="expandChange">
      <el-table-column type="expand">
        <template #default="props">
          <div m="4">
            <div flex space-x-4>
              <p m="t-0 b-2">
                考生: {{ props.row.name }}
              </p>
              <p m="t-0 b-2">
                答题数: {{ props.row.num }}
              </p>
              <p m="t-0 b-2">
                正确数: {{ props.row.correct }}
              </p>
              <p m="t-0 b-2">
                错误数: {{ props.row.num - props.row.correct }}
              </p>
              <p m="t-0 b-2">
                正确率: {{ `${Number(props.row.correct / props.row.num).toFixed(2) * 100}%` }}
              </p>
            </div>
            <el-table :data="props.row.questions">
              <el-table-column label="题目" prop="name" />
              <el-table-column label="分值" prop="score" />
              <el-table-column label="答案" prop="answer" />
              <el-table-column label="对错" prop="address">
                <template #default="scope">
                  <el-tag v-if="scope.$index % 2 === 0" type="success">
                    对
                  </el-tag>
                  <el-tag v-else type="danger">
                    错
                  </el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="score" label="分数" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column label="性别">
        <template #default="scope">
          {{ scope.row.sex === '1' ? '男' : '女' }}
        </template>
      </el-table-column>>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="editHandle(scope.row)">
            修改信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="mt-4 flex flex-col items-center">
      <el-pagination
        v-model:page-size="limit" background :current-page="currentpage"
        :layout="clientInfo.width > 768 ? layout : 'prev, pager, next'" :total="studentData.totalCount"
        @size-change="handleSizeChange" @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog v-model="editVisible" title="个人信息" width="350" append-to-body>
      <el-form ref="formData" label-width="100px" :rules="rules" :model="editInfo">
        <el-form-item label="用户名" prop="name" clearable>
          <el-input v-model="editInfo.name" />
        </el-form-item>
        <el-form-item label="年龄" prop="age" clearable>
          <el-input v-model="editInfo.age" />
        </el-form-item>
        <el-form-item label="性别" prop="sex" clearable>
          <el-radio-group v-model="editInfo.sex">
            <el-radio label="1">
              男
            </el-radio>
            <el-radio label="2">
              女
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="affirm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
