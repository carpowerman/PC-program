<template>
<basic-container>
    <template v-slot:header>评分规则</template> 
    <template v-slot:body>
        <div class="score-rule">
            <el-row ref='chTop'>
              <el-col :span=24 class='add-button'>
                <el-button type="warning" class='ch-button' @click='addrow'>
                     <i class='el-icon-plus'></i>新增行
                </el-button>
              </el-col>
            </el-row>
          <el-tabs type="border-card" class='tabTable' v-model="activeName" @tab-click="handleTabClick">
            <el-tab-pane :label="item.name" :value="item.id" v-for="(item,index) in ruleTable" :key="index" >
              <pc-table :ch-table="item.tabDatas" 
              @initTableData='handTableData' 
              @current-change='changeCurrent'
              @size-change='changeSize'>
                  <template slot='itemName' slot-scope="props">
                   <el-select v-model="props.obj.row.itemName" disabled placeholder="请选择">
                    <el-option  key="0" label="N" value="0"></el-option>
                    
                    </el-select>
                </template>
                  <template slot='chooseType' slot-scope="props">
                   <el-select v-model="props.obj.row.chooseType" placeholder="请选择">
                     <el-option  key="0"
                              label="N"
                              value="0"></el-option>
                     <el-option  key="1"
                              label="Y"
                              value="1"></el-option>
                    </el-select>
                </template>
                 <template slot='disabledFlag' slot-scope="props">
                   <el-select v-model="props.obj.row.disabledFlag" placeholder="请选择">
                     <el-option  key="0"
                              label="启用"
                              value="0"></el-option>
                     <el-option  key="1"
                              label="禁用"
                              value="1"></el-option>
                    </el-select>
                </template>
              </pc-table>
            </el-tab-pane>
          </el-tabs>
           <el-row ref='chFoot'>
              <el-col :span=24 class='add-button'>
                <el-button type="warning" class='ch-button' @click='saveTable'>保存</el-button>
                <el-button type="warning" class='ch-button' @click='cancel'>取消</el-button>
              </el-col>
            </el-row>
        </div>
    </template>
  </basic-container>
</template>

<script>
  import pcTable from '@/components/tableComponent/main'
  import {getScoringRulesList} from '@/api/scoringRules'
  
  export default {
    name: "score-rules",
    components: {
      pcTable
    },
    data: () => ({
        activeName:'',
        currentId:0,
        ruleTable:[
          {
          id:1,
          name:'加分项',
          tabDatas:{
            tableData:[],
            tableHeight:0,
            tableLabel:[{
                prop: 'orderNum',
                title: '序号',
                width: '50',
                fixed: true,
                tdType:'1'
                },
                {
                  prop: 'itemName',
                  title: '项目名称',
                  width: '200',
                  tdType:'2'
                },
                {
                  prop: 'score',
                  title: '分值',
                  width: '80',
                  tdType:'1'
                },
                {
                  prop: 'chooseType',
                  title: '选项值',
                  width: '100',
                  tdType:'2'
                }, {
                  prop: 'disabledFlag',
                  title: '操作',
                  width: '100',
                  tdType:'2'
                }
              ],
              tableOption:false,//操作
              currentPage:1,
              pageSize:1,
              total:1,
           }
        },{
          id:2,
          name:'扣分项',tabDatas:{
          tableData:[],
          tableHeight:0,
          tableLabel:[{
            prop: 'orderNum',
            title: '序号',
            width: '150',
             tdType:'1'
                },
                {
                  prop: 'itemName',
                  title: '项目名称',
                  width: '200',
                  tdType:'2'
                },
                {
                  prop: 'score',
                  title: '分值',
                  width: '80',
                  tdType:'1'
                },
                {
                  prop: 'chooseType',
                  title: '选项值',
                  width: '100',
                  tdType:'2'
                }, {
                  prop: 'disabledFlag',
                  title: '操作',
                  width: '100',
                  tdType:'2'
                }],
        tableOption:false,//操作
        currentPage:1,
        pageSize:1,
        total:1,
        }},{
          id:3,
          name:'拒绝项',tabDatas:{
          tableData:[],
          tableHeight:0,
          tableLabel:[{
                prop: 'orderNum',
                title: '序号',
                width: '50',
                fixed: true,
                tdType:'1'
                },
                {
                  prop: 'itemName',
                  title: '项目名称',
                  width: '200',
                  tdType:'2'
                },
                {
                  prop: 'score',
                  title: '分值',
                  width: '80',
                  tdType:'1'
                },
                {
                  prop: 'chooseType',
                  title: '选项值',
                  width: '100',
                  tdType:'2'
                }, {
                  prop: 'disabledFlag',
                  title: '操作',
                  width: '100',
                  tdType:'2'
                }],
        tableOption:false,//操作
        currentPage:1,
        pageSize:1,
        total:1,
        }}],
    }),
    created: function () {
   
    },
    mounted() {
       this.initData();
      window.onresize = () => {
      return (() => {
        this.getHeight()
      })()
        }
    },
    methods: {
      initData(){
        var that=this;
        that.getHeight();
        let params={
          "itemType":0,
          "pageSize":that.ruleTable[that.currentId].tabDatas.pageSize,
          "currentPage":that.ruleTable[that.currentId].tabDatas.currentPage
        }
          getScoringRulesList(params).then(res=>{
            console.log(res,'res')
            let re=res.data.data
            re.content.forEach(ele => {
              ele.disabledFlag=String(ele.disabledFlag)
              ele.chooseType=String(ele.chooseType)
            });
            that.ruleTable[that.currentId].tabDatas.tableData=re.content;
            that.ruleTable[that.currentId].tabDatas.currentPage=re.pages;
            that.ruleTable[that.currentId].tabDatas.pageSize=re.pageSize;
            that.ruleTable[that.currentId].tabDatas.total=re.total;
            // that.ruleTable[that.currentId].tabDatas.tableData.total=re.total;
          })
      },
      addrow(){
          let listData={};
          let dataLength=this.ruleTable[this.currentId].tabDatas.tableData.length;
             listData=this.ruleTable[this.currentId].tabDatas.tableData[dataLength-1]
            this.ruleTable[this.currentId].tabDatas.tableData.push(listData)
            console.log(this.ruleTable[this.currentId].tabDatas.tableData,'111')
      },
      getHeight() {
        let pageTopHeight = this.$refs.chTop.$el.offsetHeight;
        let pageFootHeight = this.$refs.chFoot.$el.offsetHeight;
        this.ruleTable[this.currentId].tabDatas.tableHeight = document.body.clientHeight - pageTopHeight -pageFootHeight- 380;
      },
      handleTabClick(val){
         this.currentId=Number(val.index)
         this.initData();
      },
      saveTable(){},
      cancel(){},
      handTableData(val){
        console.log(val)
      },
      changeSize(val){
      this.ruleTable[this.currentId].tabDatas.pageSize=val;
      this.initData();
          console.log(`每页 ${val} 条`);
      },
      changeCurrent(val){
        console.log(val,'val')
      },

    },

    
  }
</script>

<style lang="scss">
.score-rule{
  .add-button{
    text-align:right;
  }
  .el-button--warning{
     color:rgba(2,2,2,1);
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
      background:rgba(246,197,6,1);
      border-radius:3px 0px 0px 0px;
      color:rgba(2,2,2,1);
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
    color:rgba(2,2,2,1);
}
  .el-tabs--border-card>.el-tabs__header{
    background-color: #fff;
  }
}
  .el-table{
    .el-select{
      width:100%;
    }
  }
</style>