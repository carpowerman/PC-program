<template>
  <basic-container class="container">
    <template v-slot:header>菜单管理</template>
    <template v-slot:body>
        <div class="body">
          <el-row>
            <!-- 操作按钮组 -->
            <el-col :span="24" class="search">
                <el-button-group>
                    <el-button type="primary" icon="el-icon--plus">新增</el-button>
                    <el-button type="primary" icon="el-icon-edit">编辑</el-button>
                    <el-button type="primary" icon="el-icon-delete">删除</el-button>
                </el-button-group>
            </el-col>
          </el-row>
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
            <el-col :span="18">
              <template v-if="selectedNode.permissionNo">
                <div class="item-input">
                    <label>父节点ID</label>
                    <div class="input-block">
                        <el-input v-model="selectedNode.parentId" size="medium" :disabled="true"></el-input>
                    </div>
                </div>
                <div class="item-input">
                    <label>父节点名称</label>
                    <div class="input-block">
                        <el-input v-model="selectedNode.parentName" size="medium" :disabled="true"></el-input>
                    </div>
                </div>
                <div class="item-input">
                    <label>节点ID</label>
                    <div class="input-block">
                        <el-input v-model="selectedNode.id" size="medium" :disabled="true"></el-input>
                    </div>
                </div>
                <div class="item-input">
                    <label>节点权限映射</label>
                    <div class="input-block">
                        <el-input v-model="selectedNode.permissionNo" size="medium" :disabled="true"></el-input>
                    </div>
                </div>
                <div class="item-input">
                    <label>节点名称</label>
                    <div class="input-block">
                        <el-input v-model="selectedNode.permissionName" size="medium"></el-input>
                    </div>
                </div>
                <div class="item-input">
                    <label>节点类型</label>
                    <div class="input-block">
                        <el-radio disabled v-model="radio" label="0">目录</el-radio>
                        <el-radio disabled v-model="radio" label="1">菜单</el-radio>
                        <el-radio disabled v-model="radio" label="2">操作</el-radio>
                    </div>
                </div>
                <div class="item-input button-item">
                    <el-button type="primary">保存</el-button>
                </div>
              </template>
            </el-col>
          </el-row>
        </div>
    </template>
  </basic-container>
</template>

<script>
import { mapGetters } from "vuex";
import { deepClone } from '@/util/util';
export default {
  computed: {
    ...mapGetters(['menu']),
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'permissionName'
      },
      radio: "0",
      selectedNode: {}
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleNodeClick(data) {
      this.$set(this, 'selectedNode', deepClone(data));
      this.radio = data.permissionType + '';
    },
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
.item-input {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    label {
        width: 100px;
    }
    .input-block {
        width: 370px;
    }
}
.button-item {
    padding-left: 100px;
    margin-top: 20px;
}
</style>
