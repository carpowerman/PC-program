<template>
<basic-container>
      <template v-slot:header>角色管理</template> 
      <template v-slot:body>
          <div class="ch-table">
            <el-row ref='chTop'>
              <el-col :span=4 class='search-button'>
                <el-button type="warning" class='ch-button' @click='roleDialog=true'>
                     <i class='el-icon-plus'></i>新增
                </el-button>
                   
              </el-col>
            </el-row>
            <el-row :span="24" class='tree-table'>
              <el-col :span="24">
                <pc-table @initTableData="initData" :ch-table='dataTable'   @editRole="editRole" 
                @detailRole='detailRole' @getdataPermType='getdataPermType'> 
                  <!-- <template slot='status' slot-scope="props">
                   
                  </template> -->
                </pc-table>
              </el-col>
            </el-row>
          </div>
          <el-dialog
                      :title="dialogDatas.dialogTitle"
                      :visible.sync="roleDialog"
                      width="30%">
                        <el-form ref="ruleForm" :model="roleData" :rules="rules" label-width="80px" class='role-form'>
                        <el-row :span='24' :gutter="20">
                          <el-col>
                            <el-form-item label="角色名称" prop="roleName">
                                <el-input v-model="roleData.roleName" placeholder="角色名称"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :span='24' :gutter="20">
                          <el-col>
                            <el-form-item label="角色标识" prop="disabledFlag">
                                <el-input v-model="roleData.disabledFlag" placeholder="角色标识"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :span='24' :gutter="20">
                          <el-col>
                            <el-form-item label="角色描述">
                                <el-input v-model="roleData.permissions" placeholder="角色描述"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :span='24' :gutter="20">
                          <el-col>
                            <el-form-item label="数据权限" prop='dataPermType'>
                              <el-select v-model="roleData.dataPermType" placeholder="请选择数据权限">
                                  <el-option label="全部" value="all"></el-option>
                                  <el-option label="自定义" value="self"></el-option>
                                  <el-option label="本级及子级" value="selfChild"></el-option>
                                  <el-option label="本级" value="level"></el-option>
                                </el-select>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-form-item class="dialog-footer">
                        <el-button type="primary" @click="comfirmOption">确 定</el-button>
                        <el-button>取 消</el-button>
                        </el-form-item>
                      </el-form>
                    </el-dialog>
      <el-dialog 
       title="权限设置"
       :visible.sync="rolePermissions"
        width="30%">
          <el-tree :data="permissionsData" :props="defaultProps" @node-click="handleNodeClick"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          >

          </el-tree>
      </el-dialog>
      
      </template>
  </basic-container>
</template>

<script>
  import pcTable from '@/components/tableComponent/main'
  import {getRoleList,editRoleList,delRoleList} from '@/api/role'
import { parse } from 'path';
  export default {
    name: "user-list",
    components: {
      pcTable
    },
    data: () => ({
      input: '',
      roleDialog:false,
      dialogDatas:{
        dialogTitle:'新增角色'
      },
     roleData:{
       roleName:'',
       disabledFlag:'',
       permissions:'',
       dataPermType:'',
     },
     ruleForm: {
          roleName: '',
          disabledFlag: '',
          dataPermType: ''
        },
      rules: {
          roleName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          disabledFlag: [
            { required: true, message: '请填写角色标识', trigger: 'blur' }
          ],
          dataPermType: [
            { required: true, message: '请选择数据权限', trigger: 'change' }
          ]
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
            prop: 'id',
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
            prop: 'disabledFlag',
            title: '角色标识',
            width: '100'
          },
          {
            prop: 'permissions',
            title: '角色描述',
            width: '80'
          },
          {
            prop: 'dataPermType',
            title: '数据权限',
            width: '80'
          },
          {
            prop: 'createdTime',
            title: '创建时间',
            width: '100'
          },
        ],
        tableData: [],
        tableOption:true,//操作
        operation: {
          width: '100',
          buttons: [
            {
              label: '查看',
              Fun: 'lookUp',
              id: '1',                     // 按钮循环组件的key值
              classname:''
            },{
              label: '编辑',
              Fun: 'editRole',
               id: '2',  
              classname:''
            },{
              label: '删除',
              Fun: 'detailRole',
               id: '3',  
              classname:''
            },{
              label: '权限',
               id: '4',  
              Fun: 'getdataPermType',
              classname:''
            }
          ]
        }
    },
       rolePermissions:false,
       permissionsData:[{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
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
      //关闭
      // handleDialogClose(val){
      //   this.roleDialog=val
      // },
      //新增确认
      comfirmOption(){
        if(this.roleDialog.dialogTitle=='新增角色'){
          alert(11)
        }else{
          editRoleList(this.roleData).then(res => {
          let re=res.data;
          if(re.message){
            this.$notify({
              title: '成功',
              message: '编辑成功',
              type: 'success'
            });
          }
          }).catch(() => {
                      
          });
        }
      },
      //编辑
      editRole(index,row){
        Vue.set(this,'roleData',JSON.parse(JSON.stringify(row)))
        // Vue.set(this.roleData,'dataPermType',String(row.dataPermType))
        this.roleDialog=true;
        this.dialogDatas.dialogTitle='编辑角色';
        
        
      },
      //删除
      detailRole(index,row){
        let id=row.id
        delRoleList(id).then(res=>{
          if(res.message){
              this.initData()
          }
        }).catch(()=>{

        })
      },
      getdataPermType(index,row){
        this.rolePermissions=true;
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
      initData() {
        this.getHeight();
        getRoleList().then(res => {
          const data = res.data.data;
          this.dataTable.tableData=data;
          this.dataTable.pageSize = res.data.pageSize;
          this.dataTable.pageNo = res.data.pageNo;
          this.dataTable.total = res.data.total;
        }).catch(() => {
                    
        });
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
    .role-form{
      .el-select{
        display:block;
      }
    }

  }
</style>