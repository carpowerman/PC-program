<template>
  <basic-container>
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
              <el-table>
                <el-table-column
                  label="客户名称">
                </el-table-column>
                <el-table-column
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
            </el-col>
          </el-row>
        </div>
    </template>
  </basic-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(['orgTree']),
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'orgFullName'
      }
    }
  },
  mounted() {
    if(this.orgTree.length === 0) {
      this.$store.dispatch('GetOrgTree').then((res) => {
        console.log(res);
      })
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  }
}
</script>
<style lang="scss" scoped>
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
</style>
