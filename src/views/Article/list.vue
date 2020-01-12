<template>
  <div class="article-list-component">
    <div class="sub-title">文章列表</div>
    <div class="categpry-select-container">
      <span class="label">文章类别：</span>
      <el-select
        v-model="category"
        placeholder="请选择"
        @change="handleChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="article-table-container">
      <el-table
        class="basic-table"
        :data="articleTableData">
        <el-table-column
          prop="name"
          label="名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="category"
          label="类别"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          prop="desc"
          label="简介"
          align="center">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <i
              class="el-icon-edit-outline operation"
              @click="handleEdit(scope.row)"></i>
            <i
              class="el-icon-delete operation"
              @click="handleDelete(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-wrap">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pno"
        :page-size="size"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'article-list-component',
  data() {
    return {
      category: '',
      pno: 1,
      size: 10,
      total: 0,
      articleTableData: [],
      options: [
        { value: '', label: '全部' },
        { value: 'coding', label: 'Coding' },
        { value: 'talk', label: 'Talk' },
      ],
    };
  },
  methods: {
    handleEdit(row) {
      const id = row._id;
      if (id) {
        this.$router.push({ name: 'articleDetail', query: { id } });
      }
    },
    handleDelete(row) {
      this.$confirm('确定删除文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        const params = {
          id: row._id || '',
        };
        this.$http('deleteArticle', params).then((res) => {
          const { code, data } = res;
          if (code === '0') {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.getArticleList();
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 分页切换
    handleCurrentChange(page) {
      this.pno = page;
      this.getArticleList();
    },
    handleChange() {
      this.getArticleList();
    },
    getArticleList() {
      const params = {
        category: this.category,
        pno: this.pno,
        size: this.size,
      };
      this.$http('getArticleList', params).then((res) => {
        const { code, data } = res;
        if (code === '0' && data) {
          this.articleTableData = data.result || [];
          this.pno = data.pno;
          this.size = data.size;
          this.total = data.total;
        } else {
          this.articleTableData = [];
          this.pno = 1;
          this.size = 10;
          this.total = 0;
        }
      });
    }
  },
  created() {
    this.getArticleList();
  }
};
</script>

<style lang="scss">
.article-list-component {
  padding: 30px;
  .sub-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .categpry-select-container {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-bottom: 18px;
  }
  .article-table-container {
    margin-bottom: 18px;
  }
}
</style>
