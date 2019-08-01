<template>
  <basic-container class="container">
    <template v-slot:header>菜单管理</template>
    <template v-slot:body>
        <div class="body">

          <!-- 第一行 -->
          <el-row>
            <!-- 操作按钮组 -->
            <el-col :span="24" class="search">
                <el-button-group>
                    <el-button type="primary" icon="el-icon-plus" @click.native="addNodeDialog = true">新增</el-button>
                    <el-button type="primary" icon="el-icon-delete" @click="nodeDelete">删除</el-button>
                </el-button-group>
            </el-col>
          </el-row>

          <!-- 第二行 -->
          <el-row>
            <!-- 树 -->
            <el-col :span="6">
                <div class="left-tree">
                    <el-tree
                    :data="menu"
                    :props="defaultProps"
                    accordion
                    @node-click="handleNodeClick"></el-tree>
                </div>
            </el-col>

            <!-- 表单 -->
            <el-col :span="18">
              <el-form 
                v-if="selectedNode.permissionNo"
                label-width="120px"
                :model="selectedNode"
                :rules="rules"
                ref="saveNodeForm">
                <el-form-item label="父节点ID"><el-input v-model="selectedNode.parentId" size="medium" :disabled="true"></el-input></el-form-item>
                <el-form-item label="父节点名称"><el-input v-model="selectedNode.parentName" size="medium" :disabled="true"></el-input></el-form-item>
                <el-form-item label="节点ID"><el-input v-model="selectedNode.id" size="medium" :disabled="true"></el-input></el-form-item>
                <el-form-item label="节点权限映射"><el-input v-model="selectedNode.permissionNo" size="medium" :disabled="true"></el-input></el-form-item>
                <el-form-item label="节点路径"><el-input v-model="selectedNode.path" size="medium" :disabled="true"></el-input></el-form-item>
                <el-form-item label="节点名称" prop="permissionName"><el-input v-model="selectedNode.permissionName" size="medium"></el-input></el-form-item>
                <el-form-item label="节点类型">
                  <el-radio disabled v-model="selectedNode.permissionType" :label=0>目录</el-radio>
                  <el-radio disabled v-model="selectedNode.permissionType" :label=1>菜单</el-radio>
                  <el-radio disabled v-model="selectedNode.permissionType" :label=2>操作</el-radio>
                </el-form-item>
                <el-form-item><el-button type="primary" @click="nodeSave">保存</el-button></el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>

        <el-dialog title="新增节点" :visible.sync="addNodeDialog">
          <el-form label-width="120px" ref="addNodeForm" :model="addNode" :rules="rules">
            <el-form-item label="父节点ID">
              <el-input v-model="addNode.parentId" size="medium" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="父节点名称" prop="parentId">
              <el-cascader
                v-model="addNode.parentId"
                size="medium"
                :options="cascaderMenu"
                :props="defaultProps"
                :show-all-levels="false">
              </el-cascader>
            </el-form-item>
            <el-form-item label="节点权限映射" prop="permissionNo">
              <el-input v-model="addNode.permissionNo" size="medium"></el-input>          
            </el-form-item>
            <el-form-item label="节点路径" prop="path">
              <el-input v-model="addNode.path" size="medium"></el-input>
            </el-form-item>
            <el-form-item label="节点名称" prop="permissionName">
              <el-input v-model="addNode.permissionName" size="medium"></el-input>
            </el-form-item>
            <el-form-item label="节点类型" prop="permissionType">
              <el-radio v-model="addNode.permissionType" :label=0>目录</el-radio>
              <el-radio v-model="addNode.permissionType" :label=1>菜单</el-radio>
              <el-radio v-model="addNode.permissionType" :label=2>操作</el-radio>
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
import { deleteMenuNode, saveMenuNode, addMenuNode } from '@/api/menu';
export default {
  computed: {
    ...mapGetters(['menu']),
    cascaderMenu() {
      let cmenu = deepClone(this.menu);
      cmenu.forEach((item) => {
        this.cascaderMenuRe(item);
      });
      return cmenu;
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
      selectedNode: {},
      addNode: {
        parentId: "",
        permissionName: "",
        permissionNo: "",
        permissionType: "",
        path: "",
        orderNum: "",
        remark: ""
      },
      rules: {
        parentId: [
          { required: true, message: '请选择父节点', trigger: 'change' }
        ],
        permissionNo: [
          { required: true, message: '请填写节点映射', trigger: 'change' }
        ],
        path: [
          { required: true, message: '请填写节点路径', trigger: 'change' }
        ],
        permissionName: [
          { required: true, message: '请填写节点名称', trigger: 'change' }
        ],
        permissionType: [
          { required: true, message: '请选择节点类型', trigger: 'change' }
        ]
      },
      addNodeDialog: false,
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleNodeClick(data) {
      this.$set(this, 'selectedNode', deepClone(data));
    },
    nodeDelete() {
      let that = this;
      if(!this.selectedNode.id) {
        this.$notify.error({ title: '删除失败', message: '请选择一个节点。' });
        return false;
      }
      this.$confirm('确认删除该节点？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMenuNode({
          id: that.selectedNode.id
        }).then(() => {
          that.$notify.success({ title: '删除成功', message: '该节点已被删除。' });
          that.$store.dispatch('GetMenu').then();
        })
        
      })
    },
    nodeSave() {
      let that = this;
      this.$refs.saveNodeForm.validate((val) => {
        if(val) {
          saveMenuNode(that.selectedNode).then(() => {
              that.$notify.success({ title: '保存成功', message: '该节点信息已被修改。' });
              that.$store.dispatch('GetMenu').then();
          })
        }
      })
    },
    nodeAdd() {
      console.log(this.addNode);
      this.$refs.addNodeForm.validate((val) => {
        if(val) {
          addMenuNode(this.addNode).then(() => {
            this.$notify.success({ title: '新增成功', message: '新增节点成功。' });
          }).catch(() => {
            this.$notify.error({ title: '新增失败', message: '网络错误。' });
          });
        }
      })

    },
    cascaderMenuRe(item) {
      if(item.permissionType === 2) {
        item.disabled = true;
      } else {
        item.disabled = false;
      }
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
