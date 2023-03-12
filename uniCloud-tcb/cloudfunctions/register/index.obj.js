// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
  _before: function() { // 通用预处理器

  },
  /**
   * 首次提交信息
   * @param {object} info 信息对象
   * @returns {object} 返回值描述
   */

  async reg(info) {
    const db = uniCloud.database()
    let totalOfUser = await db.collection('user').where({
      openid: info.openid
    }).count()
    if (totalOfUser.total === 0) {
      await db.collection("user").add(info)
    }
  }
}
