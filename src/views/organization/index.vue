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
                    <el-button type="primary" size="medium" icon="el-icon-plus" @click.native="addNodeDialog = true">新增</el-button>
                    <el-button type="primary" size="medium" icon="el-icon-delete" @click="nodeDelete">删除</el-button>
                </el-button-group>
            </el-col>
          </el-row>

          <!-- 第二行 -->
          <el-row>
            <!-- 树 -->
            <el-col :span="6">
                <div class="left-tree">
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
                  <el-form-item label="父节点名称">
                    <el-input v-model="selectedNode.parentName" size="medium" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="节点名称" prop="orgFullName">
                    <el-input v-model="selectedNode.orgFullName" size="medium"></el-input>
                  </el-form-item>
                  <el-form-item label="节点类型">
                    <el-radio disabled v-model="selectedNode.orgType" :label=0>公司</el-radio>
                    <el-radio disabled v-model="selectedNode.orgType" :label=1>部门</el-radio>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="nodeSave" size="medium">保存</el-button>
                  </el-form-item>
                </el-form>
              </template>
            </el-col>
          </el-row>
        </div>

        <el-dialog title="新增节点" :visible.sync="addNodeDialog">
          <el-form label-width="120px" ref="addNodeForm" :model="addNode" :rules="rules">
            <el-form-item label="父节点名称">
              <el-cascader
                v-model="addNode.parentId"
                size="medium"
                :options="cascaderOrgTree"
                :props="defaultProps"
                :show-all-levels="false">
              </el-cascader>
            </el-form-item>
            <el-form-item label="节点编码" prop="orgNo">
              <el-input v-model="addNode.orgNo" size="medium"></el-input>          
            </el-form-item>
            <el-form-item label="节点名称" prop="orgFullName">
              <el-input v-model="addNode.orgFullName" size="medium"></el-input>
            </el-form-item>
            <el-form-item label="节点简称" prop="orgSimpleName">
              <el-input v-model="addNode.orgSimpleName" size="medium"></el-input>
            </el-form-item>
            <el-form-item label="节点类型" prop="orgType">
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
    ...mapGetters(['orgTree']),
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
        orgType: "",
        orderNum: "",
      },
      rules: {
        parentId: [
          { required: true, message: '请选择父节点', trigger: 'change' }
        ],
        orgNo: [
          { required: true, message: '请填写节点映射', trigger: 'change' }
        ],
        orgFullName: [
          { required: true, message: '请填写节点名称', trigger: 'blur' }
        ],
        orgSimpleName: [
          { required: true, message: '请填写节点简称', trigger: 'change' }
        ],
        orgType: [
          { required: true, message: '请选择节点类型', trigger: 'change' }
        ]
      },
      addNodeDialog: false,
    }
  },
  created() {
    if(this.orgTree.length === 0) {
      this.$store.dispatch('GetOrgTree').then();
    }
  },
  methods: {
    handleNodeClick(data) {
      this.$set(this, 'selectedNode', deepClone(data));
    },
    nodeDelete() {
      if(!this.selectedNode.id) {
        this.$notify.error({ title: '删除失败', message: '请选择一个节点。' });
        return false;
      }
      this.$confirm('确认删除该节点？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOrgNode({
          id: this.selectedNode.id
        }).then((res) => {
          if(res.data.code === 0) {
            this.$notify.success({ title: '删除成功', message: '该节点已被删除。' });
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
              this.$notify.success({ title: '保存成功', message: '该节点信息已被修改。' });
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
              this.$notify.success({ title: '新增成功', message: '新增节点成功。' });
              this.$store.dispatch('GetOrgTree').then();
              this.addNodeDialog = false;
              this.$set(this, 'addNode', {
                parentId: "",
                orgFullName: "",
                orgSimpleName: "",
                orgNo: "",
                orgType: "",
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
}
</style>
