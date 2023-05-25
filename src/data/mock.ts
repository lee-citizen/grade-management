// 模拟请求接口假数据
import questions from './questions'
import students from './students'
import tests from './tests'

const dataMap = {
  questions,
  students,
  tests,

}
// 'questions'|'students'|'tests'
// 商品列表 (搜索)
function request({ type, page, limit, keyword }: { type: 'questions' | 'students' | 'tests'; page: number; limit: number; keyword: string }) {
  return new Promise((resolute, reject) => {
    const data = {
      list: [], // 数据列表
      totalCount: 0, // 总数量
      totalPage: 0, // 总页数
      hasNext: false,
    }

    // 符合关键字的记录
    let keywordList = []
    if (!keyword || keyword === '全部') {
      // 搜索全部数据
      keywordList = dataMap[type]
    }
    else {
      // 关键字搜索
      // if (keyword === '母婴')
      //   keyword = '婴' // 为这个关键词展示多条数据
      for (let i = 0; i < dataMap[type].length; i++) {
        const item = dataMap[type][i]
        if (item.name.includes(keyword))
          keywordList.push(item)
      }
    }

    // 分页
    for (let i = (page - 1) * limit; i < page * limit; i++) {
      if (i >= keywordList.length)
        break
      data.list.push(keywordList[i])
    }
    // console.log(data.list)

    // 汇总数据
    data.totalCount = keywordList.length // 总数量
    // 总页数 = 总数量 / 每页条数
    data.totalPage = Math.ceil(data.totalCount / limit) // 总页数
    // 判断是否有下一页
    data.hasNext = page < data.totalPage

    // 模拟接口请求成功
    resolute(data)
  }).catch((err) => {
    // 模拟接口请求成功
    reject(err)
  })
}
export default {
  request,
}
