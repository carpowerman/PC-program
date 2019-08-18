<template>
  <basic-container>
    <template v-slot:header>金融方案</template>
    <template v-slot:body>
      <el-tabs v-model="tabsDefault" type="card">
          <el-tab-pane label="新车" name="new-car">
            <div class="tab-body">
              <div class="upload-body">
                <!-- 首付比例 -->
                <div class="item" v-if="conNewCar.first">
                  <div class="block">
                    <div class="delete" @click="handlerDelete(conNewCar.first.id)"><i class="el-icon-delete"></i></div>
                    <el-image :src="conNewCar.first.url" class="image" fit="cover"></el-image>
                  </div>
                  <div class="image-tip">首付比例</div>
                </div>
                <div class="item" v-else>
                  <el-upload
                    drag
                    action=""
                    :before-upload="upLoad.bind(null, { type: 93, remark: '0' })"
                    :show-file-list="false"
                    :with-credentials="true"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">首付比例</div>
                  </el-upload>
                </div>

                <!-- 购车须知 -->
                <div class="item" v-if="conNewCar.second">
                  <div class="block">
                    <div class="delete" @click="handlerDelete(conNewCar.second.id)"><i class="el-icon-delete"></i></div>
                    <el-image :src="conNewCar.second.url" class="image" fit="cover"></el-image>
                  </div>
                  <div class="image-tip">购车须知</div>
                </div>
                <div class="item" v-else>
                  <el-upload
                    drag
                    action=""
                    :before-upload="upLoad.bind(null, { type: 93, remark: '1' })"
                    :show-file-list="false"
                    :with-credentials="true"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">购车须知</div>
                  </el-upload>
                </div>

                <!-- 首年福利 -->
                <div class="item" v-if="conNewCar.third">
                  <div class="block">
                    <div class="delete" @click="handlerDelete(conNewCar.third.id)"><i class="el-icon-delete"></i></div>
                    <el-image :src="conNewCar.third.url" class="image" fit="cover"></el-image>
                  </div>
                  <div class="image-tip">首年福利</div>
                </div>
                <div class="item" v-else>
                  <el-upload
                    drag
                    action=""
                    :before-upload="upLoad.bind(null, { type: 93, remark: '2' })"
                    :show-file-list="false"
                    :with-credentials="true"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">首年福利</div>
                  </el-upload>
                </div>

                <!-- 审批流程 -->
                <div class="item" v-if="conNewCar.fourth">
                  <div class="block">
                    <div class="delete" @click="handlerDelete(conNewCar.fourth.id)"><i class="el-icon-delete"></i></div>
                    <el-image :src="conNewCar.fourth.url" class="image" fit="cover"></el-image>
                  </div>
                  <div class="image-tip">申请流程</div>
                </div>
                <div class="item" v-else>
                  <el-upload
                    drag
                    action=""
                    :before-upload="upLoad.bind(null, { type: 93, remark: '3' })"
                    :show-file-list="false"
                    :with-credentials="true"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">申请流程</div>
                  </el-upload>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="二手车" name="old-car">
            <div class="tab-body">
              <div class="upload-body">
                <!-- 首付比例 -->
                <div class="item" v-if="conOldCar.first">
                  <div class="block">
                    <div class="delete" @click="handlerDelete(conOldCar.first.id)"><i class="el-icon-delete"></i></div>
                    <el-image :src="conOldCar.first.url" class="image" fit="cover"></el-image>
                  </div>
                  <div class="image-tip">首付比例</div>
                </div>
                <div class="item" v-else>
                  <el-upload
                    drag
                    action=""
                    :before-upload="upLoad.bind(null, { type: 94, remark: '0' })"
                    :show-file-list="false"
                    :with-credentials="true"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">首付比例</div>
                  </el-upload>
                </div>

                <!-- 购车须知 -->
                <div class="item" v-if="conOldCar.second">
                  <div class="block">
                    <div class="delete" @click="handlerDelete(conOldCar.second.id)"><i class="el-icon-delete"></i></div>
                    <el-image :src="conOldCar.second.url" class="image" fit="cover"></el-image>
                  </div>
                  <div class="image-tip">购车须知</div>
                </div>
                <div class="item" v-else>
                  <el-upload
                    drag
                    action=""
                    :before-upload="upLoad.bind(null, { type: 94, remark: '1' })"
                    :show-file-list="false"
                    :with-credentials="true"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">购车须知</div>
                  </el-upload>
                </div>

                <!-- 首年福利 -->
                <div class="item" v-if="conOldCar.third">
                  <div class="block">
                    <div class="delete" @click="handlerDelete(conOldCar.third.id)"><i class="el-icon-delete"></i></div>
                    <el-image :src="conOldCar.third.url" class="image" fit="cover"></el-image>
                  </div>
                  <div class="image-tip">首年福利</div>
                </div>
                <div class="item" v-else>
                  <el-upload
                    drag
                    action=""
                    :before-upload="upLoad.bind(null, { type: 94, remark: '2' })"
                    :show-file-list="false"
                    :with-credentials="true"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">首年福利</div>
                  </el-upload>
                </div>

                <!-- 审批流程 -->
                <div class="item" v-if="conOldCar.fourth">
                  <div class="block">
                    <div class="delete" @click="handlerDelete(conOldCar.fourth.id)"><i class="el-icon-delete"></i></div>
                    <el-image :src="conOldCar.fourth.url" class="image" fit="cover"></el-image>
                  </div>
                  <div class="image-tip">申请流程</div>
                </div>
                <div class="item" v-else>
                  <el-upload
                    drag
                    action=""
                    :before-upload="upLoad.bind(null, { type: 94, remark: '3' })"
                    :show-file-list="false"
                    :with-credentials="true"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">申请流程</div>
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
import { deleteFile, addFile, getFileList } from '@/api/src';
import { deepClone } from '@/util/util';
export default {
  data() {
    return {
      tabsDefault: 'new-car',
      newCar: [],
      oldCar: [],
    }
  },
  created() {
    this.getSrc();
  },
  computed: {
    conNewCar() {
      let temp = {};
      this.newCar.forEach((item) => {
        if(item.remark == '0') {
          temp.first = item;
        } else if(item.remark == '1') {
          temp.second = item;
        } else if(item.remark == '2') {
          temp.third = item;
        } else if(item.remark == '3') {
          temp.fourth = item;
        }
      })
      return temp;
    },
    conOldCar() {
      let temp = {};
      this.oldCar.forEach((item) => {
        if(item.remark == '0') {
          temp.first = item;
        } else if(item.remark == '1') {
          temp.second = item;
        } else if(item.remark == '2') {
          temp.third = item;
        } else if(item.remark == '3') {
          temp.fourth = item;
        }
      })
      return temp;
    },
  },
  methods: {
    getSrc() {
      [{ id: 93, type: 'newCar' },
      { id: 94, type: 'oldCar' }].forEach((item) => {
        getFileList({
          bizId: "",
          fileBizType: item.id,
          paging: false,
          pageNum: "",
          pageSize: ""
        }).then((res) => {
          if(res.data.code === 0) {
            this.$set(this, item.type, deepClone(res.data.data.content));
          }
        });
      })
    },
    upLoad(obj, file) {
      const formData = new FormData();
      formData.append('files', file, file.name);
      formData.append('fileBizType', obj.type);
      formData.append('remark', obj.remark);
      addFile(formData).then((res) => {
        if(res.data.code === 0) {
          this.$notify.success({ title: "上传成功", message: "图片已成功上传。" });
          this.getSrc();
        }
      });
      return false;
    },
    handlerDelete(id) {
      deleteFile({
        id: id
      }).then((res) => {
        if(res.data.code === 0) {
          this.$notify.success({ title: "删除成功", message: "图片删除成功。" });
          this.getSrc();
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.upload-body {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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
