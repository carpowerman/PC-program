<template>
  <basic-container class="container">
    <template v-slot:header>机构管理</template>
    <template v-slot:body>
        <div class="body">

          <!-- 第一行 -->
          <el-row>
            <!-- 操作按钮组 -->
            <el-col :span="24" class="search">
                <el-button-group>
                    <el-button type="primary" size="medium" icon="el-icon-plus" @click.native="addNodeDialog = true" v-if='permit.org_add'>新增</el-button>
                    <el-button type="primary" size="medium" icon="el-icon-delete" @click="nodeDelete" v-if='permit.org_delete'>删除</el-button>
                </el-button-group>
            </el-col>
          </el-row>

          <!-- 第二行 -->
          <el-row>
            <!-- 树 -->
            <el-col :span="6">
                <div class="left-tree" :style="{height:heightData}" >
                    <el-tree
                    :data="orgTree"
                     node-key="id"
                    :props="defaultProps"
                    :default-expanded-keys="defaultExpandedKeys"
                    @node-click="handleNodeClick"></el-tree>
                </div>
            </el-col>

            <!-- 表单 -->
            <el-col :span="18">
              <template v-if="selectedNode.id">
                <el-form label-width="120px" :model="selectedNode" :rules="rules" ref="saveNodeForm">
                  <el-form-item label="上级机构">
                    <el-input v-model="selectedNode.parentName" size="medium" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="机构全称" prop="orgFullName">
                    <el-input v-model="selectedNode.orgFullName" size="medium"></el-input>
                  </el-form-item>
                  <el-form-item label="机构简称" prop="orgSimpleName">
                    <el-input v-model="selectedNode.orgSimpleName" size="medium"></el-input>
                  </el-form-item>
                   <el-form-item label="负责人" prop="header">
                    <el-input v-model="selectedNode.header" size="medium"></el-input>
                  </el-form-item>
                   <el-form-item label="负责人手机号" prop="headerMobile">
                    <el-input v-model="selectedNode.headerMobile" size="medium"></el-input>
                  </el-form-item>
                   <el-form-item label="门店地址" prop="address">
                    <el-input v-model="selectedNode.address" size="medium"></el-input>
                  </el-form-item>
                  <el-form-item label="机构类型">
                    <el-radio disabled v-model="selectedNode.orgType" :label=0>公司</el-radio>
                    <el-radio disabled v-model="selectedNode.orgType" :label=1>部门</el-radio>
                  </el-form-item>
                  <el-form-item v-if='permit.org_save'>
                    <el-button type="primary" @click="nodeSave" size="medium">保存</el-button>
                  </el-form-item>
                </el-form>
              </template>
            </el-col>
          </el-row>
        </div>

        <el-dialog title="新增机构" :visible.sync="addNodeDialog">
          <el-form label-width="120px" ref="addNodeForm" :model="addNode" :rules="rules">
            <el-form-item label="上级机构">
              <el-cascader
                v-model="addNode.parentId"
                size="medium"
                :options="cascaderOrgTree"
                :props="defaultProps"
                :show-all-levels="false">
              </el-cascader>
            </el-form-item>
            <el-form-item label="机构编码" prop="orgNo">
              <el-input v-model="addNode.orgNo" size="medium"></el-input>          
            </el-form-item>
            <el-form-item label="机构全称" prop="orgFullName">
              <el-input v-model="addNode.orgFullName" size="medium"></el-input>
            </el-form-item>
            <el-form-item label="机构简称" prop="orgSimpleName">
              <el-input v-model="addNode.orgSimpleName" size="medium"></el-input>
            </el-form-item>
             <el-for-item label="负责人" prop="header">
                <el-input v-model="addNode.header" size="medium"></el-input>
             </el-for-item>
                   <el-form-item label="负责人手机号" prop="headerMobile">
                    <el-input v-model="addNode.headerMobile" size="medium"></el-input>
                  </el-form-item>
                   <el-form-item label="门店地址" prop="address">
                    <el-input v-model="addNode.address" size="medium"></el-input>
            </el-form-item>
            <el-form-item label="机构类型" prop="orgType">
              <el-radio v-model="addNode.orgType" :label=0>公司</el-radio>
              <el-radio v-model="addNode.orgType" :label=1>部门</el-radio>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button @click="addNodeDialog = false">取 消</el-button>
            <el-button type="primary" @click="nodeAdd">确 定</el-button>
          </div>
        </el-dialog>
    </template>
  </basic-container>
