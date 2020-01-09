<template>
  <div class="login-component">
    <div class="login-wrapper">
      <div class="title">Login</div>
      <el-form label-width="80px" :model="formData">
        <el-form-item label="User">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login()">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      formData: {
        username: '',
        password: '',
      }
    };
  },
  methods: {
    login() {
      this.$http('login', this.formData).then((res) => {
        const { code, data } = res;
        if (code === '0' && data) {
          localStorage.setItem('mandrillToken', data.mandrillToken || '');
          localStorage.setItem('mandrillBEUser', JSON.stringify({
            username: data.username || '',
            loginTime: data.loginTime || '',
          })); // back end user info
          this.$store.commit('setUserInfo', data);
          this.$router.push({ name: 'articleList' });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-component {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-wrapper {
    background: rgba(0, 0, 0, .1);
    border-radius: 4px;
    padding: 1.5rem 1.5rem 0;
  }
  .title {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 2rem;
  }
}
</style>
