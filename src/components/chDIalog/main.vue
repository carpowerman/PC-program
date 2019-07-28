 <template>
   <div class="dialog-content">
    <el-dialog
      :title="dialogData.dialogTitle"
      :visible.sync="isVisible"
      width="30%"
  >
      <slot name='dialogText'></slot>
    </el-dialog>
  </div>
 </template>
<script>
  export default {
    props:{
      dialogVisible:Boolean,
      dialogData:Object
    },
    data() {
      return {
        isVisible:false,
      };
    },
    watch:{
      dialogVisible(val){
        this.isVisible=val
      },
      isVisible(val){
        if(!val){
          this.$emit("handle-close",val)
        }
      }
    },
    methods: {
      comfirmOption(){
         this.$emit("comfirm-option",val)
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
 
