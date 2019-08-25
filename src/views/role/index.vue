<template>
  <basic-container class="container">
    <template v-slot:header>角色管理</template>
    <template v-slot:body>
        <div class="body">
          <el-row class="row">

            <!-- 查询 -->
            <el-col :span="19" class="search">
              <template v-if="permit.sys_role_search">
                <div class="search-input">
                  <el-input v-model="tableGet.searchContent" placeholder="用户名" size="medium"></el-input>
                </div>
                <el-button size="medium" type="primary" @click="handleSearchClick">查询</el-button>
              </template>
            </el-col>

            <!-- 新增 -->
            <el-col :span="5" class="add">
               <template v-if="permit.sys_role_add">
                  <el-button icon="el-icon-plus" type="primary" size="medium" @click="addRoleDialog = true">新增</el-button>
              </template>
            </el-col>
          </el-row>
          <el-row class="row" style="flex-grow: 1;">
            <el-col :span="24" style="height: 100%" id="tableBlock">
              <!-- 表格 -->
              <el-table :data="tableData.content" v-loading="tableLoading" :height="tableHeight">
                <el-table-column
                  prop="roleName"
                  label="角色名">
                </el-table-column>
                <el-table-column
                  prop="roleNo"
                  label="角色标识">
                </el-table-column>
                <el-table-column
                  prop="remark"
                  label="角色描述">
                </el-table-column>
                <el-table-column
                  label="数据权限"
                  prop="dataPermTypeDesc">
                </el-table-column>
                <el-table-column
                  label="目录权限">
                  <template slot-scope="scope">
                   <el-button size="mini" @click="handleMenuDialog(scope.row)" v-if="permit.sys_role_set">设置</el-button>  <!-- v-if="permit.sys_role_set" -->
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEditDialog(scope.row)" v-if="permit.sys_role_edit">编辑</el-button>
                    <el-button size="mini" @click="handleDeleteRole(scope.row)" v-if="permit.sys_role_delete">删除</el-button>
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


          <!-- 新增角色 -->
          <el-dialog title="新增角色" :visible.sync="addRoleDialog">
            <el-form label-width="120px" ref="addRoleForm" :model="addRole" :rules="rules">
              <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="addRole.roleName" size="medium"></el-input>
              </el-form-item>
              <el-form-item label="角色标识" prop="roleNo">
                <el-input v-model="addRole.roleNo" size="medium"></el-input>
              </el-form-item>
              <el-form-item label="角色描述">
                <el-input v-model="addRole.remark" size="medium"></el-input>
              </el-form-item>
              <el-form-item label="数据权限" prop="dataPermType">
                <el-select size="medium" v-model="addRole.dataPermType">
                  <el-option v-for="(item, index) in dataPermission.dataPermission" :key="index" :label="item.text" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-tree
                  v-if="addRole.dataPermType == 4"
                  ref="addRoleOrgTree"
                  :data="orgTree"
                  :props="defaultOrgProps"
                  show-checkbox>
                </el-tree>
              </el-form-item>
            </el-form>
            <div slot="footer">
              <el-button @click="addRoleDialog = false">取 消</el-button>
              <el-button type="primary" @click="handleAddRole" size="medium">确 定</el-button>
            </div>
          </el-dialog>

          <!-- 编辑角色 -->
          <el-dialog title="编辑角色" :visible.sync="editRoleDialog">
            <el-form label-width="120px" ref="editRoleForm" :model="selectedRole" :rules="rules">
              <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="selectedRole.roleName" size="medium"></el-input>
              </el-form-item>
              <el-form-item label="角色标识">
                <el-input v-model="selectedRole.roleNo" :disabled="true" size="medium"></el-input>
              </el-form-item>
              <el-form-item label="角色描述">
                <el-input v-model="selectedRole.remark" size="medium"></el-input>
              </el-form-item>
              <el-form-item label="数据权限" prop="dataPermType">
                <el-select size="medium" v-model="selectedRole.dataPermType">
                  <el-option v-for="(item, index) in dataPermission.dataPermission" :key="index" :label="item.text" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-tree
                  v-if="selectedRole.dataPermType == 4"
                  ref="editRoleOrgTree"
                  :data="orgTree"
                  :props="defaultOrgProps"
                  show-checkbox
                  :check-strictly="true"
                  node-key="id"
                  :default-checked-keys="comRoleOrg">
                </el-tree>
              </el-form-item>
            </el-form>
            <div slot="footer">
              <el-button @click="editRoleDialog = false">取 消</el-button>
              <el-button type="primary" @click="handleEditRole">保 存</el-button>
            </div>
          </el-dialog>


          <!-- 菜单弹窗 -->
          <el-dialog title="菜单权限" :visible.sync="menuDialog">
            <el-tree
              ref="roleMenuTree"
              :data="menu"
              :props="defaultProps"
              show-checkbox
              :check-strictly="true"
              node-key="id"
              :default-checked-keys="selectedRolePermit">
            </el-tree>
            <div slot="footer">
              <el-button @click="menuDialog = false">取 消</el-button>
              <el-button type="primary" @click="handleRoleMenu">保 存</el-button>
            </div>
          </el-dialog>
        </div>
    </template>
  </basic-container>
