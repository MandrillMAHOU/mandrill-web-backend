<template>
  <div id="mandrill-main-component">
    <div class="mandrill-menu-container">
      <el-menu
        router
        :unique-opened="true"
        :default-openeds="['1']"
        :default-active="$route.name"
        class="mandrill-menu">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>文章</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="articleList" :route="{ name: 'articleList' }">
              <i class="el-icon-folder-opened"></i>
              文章列表
            </el-menu-item>
            <el-menu-item index="articleDetail" :route="{ name: 'articleDetail' }">
              <i class="el-icon-edit-outline"></i>
              新建文章
            </el-menu-item>
            <el-menu-item index="articleSetting" :route="{ name: 'articleSetting' }">
              <i class="el-icon-s-tools"></i>
              文章设置
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2" disabled>
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>用户</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">用户列表</el-menu-item>
            <el-menu-item index="2-2">新建用户</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="mandrill-main-content-container">
      <div class="title-container">
        <div class="title">
          <i class="el-icon-s-platform"></i>
          Manddrill Web后台管理系统
        </div>
        <div class="user">
          <span>
            {{ userInfo.username || '未知用户' }}
          </span>
          <span class="split"> | </span>
          <span>
            登陆时间：{{ userInfo.loginTime || '-' }}
          </span>
          <span class="split"> | </span>
          <span class="logout" @click="handleLogout">
            Logout
          </span>
        </div>
      </div>
      <router-view class="mandrill-wrapper"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'mandrill-main-component',
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo,
    })
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('mandrillToken');
      this.$router.push({ name: 'login' });
    }
  }
};
</script>

<style lang="scss">
#mandrill-main-component {
  display: flex;
  .mandrill-menu-container {
    flex: 0 0 200px;
    width: 200px;
    min-height: 100vh;
    .mandrill-menu {
      height: 100%;
    }
  }
  .mandrill-main-content-container {
    flex: 1;
    .title-container {
      background: $white;
      padding: 10px 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      .title {
        color: $dark;
        font-size: 1.5rem;
      }
      .user {
        font-size: 1.2rem;
        .split {
          margin: 0 15px;
        }
        .logout {
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
