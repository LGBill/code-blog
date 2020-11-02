const guard = (req, res, next) => {
    // 判断用户是否是登录页面
    // 判断用户的登录状态
    // 如果用户是登录状态，将请求放行
    // 如果用户不是登录状态，重定向到登录页面
    if(req.url != '/login' && !req.session.username){
        res.redirect('/admin/login')
    } else {
        // 用户是登录状态，且用户是普通用户
        if(req.session.role == 'normal'){
            // 将页面跳转到首页,阻止程序向下运行
            return res.redirect('/home/');
        }
        // 用户是登录状态，将请求放行
        next();
    }
}

module.exports = guard
