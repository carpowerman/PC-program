<template>
  <div class="basic-container">
    <el-card>
      <div slot="header">
        <slot name="header"></slot>
      </div>
      <slot name="body"></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "basicContainer"
};
</script>

<style lang="scss">
.basic-container {
  padding: 10px 6px;
  border-radius: 10px;
  box-sizing: border-box;
  .el-card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;


    .el-card__body{
      flex-grow: 1;
      flex-shrink: 1;
      overflow: hidden;
    }
  }
  &:first-child {
    padding-top: 0;
  }
}
</style>
