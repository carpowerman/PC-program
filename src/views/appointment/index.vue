<template>
  <basic-container class="container">
    <template v-slot:header>预约管理</template>
    <template v-slot:body>
        <div class="body">
          <el-row>

            <!-- 查询 -->
            <el-col :span="19" class="search">
              <div class="search-input">
                <el-input v-model="tableGet.searchContent" placeholder="店门名称/客户手机号" size="medium"></el-input>
              </div>
              <el-button size="medium" type="primary" @click="tableDateGet">查询</el-button>
            </el-col>

            <!-- 新增 -->
            <el-col :span="5" class="add">
              <el-button icon="el-icon-plus" size="medium" type="primary" @click="handleAddAppointDialog">新增</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <!-- 表格 -->
              <el-table :data="tableData.content" style="width: 100%">
                <el-table-column
                  prop="custName"
                  label="客户名称"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="custMobile"
                  label="客户手机号"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="intentionAmount"
                  label="意向购车金额"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="salerName"
                  label="购车顾问"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="orgName"
                  label="所属门店"
                  width="190">
                </el-table-column>
                <el-table-column
                  label="状态"
                  width="120">
                  <template slot-scope="scope">
                    <span :class="{ 'appointed': scope.row.status == 0}">{{scope.row.statusDesc}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="门店地址"
                  width="250">
                </el-table-column>
                <el-table-column
                  label="操作"
                  fixed="right">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEditAppoint(scope.row)">编 辑</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  label="审核"
                  fixed="right"
                  width="200">
                  <template slot-scope="scope">
                    <el-button size="mini" v-if="scope.row.status != 0" @click="handleUpdateAppoint(scope.row, 0)">恢复为预约</el-button>
                    <el-button size="mini" type="primary" v-if="scope.row.status == 0" @click="handleUpdateAppoint(scope.row, 1)">通  过</el-button>
                    <el-button size="mini" type="primary" v-if="scope.row.status == 0" @click="handleUpdateAppoint(scope.row, 2)">不通过</el-button>
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
          <el-dialog title="新增预约" :visible.sync="addAppointDialog">
            <el-form label-width="120px" :model="addAppoint" :rules="rules" ref="addAppointForm">
              <el-form-item label="客户名称" prop="custId">
                <el-select v-model="addAppoint.custId" size="medium">
                  <el-option
                    v-for="(item, index) in customerInfo"
                    :key="index"
                    :value="item.custId"
                    :label="item.custName"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="客户手机号">
                <el-input size="medium" :disabled="true" v-model="comAddAppointCustMobild"></el-input>
              </el-form-item>
              <el-form-item label="所属门店" prop="orgId">
                <el-cascader
                  v-model="addAppoint.orgId"
                  size="medium"
                  :options="cascaderOrgTree"
                  :props="defaultProps"
                  :show-all-levels="false">
                </el-cascader>
              </el-form-item>
              <el-form-item label="意向金额" prop="intentionAmount">
                <el-input size="medium" v-model="addAppoint.intentionAmount"></el-input>
              </el-form-item>
              <el-form-item label="购车顾问" prop="salerId">
                <el-select v-model="addAppoint.salerId" size="medium">
                  <el-option
                    v-for="(item, index) in staffInfo"
                    :key="index"
                    :value="item.id"
                    :label="item.nickname"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态" prop="status">
                <el-select v-model="addAppoint.status" size="medium">
                  <el-option :value="0" label="预约"></el-option>
                  <el-option :value="1" label="审批通过"></el-option>
                  <el-option :value="2" label="审批不通过"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="业务类型" prop="carType">
                <el-select v-model="addAppoint.carType" size="medium">
                  <el-option :value="0" label="新车"></el-option>
                  <el-option :value="1" label="二手车"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="地址" prop="orgAddress">
                <el-input
                  type="textarea"
                  v-model="addAppoint.orgAddress"
                  :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="medium" type="primary" @click="handleAddAppoint">提 交</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

          <!-- 编辑窗口 -->
          <el-dialog title="编辑预约" :visible.sync="editAppointDialog">
            <el-form label-width="120px" :model="addAppoint" :rules="rules" ref="addAppointForm">
              <el-form-item label="客户名称" prop="custId">
                <el-select v-model="selectedAppoint.custId" size="medium">
                  <el-option
                    v-for="(item, index) in customerInfo"
                    :key="index"
                    :value="item.custId"
                    :label="item.custName"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属门店" prop="orgId">
                <el-cascader
                  v-model="selectedAppoint.orgId"
                  size="medium"
                  :options="cascaderOrgTree"
                  :props="defaultProps"
                  :show-all-levels="false">
                </el-cascader>
              </el-form-item>
              <el-form-item label="意向金额" prop="intentionAmount">
                <el-input size="medium" v-model="selectedAppoint.intentionAmount"></el-input>
              </el-form-item>
              <el-form-item label="购车顾问" prop="salerId">
                <el-select v-model="selectedAppoint.salerId" size="medium">
                  <el-option
                    v-for="(item, index) in staffInfo"
                    :key="index"
                    :value="item.id"
                    :label="item.nickname"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="业务类型" prop="carType">
                <el-select v-model="selectedAppoint.carType" size="medium">
                  <el-option :value="0" label="新车"></el-option>
                  <el-option :value="1" label="二手车"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button size="medium" type="primary" @click="handleEditAppoint">提 交</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

        </div>
    </template>
  </basic-container>
</template>

<script>
import { getAppointList, updateAppointStatus, AddAppointment } from '@/api/appointment';
import { getCustomerList } from '@/api/customer';
import { getStaffList } from '@/api/staff';
import { mapGetters } from "vuex";
import { deepClone } from '@/util/util';
export default {
  computed: {
    ...mapGetters(['orgTree']),
    comOrgTree() {
      return [{ orgFullName: "全部", id: 0, children: this.orgTree }];
    },
    comAddAppointCustMobild() {
      let temp = "";
      if(this.addAppoint.custId != "") {
        temp = this.customerInfo.find((item) => {
          return this.addAppoint.custId == item.custId;
        }).custMobile;
      }
      return temp;
    },
    cascaderOrgTree() {
      let corgTree = deepClone(this.orgTree);
      corgTree.forEach((item) => {
        this.cascaderMenuRe(item);
      });
      return corgTree;
    },
    defaultExpandedKeys() {
      let temp = [];
      this.comOrgTree.forEach((item) => {
        this.comDefaultExpandedKeys(item, temp);
      })
      return temp;
    },
    comDefaultExpandedKeys() {
      return (item, temp) => {
        if(item.children.length > 0) {
          temp.push(item.id);
          item.children.forEach((item) => {
            this.comDefaultExpandedKeys(item, temp);
          })
        }
      }
    }
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'orgFullName',
        value: 'id',
        checkStrictly: true,
        emitPath: false
      },
      rules: {
        custId: [
          { required: true, message: '客户名称不能为空', trigger: 'blur' }
        ],
        orgId: [
          { required: true, message: '请选择所属机构', trigger: 'blur' }
        ],
        intentionAmount: [
          { required: true, message: '请填写意向金额', trigger: 'blur' }
        ],
        salerId: [
          { required: true, message: '请选择购车顾问', trigger: 'blue' }
        ],
        status: [
          { required: true, message: '请选择预约状态', trigger: 'blue' }
        ],
        carType: [
          { required: true, message: '请选择业务类型', trigger: 'blue' }
        ],
        orgAddress: [
          { required: true, message: '请填写地址', trigger: 'blue' }
        ]
      },
      tableData: {},
      tableGet: {
        orgId: '',
        paging: true,
        pageNum: 1,
        pageSize: 8,
        searchContent: ""
      },
      addAppointDialog: false,
      customerInfo: [],
      staffInfo: [],
      addAppoint: {
        custId: "",
        custMobile: "",
        intentionAmount: "",
        salerId: "",
        orgId: "",
        orgAddress: "",
        status: "",
        carType: ""
      },
      selectedAppoint: {},
      editAppointDialog: false
    }
  },
  created() {
    if(this.$route.query.type) {
      this.$set(this.tableGet, 'status', this.$route.query.type*1);
    }
    this.tableDateGet();
  },
  mounted() {
    if(this.orgTree.length === 0) {
      this.$store.dispatch('GetOrgTree').then();
    }
  },
  methods: {
    tableDateGet() {
      getAppointList(this.tableGet).then((res) => {
        if(res.data.code === 0) {
          const data = res.data.data;
          this.$set(this, 'tableData', deepClone(data));
        }
      }).catch(()=> {
        this.$notify.error({ title: '获取数据失败', message: '网络连接错误。' });
      });
    },
    handleCurrentChange() {
      this.tableDateGet();
    },
    handleUpdateAppoint(obj, status) {
      updateAppointStatus({
        id: obj.id,
        status: status,
        salerId: ""
      }).then((res) => {
        if(res.data.code === 0) {
          this.$notify.success({ title: '审批成功', message: '预约状态已修改。' });
          this.tableDateGet();
        }
      })
    },
    handleAddAppointDialog() {
      Promise.all([
        getCustomerList({
          paging: false,
          pageNum: "",
          pageSize: ""
        }),
        getStaffList({
          type: 1,
          paging: false,
          pageNum: "",
          pageSize: ""
        })
      ]).then((resArr) => {
        const data0 = resArr[0].data;
        const data1 = resArr[1].data;
        if(data0.code === 0 && data1.code === 0) {
          this.$set(this, 'customerInfo', deepClone(data0.data.content));
          this.$set(this, 'staffInfo', deepClone(data1.data.content));
          this.addAppointDialog = true;
        }
      });
    },
    cascaderMenuRe(item) {
      item.disabled = false;
      if(item.children.length === 0) {
        delete item.children;
      } else {
        item.children.forEach((item) => {
          this.cascaderMenuRe(item);
        });
      }
    },
    handleAddAppoint() {
      this.$refs.addAppointForm.validate((val) => {
        if(val) {
          AddAppointment(this.addAppoint).then((res) => {
            if(res.data.code === 0) {
              this.$notify.success({ title: '增加成功', message: '预约列表已增加。' });
              this.addAppointDialog = false;
              this.tableDateGet();
              this.$set(this, 'addAppoint', {
                custId: "",
                custMobile: "",
                intentionAmount: "",
                salerId: "",
                orgId: "",
                orgAddress: "",
                status: "",
                carType: ""
              })
            }
          })
        }
      })
    },
    handleEditAppoint(obj) {
      this.$set(this, 'selectedAppoint', obj);
      Promise.all([
        getCustomerList({
          paging: false,
          pageNum: "",
          pageSize: ""
        }),
        getStaffList({
          type: 1,
          paging: false,
          pageNum: "",
          pageSize: ""
        })
      ]).then((resArr) => {
        const data0 = resArr[0].data;
        const data1 = resArr[1].data;
        if(data0.code === 0 && data1.code === 0) {
          this.$set(this, 'customerInfo', deepClone(data0.data.content));
          this.$set(this, 'staffInfo', deepClone(data1.data.content));
          this.editAppointDialog = true;
        }
      });
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

.appointed {
  color: #67C23A;
}
</style>
