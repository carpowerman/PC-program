 <template>
   <div>
     <el-table :data="chTable.tableData" 
               ref="orginalTable" 
               :height="chTable.tableHeight" 
               border 
               stripe
       style="width: 100%">
       <el-table-column v-for="(col,index) in chTable.tableLabel" :key='index' :type="col.type" :fixed="col.fixed"
         :prop="col.prop" :label="col.title" :min-width="col.width" :sortable="col.sort" :formatter="col.formatter"
         :show-overflow-tooltip="col.ellipsis">
       </el-table-column>
       <el-table-column v-if="chTable.status" width="100" label="状态">
         <template slot-scope="scope">
            <slot name="status" :obj="scope"></slot>
         </template>
       </el-table-column>
       <el-table-column v-if="chTable.tableOption" align="center" header-align="center" label="操作"
         :width="chTable.tableOption.width">
           <template slot-scope="scope">
              <el-button v-for="item in chTable.operation.buttons" size="small" class='option-btn' :class="item.classname ? item.classname : ''" :key="item.id"
                  @click.stop="handleOperation(scope.$index, scope.row, item.id)">{{item.label}}
              </el-button>
           </template>
       </el-table-column>
     </el-table>
     <div class="block">
       <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
         :page-size="chTable.pageSize" :current-page="chTable.pageNo" layout="prev, pager, next, jumper"
         :total="chTable.total">
       </el-pagination>
     </div>
   </div>
 </template>

 <script>
   export default {
     name: "pc-table",
     props: {
       chTable: Object
     },
     created() {
       this.inintData()
     },
     methods: {
       inintData() {
        
         this.chTable.pageSize = 2
         this.$emit('initTableData', {
           pageNo: this.chTable.pageNo,
           pageSize: this.chTable.pageSize
         });
       },
      handleOperation(a, b, id) { // 点了操作按钮触发的函数
         const data = this.chTable.operation.buttons;
         for (let i = 0; i < data.length; i++) {
            if (id === data[i].id) {
               this.$emit(data[i].Fun, a, b);
           }
        }
      },
       handleSizeChange() {
         this.$emit('initTableData', {
           pageNo: this.chTable.pageNo,
           pageSize: this.chTable.pageSize
         });
       },
       handleCurrentChange(val) {
         this.$emit('initTableData', {
           pageNo: val,
           pageSize: this.chTable.pageSize
         });
       }
     }
   }
 </script>

 <style lang='scss'>
   .el-table {
      overflow: auto;
      .option-btn{
          background: transparent;
          border: none;
          font-size: 12px;
          color:#1F65F5;
          padding:0;
      }
    }
   .block {
     text-align: right;
   }
 </style>