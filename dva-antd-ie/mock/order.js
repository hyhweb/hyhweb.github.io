const Mock = require('mockjs')

let productsListData = Mock.mock({
  'data|8000-10000': [
    {
      text1: '@id',
      text2: '@name',
      text3: '@last',
      text4: '@county(true)',
      text5: '@boolean',
      text6: '@email',
      text7: '@datetime',
      text8: '@name',
      text9: '@name',
      text10: '@name',
      text11: '@name'
    },
  ],
})


let database = productsListData.data

module.exports = {

  ['POST /api/order'] (req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    res.status(200).json({
      data: database.slice((page - 1) * pageSize, page * pageSize),
      total: database.length
    })
  }
}