</template>

<script>
import { mapGetters } from "vuex";
import { deepClone } from '@/util/util';
import { deleteOrgNode, saveOrgNode, addOrgNode } from '@/api/organization';
export default {
  computed: {
    ...mapGetters(['orgTree','menu']),
    cascaderOrgTree() {
      let corgTree = deepClone(this.orgTree);
      corgTree.forEach((item) => {
        this.cascaderMenuRe(item);
      });
      return corgTree;
    },
    defaultExpandedKeys() {
      let temp = [];
      this.orgTree.forEach((item) => {
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
      permit:{},
      heightData:'',
      defaultProps: {
        children: 'children',
        label: 'orgFullName',
        value: 'id',
        checkStrictly: true,
        emitPath: false
      },
      selectedNode: {},
      addNode: {
        parentId: "",
        orgFullName: "",
        orgSimpleName: "",
        orgNo: "",
        header: "",
        headerMobile: "",
        address: "",
        orgType: "",
        orderNum: "",
      },
      rules: {
        parentId: [
          { required: true, message: '请选择上级机构', trigger: 'change' }
        ],
        orgNo: [
          { required: true, message: '请填写机构映射', trigger: 'change' }
        ],
        orgFullName: [
          { required: true, message: '请填写机构全称', trigger: 'blur' }
        ],
        orgSimpleName: [
          { required: true, message: '请填写机构简称', trigger: 'blur' }
        ],
       
        header: [
          { required: true, message: '请填写负责人', trigger: 'blur' }
        ],
        headerMobile: [
          { required: true, message: '请填写手机号', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请填写地址', trigger: 'blur' }
        ],
        orgType: [
          { required: true, message: '请选择机构类型', trigger: 'change' }
        ]
      },
      addNodeDialog: false,
    }
  },
  created() {
    this.opPermit();
    if(this.orgTree.length === 0) {
      this.$store.dispatch('GetOrgTree').then();
    }
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
     opPermit() {
      let _thisPermitArr = [];
      let _thisPermit = {};
      this.menu.forEach((item) => {
       if(item.permissionNo == 'sys') {
          item.children.forEach((item) => {
            if(item.permissionNo == 'sys_org') _thisPermitArr = deepClone(item.children);
          });
        }
      });
      _thisPermitArr.forEach((item) => {
        _thisPermit[item.permissionNo] = item.isPermit;
      });
      this.$set(this, 'permit', _thisPermit);
      console.log(this.permit,'222')
    },
      getHeight() {
      this.heightData = document.body.clientHeight -250+'px';
      },
    handleNodeClick(data) {
      this.$set(this, 'selectedNode', deepClone(data));
    },
    nodeDelete() {
      if(!this.selectedNode.id) {
        this.$notify.error({ title: '删除失败', message: '请选择一个机构。' });
        return false;
      }
      this.$confirm('确认删除该机构？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOrgNode({
          id: this.selectedNode.id
        }).then((res) => {
          if(res.data.code === 0) {
            this.$notify.success({ title: '删除成功', message: '该机构已被删除。' });
            this.$store.dispatch('GetOrgTree').then();
          }
        })
        
      })
    },
    nodeSave() {
      this.$refs.saveNodeForm.validate((val) => {
        if(val) {
          saveOrgNode(this.selectedNode).then((res) => {
            if(res.data.code === 0) {
              this.$notify.success({ title: '保存成功', message: '该机构信息已被修改。' });
              this.$store.dispatch('GetOrgTree').then();
            }
          });
        }
      })
    },
    nodeAdd() {
      this.$refs.addNodeForm.validate((val) => {
        if(val) {
          addOrgNode(this.addNode).then((res) => {
            if(res.data.code === 0) {
              this.$notify.success({ title: '新增成功', message: '新增机构成功。' });
              this.$store.dispatch('GetOrgTree').then();
              this.addNodeDialog = false;
              this.$set(this, 'addNode', {
                parentId: "",
                orgFullName: "",
                orgSimpleName: "",
                orgNo: "",
                orgType: "",
                header: "",
                headerMobile: "",
                address: "",
                orderNum: ""
              });
            }
          }).catch(() => {
            this.$notify.error({ title: '新增失败', message: '网络错误。' });
          });
        }
      })

    },
    cascaderMenuRe(item) {
      item.disabled = false;
      if(item.children.length === 0) {
        delete item.children
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
.left-tree {
    width: 100%;
    padding-right: 15px;
    overflow: auto;
}
</style>
