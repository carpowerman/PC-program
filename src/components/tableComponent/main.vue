 <template>
   <div>
     <el-table :data="chTable.tableData" 
               ref="orginalTable" 
               :height="chTable.tableHeight" 
               border 
               stripe
       style="width: 100%">
       <template v-for="(col,index) in chTable.tableLabel">
          <el-table-column v-if='col.tdType==1' :key='index' :type="col.type" :fixed="col.fixed"
          :prop="col.prop" :label="col.title" :min-width="col.width" :sortable="col.sort" :formatter="col.formatter"
          :show-overflow-tooltip="col.ellipsis"  align="center">
        </el-table-column>
        <el-table-column v-else-if='col.tdType==2' :key='index' :type="col.type" :fixed="col.fixed"
          :prop="col.prop" :label="col.title" :min-width="col.width" :sortable="col.sort" :formatter="col.formatter"
          :show-overflow-tooltip="col.ellipsis" align="center">
              <template slot-scope="scope">
                  <slot :name="col.prop" :obj="scope"></slot>
              </template>
        </el-table-column>
        </template>
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
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="chTable.currentPage"
            :page-sizes="[1, 2, 3, 40]"
            :page-size="chTable.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="chTable.total">
          </el-pagination>
       <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
         :page-size="chTable.pageSize" :current-page="chTable.pageNo" layout="prev, pager, next, jumper"
         :total="chTable.total">
       </el-pagination> -->
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
      //  this.inintData()
     },
     methods: {
      //  inintData() {
      //    this.chTable.pageSize = 2
      //    this.$emit('initTableData', {
      //      currentPage: this.chTable.currentPage,
      //      pageSize: this.chTable.pageSize
      //    });
      //  },
      handleOperation(a, b, id) { // 点了操作按钮触发的函数
         const data = this.chTable.operation.buttons;
         for (let i = 0; i < data.length; i++) {
            if (id === data[i].id) {
               this.$emit(data[i].Fun, a, b);
           }
        }
      },
       handleSizeChange(val) {
         this.$emit('size-change', val);
       },
       handleCurrentChange(val) {
         debugger;
         this.$emit('current-change', val);
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
     .el-table__body-wrapper{
        overflow: auto;
      }
    }
   .block {
     text-align: right;
   }
 </style>