module.exports={
    paramFormatError: {
        code: 10001,
        message: '参数格式错误',
        result: '',
    },
    ///用户注册系
    userMailExist: {
        code: 10003,
        message: '该邮箱已被注册',
        result: '',
    },
    userRegisterError: {
        code: 10004,
        message: '用户注册失败,账户已存在',
        result: '',
    },
    ///用户登录系
    userIsNotExist: {
        code: 10005,
        message: '用户不存在',
        result: '',
    },
    userVerificationError: {
        code: 10006,
        message: '验证码错误',
        result: '',
    },
    userLoginError: {
        code: 10007,
        message: '用户登录失败',
        result: '',
    },
    ///用户角色权限系
    hasNotAdminPermission: {
        code: 10009,
        message: '当前用户没有管理员权限',
        result: '',
    },
    ///验证码系
    verificationError:{
        code: 10010,
        message: '验证码错误',
        result: '',
    },
    verificationExpired:{
        code: 10011,
        message: '验码已过期',
        result: '',
    },
    getVerificationError:{
        code: 10012,
        message: '请勿频繁地获取验证码,请稍后再试',
        result: '',
    },
    sendVerificationError:{
        code:10013,
        message:'验证码发送失败，服务器内部错误',
        result:'',
    },
    ///接口使用验证系
    authTokenError:{
        code:10014,
        message:'token验证失败',
        result:'',
    },
    //用户删除失败
    deleteUserFail:{
        code:10014,
        message:'删除用户失败',
        result:'',
    },
    //useragent参数未知
    useragentUnknow:{
        code:10015,
        message:'未知客户端',
        result:'',
    }
}