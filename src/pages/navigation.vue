<template>
  <el-container>
    <el-header>
      <div class="header-title">
        <!-- <img width="80px" height="80px" src="../assets/images/login/logo1.png"/> -->
        <span>基层书记管理平台</span>
      </div>
      <el-menu router :default-active="$route.path" class="el-menu-demo" mode="horizontal">
        <el-submenu v-for="(item,index) in menuList" :key="index" :index="item.id">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="child in item.children"
              :key="child.id"
              :index="child.index"
            >{{child.title}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <div id="loginout">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{userName}}，欢迎您访问！
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="outLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-main>
      <div>
        <ul
          v-show="visible"
          :style="{left: contextMenuLeft + 'px', top: contextMenuTop + 'px'}"
          class="contextmenu"
        >
          <li v-for="(item, key) of optionList" @click="handleTagsOption(key)" :key="key">{{item}}</li>
        </ul>
      </div>

      <el-tabs
        v-model="activeIndex"
        type="card"
        v-if="openTab.length"
        @tab-click="tabClick"
        @tab-remove="tabRemove"
        @contextmenu.prevent.native="contextMenu(1, $event)"
      >
        <el-tab-pane
          :closable="item.route!='/home'"
          :key="item.name"
          v-for="(item, index) in openTab"
          :label="item.name"
          :name="item.route"
        ></el-tab-pane>
      </el-tabs>
      <!--  </div> -->
      <!-- <div class="tag-nav-wrapper">
        <el-tag
          closable
          @click.native="tabClick"
          @close="tabRemove(item.route)"
          v-for="(item, index) in openTab"
          :key="item.name"
          effect="plain"
        >{{ item.name }}</el-tag>
      </div>-->
      <div class="content-wrapper">
        <router-view/>
      </div>
    </el-main>
    <el-footer>
      <span>武汉创信博达信息技术有限公司 版权所有。Wuhan Chuangxin Information Technology CO,LTD. Copyright © 2019</span>
    </el-footer>
  </el-container>
</template>
<script>
import { routeEqual } from '@/service/utils'
export default {
  data() {
    return {
      tagBodyLeft: 0,
      rightOffset: 40,
      outerPadding: 4,
      contextMenuLeft: 0,
      contextMenuTop: 0,
      visible: false,
      optionList: {
        others: "关闭其他",
        all: "关闭所有"
      },
      menuList: [
        {
          id: "1",
          title: "系统管理",
          icon: "el-icon-s-tools",
          children: [
            {
              index: "/user",
              title: "用户信息"
            },
            {
              index: "/role",
              title: "角色信息"
            },
            {
              index: "/menu",
              title: "菜单信息"
            },
            {
              index: "/dept",
              title: "部门信息"
            },
            {
              index: "/log",
              title: "日志信息"
            }
          ]
        }
      ],
      userName: "admin"
    };
  },
   computed: {
    currentRouteObj () {
      const { name, params, query } = this.value
      return { name, params, query }
    }
  },
  methods: {
    handleTagsOption(type) {
      console.log(type)
      if (type === "all") {
        // 关闭所有，除了home
        let res = this.openTab.filter(item => item.route === "/home");
        console.log(res)
        this.$emit("close", res, "all");
      } else if (type === "others") {
        // 关闭除当前页和home页的其他页
        let res = this.openTab.filter(
          item => routeEqual(this.currentRouteObj, item) || item.name === "home"
        );
        this.$emit("on-close", res, "others", this.currentRouteObj);
        setTimeout(() => {
          this.getTagElementByName(this.currentRouteObj.name);
        }, 100);
      }
    },
    contextMenu(item, e) {
      if (item.name === "home") {
        return;
      }
      console.log(e);
      this.visible = true;
      const offsetLeft = this.$el.getBoundingClientRect().left;
      this.contextMenuLeft = e.clientX - offsetLeft + 10;
      this.contextMenuTop = e.clientY - 64;
    },
    closeMenu() {
      this.visible = false;
    },
    outLogin() {
      this.$confirm("是否退出系统?", "提示", {
        confirmButtonText: "退出",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.state.openTab = [];
        this.$store.state.activeIndex = "/home";
        localStorage.setItem("token","")
        this.$router.push("login");
      });
    },
    //tab标签点击时，切换相应的路由
    tabClick(tab) {
      this.$router.push({ path: this.activeIndex });
    },
    //移除tab标签
    tabRemove(targetName) {
      console.log("tabRemove", targetName);
      //首页不删
      if (targetName == "/" || targetName == "/home") {
        return;
      }
      this.$store.commit("delete_tabs", targetName);
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.openTab && this.openTab.length >= 1) {
          this.$store.commit(
            "set_active_index",
            this.openTab[this.openTab.length - 1].route
          );
          this.$router.push({ path: this.activeIndex });
        } else {
          this.$router.push({ path: "/" });
        }
      }
    }
  },
  mounted() {
    // 刷新时以当前路由做为tab加入tabs
    // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
    // 当当前路由是首页时，添加首页到store，并设置激活状态
    if (this.$route.path !== "/" && this.$route.path !== "/home") {
      this.$store.commit("add_tabs", { route: "/home", name: "首页" });
      console.log("-----------------------");
      console.log(this.$route);
      this.$store.commit("add_tabs", {
        route: this.$route.path,
        name: this.$route.name
      });
      this.$store.commit("set_active_index", this.$route.path);
    } else {
      this.$store.commit("add_tabs", { route: "/home", name: "首页" });
      this.$store.commit("set_active_index", "/home");
      this.$router.push("/");
    }
  },
  computed: {
    openTab() {
      return this.$store.state.openTab;
    },
    activeIndex: {
      get() {
        return this.$store.state.activeIndex;
      },
      set(val) {
        this.$store.commit("set_active_index", val);
      }
    }
  },
  watch: {
    $route(to, from) {
      //判断路由是否已经打开
      //已经打开的 ，将其置为active
      //未打开的，将其放入队列里
      let flag = false;
      for (let item of this.openTab) {
        if (item.name === to.name) {
          this.$store.commit("set_active_index", to.path);
          flag = true;
          break;
        }
      }

      if (!flag) {
        if (this.openTab.length > 9) {
          this.$message({
            type: "warning",
            message: "最多只能打开10个,请先关闭一些，再打开！"
          });
        } else {
          this.$store.commit("add_tabs", { route: to.path, name: to.name });
          this.$store.commit("set_active_index", to.path);
        }
      }
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  }
};
</script>
<style>
@import "../assets/css/navigation.css";
</style>
