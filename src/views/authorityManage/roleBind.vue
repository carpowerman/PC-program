<template>
<basic-container>
      <template v-slot:header>角色管理</template> 
      <template v-slot:body>
          <div class="ch-table">
            <el-row ref='chTop'>
              <el-col :span=4 class='search-button'>
                <el-button type="warning" class='ch-button'>
                     <i class='el-icon-plus'></i>
                  添加</el-button>
              </el-col>
            </el-row>
            <el-row :span="24" class='tree-table'>
              <el-col :span="24">
                <pc-table @initTableData="initData" :ch-table='dataTable'>
                  <template slot='status' slot-scope="props">
                   
                  </template>
                </pc-table>
              </el-col>
            </el-row>
            <ch-DIalog :dialog-visible='dialogVisible' :dialog-data="dialogDatas" @handle-close='handleDialogClose'>
              <div slot="dialogText">
              </div>
            </ch-DIalog>
          </div>
      </template>
  </basic-container>
</template>

<script>
  import pcTable from '@/components/tableComponent/main'
  import chDIalog from '@/components/chDIalog/main'
  export default {
    name: "user-list",
    components: {
      pcTable,chDIalog
    },
    data: () => ({
      input: '',
      dialogVisible:false,
      dialogDatas:{
        dialogTitle:'新增员工'
      },
     
      defaultProps: [],
     
      dataTable: {
        tableHeight: 300,
        total: 0,
        pageNo: 1,//当前页
        pageSize: 10,
        status: {
          disabled: false
        },
        tableLabel: [{
            prop: 'roleId',
            title: '序号',
            width: '50',
            fixed: true
          },
          {
            prop: 'roleName',
            title: '角色名称',
            width: '100'
          },
          {
            prop: 'roleTag',
            title: '角色标识',
            width: '100'
          },
          {
            prop: 'roleDescribe',
            title: '角色描述',
            width: '80'
          },
          {
            prop: 'rolePermissions',
            title: '数据权限',
            width: '80'
          },
          {
            prop: 'creatTime',
            title: '创建时间',
            width: '100'
          },
        ],
        tableData: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
        tableOption:true,//操作
        operation: {
          width: '100',
          buttons: [
            {
              label: '查看',
              methods: 'detail',
              classname:''
            },{
              label: '编辑',
              methods: 'detail',
              classname:''
            },{
              label: '删除',
              methods: 'detail',
              classname:''
            },{
              label: '权限',
              methods: 'getPermissions',
              classname:''
            }
          ]
        },
      },
      statusOptions:[{
        label:'启用',
        value:true
      },{
        label:'禁用',
        value:false
      }]
    }),
    created: function () {
    },
    mounted() {
      window.onresize = () => {
      return (() => {
        this.getHeight()
      })()
    }
    },
    methods: {
      //新增
      handleDialogClose(val){
        this.dialogVisible=val
      },
      comfirmOption(){
        alert(2)
      },
      handleNodeClick(data) {
        console.log(data);
      },
      tip(node, data) {
        this.$message.success(JSON.stringify(data))
      },
      nodeClick(data) {
        this.$message.success(JSON.stringify(data))
      },
      initData(obj) {
        this.getHeight();
        this.dataTable.tableData = [{
          username: '22',
          email: '0',
          rowStatus:true
        }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {
           username: '333',
          email: '55',
           rowStatus:false
        }];
        this.dataTable.pageSize = obj.pageSize;
        this.dataTable.pageNo = obj.pageNo;
        this.dataTable.total = 200;
      },
      getHeight() {
        let pageTopHeight = this.$refs.chTop.$el.offsetHeight;
        this.dataTable.tableHeight = document.body.clientHeight - pageTopHeight - 380;
      },
    },

    
  }
</script>

<style lang="scss">
  .ch-table {
    tbody {
      height: 300px;
      overflow: auto;
    }
    .tree-table {
      margin-top: 26px;

      .left-tree {
        border: 1px solid rgba(224, 228, 237, 1);
        border-radius: 3px;
      }

      .el-table--medium td,
      .el-table--medium th {
        padding: 7px 0;
        background: #fff;
      }

      .edit-btn {
        background: transparent;
        color: #1F65F5;
        border-color: transparent;

        &:hover {
          color: rgb(31, 78, 172);
        }
      }

      .title-tree {
        height: 46px;
        line-height: 46px;
        border: 1px solid #ededed;
        width: 100%;
        display: inline-block;
        text-align: center;
        background: rgba(240, 242, 245, 1);
        border-radius: 3px 3px 0px 0px;
        color: #020202;
        font-weight: 400;
      }
    }

    .ch-button {
      background: rgba(246, 197, 6, 1);
      border-radius: 3px;
      color: #333;
      padding: 13px 36px;

      &:hover {
        color: #333;
        background: rgba(246, 197, 6, 0.8);
      }
    }

    .search-button {
      padding-left: 10px;
      box-sizing: border-box;
    }

    .add-button {
      text-align: right;
    }

    .avue-crud__menu {
      display: none;
    }
  }
</style>