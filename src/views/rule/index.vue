<template>
<basic-container>
    <template v-slot:header>评分规则</template> 
    <template v-slot:body>
      <el-tabs type="card" v-model="tabsDefault" @tab-click="handleTabClick">
        <el-tab-pane label="加分项" name="add">
          <el-row>
            <el-col :span="19" style="height: 1px;"></el-col>
            <el-col :span="5" class="add">
              <el-button type="primary" size="medium" icon="el-icon-plus" @click="addRuleDialog = true">新 增</el-button>
            </el-col>
          </el-row>
          <el-table :data="tableData.content">
            <el-table-column
              label="排序"
              prop="orderNum">
            </el-table-column>
            <el-table-column
              label="项目名称"
              prop="itemName">
            </el-table-column>
            <el-table-column
              label="分值"
              prop="score">
            </el-table-column>
            <el-table-column
              label="选择值">
              <template slot-scope="scope">
                <template v-if="scope.row.chooseType == 0">Y</template>
                <template v-else>N</template>
              </template>
            </el-table-column>
            <el-table-column
              label="状态">
              <template slot-scope="scope">
                <template v-if="scope.row.disabledFlag == 0">启用</template>
                <template v-else>禁用</template>
              </template>
            </el-table-column>
            <el-table-column
              label="编辑">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleEditRuleDialog(scope.row)">编 辑</el-button>
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
        </el-tab-pane>
        <el-tab-pane label="减分项" name="sub">
          <el-row>
            <el-col :span="19" style="height: 1px;"></el-col>
            <el-col :span="5" class="add">
              <el-button type="primary" size="medium" icon="el-icon-plus" @click="addRuleDialog = true">新 增</el-button>
            </el-col>
          </el-row>
          <el-table :data="tableData.content">
            <el-table-column
              label="排序"
              prop="orderNum">
            </el-table-column>
            <el-table-column
              label="项目名称"
              prop="itemName">
            </el-table-column>
            <el-table-column
              label="分值"
              prop="score">
            </el-table-column>
            <el-table-column
              label="选择值">
              <template slot-scope="scope">
                <template v-if="scope.row.chooseType == 0">Y</template>
                <template v-else>N</template>
              </template>
            </el-table-column>
            <el-table-column
              label="状态">
              <template slot-scope="scope">
                <template v-if="scope.row.disabledFlag == 0">启用</template>
                <template v-else>禁用</template>
              </template>
            </el-table-column>
            <el-table-column
              label="编辑">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleEditRuleDialog(scope.row)">编 辑</el-button>
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
        </el-tab-pane>
        <el-tab-pane label="拒绝项" name="refuse">
          <el-row>
            <el-col :span="19" style="height: 1px;"></el-col>
            <el-col :span="5" class="add">
              <el-button type="primary" size="medium" icon="el-icon-plus" @click="addRuleDialog = true">新 增</el-button>
            </el-col>
          </el-row>
          <el-table :data="tableData.content">
            <el-table-column
              label="排序"
              prop="orderNum">
            </el-table-column>
            <el-table-column
              label="项目名称"
              prop="itemName">
            </el-table-column>
            <el-table-column
              label="分值"
              prop="score">
            </el-table-column>
            <el-table-column
              label="选择值">
              <template slot-scope="scope">
                <template v-if="scope.row.chooseType == 0">N</template>
                <template v-else>Y</template>
              </template>
            </el-table-column>
            <el-table-column
              label="状态">
              <template slot-scope="scope">
                <template v-if="scope.row.disabledFlag == 0">启用</template>
                <template v-else>禁用</template>
              </template>
            </el-table-column>
            <el-table-column
              label="编辑">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleEditRuleDialog(scope.row)">编 辑</el-button>
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
        </el-tab-pane>
      </el-tabs>

      <!-- 新增 -->
      <el-dialog title="新增规则" :visible.sync="addRuleDialog">
        <el-form label-width="120px" ref="addRuleForm" :model="addRule" :rules="rules">
          <el-form-item label="类型">
            <el-select v-model="tableGet.itemType" :disabled="true">
              <el-option label="加分项" :value="0"></el-option>
              <el-option label="减分项" :value="1"></el-option>
              <el-option label="拒绝项" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序" prop="orderNum">
            <el-input v-model="addRule.orderNum" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="项目名称" prop="itemName">
            <el-input v-model="addRule.itemName" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="分值" prop="score">
            <el-input v-model="addRule.score" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="选择值" prop="chooseType">
            <el-select v-model="addRule.chooseType">
              <el-option label="N" :value="0"></el-option>
              <el-option label="Y" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="addRuleDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleAddRole" size="medium">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 编辑 -->
      <el-dialog title="编辑规则" :visible.sync="editRuleDialog">
        <el-form label-width="120px" ref="editRuleForm" :model="selectedRule" :rules="rules">
          <el-form-item label="排序" prop="orderNum">
            <el-input v-model="selectedRule.orderNum" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="项目名称" prop="itemName">
            <el-input v-model="selectedRule.itemName" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="分值" prop="score">
            <el-input v-model="selectedRule.score" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="选择值" prop="chooseType">
            <el-select v-model="selectedRule.chooseType" size="medium">
              <el-option label="N" :value="0"></el-option>
              <el-option label="Y" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="disabledFlag">
            <el-select v-model="selectedRule.disabledFlag" size="medium">
              <el-option label="启用" :value="0"></el-option>
              <el-option label="禁用" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="editRuleDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleEditRole" size="medium">确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </basic-container>
