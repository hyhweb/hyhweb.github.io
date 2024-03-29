module.exports = {
  dateFormat(times,format){
    let date = new Date(times)
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds(),
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
      }
    }
    return format
  }
}
