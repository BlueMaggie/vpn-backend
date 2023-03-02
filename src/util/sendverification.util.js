const nodemailer =require( 'nodemailer')
const sendVerificationAsync= async function(recevier,verification)
{
    let transporter = nodemailer.createTransport({
        service: 'qq',  //  邮箱
        secure: false,    //  安全的发送模式
        auth:{
            user: '473211890@qq.com', //  发件人邮箱
            pass: 'mvvxkbqvojyocbac' //  授权码
        }
    });
    transporter.sendMail(
        {
            // 发件人邮箱
            from: 'ikun的小站👻<473211890@qq.com>',
            // 目标邮箱
            to: recevier,
            // 邮件内容
            html:"<h1>您的验证码是  "+verification+"  请在5分钟之内使用</h1>"
            ,
        },
        (err, data) => {
            if (err) {
                console.error(err);
                return false
            }else{
                return true
            }
        }
    )
}

module.exports=sendVerificationAsync