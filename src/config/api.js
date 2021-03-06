export default {
  /**
   * ========用户========
   */
  login: {
    method: 'post',
    url: '/user/login',
  },
  /**
   * ========标签========
   */
  // 创建标签
  createTag: {
    method: 'post',
    url: '/tag/create',
  },
  // 删除标签
  deleteTag: {
    method: 'post',
    url: '/tag/delete',
  },
  // 获取标签列表
  getTagList: {
    method: 'get',
    url: '/tag/list'
  },
  /**
   * ========文章========
   */
  createArticle: {
    method: 'post',
    url: '/article/create',
  },
  updateArticle: {
    method: 'post',
    url: '/article/update',
  },
  deleteArticle: {
    method: 'post',
    url: '/article/delete',
  },
  getArticleList: {
    method: 'get',
    url: '/article/list'
  },
  getArticle: {
    method: 'get',
    url: '/article/detail',
  },
  // 文章内文件上传
  imgUpload: {
    method: 'post',
    url: '/article/imgUpload',
  },
  imgDelete: {
    method: 'post',
    url: '/article/imgDelete',
  }
};
