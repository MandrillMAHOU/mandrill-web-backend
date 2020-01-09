<template>
  <div class="article-detail-component">
    <div class="sub-title">{{ articleId ? '编辑' : '新建' }}文章</div>
    <div class="form-container">
      <el-form
        :model="formData"
        :rules="articleRules"
        ref="form"
        class="article-info-form"
        label-width="80px"
        label-position="left">
        <el-form-item label="文章名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="文章类别" prop="category">
          <el-select
            v-model="formData.category"
            placeholder="选择类别"
            @change="handleChange">
            <el-option label="Coding" value="coding"></el-option>
            <el-option label="Talk" value="talk"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <div class="tags-container">
            <span
              class="tag"
              :class="{ selected: formData.selectedTags.includes(item._id) }"
              @click="toggleSelect(item)"
              v-for="(item, index) of allTags"
              :key="index">
              {{ item.label || '-' }}
            </span>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'article-detail-component',
  data() {
    return {
      formData: {
        name: '',
        category: 'coding',
        selectedTags: [], // _ids of tags which are selected
      },
      allTags: [],
      articleRules: {
      },
    };
  },
  computed: {
    // 文章编号
    articleId() {
      return this.$route.query.id;
    },
  },
  methods: {
    // 获取标签列表
    getTagList() {
      const params = {
        category: this.formData.category || '',
      };
      this.$http('getTagList', params).then((res) => {
        const { code, data } = res;
        if (code === '0' && data && data.length) {
          this.allTags = data;
        } else {
          this.allTags = [];
        }
      });
    },
    // 点击选中或取消标签
    toggleSelect(tag) {
      const idx = this.formData.selectedTags.indexOf(tag._id);
      if (idx === -1) {
        this.formData.selectedTags.push(tag._id);
      } else {
        this.formData.selectedTags.splice(idx, 1);
      }
    },
    handleChange() {
      this.formData.selectedTags = [];
      this.getTagList();
    },
  },
  created() {
    this.getTagList();
  },
};
</script>

<style lang="scss" scoped>
.article-detail-component {
  padding: 30px;
  .sub-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .form-container {
    width: 50%;
  }
  .tags-container {
    display: flex;
    align-items: center;
    .tag {
      cursor: pointer;
      user-select: none;
      padding: 5px 10px;
      border-radius: 2px;
      background: #ccc;
      margin-right: 10px;
      &.selected {
        background: $orange;
      }
    }
  }
}
</style>
