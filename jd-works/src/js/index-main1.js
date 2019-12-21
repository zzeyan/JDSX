(function () {
    // 判断是否登录
    function getmyCookie(c_name) {
        if (document.cookie.length > 0) //首先查询cookie是否是空的
        {
            c_start = document.cookie.indexOf(c_name + "=") //检测这个cookie是否存在
            if (c_start != -1) //如果cookie存在
            {
                c_start = c_start + c_name.length + 1 //获取到cookie的值的开始位置
                c_end = document.cookie.indexOf(";", c_start) //从c_start开始查找";"的存在
                if (c_end == -1) c_end = document.cookie.length //如果没找到，说明是最后一项
                return unescape(document.cookie.substring(c_start, c_end)) //把cookie的值拆分出来并且对这个值进行解码，unescape()与escape()相对，对被escape()编码的字符串进行解码
            }
        }
        return "" //不存在就返回空
    }
    // top用户
    let ckname = getmyCookie('name');
    // let ckname = 'yushang';
    if (ckname) {
        $('#ttbar-login').html(`<div class="dt cw-icon">
        <i class="icon-plus-nickname"></i>
        <a class="nickname" target="_blank" href="//home.jd.com/">${ckname}</a>
        <i class="iconfont">&#xe62f;</i>
    </div>
    <div class="dd dorpdown-layer">
        <div class="dd-spacer"></div>
        <div class="userinfo">
            <div class="u-pic">
                <a href="###" target="_blank">
                    <img src="../img/peisong.jpg" alt="">
                </a>
            </div>
            <div class="u-plus">
                <a href="###" class="link-logout">退出</a>
                <a href="###" class="icon-plus-dropdown"></a>
            </div>
            <div class="u-msg">
                <a href="###">开通PLUS 平均省1012元/年></a>
            </div>
        </div>
    </div>`);
    } else {
        $('#ttbar-login').html(`<a href="login.html" class="link-login">你好，请登录</a>&nbsp;&nbsp;<a href="reg.html"
        class="link-regist style-red">免费注册</a>`);
    }

    // 绑定用户显示功能
    $('#ttbar-login').hover(function () {
        $(this).addClass('hover');
        $('#ttbar-login .dd').show();
    }, function () {
        $(this).removeClass('hover');
        $('#ttbar-login .dd').hide();
    });

    // 点击退出退出登录，清除cookie
    $('#ttbar-login .link-logout').on('click', function () {
        removeCookie('name');
        removeCookie('cid');
        $('#ttbar-login').html(`<a href="#" class="link-login">你好，请登录</a>&nbsp;&nbsp;<a href="#"
        class="link-regist style-red">免费注册</a>`);
        // 点击跳转到登录和注册
        //注册
        $('#ttbar-login .link-regist').on('click', function () {
            setCookie('url', location.href, 1);
            location.href = 'html/reg.html?';
        })
        // 登录
        $('#ttbar-login .link-login').on('click', function () {
            setCookie('url', location.href, 1);
            location.href = 'login.html?';
        })
    })

    // 点击跳转到登录和注册
    // 注册
    $('#ttbar-login .link-regist').on('click', function () {
        setCookie('url', location.href, 1);
        location.href = './reg.html?';
    })
    // 登录
    $('#ttbar-login .link-login').on('click', function () {
        setCookie('url', location.href, 1);
        location.href = './login.html?';
    })

    // 表单(当失去焦点时清空文本框内容)
    $(function () {
        $('.input_test').bind({
            focus: function () {
                if (this.value == this.defaultValue) {
                    this.value = "";
                }
            },
            blur: function () {
                if (this.value == "") {
                    this.value = this.defaultValue;
                }
            }
        });
    })
}());

// 轮播图
(function () {
    //swiper插件
    var s1 = new Swiper('.swiper-container', {
        autoplay: { //自动轮播
            delay: 2000, //间隔时间
            disableOnInteraction: false //拖拽完后还能继续自动轮播
        },
        loop: true, //无缝 环路
        navigation: { //上下按钮
            nextEl: '.swiper-container .swiper-button-next',
            prevEl: '.swiper-container .swiper-button-prev'
        },
        pagination: { //焦点跟随
            el: '.swiper-container .swiper-pagination',
            clickable: true, //点击焦点跳到指定图片
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>'; //生成焦点数字
            }
        }
    });

    var oBox = document.getElementById('swiper-container');

    oBox.onmouseover = function () { //鼠标经过停止
        s1.autoplay.stop();
    }

    oBox.onmouseout = function () { //鼠标离开就运动
        s1.autoplay.start();
    }
}());

