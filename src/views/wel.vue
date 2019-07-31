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
                  <span>用户类型：</span>
                  <span>所属组织：</span>
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
                <div class="num">{{home.appointment[0]}}</div>
                <div class="label">预约中数量</div>
              </div>
              <div class="item">
                <div class="num">{{home.appointment[1]}}</div>
                <div class="label">已拒绝数量</div>
              </div>
              <div class="item">
                <div class="num">{{home.appointment[2]}}</div>
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
              <li v-for="(item, index) in home.notice" :key="index">
                <p>{{item.text}}</p>
                <span>{{item.date}}</span>
              </li>
            </ul>
          </template>
        </basic-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "wel",
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["userInfo", "homeEcharts"]),
    ...mapState(['home', 'user'])
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById('echarts'));
    this.myChart.setOption({
      // 图例配置
      legend: {},
      // 柱状图颜色配置
      color: ['#F6C506', '#232323'],
      dataset: {
        dimensions: ['item', '审核通过数量', '当月申请数量'],
        source: this.homeEcharts
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
    console.log(this.myChart);
  },
  created() {

  },
  methods: {}
};
</script>

<style scoped="scoped" lang="scss">
.user {
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
    padding: 0 0 30px 0;
    margin-bottom: 30px;
    p {
      color: #020202;
      font-size: 14px;
      font-weight: 400;
      margin: 0;
      padding: 5px 0;
      line-height: 22px;
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
