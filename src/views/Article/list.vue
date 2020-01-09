<template>
  <div class="article-list-component">
    <div class="categpry-select-container">
      <span class="label">文章类别：</span>
      <el-select v-model="category" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'article-list-component',
  data() {
    return {
      category: '',
      options: [
        { value: '', label: '全部' },
        { value: 'coding', label: 'Coding' },
        { value: 'talk', label: 'Talk' },
      ],
    };
  },
  methods: {
  }
};
</script>

<style lang="scss">
.article-list-component {
  .categpry-select-container {
    display: flex;
    align-items: center;
    padding: 20px;
  }
}
</style>
