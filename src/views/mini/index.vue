<template>
  <basic-container>
    <template v-slot:header>小程序设置</template>
    <template v-slot:body>
      <el-tabs v-model="tabsDefault" type="card">
          <el-tab-pane label="C端 banner" name="C-banner">
            <div class="tab-body">
              <div class="upload-body">
                <div class="item">
                  <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">banner 1</div>
                  </el-upload>
                </div>
                <div class="item">
                  <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">banner2</div>
                  </el-upload>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="B端 banner" name="B-banner">
            <div class="tab-body">
              <div class="upload-body">
                <div class="item">
                  <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">banner 1</div>
                  </el-upload>
                </div>
                <div class="item">
                  <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">banner2</div>
                  </el-upload>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="顶部 logo" name="top-logo">
            <div class="tab-body">
              <div class="upload-body">
                <div class="item">
                  <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">顶部 LOGO</div>
                  </el-upload>
                </div>
              </div>
            </div>
          </el-tab-pane>
      </el-tabs>
    </template>
  </basic-container>
</template>

<script>
import { getBarB, getBarC, getLogo } from '@/api/src';
export default {
  data() {
    return {
      tabsDefault: 'C-banner',
      barB: [],
      barC: [],
      logo: [],
    }
  },
  created() {
    getBarB().then((res) => {
      if(res.data.code === 0) {
        this.$set(this, 'barB', res.data.data.content);
      }
    });
    getBarC().then((res) => {
      if(res.data.code === 0) {
        this.$set(this, 'barC', res.data.data.content);
      }
    });
    getLogo().then((res) => {
      if(res.data.code === 0) {
        this.$set(this, 'logo', res.data.data.content);
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.upload-body {
  display: flex;
  flex-direction: row;

  .item {
    margin-right: 20px;
  }
}
</style>
