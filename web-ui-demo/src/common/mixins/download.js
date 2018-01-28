/**
 * 导出数据
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2017/11/27 10:46
 */

export default {
  methods: {
    /**
     * download
     * @param {Object} options
     * @param {Function} options.handle - 请求接口
     * @param {Object} options.params - 请求参数
     * @param {Function} options.callback - 回调
     * @param {Object} options.loading - loading配置参数
     */
    download (options = {}) {
      let {
        handle,
        params,
        callback,
        loading,
        message
      } = options;

      if (typeof (handle) === 'function') {

        let $loading = this.$loading(Object.assign({}, {
          lock: true,
          text: '在正努力下载中。。。',
          spinner: 'el-icon-loading'
        }, loading));

        handle(params).then(response => {
          if(response.data.size === 0){
            $loading.close();
            this.$message(Object.assign({},{
              message: '导出数据有误，请重试',
              type: 'error'
            },message));
            return;
          }
          let blob = new Blob([ response.data ], { type: response.headers['content-type'] }),
              filename = (response.headers['content-disposition'] || '').split('filename=')[1],
              url = window.URL.createObjectURL(blob),
              a = document.createElement('a');

          a.href = url;
          a.download = decodeURIComponent(filename);
          a.click();
          window.URL.revokeObjectURL(url);

          $loading.close();
          if (typeof callback === 'function') {
            callback.call(this, response)
          }
        })
      }
    }
  }
}
