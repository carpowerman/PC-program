<template>
  <div>
    <!-- 改写主页 -->
    <el-row :span="24">
      <el-col :span="8">
        <basic-container>
          <template v-slot:header>客户资料</template>
          <template v-slot:body>
            <div class="user">
              <div class="welcome"><i class="iconfont smile"></i>欢迎尊敬的 <b>{{user.nickName}}</b> 客户</div>
              <div class="info">
                <i class="iconfont car-o"></i>
                <div>
                  <span>用户类型：
                    <template v-if="user.type == -1">超级管理员</template>
                    <template v-else-if="user.type == 0">系统管理员</template>
                    <template v-if="user.type == 1">普通账号</template>
                    <template v-if="user.type == 2">会员账号</template>
                  </span>
                  <span>所属组织：{{user.orgName}}</span>
                </div>
              </div>
            </div>
          </template>
        </basic-container>
      </el-col>
      <el-col :span="16">
        <basic-container>
          <template v-slot:header>待办事项</template>
          <template v-slot:body>
            <div class="appointment">
              <div class="item">
                <div class="num">{{appointment.orderedNum}}</div>
                <div class="label">预约中数量</div>
              </div>
              <div class="item">
                <div class="num">{{appointment.refusedNum}}</div>
                <div class="label">已拒绝数量</div>
              </div>
              <div class="item">
                <div class="num">{{appointment.totalNum}}</div>
                <div class="label">总数量</div>
              </div>
            </div>
          </template>
        </basic-container>
      </el-col>
    </el-row>
    <el-row :span="24">
      <el-col :span="18">
        <basic-container>
          <template v-slot:header>数据图表</template>
          <template v-slot:body>
            <div id="echarts" style="width: 100%;height: 500px;"></div>
          </template>
        </basic-container>
      </el-col>
      <el-col :span="6">
        <basic-container>
          <template v-slot:header>公告</template>
          <template v-slot:body>
            <ul class="notice">
              <li v-for="(item, index) in notice" :key="index">
                <span>{{item.createdTime}}</span>
                <p class="title">{{item.title}}</p>
                <p class="content">{{item.content}}</p>
              </li>
            </ul>
          </template>
        </basic-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getHomeData, getNotice } from "@/api/home"
import { deepClone } from "@/util/util"
export default {
  name: "wel",
  data() {
    return {
      appointment: {},
      notice: []
    };
  },
  computed: {
    ...mapState(['home', 'user']),
    comEchartsData(){
      let temp = [
        ['product', '审核通过数量', '当月申请数量'],
      ]
      if(this.appointment.orderChat) {
        this.appointment.orderChat.forEach((item) => {
          temp.push([item.dateStr, item.countApproved, item.countApplied]);
        })
      }
      return temp;
    }
  },
  created() {
    getNotice({ paging: true, pageNum: 1, pageSize: 5 }).then((res) => {
      if(res.data.code === 0) {
        this.$set(this, 'notice', deepClone(res.data.data.content));
      }
    })
  },
  mounted() {
    getHomeData({}).then((res) => {
      if(res.data.code === 0) {
        this.$set(this, 'appointment', deepClone(res.data.data));
        this.configEcharts();
      }
    });
  },
  methods: {
    configEcharts() {
      this.myChart = this.$echarts.init(document.getElementById('echarts'));
      this.myChart.setOption({
        // 图例配置
        legend: {},
        // 柱状图颜色配置
        color: ['#E41B48', '#EF9330'],
        dataset: {
          source: this.comEchartsData
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: [
          {
            type: 'bar',
            label: {
              show: true,
              position: 'top'
            }
          },
          {
            type: 'bar',
            label: {
              show: true,
              position: 'top'
            }
          }
        ],
        // 提示框组件
        tooltip: {
          trigger: 'axis',
        }
      });
    }
  }
};
</script>

<style scoped="scoped" lang="scss">
.user {
  min-height: 134px;
  .welcome {
    font-size: 18px;
    color: #020202;

    .iconfont {
      color: #F6C506;
      margin-right: 6px;
    }
  }
  .info {
    font-size: 14px;
    color: #020202;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 30px;
    .iconfont {
      font-size: 40px;
      color: #F6C506;
      margin-right: 20px;
    }
    span{
      line-height: 26px;
      display: block;
    }
  }
}
.notice {
  list-style-type: none;
  margin: 0;
  padding: 0;

  li {
    border-bottom: 1px solid #E0E4ED;
    padding: 0 0 20px 0;
    margin-bottom: 20px;
    .title {
      color: #020202;
      font-size: 14px;
      font-weight: 400;
      margin: 0;
      padding: 5px 0;
      line-height: 22px;
    }
    .content {
      color: #121212;
      font-size: 12px;
      font-weight: 400;
      margin: 0;
      padding: 0;
      line-height: 22px;
      text-indent: 2em;
    }
    span {
      color: #898D98;
      font-size: 12px;
    }
  }
}

.appointment {
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .num {
      font-size: 60px;
      font-weight: bold;
      color: #020202;
    }
    .label {
      font-size: 18px;
      font-weight: 400;
      color: #898D98;
      padding-top: 30px;
    }
  }
}
</style>
