<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <span class="search-title">设备编号：</span>
     <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"  placeholder="请输入设备编号" v-model="listQuery.queryStr"> 
      </el-input> 
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <el-table :key='tableKey' :row-class-name="tableRowClassName" :data="list" v-loading="listLoading" element-loading-text="正在加载" border fit highlight-current-row
      style="width: 100%" >
      <el-table-column align="center" :label="$t('table.id')" width="65"  type="index">
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('table.clientname')">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px"  :label="$t('table.clientntel')">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column width="300px"  :label="$t('table.clientaddress')">
        <template slot-scope="scope">
          <span>{{scope.row.address}}</span>
        </template>
      </el-table-column>
        <el-table-column width="200px"  :label="$t('table.devicenumber')">
        <template slot-scope="scope">
          <span>{{scope.row.hostNo}}</span>
        </template>
      </el-table-column>
       <el-table-column width="200px"  :label="$t('table.devicetype')">
        <template slot-scope="scope">
          <span>{{scope.row.type|statusFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" :label="$t('table.alarmtime')">
        <template slot-scope="scope">
          {{scope.row.inputTime | parseTime('{y}-{m}-{d} {h}:{i}')}}
        </template>
      </el-table-column>
     <el-table-column :label="$t('table.alarmwhy')">
        <template slot-scope="scope">
          <span style="color:#D83B2B">{{scope.row.reason}}</span>
        </template>
      </el-table-column>
    </el-table>
  <!-- 分页器 -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNum" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
 
</template>
<script>
import { fetchArticle } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'complexTable',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        "queryStr": "",
        "pageSize": 10,
        "pageNum":1
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  filters: {
    statusFilter(status) {
        const statusMap = {
        1: '烟雾报警器',
        2: '燃气报警器',
        3: '空气质量&湿度'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  created() {
    this.getList()
  },
 watch: {
    Plish: function() {
      this.getList()
    }
},
  computed: {
    Plish() {
       return this.$store.getters.plush
    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
        if (row.checked === 0) {
          return 'warning-row';
        } else{
          return '';
        }
    },
    getList() {
      this.listLoading = true
      fetchArticle(JSON.stringify(this.listQuery)).then(response => {
        console.log(response.data.data.list)
        this.list = response.data.data.list
        this.total = response.data.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      if(this.listQuery.queryStr != null&&this.listQuery.queryStr != ""){
        this.getList()
      }else{
         this.$message({
          message: '输入的信息不能为空',
          type: 'warning'
        })
      }
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>
<style>
.el-table .warning-row {
    background: #fde2e2;
  }
</style>

