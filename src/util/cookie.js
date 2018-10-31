var Cookie = {
  // 内部方法：时间转换: 1年以下
  _toMsec (time) {
    let ifUnit = /[a-z]+/g.exec(time)
    let unit = ifUnit ? ifUnit[0] : ''
    time = parseInt(time)
    if (unit === '' && time === -1) { // -1
      return time
    } else if (unit === 's' && time <= 365 * 24 * 60 * 60) { // second
      return time * 1000
    } else if (unit === 'min' && time <= 365 * 24 * 60) { // minute
      return time * 60 * 1000
    } else if (unit === 'h' && time <= 365 * 24) { // hour
      return time * 60 * 60 * 1000
    } else if (unit === 'd' && time <= 365) { // day
      return time * 60 * 60 * 24 * 1000
    } else if (unit === 'm' && time <= 12) { // month
      return time * 60 * 60 * 24 * 30 * 1000
    } else if (unit === 'y' && time === 1) { // year
      return time * 60 * 60 * 24 * 365 * 1000
    } else {
      throw new Error('Illegal time.')
    }
  },
  // 是否存在
  has (name) {
    return new RegExp(`(?:^|;\\s*)` + encodeURIComponent(name).replace(/[-.+*]/g, '\\$&') + `\\s*=`).test(document.cookie)
  },
  // 获取值
  get (name) {
    return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(name).replace(/[.*-+]/g, '\\$&') + '\\s*=\\s*([^;]*).*$)|^.*$'), '$1')) || null
  },
  // 设置
  set (name, value, expires, path, domain, secure) {
    let cookie = ''
    if (!name) {
      throw new Error('Set cookie: Name needed!')
    }
    if (!value) {
      console.warn('Set cookie:Value is undefined.')
    }
    if (expires) {
      try {
        expires = new Date(this._toMsec(expires) + Date.now()).toUTCString()
      } catch (err) {
        expires = ''
        throw new Error(err)
      }
    }
    if (path && !path.match(/\/\S*/)) {
      throw new Error('Set cookie: Illegal path.')
    }
    if (domain && domain.match(/\s+/)) {
      throw new Error('Set cookie: Illegal domain.')
    }
    //document.cookie
    cookie = encodeURIComponent(name) + '='
      + (value ? encodeURIComponent(value) : '')
      + (expires ? '; expires=' + expires : '')
      + (path ? '; path=' + path : '')
      + (domain ? '; domain=' + domain : '')
      + (secure !== undefined && String(secure) ? '; secure=' + secure : '')
    document.cookie = cookie
    console.log(cookie)
  },
  // 移除
  remove (name, path, domain) {
    document.cookie = encodeURIComponent(name)
          + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
          + (path ? '; path=' + encodeURIComponent(path) : '')
          + (domain ? '; domain=' + encodeURIComponent(domain) : '')
    if (!this.get(name)) {
      console.log('Cookie {' + name + '} has been removed.')
      return true
    } else {
      console.log('Remove Fail.')
      return false
    }
  },
  // 获取所有: 返回名值对数组
  getAll () {
    let obj = {}
    document.cookie.replace(' ', '')
      .split(';')
      .forEach(item => {
        let arr = item.split('=')
        obj[decodeURIComponent(arr[0])] = decodeURIComponent(arr[1])
      })
    return obj
  },
  // 获取所有cookie: 返回name数组
  keys () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:=[^;]*)?;\s*/)
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx])
    }
    return aKeys
  }
}

export default Cookie
