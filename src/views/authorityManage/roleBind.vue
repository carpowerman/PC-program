<template>
<basic-container>
      <template v-slot:header>角色管理</template> 
      <template v-slot:body>
          <div class="ch-table">
            <el-row ref='chTop'>
              <el-col :span=4 class='search-button'>
                <el-button type="warning" class='ch-button' @click='addRoleDialog'>
                     <i class='el-icon-plus'></i>新增
                </el-button>
              </el-col>
            </el-row>
            <el-row :span="24" class='tree-table'>
              <el-col :span="24">
                <pc-table @initTableData="initData" :ch-table='dataTable'   @editRole="editRole" 
                @detailRole='detailRole' @getPermissions='getPermissions' @lookUp='lookUp'> 
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
                                <el-input v-model="roleData.roleName" placeholder="角色名称" :disabled="isDisabled"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :span='24' :gutter="20">
                          <el-col>
                            <el-form-item label="角色标识" prop="roleNo">
                                <el-input v-model="roleData.roleNo" placeholder="角色标识" :disabled="isDisabled"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :span='24' :gutter="20">
                          <el-col>
                            <el-form-item label="角色描述">
                                <el-input v-model="roleData.permissions" placeholder="角色描述" :disabled="isDisabled"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :span='24' :gutter="20">
                          <el-col>
                            <el-form-item label="数据权限" prop='permissions'>
                              <el-select v-model="roleData.permissions" placeholder="请选择数据权限" :disabled="isDisabled">
                                  <el-option label="全部" value="all"></el-option>
                                  <el-option label="自定义" value="self"></el-option>
                                  <el-option label="本级及子级" value="selfChild"></el-option>
                                  <el-option label="本级" value="level"></el-option>
                                </el-select>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-form-item class="dialog-footer" v-if='!isDisabled'>
                        <el-button type="primary" @click="comfirmOption">确 定</el-button>
                        <el-button>取 消</el-button>
                        </el-form-item>
                      </el-form>
                    </el-dialog>
      <el-dialog 
       title="权限设置"
       :visible.sync="rolePermissions"
        width="30%">
          <el-tree :data="permissionsData" @node-click="handleNodeClick"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          default-expand-all
          ref="tree"
          highlight-current
          :default-checked-keys="choosedRole" 
          >
          </el-tree>
            <span slot="footer" class="dialog-footer">
                 <el-button @click='check' type="warning" class='ch-button'>设置</el-button>
            </span>
      </el-dialog>
      
      </template>
  </basic-container>
</template>

<script>
  import { mapGetters } from "vuex";
  import pcTable from '@/components/tableComponent/main'
  import {getRoleList,editRoleList,delRoleList,addRoleList,addPermRoleList} from '@/api/role'
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
     isDisabled:false,
     roleData:{
       roleName:'',
       roleNo:'',
       permissions:'',
       permissions:'',
     },
     ruleForm: {
          roleName: '',
          roleNo: '',
          permissions: ''
        },
      rules: {
          roleName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          roleNo: [
            { required: true, message: '请填写角色标识', trigger: 'blur' }
          ],
          permissions: [
            { required: true, message: '请选择数据权限', trigger: 'change' }
          ]
      },
      dataTable: {
        tableHeight: 300,
        total: 0,
        pageNo: 1,//当前页
        pageSize: 10,
        status:false,
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
            prop: 'roleNo',
            title: '角色标识',
            width: '100'
          },
          {
            prop: 'permissions',
            title: '角色描述',
            width: '80'
          },
          {
            prop: 'permissions',
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
              classname:'el-icon-view',
            },{
              label: '编辑',
              Fun: 'editRole',
               id: '2',  
              classname:'el-icon-edit'
            },{
              label: '删除',
              Fun: 'detailRole',
               id: '3',  
              classname:'el-icon-delete'
            },{
              label: '权限',
               id: '4',  
              Fun: 'getPermissions',
              classname:'el-icon-plus'
            }
          ]
        }
    },
    rolePermissions:false,
 
    permissionsData:[],
    defaultProps: {
        children: 'children',
        label: 'permissionName'
   },
   choosedRole:[],
        
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
    computed: {
     ...mapGetters(["menu"]),
    },
    methods: {
      addRoleDialog(){
         this.$refs['ruleForm'].resetFields()
         this.roleDialog=true;
         this.isDisabled=false;
      },
      //新增确认
      comfirmOption(){
        if(this.dialogDatas.dialogTitle=='新增角色'){
          console.log(this.roleData,'roledata')
          addRoleList(this.roleData).then(res => {
            console.log(res,'role')
          let re=res.data;
          if(re.message){
            this.$notify({
              title: '成功',
              message: '新增成功',
              type: 'success'
            });
          }
          }).catch(() => {
                      
          });
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
      //查看
      lookUp(index,row){
        this.roleDialog=true;
        this.isDisabled=true
        this.dialogDatas.dialogTitle='查看角色';
       
      },
      //编辑
      editRole(index,row){
        this.isDisabled=false
        this.roleDialog=true;
        this.dialogDatas.dialogTitle='编辑角色';
        Vue.set(this,'roleData',JSON.parse(JSON.stringify(row)))
        // Vue.set(this.roleData,'permissions',String(row.permissions))
        
        
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
      //权限配置
      getPermissions(index,row){
        this.rolePermissions=true;
        this.$store.dispatch("GetMenu").then(res => {
          if (res.length === 0) return;
          // this.$router.$avueRouter.formatRoutes(data, true);
          console.log(res,'data')
  

           this.permissionsData=res;
        });
       
      },
     check(){
        // //获取所有被选中的data的数组
        //     let takeDate = this.$refs.tree.getCheckedNodes();
            //获取所有被选中的key的数组
       let keyDate = this.$refs.tree.getCheckedKeys();
          let params={
          "id":2,
          "permissions":[
            {
              "id":1
            },
            {
              "id":2
            }
            ]
        };
        addPermRoleList(params).then(res=>{
          console.log(res,'权限')
          this.permissionsData=res.data;
        })
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
    .ch-button {
      background: rgba(246, 197, 6, 1);
      border-radius: 3px;
      color: #333;
      padding: 13px 36px;
      &:hover {
        color: #333;
        background: rgba(246, 197, 6, 0.8);
      }
    .role-form{
      .el-select{
        display:block;
      }
    }

  }
</style>