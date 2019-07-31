<template>
  <basic-container class="container">
    <template v-slot:header>客户管理</template>
    <template v-slot:body>
        <div class="body">
          <el-row>

            <!-- 查询 -->
            <el-col :span="19" class="search">
              <div class="search-input">
                <el-input v-model="input" placeholder="店门名称/客户手机号"></el-input>
              </div>
              <el-button>查询</el-button>
            </el-col>

            <!-- 新增 -->
            <el-col :span="5" class="add">
              <el-button icon="el-icon-plus">新增</el-button>
            </el-col>
          </el-row>
          <el-row>
            <!-- 树 -->
            <el-col :span="6">
              <el-tree
              :data="orgTree"
              :props="defaultProps"
              accordion
              @node-click="handleNodeClick"></el-tree>
            </el-col>
            <el-col :span="18">
              <!-- 表格 -->
              <el-table :data="tableData.content">
                <el-table-column
                  prop="custName"
                  label="客户名称">
                </el-table-column>
                <el-table-column
                  prop="custMobile"
                  label="客户手机号">
                </el-table-column>
                <el-table-column
                  label="意向购车金额">
                </el-table-column>
                <el-table-column
                  label="购车顾问">
                </el-table-column>
                <el-table-column
                  label="所属门店">
                </el-table-column>
                <el-table-column
                  label="门店地址">
                </el-table-column>
                <el-table-column
                  label="状态">
                </el-table-column>
                <el-table-column
                  label="操作">
                </el-table-column>
              </el-table>
              <div class="table-foot">
                <el-pagination
                  layout="total, prev, pager, next, jumper"
                  :page-size=10
                  :total="tableData.total"
                  :current-page.sync="tableGet.pageNum"
                  @current-change="handleCurrentChange">
                </el-pagination>
              </div>
            </el-col>
          </el-row>
        </div>
    </template>
  </basic-container>
</template>

<script>
import { getCustomerList } from '@/api/customer';
import { mapGetters } from "vuex";
import { deepClone } from '@/util/util';
export default {
  computed: {
    ...mapGetters(['orgTree']),
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'orgFullName'
      },
      tableData: {},
      tableGet: {
        orgId: '',
        paging: 'true',
        pageNum: 1,
        pageSize: 10,
      },
      input: ''
    }
  },
  created() {
    this.tableDateGet();
  },
  mounted() {
    if(this.orgTree.length === 0) {
      this.$store.dispatch('GetOrgTree').then();
    }
  },
  methods: {
    tableDateGet() {
      const that = this;
      getCustomerList(that.tableGet).then((res) => {
        if(res.data.code === 0) {
          const data = res.data.data;
          that.$set(that, 'tableData', deepClone(data));
        }
      }).catch(()=> {
        this.$notify.error({ title: '获取数据失败', message: '网络连接错误。' });
      });
    },
    handleNodeClick(data) {
      this.tableGet.orgId = data.id;
      this.tableDateGet();
    },
    handleCurrentChange() {
      this.tableDateGet();
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
}
.body {
  width: 100%;
}

.search {
  .search-input {
    display: inline-block;
    width: 200px;
    margin-right: 20px;
  }
}

.add {
  display: flex;
  flex-direction: row-reverse;
}

.table-foot {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  margin-top: 20px;
}
</style>
