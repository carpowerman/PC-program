<template>
  <basic-container>
    <template v-slot:header>小程序设置</template>
    <template v-slot:body>
      <el-tabs v-model="tabsDefault" type="card">
          <el-tab-pane label="C端 banner" name="C-banner">
            <div class="tab-body">
              <div class="upload-body">
                <div class="item" v-for="(item, index) in barC" :key="index">
                  <div class="block">
                    <div class="delete" @click="handlerDelete(item.id, 1)"><i class="el-icon-delete"></i></div>
                    <el-image :src="item.url" class="image" fit="cover"></el-image>
                  </div>
                </div>
                <div class="item">
                  <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  </el-upload>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="B端 banner" name="B-banner">
            <div class="tab-body">
              <div class="upload-body">
                <div class="item" v-for="(item, index) in barB" :key="index">
                  <div class="block">
                    <div class="delete" @click="handlerDelete(item.id, 0)"><i class="el-icon-delete"></i></div>
                    <el-image :src="item.url" class="image" fit="cover"></el-image>
                  </div>
                </div>
                <div class="item">
                  <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  </el-upload>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="顶部 logo" name="top-logo">
            <div class="tab-body">
              <div class="upload-body">
                <div class="item" v-if="logo.length > 0">
                  <div class="block">
                    <div class="delete" @click="handlerDelete(logo[0].id, 2)"><i class="el-icon-delete"></i></div>
                    <el-image :src="logo[0].url" class="image" fit="cover"></el-image>
                  </div>
                </div>
                <div class="item" v-else>
                  <el-upload
                    drag
                    action=""
                    :before-upload="upLoad"
                    :show-file-list="false"
                    :with-credentials="true"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
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
import { getBarB, getBarC, getLogo, deleteFile, addFile } from '@/api/src';
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
    getBarB.then((res) => {
      if(res.data.code === 0) {
        this.$set(this, 'barB', res.data.data.content);
      }
    });
    getBarC.then((res) => {
      if(res.data.code === 0) {
        this.$set(this, 'barC', res.data.data.content);
      }
    });
    getLogo.then((res) => {
      if(res.data.code === 0) {
        this.$set(this, 'logo', res.data.data.content);
      }
    });
  },
  methods: {
    handlerDelete(id, type) {
      deleteFile({
        id: id
      }).then(() => {
        if(type==0) {
          getBarB.then((res) => {
            if(res.data.code === 0) {
              this.$set(this, 'barB', res.data.data.content);
            }
          });
        } else if(type==1) {
          getBarC.then((res) => {
            if(res.data.code === 0) {
              this.$set(this, 'barC', res.data.data.content);
            }
          });
        } else if(type==2) {
          getLogo.then((res) => {
            if(res.data.code === 0) {
              this.$set(this, 'logo', res.data.data.content);
            }
          });
        }
      })
    },
    upLoad(file) {
      const formData = new FormData();
      console.log(file);
      formData.append('files', file, file.name);
      formData.append('fileBizType', 90);
      addFile(formData).then((res) => {
        console.log(res);
      });

      return false;
    }
  },

}
</script>

<style lang="scss" scoped>
.upload-body {
  display: flex;
  flex-direction: row;
  margin: 20px;

  .item {
    margin-right: 20px;
    .block {
      position: relative;
      width: 360px;
      height: 180px;
      border: 1px dashed #d9d9d9;
      .image {
        width: 100%;
        height: 100%;
      }
      .delete {
        position: absolute;
        top: -10px;
        right: -10px;
        font-size: 13px;
        width: 30px;
        height: 30px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-radius: 30px;
        background-color: #F56C6C;
        color: #FFFFFF;
        z-index: 99;
        cursor: pointer;
      }
    }

  }
}
</style>
