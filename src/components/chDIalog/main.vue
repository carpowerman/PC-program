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
    name: 'ch-DIalog',
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
 
