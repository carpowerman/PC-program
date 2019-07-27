<template>
  <div>
    <!-- 改写主页 -->
    <el-row :span="24">
      <el-col :span="8">
        <basic-container>
          <template v-slot:header>客户资料</template>
          <template v-slot:body>
            <div class="user">
              <div class="welcome">欢迎尊敬的 <b>周晓宇</b> 客户</div>
              <div class="info">
                <img />
                <div>
                  <span>用户类型：业务员</span>
                  <span>所属组织：行中创汇科技有限公司</span>
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
                <div class="num">11</div>
                <div class="label">预约中数量</div>
              </div>
              <div class="item">
                <div class="num">11</div>
                <div class="label">已拒绝数量</div>
              </div>
              <div class="item">
                <div class="num">11</div>
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
              <li>
                <p>从今晚20:00到次日08:00，客户端系统维护通知。啊啊啊啊啊啊啊</p>
                <span>2019-02-01 14:00:00</span>
              </li>
              <li>
                <p>从今晚20:00到次日08:00，客户端系统维护通知</p>
                <span>2019-02-01 14:00:00</span>
              </li>
            </ul>
          </template>
        </basic-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "wel",
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById('echarts'));
    this.myChart.setOption({
      // 图例配置
      legend: {},
      // 柱状图颜色配置
      color: ['#F6C506', '#232323'],
      dataset: {
        dimensions: ['product', '审核通过数量', '当月申请数量'],
        source: [
          { product: '2019-01', '审核通过数量': 11, '当月申请数量': 22},
          { product: '2019-02', '审核通过数量': 11, '当月申请数量': 22},
          { product: '2019-03', '审核通过数量': 11, '当月申请数量': 22},
          { product: '2019-04', '审核通过数量': 11, '当月申请数量': 22},
        ]
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
  }
  .info {
    font-size: 14px;
    color: #020202;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 30px;
    img {
      width: 70px;
      height: 70px;
      border-radius: 35px;
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
