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
  }
};
