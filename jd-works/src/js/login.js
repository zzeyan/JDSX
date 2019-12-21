$(() => {
    /* 登录按钮的点击事件 */
    $("#loginsubmit").click(function () {
        let usernameVal = $.trim($("#loginname").val());
        let passwordVal = $.trim($("#nloginpwd").val());

        $.ajax({
            type: "post",
            url: "../api/login.php",
            data: `username=${usernameVal}&password=${passwordVal}`,
            dataType: "json",
            success: function (response) {
                console.log(response);

                // /* 登录成功 */
                if (response.status == "success") {
                    setCookie('name', response.name, 1);
                    setCookie('cid', response.cid, 1);
                    let url = getCookie('url');
                    console.log(url);
                    
                    if (url) {
                        location.href = url;
                    } else {
                        /* 跳转到首页 */
                        location.href = "./index.html";
                    }

                } else {
                    /* 注册失败： */
                    alert(response.msg);
                }

                /* 登录失败 */
            }
        });

    })
})