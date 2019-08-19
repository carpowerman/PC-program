<template>
  <basic-container class="container">
    <template v-slot:header>用户管理</template>
    <template v-slot:body>
        <div class="body">
          <el-row class="row">

            <!-- 查询 -->
            <el-col :span="19" class="search">
              <div class="search-input">
                <el-input v-model="tableGet.searchContent" placeholder="用户名,手机号     " size="medium"></el-input>
              </div>
              <el-button size="medium" type="primary" @click="handleSearchClick">查询</el-button>
            </el-col>

            <!-- 新增 -->
            <el-col :span="5" class="add">
              <el-button icon="el-icon-plus" type="primary" size="medium" @click="addStaffDialog = true">新增</el-button>
            </el-col>
          </el-row>
          <el-row class="row">
            <!-- 树 -->
            <!-- <el-col :span="6">
              <el-tree
              :data="comLeftOrgTree"
              node-key="id"
              :props="defaultProps"
              :default-expanded-keys="defaultExpandedKeys"
              @node-click="handleNodeClick"></el-tree>
            </el-col> -->
            <el-col :span="24">
              <!-- 表格 -->
              <el-table :data="tableData.content" v-loading="tableLoading" :height="tableHeight">
                <el-table-column
                  prop="username"
                  label="用户名">
                </el-table-column>
                <el-table-column
                  prop="nickname"
                  label="昵称">
                </el-table-column>
                <el-table-column
                  prop="mobile"
                  label="手机号">
                </el-table-column>
                <el-table-column
                  prop="orgName"
                  label="所属机构">
                </el-table-column>
                <el-table-column
                  label="角色">
                  <template slot-scope="scope">
                    <span v-for="(item, index) in scope.row.roles" :key="index" class="tableCellRole">{{item.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEditDialog(scope.row)">编辑</el-button>
                    <el-button size="mini" @click="handleDeleteStaff(scope.row)">删除</el-button>
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


          <!-- 新增用户 -->
          <el-dialog title="新增用户" :visible.sync="addStaffDialog">
            <el-form label-width="120px" ref="addStaffForm" :model="addStaff" :rules="rules">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="addStaff.username" size="medium"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="enPassword">
                <el-input v-model="addStaff.enPassword" size="medium" show-password></el-input>
              </el-form-item>
              <el-form-item label="昵称" prop="nickname">
                <el-input v-model="addStaff.nickname" size="medium"></el-input>
              </el-form-item>
              <el-form-item label="所属部门" prop="orgId">
                <el-cascader
                  v-model="addStaff.orgId"
                  size="medium"
                  :options="cascaderOrgTree"
                  :props="defaultProps"
                  :show-all-levels="false">
                </el-cascader>
              </el-form-item>
              <el-form-item label="手机号" prop="mobile">
                <el-input v-model="addStaff.mobile" size="medium"></el-input>          
              </el-form-item>
              <el-form-item label="角色" prop="rolesArr">
                <el-select v-model="addStaff.rolesArr" multiple size="medium">
                  <el-option
                    v-for="(item, index) in role"
                    :key="index"
                    :label="item.roleName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer">
              <el-button @click="addStaffDialog = false">取 消</el-button>
              <el-button type="primary" @click="handleAddStaff" size="medium">确 定</el-button>
            </div>
          </el-dialog>

          <!-- 编辑用户 -->
          <el-dialog title="编辑用户" :visible.sync="editStaffDialog">
            <el-form label-width="120px" ref="addNodeForm" :model="selectedStaff" :rules="rules">
              <el-form-item label="用户ID">
                <el-input v-model="selectedStaff.id" :disabled="true" size="medium"></el-input>
              </el-form-item>
              <el-form-item label="用户名">
                <el-input v-model="selectedStaff.username" :disabled="true" size="medium"></el-input>
              </el-form-item>
              <el-form-item label="密码（不做修改请为空）">
                <el-input v-model="selectedStaff.enPassword" size="medium" show-password></el-input>
              </el-form-item>
              <el-form-item label="昵称" prop="nickname">
                <el-input v-model="selectedStaff.nickname" size="medium"></el-input>
              </el-form-item>
              <el-form-item label="所属部门" prop="orgId">
                <el-cascader
                  v-model="selectedStaff.orgId"
                  size="medium"
                  :options="cascaderOrgTree"
                  :props="defaultProps"
                  :show-all-levels="false">
                </el-cascader>
              </el-form-item>
              <el-form-item label="手机号" prop="mobile">
                <el-input v-model="selectedStaff.mobile" size="medium"></el-input>          
              </el-form-item>
              <el-form-item label="角色" prop="rolesArr">
                <el-select v-model="selectedStaff.rolesArr" multiple size="medium">
                  <el-option
                    v-for="(item, index) in role"
                    :key="index"
                    :label="item.roleName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer">
              <el-button @click="editStaffDialog = false">取 消</el-button>
              <el-button type="primary" @click="handleEditStaff">保 存</el-button>
            </div>
          </el-dialog>
        </div>
    </template>
  </basic-container>
</template>

<script>
import { getStaffList, deleteStaff, addStaff, editStaff } from '@/api/staff';
import { mapGetters } from "vuex";
import { deepClone, encryption } from '@/util/util';
export default {
  computed: {
    ...mapGetters(['orgTree', 'role']),
    cascaderOrgTree() {
      let corgTree = deepClone(this.orgTree);
      corgTree.forEach((item) => {
        this.cascaderMenuRe(item);
      });
      return corgTree;
    },
    comLeftOrgTree() {
      return [{ orgFullName: '全部', id: 0, children: this.orgTree}]
    },
    defaultExpandedKeys() {
      let temp = [];
      this.comLeftOrgTree.forEach((item) => {
        this.comDefaultExpandedKeys(item, temp);
      })
      console.log(temp);
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
      tableHeight:"",
      defaultProps: {
        children: 'children',
        label: 'orgFullName',
        value: 'id',
        checkStrictly: true,
        emitPath: false
      },
      tableLoading: false,
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        enPassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, message: '密码必须大于等于 6 个字符', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '昵称不能为空', trigger: 'blur' }
        ],
        orgId: [
          { required: true, message: '请选择所属机构', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请填写手机号', trigger: 'blur' }
        ],
        rolesArr: [
          { required: true, message: '请选择绑定角色', trigger: 'blue' }
        ]
      },
      tableData: {},
      tableGet: {
        username: '',
        paging: 'true',
        pageNum: 1,
        pageSize: 10,
        orgId: "",
        searchContent: ""
      },
      searchUsername: "",
      addStaffDialog: false,
      addStaff: {
        username: "",
        enPassword: "",
        password: "",
        nickname: "",
        mobile: "",
        orgId: "",
        rolesArr: [],
        roles: [],
      },
      editStaffDialog: false,
      selectedStaff: {}
    }
  },
  created() {
    if(this.orgTree.length === 0) {
      this.$store.dispatch('GetOrgTree').then();
    }
    if(this.role.length === 0) {
      this.$store.dispatch('GetRoleList').then();
    }
    this.tableDateGet();
  },
   mounted() {
  this.getHeight()
      window.onresize = () => {
      return (() => {
        this.getHeight()
      })()
    }
  },
  methods: {
    getHeight() {
      this.tableHeight = document.body.clientHeight -350;
      },
    tableDateGet() {
      const that = this;
      this.tableLoading = true;
      getStaffList(that.tableGet).then((res) => {
        if(res.data.code === 0) {
          const data = res.data.data;
          that.$set(that, 'tableData', deepClone(data));
          this.tableLoading = false;
        }
      }).catch(()=> {
        this.$notify.error({ title: '获取数据失败', message: '网络连接错误。' });
      });
    },
    handleNodeClick(data) {
      this.tableGet.pageNum = 1;
      if(data.id != 0) {
        this.tableGet.orgId = data.id;
      } else {
        delete this.tableGet.orgId;
      }
      this.tableDateGet();
    },
    handleSearchClick() {
      this.tableGet.pageNum = 1;
      this.tableDateGet();
    },
    handleCurrentChange() {
      this.tableDateGet();
    },
    handleDeleteStaff(obj) {
      this.$confirm('确认删除该用户吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(obj);
        deleteStaff({ id: obj.id }).then(() => {
          this.$notify.success({ title: '删除成功', message: '该用户已被删除。' });
          this.tableDateGet();
        });
      })
    },
    handleAddStaff() {
      this.$refs.addStaffForm.validate((val) => {
        if(val) {
          let temp = encryption({
            data: this.addStaff,
            type: "Aes",
            key: "/iqichenyun.com/",
            param: ['enPassword']
          });
          this.addStaff.password = temp.enPassword;
          temp = [];
          this.addStaff.rolesArr.forEach((item) => {
            temp.push({
              id: item
            });
          });
          this.addStaff.roles = temp;
          addStaff(this.addStaff).then((res) => {
            if(res.data.code === 0) {
              this.$notify.success({ title: '添加成功', message: '已添加新用户。' });
              this.tableDateGet();
              this.addStaffDialog = false;
              this.$refs['addStaffForm'].resetFields()
              // this.$set(this, 'addStaff', {
              //   username: "",
              //   enPassword: "",
              //   password: "",
              //   nickname: "",
              //   mobile: "",
              //   orgId: "",
              //   rolesArr: [],
              //   roles: [],
              // });
            }
          }).catch(() => {
            this.$notify.error({ title: '添加失败', message: '网络错误。' });
          });
        }
      })
 
    },
    handleEditDialog(obj) {
      this.$set(this, 'selectedStaff', deepClone(obj));
      let temp = [];
      this.selectedStaff.roles.forEach((item) => {
        temp.push(item.id);
      })
      this.$set(this.selectedStaff, 'rolesArr', temp);
      this.editStaffDialog = true;
    },
    handleEditStaff() {
      let temp;
      if(this.selectedStaff.enPassword) {
        temp = encryption({
          data: this.selectedStaff,
          type: "Aes",
          key: "/iqichenyun.com/",
          param: ['enPassword']
        });
        this.selectedStaff.password = temp.enPassword;
      }
      temp = [];
      this.selectedStaff.rolesArr.forEach((item) => {
        temp.push({
          id: item
        })
      })
      this.selectedStaff.roles = temp;

      editStaff(this.selectedStaff).then((res) => {
        if(res.data.code === 0) {
          this.$notify.success({ title: '保存成功', message: '编辑已保存。' });
          this.tableDateGet();
          this.editStaffDialog = false;
        }
      }).catch(() => {
        this.$notify.error({ title: '保存失败', message: '网络错误。' });
      })
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

.row {
  margin-bottom: 20px;
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

.tableCellRole {
  color: #F6C506;
  font-size: 12px;
  padding: 3px 5px;
  background-color: #fef7db;
  margin-right: 5px;
}
</style>
