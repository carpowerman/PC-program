<template>
  <div class="avue-sidebar">
    <logo></logo>
    <el-scrollbar :style="{height:menuHeight}" class='menu-scrop'>
      <div v-if="validatenull(menu)"
           class="avue-sidebar--tip">{{$t('menuTip')}}</div>
      <el-menu unique-opened
               :default-active="nowTagValue"
               mode="vertical"
               :show-timeout="200"
               :collapse="keyCollapse">
        <sidebar-item :menu="menu"
                      :screen="screen"
                      first
                      :props="website.menu.props"
                      :collapse="keyCollapse"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import logo from "../logo";
import sidebarItem from "./sidebarItem";
export default {
  name: "sidebar",
  components: { sidebarItem, logo },
  data() {
    return {
      menuHeight:''
    };
  },
  created() {
    this.$store.dispatch("GetMenu").then(data => {
      if (data.length === 0) return;
      this.$router.$avueRouter.formatRoutes(data, true);
    });
  },
  computed: {
    ...mapGetters(["website", "menu", "tag", "keyCollapse", "screen"]),
    nowTagValue: function() {
      return this.$router.$avueRouter.getValue(this.$route);
    }
  },
  mounted() {
   this.getHeight()
      window.onresize = () => {
      return (() => {
        this.getHeight()
      })()
    }
  },
  methods: {
    getHeight(){
       this.menuHeight = document.body.clientHeight -65+'px';
    }
  }
};
</script>
<style lang="scss" scoped>
.menu-scrop{
  overflow: auto;
}
</style>

