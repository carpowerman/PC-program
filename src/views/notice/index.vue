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
              <template v-if="permit.sys_notice_add">
                <el-button type="primary" size="medium" @click="addNoticeDialog = true" icon="plus">新 增</el-button>
              </template>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <!-- 表格 -->
              <el-table :data="tableData.content" :height="tableHeight">
                <el-table-column
                  prop="title"
                  label="公告标题">
                </el-table-column>
                <el-table-column
                  prop="content"
                  label="公告内容">
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEditNoticeDialog(scope.row)" v-if="permit.sys_notice_edit">编辑</el-button>
                    <el-button size="mini" @click="handledeleteNotice(scope.row)" v-if="permit.sys_notice_delete">删除</el-button>
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

          <!-- 新增公告 -->
          <el-dialog title="新增公告" :visible.sync="addNoticeDialog">
            <el-form label-width="120px" ref="addNoticeForm" :model="addNotice" :rules="rules">
              <el-form-item label="公告标题" prop="title">
                <el-input v-model="addNotice.title" size="medium"></el-input>
              </el-form-item>
              <el-form-item label="公告内容" prop="content">
                <el-input type="textarea" v-model="addNotice.content" size="medium"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer">
              <el-button @click="addNoticeDialog = false">取 消</el-button>
              <el-button type="primary" @click="handleAddNotice" size="medium">确 定</el-button>
            </div>
          </el-dialog>

          <!-- 编辑公告 -->
          <el-dialog title="编辑公告" :visible.sync="editNoticeDialog">
            <el-form label-width="120px" ref="editNoticeForm" :model="selectedNotice" :rules="rules">
              <el-form-item label="公告标题" prop="title">
                <el-input v-model="selectedNotice.title" size="medium"></el-input>
              </el-form-item>
              <el-form-item label="公告内容" prop="content">
                <el-input type="textarea" v-model="selectedNotice.content" size="medium"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer">
              <el-button @click="editNoticeDialog = false">取 消</el-button>
              <el-button type="primary" @click="handleEditNotice" size="medium">确 定</el-button>
            </div>
          </el-dialog>
        </div>
    </template>
  </basic-container>
</template>

<script>
import { getNotice } from '@/api/home';
import { addNotice, editNotice ,delNotice} from '@/api/notice';
import { deepClone } from '@/util/util';
import { mapGetters } from "vuex";
export default {
   computed: {
    ...mapGetters(['menu']),
   },
  data() {
    return {
      tableHeight:'',
      tableData: {},
      tableGet: {
        paging: 'true',
        pageNum: 1,
        pageSize: 10,
      },
      rules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
        ]
      },
      addNoticeDialog: false,
      addNotice: {},
      editNoticeDialog: false,
      selectedNotice: {},
        permit: {}
    }
  },
  created() {
    this.tableDateGet();
    this.opPermit();
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
            if(item.permissionNo == 'sys_notice') _thisPermitArr = deepClone(item.children);
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
      this.tableHeight = document.body.clientHeight -350;
      },
    tableDateGet() {
      const that = this;
      getNotice(that.tableGet).then((res) => {
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
    handleAddNotice() {
      this.$refs.addNoticeForm.validate((val) => {
        if(val) {
          addNotice(this.addNotice).then((res) => {
            if(res.data.code === 0) {
              this.$notify.success({ title: '添加成功', message: '已添加新公告' });
              this.addNoticeDialog = false;
              this.addNotice = {};
              this.tableDateGet();
            }
          });
        }
      });
    },
    handledeleteNotice(obj){
      let paramId={
        id:obj.id
      }
          delNotice(paramId).then((res) => {
            if(res.data.code === 0) {
              this.$notify.success({ title: '删除成功', message: '公告已删除' });
              this.tableDateGet();
            }
          })
    },
    handleEditNoticeDialog(obj) {
      this.$set(this, 'selectedNotice', obj);
      this.editNoticeDialog = true;
    },
    handleEditNotice() {
      this.$refs.editNoticeForm.validate((val) => {
        if(val) {
          editNotice(this.selectedNotice).then((res) => {
            if(res.data.code === 0) {
              this.$notify.success({ title: '修改成功', message: '公告已修改' });
              this.editNoticeDialog = false;
              this.tableDateGet();
            }
          })
        }
      })
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
