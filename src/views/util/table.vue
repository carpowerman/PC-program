<template>
  <basic-container class="ch-table">
    <el-row>
      <el-col :span=4>
        <el-input v-model="input" placeholder="门店名称/负责人"></el-input>
      </el-col>
      <el-col :span=4 class='search-button'>
        <el-button type="warning" class='ch-button'>查询</el-button>
      </el-col>
      <el-col :span=16 class='add-button'>
        <el-button type="warning" class="ch-button">
          <i class='el-icon-plus'></i>
          新增</el-button>
      </el-col>
    </el-row>
    <el-row :span="24" class='tree-table'>
      <el-col :span="4">
        <span class="title-tree">车力士所有门店</span>
        <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="20">
        <pc-table></pc-table>  
        <avue-crud :option="option" :page="page" :data="tableData">
          <template slot-scope="scope" slot="menu">
            <el-button type="primary" size="small" class="edit-btn" @click.stop="handleEdit(scope.row,scope.index)">编辑
            </el-button>
          </template>
        </avue-crud>
      </el-col>
    </el-row>
  </basic-container>
</template>

<script>
import pcTable from'../../components/tableComponent/main'
  export default {
    components:{pcTable},
    data() {
      return {
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
        tableData: [{
            username: "smallwei",
            name: "avue",
            password: "123456",
            newpassword: "123456",
            date: "2019-01-01",
            textarea: "签名"
          },
          {
            username: "smallwei",
            name: "avue",
            password: "123456",
            newpassword: "123456",
            date: "2019-01-01",
            textarea: "这是一条很名"
          },

          {
            username: "smallwei",
            name: "avue",
            password: "123456",
            newpassword: "123456",
            date: "2019-01-01",
            textarea: "这是一条很个性签名"
          },
          {
            username: "smallwei",
            name: "avue",
            password: "123456",
            newpassword: "123456",
            date: "2019-01-01",
            textarea: "这是一签名"
          },
          {
            username: "smallwei",
            name: "avue",
            password: "123456",
            newpassword: "123456",
            date: "2019-01-01",
            textarea: "这是一签名"
          },{},{},{},{},{},{},{},{},{},{},{},{},{},{},
        ],
        option: {
          columnBtn: false,
          refreshBtn: false,
          delBtn: false,
          editBtn: false,
          addBtn: false,
          calcHeight:100,
          column: [{
              label: "用户名",
              prop: "username",
              span: 14,
              row: true
            },
            {
              label: "姓名",
              prop: "name",
              span: 14,
              row: true
            },
            {
              label: "密码",
              prop: "password",
              type: "password",
              span: 14,
              row: true
            },
            {
              label: "确认密码",
              prop: "newpassword",
              type: "password",
              hide: true,
              span: 14,
              row: true
            },
            {
              label: "申请日期",
              prop: "date",
              type: "date",
              span: 14,
              row: true
            },
            {
              label: "个性签名",
              prop: "textarea",
              type: "textarea",
              minRows: 8,
              span: 24,
              overHidden: true,
              row: true
            }
          ]
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      tip(node, data) {
        this.$message.success(JSON.stringify(data))
      },


      nodeClick(data) {
        this.$message.success(JSON.stringify(data))
      }
    }
  };
</script>

<style lang="scss">
  .ch-table {
    tbody{
      height:300px;
      overflow: auto;
    }
    .el-table{
      height:200px;
      overflow: auto;
    }
    .tree-table {
      margin-top: 46px;

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
        height: 38px;
        line-height: 38px;
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