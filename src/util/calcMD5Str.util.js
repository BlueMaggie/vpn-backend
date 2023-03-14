const crypt=require('crypto')


const calcMD5Str = function (str){
    const hash_for_md5=crypt.createHash("md5")
    return hash_for_md5.update(str).digest('hex')
}

module.exports = calcMD5Str