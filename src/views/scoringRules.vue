<template>
  <div class="score-rule">
    <el-tabs type="border-card" class='tabTable' v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane :label="item.name" :value="item.id" v-for="(item,index) in ruleTable" :key="index" >
         <pc-table :ch-table="item.tabDatas">
         </pc-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import pcTable from '@/components/tableComponent/main'
  export default {
    name: "score-rules",
    components: {
      pcTable
    },
    data: () => ({
        activeName:'',
        ruleTable:[{name:'加分项',tabDatas:{
          tableData:[{},{},{}],
          tableLabel:[{
            prop: 'orderNo',
            title: '序号',
            width: '150',
            fixed: true
          },
          {
            prop: 'entryName',
            title: '项目名称',
            width: '200'
          },
          {
            prop: 'Score',
            title: '分值',
            width: '200'
          },
          {
            prop: 'optionValue',
            title: '选项值',
            width: '200'
          }],
        tableOption:true,//操作
        operation: {
          width: '100',
          buttons: [{
              label: '新增行',
              methods: 'addRow',
              classname:'add-btn'
            },
          ]
        },
        }},{name:'扣分项',tabDatas:{
          tableData:[{},{}],
          tableLabel:[{
            prop: 'orderNo',
            title: '序号',
            width: '150',
            fixed: true
          },
          {
            prop: 'entryName',
            title: '项目名称',
            width: '200'
          },
          {
            prop: 'Score',
            title: '分值',
            width: '200'
          },
          {
            prop: 'optionValue',
            title: '选项值',
            width: '200'
          }],
        tableOption:true,//操作
        operation: {
          width: '100',
          buttons: [{
             label: '新增行',
              methods: 'addRow',
              classname:'add-btn'
            },
          ]
        },
        }},{name:'拒绝项',tabDatas:{
          tableData:[{},{}],
          tableLabel:[{
            prop: 'orderNo',
            title: '序号',
            width: '150',
            fixed: true
          },
          {
            prop: 'entryName',
            title: '项目名称',
            width: '200'
          },
          {
            prop: 'Score',
            title: '分值',
            width: '200'
          },
          {
            prop: 'optionValue',
            title: '选项值',
            width: '200'
          }],
        tableOption:true,//操作
        operation: {
          width: '100',
          buttons: [{
             label: '新增行',
              methods: 'addRow',
              classname:'add-btn'
            },
          ]
        },
        }}],
    }),
    created: function () {
    },
    mounted() {
    },
    methods: {
      handleTabClick(){},
    },

    
  }
</script>

<style lang="scss">
  
</style>