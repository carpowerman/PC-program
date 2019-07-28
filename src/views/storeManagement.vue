<template>
  <div class="ch-table">
    <el-row ref='chTop'>
      <el-col :span=4>
        <el-input v-model="input" placeholder="门店名称/负责人"></el-input>
      </el-col>
      <el-col :span=4 class='search-button'>
        <el-button type="warning" class='ch-button'>查询</el-button>
      </el-col>
      <el-col :span=16 class='add-button'>
        <el-button type="warning" class="ch-button" @click='dialogVisible = true'>
          <i class='el-icon-plus'></i>
          新增</el-button>
      </el-col>
    </el-row>
    <el-row :span="24" class='tree-table'>
      <el-col :span="4" class='left-tree'>
        <span class="title-tree">车力士所有门店</span>
        <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="20">
        <pc-table @initTableData="initData" :ch-table='dataTable'>
          <template slot='status' slot-scope="props">
             <el-select v-model="props.obj.row.rowStatus" placeholder="请选择">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
          </template>
        </pc-table>
      </el-col>
    </el-row>
    <ch-DIalog :dialog-visible='dialogVisible' :dialog-data="dialogDatas" @handle-close='handleDialogClose'>
      <div slot="dialogText">
        <el-form ref="form" :model="formData">
            <el-row :span='24' :gutter="20">
              <el-col :span='8'>
                <el-form-item label="">
                        <el-input v-model="formData.storeName" placeholder="门店名称"></el-input>
                      </el-form-item>
              </el-col>
              <el-col :span='8'>
                <el-form-item label="">
                        <el-input v-model="formData.storeName" placeholder="门店编码"></el-input>
                      </el-form-item>
              </el-col>
              <el-col :span='8'>
              <el-form-item label="">
                  <el-select v-model="formData.storeRegion" placeholder="组织性质">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row :span='24'  :gutter="20">
              <el-col :span='8'>
                <el-form-item label="">
                        <el-input v-model="formData.storeName" placeholder="负责人"></el-input>
                      </el-form-item>
              </el-col>
              <el-col :span='8'>
                <el-form-item label="">
                        <el-input v-model="formData.storeName" placeholder="负责电话"></el-input>
                      </el-form-item>
              </el-col>
              <el-col :span='8'>
                  <el-form-item label="">
                        <el-select v-model="formData.storeRegion" placeholder="状态">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                  </el-form-item>
              </el-col>
          </el-row>
           <el-row :span='24'  :gutter="20">
              <el-col :span='8'>
                  <el-form-item label="">
                        <el-select v-model="formData.storeRegion" placeholder="门店所在省份">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span='8'>
                  <el-form-item label="">
                        <el-select v-model="formData.storeRegion" placeholder="城市">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span='8'>
              <el-form-item label="">
                  <el-select v-model="formData.storeRegion" placeholder="县/区">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                  </el-form-item>
              </el-col>
          </el-row>
           <el-row>
              <el-form-item label="">
                <el-input v-model="formData.storeName" placeholder="详细地址"></el-input>
              </el-form-item>
           </el-row>
         <el-form-item class="dialog-footer">
            <el-button type="primary" @click="comfirmOption">确 定</el-button>
            <el-button>取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </ch-DIalog>
  </div>
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
      formData:{
        storeName:'1',
      },
      treeData: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: [],
      treeOption: {
        nodeKey: 'id',
        size: 'small',
        formOption: {
          labelWidth: 100,
          column: [{
            label: '自定义项',
            prop: 'test'
          }],
        },
        props: {
          labelText: '标题',
          label: 'label',
          value: 'value',
          children: 'children'
        }
      },
      page: {
        total: 122
      },
      dataTable: {
        tableHeight: 300,
        total: 0,
        pageNo: 1,//当前页
        pageSize: 10,
        status: {
          disabled: false
        },
        tableLabel: [{
            prop: 'username',
            title: '姓名',
            width: '150',
            fixed: true
          },
          {
            prop: 'email',
            title: '地址',
            width: '200'
          },
          {
            prop: 'roleName',
            title: '简称',
            width: '200'
          },
          {
            prop: 'roleName',
            title: '简称',
            width: '200'
          },
          {
            prop: 'roleName',
            title: '简称',
            width: '200'
          },
          {
            prop: 'roleName',
            title: '简称',
            width: '200'
          },
          {
            prop: 'createdTime',
            title: '创建时间',
            width: '200'
          }
        ],
        tableData: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
        tableOption:true,//操作
        operation: {
          width: '100',
          buttons: [{
              label: '删除',
              methods: 'detail',
              classname:'detail-btn'
            },
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
        this.dataTable.tableHeight = document.body.clientHeight - pageTopHeight - 280;
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

    .el-table {
      overflow: auto;
      .detail-btn{
          background: transparent;
          border: none;
          font-size: 12px;
          color:#1F65F5;
      }
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