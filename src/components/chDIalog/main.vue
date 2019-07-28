 <template>
   <div class="dialog-content">
    <el-dialog
      :title="dialogData.dialogTitle"
      :visible.sync="isVisible"
      width="30%"
  >
      <slot name='dialogText'></slot>
       <el-dialog
        width="30%"
       :title="dialogData.innerDialogTitle"
      :visible.sync="isInnerVisible"
      append-to-body>
      <slot name='innerDialogText'></slot>
    </el-dialog>
    </el-dialog>
  </div>
 </template>
<script>
  export default {
    props:{
      dialogVisible:Boolean,
      innerDialogVisible:Boolean,
      dialogData:Object,
    },
    data() {
      return {
        isVisible:false,
        isInnerVisible:false,
      };
    },
    watch:{
      
      dialogVisible(val){
        debugger
        this.isVisible=val
      },
      isVisible(val){
        if(!val){
          this.$emit("handle-close",val)
        }
      },
      innerDialogVisible(val){
        this.isInnerVisible=val
      },
      isInnerVisible(val){
        if(!val){
          this.$emit("handle-close-inner",val)
        }
      }
    },
    methods: {
      comfirmOption(){
         this.$emit("comfirm-option")
      },
      // handleClose(done) {
      //   this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
      // }
    }
  };
</script>
 <style lang="scss">
.dialog-footer{
  text-align:right;
  .el-button{
    color:#020202;
    border-color: #020202;
  }
  .el-button--primary{
    background:#F6C506;
    border-color: #F6C506;
  }
}
 </style>
 
