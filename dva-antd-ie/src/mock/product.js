const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')

const { apiPrefix } = config

let productsListData = Mock.mock({
  'data|8000-10000': [
    {
      id: '@id',
      name: '@name',
      nickName: '@last',
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      createTime: '@datetime',
  },
  ],
})


let database = productsListData.data

module.exports = {

  [`GET ${apiPrefix}/products`] (req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    res.status(200).json({
       data: database.slice((page - 1) * pageSize, page * pageSize),
       total: database.length
    })
  },
}