</template>

<script>
import { getRoleList, editRole, delRole, addRole, roleInfo, addPermRole } from '@/api/role';
import { deepClone } from '@/util/util';
import { mapState, mapGetters } from 'vuex';
export default {
  computed: {
    
    ...mapState(['dataPermission']),
    ...mapGetters(['menu', 'orgTree']),
    comRoleOrg() {
      let temp = [];
      if(this.selectedRoleInfo.orgs) {
        this.selectedRoleInfo.orgs.forEach((item) => {
          temp.push(item.id);
        })
      }
      return temp;
    }
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'permissionName',
        value: 'id',
        checkStrictly: true,
        emitPath: false
      },
      defaultOrgProps: {
        children: 'children',
        label: 'orgFullName',
        value: 'id',
        checkStrictly: true,
        emitPath: false
      },
      tableLoading: false,
      rules: {
        roleName: [
          { required: true, message: '角色名不能为空', trigger: 'blur' }
        ],
        roleNo: [
          { required: true, message: '角色标识不能为空', trigger: 'blur' },
        ]
      },
      tableData: {},
      tableGet: {
        roleName: '',
        paging: true,
        pageNum: 1,
        pageSize: 10,
        searchContent: ""
      },
      addRoleDialog: false,
      addRole: {
        roleName: "",
        roleNo: "",
        remark: "",
        dataPermType: ""
      },
      editRoleDialog: false,
      selectedRole: {},
      selectedRoleInfo: {},
      selectedRolePermit: [],
      menuDialog: false,
      tableHeight: 0,
      permit:{}
    }
  },
  created() {
    if(this.orgTree.length === 0) {
      this.$store.dispatch('GetOrgTree').then();
    }
    this.opPermit();
    this.tableDateGet();
  },
  mounted() {
    this.initTableHeight();
    window.onresize = () => {
      return (() => {
        this.initTableHeight()
      })()
    }
  },
  methods: {
    initTableHeight() {
      let pH = document.getElementById("tableBlock").offsetHeight;
      this.tableHeight = pH - 60;
    },
    tableDateGet() {
      const that = this;
      this.tableLoading = true;
      getRoleList(that.tableGet).then((res) => {
        if(res.data.code === 0) {
          const data = res.data.data;
          that.$set(that, 'tableData', deepClone(data));
          this.tableLoading = false;
        }
      }).catch(()=> {
        this.$notify.error({ title: '获取数据失败', message: '网络连接错误。' });
      });
    },
    handleSearchClick() {
      this.tableGet.pageNum = 1;
      this.tableDateGet();
    },
    handleCurrentChange() {
      this.tableDateGet();
    },
    handleDeleteRole(obj) {
      this.$confirm('确认删除该用户吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRole({ id: obj.id }).then(() => {
          this.$notify.success({ title: '删除成功', message: '该用户已被删除。' });
          this.tableDateGet();
        });
      })
    },
    handleAddRole() {
      this.$refs.addRoleForm.validate((val) => {
        if(val) {
          if(this.addRole.dataPermType === 4) {
            let temp = this.$refs.addRoleOrgTree.getCheckedNodes(false, true);
            this.addRole.orgs = [];
            temp.forEach((item) => {
              this.addRole.orgs.push({
                id: item.id
              });
            });
          }
          addRole(this.addRole).then((res) => {
            if(res.data.code === 0) {
              this.$notify.success({ title: '添加成功', message: '已添加新用户。' });
              this.tableDateGet();
              this.addRoleDialog = false;
              this.$set(this, 'addRole', {
                roleName: "",
                roleNo: "",
                remark: "",
                dataPermType: ""
              });
            }
          }).catch(() => {
            this.$notify.error({ title: '添加失败', message: '网络错误。' });
          });
        }
      })
    },
    handleEditDialog(obj) {
      this.$set(this, 'selectedRole', deepClone(obj));
      roleInfo({ id: obj.id }).then((res) => {
        if(res.data.code === 0) {
          this.$set(this, 'selectedRoleInfo', res.data.data);
          this.editRoleDialog = true;
        }
      }).catch(() => {
        this.$notify.error({ title: '打开失败', message: '网络错误。' });
      });
    },
    handleEditRole() {
      this.$refs.editRoleForm.validate((val) => {
        if(val) {
          delete this.selectedRole.permission;
          if(this.selectedRole.dataPermType === 4) {
            let temp = this.$refs.editRoleOrgTree.getCheckedNodes(false, true);
            let tempArr = [];
            temp.forEach((item) => {
              tempArr.push({
                id: item.id
              });
            });
            this.selectedRole.orgs = tempArr;
          } else {
            delete this.selectedRole.orgs;
          }
          editRole(this.selectedRole).then((res) => {
            if(res.data.code === 0) {
              this.$notify.success({ title: '保存成功', message: '编辑已保存。' });
              this.tableDateGet();
              this.editRoleDialog = false;
            }
          }).catch(() => {
            this.$notify.error({ title: '保存失败', message: '网络错误。' });
          });
        }
      });
    },
    handleMenuDialog(obj) {
      roleInfo({ id: obj.id }).then((res) => {
        if(res.data.code === 0) {
          this.$set(this, 'selectedRoleInfo', deepClone(res.data.data));
          let temp = [];
          this.selectedRoleInfo.permissions.forEach((item) => {
            temp.push(item.id);
          });
          this.$set(this, 'selectedRolePermit', temp);
          this.menuDialog = true;
          this.$refs.roleMenuTree.setCheckedNodes(temp);
        }
      })

    },
    handleRoleMenu() {
      let temp = this.$refs.roleMenuTree.getCheckedNodes(false, true);
      let tempArr = [];
      temp.forEach((item) => {
        tempArr.push({ id: item.id });
      });
      addPermRole({
        id: this.selectedRoleInfo.id,
        permissions: tempArr
      }).then((res) => {
        if(res.data.code === 0) {
          this.$notify.success({ title: '保存成功', message: '编辑已保存。' });
          this.menuDialog = false;
        }
      }).catch(() => {
        this.$notify.error({ title: '保存失败', message: '网络错误' });
      })
    },
      opPermit() {
      let _thisPermitArr = [];
      let _thisPermit = {};
      console.log(this.menu,'this.menu')
      this.menu.forEach((item) => {
        if(item.permissionNo == 'sys') {
          item.children.forEach((item) => {
            if(item.permissionNo == 'sys_role') _thisPermitArr = deepClone(item.children);
          });
        }
      });
      _thisPermitArr.forEach((item) => {
        _thisPermit[item.permissionNo] = item.isPermit;
      });
      this.$set(this, 'permit', _thisPermit);
      console.log(this.permit,'12121')
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
  height: 100%;
  display: flex;
  flex-direction: column;
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
