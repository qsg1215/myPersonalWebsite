import moment from 'moment'
import md5 from 'md5'
import NodeRSA from 'node-rsa';
import CryptoJS from  "crypto-js";
import AES from './AES'

// 扩展toFixed方法
Number.prototype.toFixed = n => {
  if (n > 20 || n < 0) {
    throw new RangeError('toFixed() digits argument must be between 0 and 20');
  }
  const number = this;
  if (isNaN(number) || number >= Math.pow(10, 21)) {
    return number.toString();
  }
  if (typeof (n) === 'undefined' || n == 0) {
    return (Math.round(number)).toString();
  }

  let result = number.toString();
  const arr = result.split('.');

  // 整数的情况
  if (arr.length < 2) {
    result += '.';
    for (let i = 0; i < n; i += 1) {
      result += '0';
    }
    return result;
  }

  const integer = arr[0];
  const decimal = arr[1];
  if (decimal.length === n) {
    return result;
  }
  if (decimal.length < n) {
    for (let i = 0; i < n - decimal.length; i += 1) {
      result += '0';
    }
    return result;
  }
  result = integer + '.' + decimal.substr(0, n);
  const last = decimal.substr(n, 1);

  // 四舍五入，转换为整数再处理，避免浮点数精度的损失
  if (parseInt(last, 10) >= 5) {
    const x = Math.pow(10, n);
    result = (Math.round((parseFloat(result) * x)) + 1) / x;
    result = result.toFixed(n);
  }

  return result;
};

// keyup两位小数验证，
export const keyupCheck2Decimal = value => {
  if (value) {
    value = value.replace(/[^\d.]/g, '');
    value = value.replace(/^\./g, '');
    value = value.replace(/\.{2,}/g, '.');
    value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
    return value;
  }
}

// 纯数字

export const decimalOnly = value => {
  if (value) {
    value = value.replace(/[^\d]/g, ''); //  先把非数字的都替换掉，除了数字和小数点
    return value
  }
}
//  字母加数字

export const keyupNumberAndChar = value => {
  if (value) {
    value = value.replace(/[^0-9a-zA-Z]/g, '')
    return value;
  }
}

// 时间戳转日期
export function formatTimeStamp (timeStamp, format) {
  let formatParams;
  formatParams = format || 'YYYY-MM-DD HH:mm'
  return moment(timeStamp * 1000).format(formatParams)
}

// 校验不能为空
export function checkNull (rule, value, callback, name) {
  if (!value.trim().length) {
    return callback(new Error(name + '不能为空'));
  } else {
    callback();
  }
};
// 只能输入正整数
export function onlyInteger (value) {
  if (value) {
    value = value.replace(/\D/g, '')//  不包含小数点
    value = Number(value)
    value = String(value)
    return value
  }
};

// MD5 加密
export function MD5 (val) {
  return md5(val).toLowerCase()
}

// UEEditor 配置
export function UEeditorConfig () {
  return {
    defaultMsg: '开始你的文章吧!',
    config: {
      initialFrameWidth: null,
      initialFrameHeight: 350,
      zIndex: 2002,
      enterTag: 'br'
    }
  }
}


/**
 * Created by php on 2018/1/13.
 */

/**
 * Created by Administrator on 2017/11/26.
 */
// 加密RSA
export function decryptByRSA (RSApublicKey, AESkey) {
  var buffer = JSON.stringify(AESkey)
  var privatekey = new NodeRSA(RSApublicKey)
  var encrypted = privatekey.encrypt(buffer, 'base64')
  return encrypted
};

/*
//获取RSA
export function getRSAapi() {
  var promise = new Promise((resolve,reject)=>{
    axios.get(server.testURL+'/common/getRSA')
      .then(function (response) {
        resolve(response.data.RSApublicKey)
        globalData.RSApublicKey = response.data.RSApublicKey
      })
      .catch(function (error) {
        reject(error);
      });
  });
  return promise;
};
*/

// 加密AES
export function getAesString (data) {
  var key = CryptoJS.enc.Utf8.parse(AES.key)
  var iv = CryptoJS.enc.Utf8.parse(AES.iv)
  var encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key,
    {
      iv: iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
  return encrypted.toString(); // 返回的是base64格式的密文
}

// 解密AES
export function getDAesString (encrypted) {
  var key = CryptoJS.enc.Utf8.parse(AES.key)
  var iv = CryptoJS.enc.Utf8.parse(AES.iv)

  var decrypted = CryptoJS.AES.decrypt(encrypted, key,
    {
      iv: iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
  return decrypted.toString(CryptoJS.enc.Utf8)
}
// toast弹窗
export function toast (data, type) {
  // 类型有:
  /*
  1.'success':成功
  2.'info' :一般信息
  3.'warning':警告
  4.'danger':危险
   */
  Vue.toast(data, {
    horizontalPosition: 'center',
    verticalPosition: 'top',
    closeable: true,
    duration: 3000,
    className: 'toastStyle-'+type
  })
}

// 教验证传递的参数
export function checkPostData (data) {
  function checkDataIsHasErrorParm (data) {
    for (var key in data) {
      if (typeof data[key] !== 'object' && data[key] !== null){
        if (data[key] === undefined || data[key] === '' || (typeof data[key] === 'string' && data[key].trim().length == 0)){
          Vue.toast(key + '字段格式错误!', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            closeable: true,
            duration: 3000,
            className: 'toastStyle-warning'
          })
          return true
          break
        } else {
          // console.log(data[key]);
        }
      } else {
        checkPostData(data[key])
      }
    }
  };
  return checkDataIsHasErrorParm(data)
}

// 高亮代码
export function highLightCode () {
  $('pre').each(function (index, item) {
    var html = $(item).html()
    var classType = $(item)[0].className.split(';')[0].split(':')[1]
    var codeClass = ''
    switch (classType) {
      case 'js':
        codeClass = 'javascript'
        break
      case 'html':
        codeClass = 'html'
        break
      case 'bash':
        codeClass = 'bash'
        break
      case 'css':
        codeClass = 'css'
        break
      case 'sql':
        codeClass = 'sql'
        break
      case 'xml':
        codeClass = 'xml'
        break
      default:
        codeClass = 'nohighlight'
    }
    html = '<code class="' + codeClass + '">' + html + '</code>'
    $(item).html(html)
  })
  hljs.highlightCode()
}