</template>

<script>
import { getRuleList, saveRule } from '@/api/rule';
import { deepClone } from '@/util/util';
export default {
  data() {
    return {
      tabsDefault: 'add',
      rules: {
        orderNum: [{ required: true, message: '排序值不能为空', trigger: 'blur' }],
        itemName: [{ required: true, message: '项目名称不能为空', trigger: 'blur' }],
        score: [{ required: true, message: '分值不能为空', trigger: 'blur' }],
        chooseType: [{ required: true, message: '请选择选择值', trigger: 'blur' }],
        disabledFlag: [{ required: true, message: '请选择状态', trigger: 'blur' }],
      },
      tableGet: {
        itemType: 0,
        paging: 'true',
        pageNum: 1,
        pageSize: 10,
      },
      tableData: {},
      addRuleDialog: false,
      addRule: {},
      editRuleDialog: false,
      selectedRule: {}
    }
  },
  created() {
    this.tableDateGet();
  },
  methods: {
    tableDateGet() {
      getRuleList(this.tableGet).then((res) => {
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
    handleChooseTypeChange(obj) {
      saveRule([obj]).then((res) => {
        if(res.data.code === 0) {
          this.$notify.success({ title: '修改成功', message: '字段值已修改。' });
          this.tableDateGet();
        }
      })
    },
    handleTabClick(val){
      this.tableGet.itemType = val.index * 1;
      this.tableDateGet();
    },
    handleAddRole() {
      console.log(this.$refs);
      this.$refs.addRuleForm.validate((val) => {
        if(val) {
          this.addRule.itemType = this.tableGet.itemType;
          saveRule([this.addRule]).then((res) => {
            if(res.data.code === 0) {
              this.$notify.success({ title: '添加成功', message: '规则已添加。' });
              this.tableDateGet();
              this.addRuleDialog = false;
              this.$refs['addRuleForm'].resetFields()
            }
          })
        }
      })
    },
    handleEditRuleDialog(obj) {
      this.$set(this, 'selectedRule', obj);
      this.editRuleDialog = true;
    },
    handleEditRole() {
      this.$refs.editRuleForm.validate((val) => {
        if(val) {
          saveRule([this.selectedRule]).then((res) => {
            if(res.data.code === 0) {
              this.$notify.success({ title: '修改成功', message: '字段值已修改。' });
              this.editRuleDialog = false;
              this.tableDateGet();
            }
          })
        }
      })
    }
  },

  
}
</script>

<style lang="scss">
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