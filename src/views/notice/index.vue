<template>
  <basic-container class="container">
    <template v-slot:header>公告管理</template>
    <template v-slot:body>
        <div class="body">
          <el-row>

            <!-- 查询 -->
            <el-col :span="19"></el-col>

            <!-- 新增 -->
            <el-col :span="5" class="add">
                <el-button type="primary" size="medium" @click="tableDateGet" icon="plus">新 增</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <!-- 表格 -->
              <el-table :data="tableData.content">
                <el-table-column
                  prop="custName"
                  label="公告标题">
                </el-table-column>
                <el-table-column
                  prop="custMobile"
                  label="公告内容">
                </el-table-column>
                <el-table-column
                  label="查看">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleCustomerInfo(scope.row)">查看</el-button>
                  </template>
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

          <!-- 菜单弹窗 -->
          <el-dialog title="客户信息" :visible.sync="customerDialog">
            <el-table
              :data="selectedCustomer.preOrders">
              <el-table-column
                label="客户名称">
                <template slot-scope="scope">{{selectedCustomer.custName}}</template>
              </el-table-column>
              <el-table-column
                label="客户手机号">
                <template slot-scope="scope">{{selectedCustomer.custMobile}}</template>
              </el-table-column>
              <el-table-column
                label="业务员"
                prop="salerName">
              </el-table-column>
              <el-table-column
                label="所属机构"
                prop="orgName">
              </el-table-column>
              <el-table-column
                label="机构地址"
                prop="orgAddress">
              </el-table-column>
              <el-table-column
                label="状态"
                prop="statusDesc">
              </el-table-column>
            </el-table>
            <div slot="footer">
              <el-button type="primary" @click="customerDialog = false">确 定</el-button>
            </div>
          </el-dialog>
        </div>
    </template>
  </basic-container>
</template>

<script>
import { getNoticeList } from '@/api/home';
import { deepClone } from '@/util/util';
export default {
  data() {
    return {
      tableData: {},
      tableGet: {
        paging: 'true',
        pageNum: 1,
        pageSize: 10,
      },
      customerDialog: false,
      selectedCustomer: {}
    }
  },
  created() {
    this.tableDateGet();
  },
  methods: {
    tableDateGet() {
      const that = this;
      getNoticeList(that.tableGet).then((res) => {
        if(res.data.code === 0) {
          const data = res.data.data;
          that.$set(that, 'tableData', deepClone(data));
        }
      }).catch(()=> {
        this.$notify.error({ title: '获取数据失败', message: '网络连接错误。' });
      });
    },
    handleCurrentChange() {
      this.tableDateGet();
    },
    handleCustomerInfo(obj) {
      this.$set(this, 'selectedCustomer', obj);
      this.customerDialog = true;
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
