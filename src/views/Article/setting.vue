<template>
  <div class="article-setting-component">
    <div class="create-container">
      <div class="sub-title">创建标签</div>
      <el-form
        ref="createForm"
        :model="createForm"
        label-width="80px"
        label-position="left">
          <el-form-item label="Value">
            <el-input v-model="createForm.value"></el-input>
          </el-form-item>
          <el-form-item label="Label">
            <el-input v-model="createForm.label"></el-input>
          </el-form-item>
          <el-form-item label="类别">
            <el-select v-model="createForm.category" placeholder="选择类别">
              <el-option label="Coding" value="coding"></el-option>
              <el-option label="Talk" value="talk"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleCreate">立即创建</el-button>
            <el-button @click="handleClear">重置</el-button>
          </el-form-item>
      </el-form>
    </div>
    <div class="tag-table-container">
      <div class="sub-title-wrapper">
        <div class="sub-title">标签列表</div>
        <el-select
          v-model="listCategory"
          placeholder="选择类别"
          @change="handleChange">
          <el-option label="全部" value=""></el-option>
          <el-option label="Coding" value="coding"></el-option>
          <el-option label="Talk" value="talk"></el-option>
        </el-select>
      </div>
      <el-table
        class="tag-table"
        :data="tagTableData">
        <el-table-column
          prop="value"
          label="Value"
          align="center">
        </el-table-column>
        <el-table-column
          prop="label"
          label="Label"
          align="center">
        </el-table-column>
        <el-table-column
          prop="category"
          label="类别"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <i
              class="el-icon-delete operation"
              @click="handleDelte(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'article-setting-component',
  data() {
    return {
      // 创建
      createForm: {
        value: '',
        label: '',
        category: 'coding',
      },
      // 列表
      listCategory: '',
      tagTableData: [
        { value: '1' }
      ],
    };
  },
  methods: {
    // 创建标签
    handleCreate() {
      this.$http('createTag', this.createForm).then((res) => {
        const { code } = res;
        if (code === '0') {
          this.$message({
            message: '标签创建成功',
            type: 'success',
          });
          this.getTagList();
        }
      });
    },
    // 删除标签
    handleDelte(row) {
      this.$confirm('确定删除此标签?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        const params = {
          id: row._id || '',
        };
        this.$http('deleteTag', params).then((res) => {
          const { code, data } = res;
          if (code === '0') {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.getTagList();
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleClear() {
      this.createForm = {
        value: '',
        label: '',
      };
    },
    handleChange() {
      this.getTagList();
    },
    // 获取标签列表
    getTagList() {
      const params = {
        category: this.listCategory,
      };
      this.$http('getTagList', params).then((res) => {
        const { code, data } = res;
        if (code === '0' && data && data.length) {
          this.tagTableData = data;
        } else {
          this.tagTableData = [];
        }
      });
    }
  },
  created() {
    this.getTagList();
  }
};
</script>

<style lang="scss">
.article-setting-component {
  padding: 30px;
  .sub-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .create-container {
    width: 500px;
  }
  .tag-table-container {
    .sub-title-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      .sub-title {
        margin-bottom: 0;
      }
    }
    .tag-table {
      font-size: 1.2rem;
      .el-table__header-wrapper {
        tr th {
          font-weight: bold;
          background: $light-grey;
        }
      }
      .el-table__body-wrapper {
        tr td {
          .operation {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