// 身临食感 -选项卡与商品展示轮播
(function () {
    // 选项卡
    $('.tab_head_item2').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.tab_body_item2').eq($(this).index()).css('display', 'block').siblings().css('display', 'none');
    });

    // 商品展示
    var s1 = new Swiper('.swiper-container2', {
        autoplay: false, //不轮播
        loop: true, //无缝 环路
        navigation: { //上下按钮
            nextEl: '.swiper-container2 .swiper-button-next',
            prevEl: '.swiper-container2 .swiper-button-prev'
        }
    });

    $('.tab_body_item2').eq(1).css('display', 'block').siblings().css('display', 'none');
}());


// 食鲜者说
(function () {
    var s1 = new Swiper('.comments_slider', {
        autoplay: true,
        noSwiping: true,
        loop: true, //无缝 环路
        navigation: { //上下按钮
            nextEl: '.comments_slider .swiper-button-next',
            prevEl: '.comments_slider .swiper-button-prev'
        },
        pagination: { //焦点跟随
            el: '.comments_slider .swiper-pagination',
            clickable: true, //点击焦点跳到指定图片
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>'; //生成焦点数字
            }
        }
    });

    var oBox = document.getElementById('comments_slider');

    oBox.onmouseover = function () { //鼠标经过停止
        s1.autoplay.stop();
    }

    oBox.onmouseout = function () { //鼠标离开就运动
        s1.autoplay.start();
    }
}());

// 侧栏(楼层跳跃)
(function () {
    // 位置确定
    $(window).resize(function () {
        console.log($(window).height());
        // console.log($(window).width());
        // console.log($('#mod_lift_11').innerWidth());;
        // console.log($('#mod_lift_11').innerHeight());;
        $('#mod_lift_11').css('top', $(window).height() / 2);
        if ($(window).width() > 1300) {
            $('#mod_lift_11').css('right', 84.5);
        } else {
            $('#mod_lift_11').css('right', 0);
        }
    });

    // 按钮 
    $('.mod_lift_list1 .mod_lift_item').on('click', function () {
        // 高亮排他
        $(this).addClass('active').siblings().removeClass('active');
        // 跳跃
        switch ($(this).index()) {
            case 0:
                window.scrollTo({
                    top: $('#fresh_unique_4').offset().top,
                    behavior: 'smooth'
                })
                break;
            case 1:
                window.scrollTo({
                    top: $('#fresh_slim_5').offset().top,
                    behavior: 'smooth'
                })
                break;
            case 2:
                window.scrollTo({
                    top: $('#fresh_category_6').offset().top,
                    behavior: 'smooth'
                })
                break;
            case 3:
                window.scrollTo({
                    top: $('#fresh_comments_10').offset().top,
                    behavior: 'smooth'
                })
                break;
            default:
                break;
        }
    })

    // 滚动
    function scY() {
        return window.scrollY;
    }

    $(window).on('scroll', function () {
        if ($(window).width() > 1300) {
            $('#mod_lift_11').css('right', 5.5);
        } else {
            $('#mod_lift_11').css('right', 0);
        }
        if (scY() >= $('#fresh_unique_4').offset().top - 400) {
            $('#mod_lift_11').fadeIn(1000);
            $('.mod_lift_list1 .mod_lift_item').eq(0).addClass('active').siblings().removeClass('active');
        } else {
            $('#mod_lift_11').fadeOut(1000);
            $('.mod_lift_list1 .mod_lift_item').removeClass('active');
        }
        if (scY() >= $('#fresh_slim_5').offset().top) {
            $('.mod_lift_list1 .mod_lift_item').eq(1).addClass('active').siblings().removeClass('active');
        }
        if (scY() >= $('#fresh_category_6').offset().top) {
            $('.mod_lift_list1 .mod_lift_item').eq(2).addClass('active').siblings().removeClass('active');
        }
        if (scY() >= $('#fresh_comments_10').offset().top) {
            $('.mod_lift_list1 .mod_lift_item').eq(3).addClass('active').siblings().removeClass('active');
        }
    })

    // 回到顶部
    $('.mod_lift_list2 .mod_lift_top').on('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    })
}());