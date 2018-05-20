<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <span class="search-title">客户姓名/手机号：</span>
      <el-input  @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入客户姓名或手机号" v-model="listQuery.queryStr">
      </el-input>
      <el-button class="filter-item" icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="正在加载" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" :label="$t('table.id')" width="65"  type="index">
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('table.clientname')">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" :label="$t('table.clientncode')">
        <template slot-scope="scope">
          <span>{{scope.row.clientncode}}</span>
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
      <el-table-column width="160px" :label="$t('table.createtime')">
        <template slot-scope="scope">
          {{scope.row.inputTime | parseTime('{y}-{m}-{d} {h}:{i}')}}
        </template>
      </el-table-column>
      <el-table-column  :label="$t('table.devicenametype')" min-width="100px">
        <template slot-scope="scope">
           <el-row>
             <el-col :span="6" v-for="item in scope.row.device">
                {{item.type|statusFilter}}
                <el-tooltip class="item" effect="dark" :content="item.state|statusType" placement="top">
                  <template v-if="item.state==0">
                    <svg-icon class-name='msg-icon' icon-class="offline" style="color:#AAAAAA" />
                  </template>
                  <template v-else-if="item.state==1">
                   <svg-icon class-name='msg-icon' icon-class="normal" style="color:#49A32F" />
                  </template>
                   <template v-else>
                   <svg-icon class-name='msg-icon' icon-class="unone" style="color:#D89948"/>
                  </template>
                </el-tooltip>
             </el-col>
           </el-row>
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
import { fetchList } from '@/api/article'
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
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      search:null,
      listQuery: {
        'queryStr': '',
        'pageSize': 20,
        'pageNum': 1
      },
      dtype:null,
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
    statusType(status) {
      const statusMap = {
        0: '离线',
        1: '在线',
        2: '未绑定'
      }
      return statusMap[status]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      const List = []
      fetchList(JSON.stringify(this.listQuery)).then(response => {
        this.list = response.data.data.list
        for(let i=0 ; i<this.list.length ; i++){
            if(this.list[i].device.length!=0){
              for(let j=0 ; j<3;j++){
                if(!this.list[i].device[j]){
                  this.list[i].device.push({type:j+1,state:2})
                }
              }
            }else{
              this.list[i].device.push({type:1,state:2},{type:2,state:2},{type:3,state:2});
            }
        }
        console.log(this.list)
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
