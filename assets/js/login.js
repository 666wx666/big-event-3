
$(function () {
    let layer = layui.layer
    let form = layui.form

    $('#gotoRigest').click(function () {
         $('.loginBox').hide()
         $('.registBox').show()
    })
    
    $('#gotoLogin').click(function () {
        $('.registBox').hide()
        $('.loginBox').show()
    })
     
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ],

        repass: function (value, item) {
          let pwd = $('#registForm [name="password"]').val()
          console.log( pwd );
          if ( value !== pwd ) {
              return '两次密码不一致'
          }
        }
      });      
            

    $('#registForm').submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: $('#registForm').serialize(),
            success: function (res) {
                if ( res.status !== 0 ) {
                    return layer.msg('注册失败！'+ res.message)
                }
                layer.msg('注册成功！')
            }
        })
    })

    $('#loginForm').submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $('#loginForm').serialize(),
            success: function (res) {
                console.log( res );
                if ( res.status !== 0 ) {
                    return layer.msg('登录失败' + res.message)
                }
                layer.msg('登录成功')

                localStorage.setItem('token', res.token)
                location.href = 'index.html'
            }
        })
    })
})