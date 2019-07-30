<template>
  <div class="menu-wrapper">
    <template v-for="item in menu">
      <!-- 菜单 -->
      <el-menu-item v-if="item.permissionType == 1 && item.isPermit"
                    :index="item.path"
                    @click="open(item)"
                    :key="item.permissionName"
                    :class="{'is-active':vaildAvtive(item)}">
        <i :class="item.icon"></i>
        <span slot="title" :alt="item.path">{{item.permissionName}}</span>
      </el-menu-item>

      <!-- 目录 -->
      <el-submenu v-else-if="item.permissionType == 0 && item.isPermit"
                  :index="item.path"
                  :key="item.permissionName">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title"
                :class="{'el-menu--display':collapse && first}">{{item.permissionName}}</span>
        </template>
        <template v-for="child in item.children">
          <el-menu-item :index="child.path"
                        @click="open(child)"
                        :class="{'is-active':vaildAvtive(child)}"
                        v-if="child.permissionType == 1 && child.isPermit"
                        :key="child.permissionName">
            <i :class="child.icon"></i>
            <span slot="title">{{child.permissionName}}</span>
          </el-menu-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { validatenull } from "@/util/validate";
import config from "./config.js";
export default {
  name: "sidebarItem",
  data() {
    return {
      config: config
    };
  },
  props: {
    menu: {
      type: Array
    },
    screen: {
      type: Number
    },
    first: {
      type: Boolean,
      default: false
    },
    props: {
      type: Object,
      default: () => {
        return {};
      }
    },
    collapse: {
      type: Boolean
    }
  },
  created() {},
  mounted() {
    console.log(this.menu);
  },
  computed: {
    ...mapGetters(["roles"]),
    labelKey() {
      return this.props.label || this.config.propsDefault.label;
    },
    pathKey() {
      return this.props.path || this.config.propsDefault.path;
    },
    iconKey() {
      return this.props.icon || this.config.propsDefault.icon;
    },
    childrenKey() {
      return this.props.children || this.config.propsDefault.children;
    },
    nowTagValue() {
      return this.$router.$avueRouter.getValue(this.$route);
    }
  },
  methods: {
    generateTitle(item) {
      return this.$router.$avueRouter.generateTitle(
        item.permissionName,
        (item.meta || {}).i18n
      );
    },
    vaildAvtive(item) {
      const groupFlag = (item["group"] || []).some(ele =>
        this.$route.path.includes(ele)
      );
      return this.nowTagValue === item[this.pathKey] || groupFlag;
    },
    vaildRoles(item) {
      item.meta = item.meta || {};
      return item.meta.roles ? item.meta.roles.includes(this.roles) : true;
    },
    validatenull(val) {
      return validatenull(val);
    },
    open(item) {
      if (this.screen <= 1) this.$store.commit("SET_COLLAPSE");
      this.$router.$avueRouter.group = item.group;
      this.$router.$avueRouter.meta = item.meta;
      this.$router.push({
        path: this.$router.$avueRouter.getPath({
          name: item.permissionName,
          src: item.path,
          i18n: (item.meta || {}).i18n
        }),
        query: item.query
      });
    }
  }
};
</script>

