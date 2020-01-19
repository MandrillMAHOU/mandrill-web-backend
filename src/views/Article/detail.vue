<template>
  <div class="article-detail-component">
    <div class="sub-title">{{ articleId ? '编辑' : '新建' }}文章</div>
    <div class="form-container">
      <el-form
        :model="articleData"
        :rules="articleRules"
        ref="form"
        class="article-info-form"
        label-width="80px"
        label-position="left">
        <el-form-item label="文章名称" prop="name">
          <el-input v-model="articleData.name"></el-input>
        </el-form-item>
        <el-form-item label="文章类别" prop="category">
          <el-select
            v-model="articleData.category"
            placeholder="选择类别">
            <el-option label="Coding" value="coding"></el-option>
            <el-option label="Talk" value="talk"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签">
          <div class="tags-container">
            <span
              class="tag"
              :class="{ selected: articleData.selectedTags.includes(item._id) }"
              @click="toggleSelect(item)"
              v-for="(item, index) of allTags"
              :key="index">
              {{ item.label || '-' }}
            </span>
          </div>
        </el-form-item>
        <el-form-item label="文章简介" prop="desc">
          <el-input type="textarea" v-model="articleData.desc"></el-input>
        </el-form-item>
        <el-form-item label="文章配图">
          <input
            ref="coverInput"
            type="file"
            accept="image/*">
        </el-form-item>
        <el-form-item v-if="articleId" label="配图预览">
          <img :src="coverImg" alt="封面预览" height="100">
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-switch
            style="margin-right: 10px;"
            v-model="fakeDate"
            active-color="#ff7500"
            inactive-color="#a29c9c">
          </el-switch>
          <el-date-picker
            :disabled="!fakeDate"
            style="margin-right: 10px;"
            v-model="articleData.createDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
          <el-time-picker
            :disabled="!fakeDate"
            v-model="articleData.createTime"
            value-format="HH:mm:ss"
            placeholder="创建时间">
          </el-time-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class="editor-container">
      <mavon-editor
        class="mavon-editor"
        ref="mavonEditor"
        v-model="articleData.content"
        codeStyle="monokai"
        :tabSize="2"
        @imgAdd="handleImgAdd"
        @imgDel="handleImgDelete" />
    </div>
    <div class="operations-container">
      <el-button type="primary" @click="handleCreate">{{ articleId ? '保存编辑' : '创建' }}</el-button>
      <el-button @click="handleClear">重置</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'article-detail-component',
  data() {
    return {
      fakeDate: false,
      // 表单数据
      articleData: {
        name: '',
        category: 'coding',
        selectedTags: [], // _ids of tags which are selected
        desc: '',
        createDate: '',
        createTime: '',
        // md编辑器
        content: '',
      },
      coverImg: '',
      allTags: [],
      articleRules: {
        name: [
          { required: true, message: '请输入文章名称', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入文章简介', trigger: 'blur' }
        ],
      },
    };
  },
  computed: {
    // 文章编号
    articleId() {
      return this.$route.query.id;
    },
    ...mapState({
      userInfo: (state) => state.userInfo,
    })
  },
  watch: {
    // keep tags align with current category
    // eslint-disable-next-line func-names
    'articleData.category': function (newCategory) {
      this.getTagList(newCategory);
    },
    articleId(newId) {
      // 回到新建状态
      if (!newId) {
        this.handleClear();
      }
    }
  },
  methods: {
    // =======md编辑器=======
    // 图片上传
    handleImgAdd(pos, file) {
      const formData = new FormData();
      formData.append('img', file);
      this.$http('imgUpload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((res) => {
        const { code, data } = res;
        if (code === '0' && data) {
          this.$refs.mavonEditor.$img2Url(pos, data);
        }
      });
    },
    handleImgDelete(url) {
      if (url.constructor === Array) {
        url = url[0];
      }
      const params = {
        url,
      };
      this.$http('imgDelete', params).then((res) => {
      });
    },
    // =======md编辑器=======
    // 保存文章
    handleCreate() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { articleData } = this;
          // 处理创作日期字符串
          let createTime = '';
          if (this.fakeDate) {
            createTime = `${articleData.createDate} ${articleData.createTime}`;
          }
          const params = {
            name: articleData.name,
            author: this.userInfo.username,
            category: articleData.category,
            selectedTags: articleData.selectedTags, // _ids of tags which are selected
            desc: articleData.desc,
            createTime,
            content: articleData.content,
          };
          // 处理文章封面图片, 有封面图
          if (this.$refs.coverInput && this.$refs.coverInput.files && this.$refs.coverInput.files[0]) {
            params.coverImg = this.$refs.coverInput.files[0];
          }
          let url = 'createArticle';
          if (this.articleId) {
            url = 'updateArticle';
            params.id = this.articleId;
            params.renewTime = this.fakeDate; // update create time
          }

          // with file input, input using form data
          const formData = new FormData();
          for (const key in params) {
            formData.append(key, params[key]);
          }

          this.$http(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          }).then((res) => {
            const { code, data } = res;
            if (code === '0') {
              this.$message({
                type: 'success',
                message: '保存成功'
              });
              if (data !== this.articleId) {
                this.$router.push({
                  name: 'articleDetail',
                  query: { id: data },
                });
              }
            }
          });
        } else {
          this.$message({
            type: 'error',
            message: '表单有错'
          });
        }
      });
    },
    // 获取单篇文章信息
    getArticle() {
      this.$http('getArticle', {
        id: this.articleId,
      }).then((res) => {
        const { code, data } = res;
        if (code === '0' && data) {
          this.coverImg = data.coverImg; // 编辑时的封面预览
          // keep res data is align with form data
          for (const key in data) {
            if (!Object.keys(this.articleData).includes(key)) {
              delete data[key];
            }
          }
          this.articleData = {
            name: data.name,
            category: data.category,
            selectedTags: data.selectedTags.map((tag) => {
              if (tag.constructor === String) {
                return tag;
              }
              return tag._id;
            }), // _ids of tags which are selected
            desc: data.desc,
            createDate: data.createTime.split(' ')[0] || '',
            createTime: data.createTime.split(' ')[1] || '',
            content: data.content,
          };
        }
      });
    },
    handleClear() {
      this.articleData = {
        name: '',
        category: 'coding',
        selectedTags: [],
        desc: '',
        content: '',
      };
    },
    /**
     * 获取标签列表
     * @param {String} category - optional
     */
    getTagList(category = '') {
      const params = {
        category: category || this.articleData.category || '',
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
      const idx = this.articleData.selectedTags.indexOf(tag._id);
      if (idx === -1) {
        this.articleData.selectedTags.push(tag._id);
      } else {
        this.articleData.selectedTags.splice(idx, 1);
      }
    },
    handleChange() {
      this.articleData.selectedTags = [];
    },
  },
  created() {
    this.getTagList();
    if (this.articleId) {
      this.getArticle();
    }
  },
};
</script>

<style lang="scss">
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
  .editor-container {
    margin-bottom: 20px;
    max-width: 1200px;
    .mavon-editor {
      ol {
        list-style: decimal;
      }
      ul {
        list-style: initial;
      }
      pre {
        padding: 5px;
        background: #272822;
      }
    }
  }
}
</style>
