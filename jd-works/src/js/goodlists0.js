$(()=>{
       //渲染头部用户信息
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
        $('#ttbar-login').html(`<a href="login.html" class="link-login">你好，请登录</a>&nbsp;&nbsp;<a href="#reg.html
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
        // 注册
        $('#ttbar-login .link-regist').on('click', function () {
            setCookie('url', location.href, 1);
            location.href = 'reg.html?';
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
        location.href = 'reg.html?';
    })
    // 登录
    $('#ttbar-login .link-login').on('click', function () {
        setCookie('url', location.href, 1);
        location.href = 'login.html?';
    })



    
     //商品详情渲染
    //拿到数据并渲染到页面
    var url = location.search; //拿参数
    // console.log(url);
    var c_url = decodeURI(url); //解码
    // console.log(c_url);
    var obj = strToObj(c_url);
    // console.log(obj); //读数据

    let nowgid = obj.gid;
    // let nowgid = 1;
    // console.log(nowgid);

    if (typeof (nowgid) == "undefined") {
        // console.log(1);

        url = getmyCookie('url'); //拿参数
        // console.log(url);
        c_url = decodeURI(url); //解码
        // console.log(c_url);
        obj = strToObj(c_url);
        // console.log(obj.gid); //读数据
        nowgid = obj.gid.slice(0, 1);


    }
    // console.log(nowgid);

    var nowsrc2 = [];
    $.ajax({
        type: "get",
        url: "../api/goodlists.php",
        data: `gid=${nowgid}`,
        dataType: "json",
        success: function (data) {
            // console.log(data);
            nowsrc2 = data[0].src2.split('&');
            // console.log(nowsrc2);
              
            let html =` <ul class="Xcontent01">
            <div class="imgbox">
              <div class="Xcontent06">
                <img src="../img/min0.jpg">
                <div class="img-mask" style="display: none;"></div>
              </div>
              <div class="maxImg" style="display: none;">
                <img src="../img/max0.jpg">
              </div>
            </div>
      
            <ol class="Xcontent08">
              <div class="Xcontent07"><img src="../img/min0.jpg"></div>
              <div class="Xcontent09"><img src="../img/min1.jpg"></div>
              <div class="Xcontent10"><img src="../img/min2.jpg"></div>
              <div class="Xcontent11"><img src="../img/min3.jpg"></div>
              <div class="Xcontent12"><img src="../img/min4.jpg"></div>
            </ol>
            <ol class="Xcontent13">
              <div class="Xcontent14"><a href="#">
                  <p>${data[0].title}</p>
                </a></div>
              <div class="Xcontent15"><img src="../lib/shangchengxiangmu/images/shangpinxiangqing/X11.png"></div>
              <div class="Xcontent16">
                <p>${data[0].words}</p>
              </div>
              <div class="Xcontent17">
                <p class="Xcontent18">售价</p>
                <p class="Xcontent19">￥<span>${data[0].price}.00</span></p>
                <div class="Xcontent20">
                  <p class="Xcontent21">促销</p>
                  <img src="../lib/shangchengxiangmu/images/shangpinxiangqing/X12.png">
                  <p class="Xcontent22">领610元新年礼券，满再赠好礼</p>
                </div>
                <div class="Xcontent23">
                  <p class="Xcontent24">服务</p>
                  <p class="Xcontent25">30天无忧退货&nbsp;&nbsp;&nbsp;&nbsp; 48小时快速退款 &nbsp;&nbsp;&nbsp;&nbsp; 满88元免邮</p>
                </div>
      
              </div>
              <div class="Xcontent26">
                <p class="Xcontent27">种类</p>
                <div class="Xcontent28"><img src="../img/${nowsrc2[0]}"></div>
                <div class="Xcontent28"><img src="../img/${nowsrc2[1]}"></div>
                <div class="Xcontent28"><img src="../img/${nowsrc2[2]}"></div>
                <div class="Xcontent28"><img src="../img/${nowsrc2[3]}"></div>
              </div>
              <div class="Xcontent30">
                <p class="Xcontent31">数量</p>
                <div class="Xcontent32"><img src="../lib/shangchengxiangmu/images/shangpinxiangqing/X15.png"></div>
                <form>
                  <input class="input" value="1"></form>
                  <div class="Xcontent33" data-kucun="${data[0].kucun}"><img src="../lib/shangchengxiangmu/images/shangpinxiangqing/16.png"></div>
                  </div>
      
              </div>
              <div class="Xcontent35" data-gid="${data[0].gid}" data-cuid="${data[0].cuid}"><a href="#"><img src="../lib/shangchengxiangmu/images/shangpinxiangqing/X18.png"></a></div>
      
            </ol>
      
      
      
          </ul>`
            $('.Xcontent').html(html); //数据渲染

            //渲染部分功能
            $(document).ready(function () {
                var $maxB = $(".maxImg>img");//大图

                var $miaobian = $('.Xcontent08>div');
                var $huantu = $('.Xcontent06>img');
                var $miaobian1 = $('.Xcontent26>div');
                var nowkun = $('.Xcontent33').attr('data-kucun');
                $miaobian.mousemove(function () {
                    miaobian(this);
                    
                    
                });
                $miaobian1.click(function () {
                    miaobian1(this);
                });

                function miaobian(thisMb) {
                  var arr = ["../img/max0.jpg", "../img/max1.jpg", "../img/max2.jpg", "../img/max3.jpg", "../img/max4.jpg"];
                    for (var i = 0; i < $miaobian.length; i++) {
                        $miaobian[i].style.borderColor = '#dedede';
                    }
                    thisMb.style.borderColor = '#cd2426';

                    $huantu[0].src = thisMb.children[0].src;

                    $maxB[0].src = arr[$(thisMb).index()];//大图跟着切换
                }
                //放大镜
                var imgBox = document.querySelector('.imgbox');//最大盒子(包大小盒子的图片)
                var minBox = document.querySelector('.Xcontent06');//小图片的盒子
                var minImg = document.querySelector('.minImg>img');
                var mask = document.querySelector('.img-mask');//遮罩盒子
                var maxBox = document.querySelector('.maxImg');//大图片的盒子
                var maxImg = document.querySelector('.maxImg>img');
              
                // 小图片盒子绑定鼠标移入事件
              
                minBox.onmouseenter = function () {
                  mask.style.display = "block";
                  maxBox.style.display = "block";
                }
                // 小图片盒子绑定鼠标移动事件
                minBox.onmousemove = function (ev) {
                  // 为什么不用ev.clientY而用ev.pageY
                  // console.log(ev.clientY, imgBox.offsetTop);
                  var moveX = ev.pageX -60- imgBox.offsetLeft - mask.offsetWidth / 2;
                  var moveY = ev.pageY-60 - imgBox.offsetTop - mask.offsetHeight / 2;
              
                  // 遮罩可以运动的最大X方向的距离
                  var maxX = minBox.offsetWidth - mask.offsetWidth;
                  // 遮罩可以运动的最大Y方向的距离
                  var maxY = minBox.offsetHeight - mask.offsetHeight;
              
                  // 设置最大可以移动距离
                  if (moveX >= maxX) {
                    moveX = maxX;
                  }
                  if (moveY >= maxY) {
                    moveY = maxY;
                  }
              
                  // 设置最小可以移动距离
                  if (moveX <= 0) {
                    moveX = 0;
                  }
              
                  if (moveY <= 0) {
                    moveY = 0;
                  }
                  // 大图片可以移动的最大距离
                  var biliX = (maxImg.offsetWidth - maxBox.offsetWidth) / maxX;
                  // 这个比例相当于是 遮罩移动一像素，大图片需要移动的距离
                  var biliY = (maxImg.offsetHeight - maxBox.offsetHeight) / maxY;
              
                  // 给遮罩添加移动
                  mask.style.top = moveY + 'px';
                  mask.style.left = moveX + 'px';
              
                  // 因为大图片移动的方向是相反的所以要加负号
                  maxImg.style.top = -moveY * biliY + 'px';
                  maxImg.style.left = -moveX * biliX + 'px';
              
                }
                minBox.onmouseleave = function () {
                  mask.style.display = "none";
                  maxBox.style.display = "none";
                }


                function miaobian1(thisMb1) {
                    for (var i = 0; i < $miaobian1.length; i++) {
                        $miaobian1[i].style.borderColor = '#dedede';
                    }
                    //		thisMb.style.borderColor = '#cd2426';
                    $miaobian.css('border-color', '#dedede');
                    thisMb1.style.borderColor = '#cd2426';
                    $huantu[0].src = thisMb1.children[0].src;
                }
                $(".Xcontent33").click(function () {
                    var value = parseInt($('.input').val());
                    if (value < nowkun) {
                        $('.input').val(value + 1);
                    }
                })

                $(".Xcontent32").click(function () {
                    var num = $(".input").val()
                    if (num > 0) {
                        $(".input").val(num - 1);
                    }
                });

                //加入购物车
                $('.Xcontent35').on('click', function () {
                    // 获取 cid、数量和gid
                    let nownum = $(".input").val();
                    let nowcid = getCookie('cid');
                    let nowcuid = $('.Xcontent35').attr('data-cuid');
                    console.log(nownum, nowgid, nowcid);
                    if (nowcid) {
                        $.ajax({
                            type: 'get',
                            url: '../api/car.php',
                            data: {
                                'cid': nowcid,
                                'gid': nowgid,
                                'goodnum': nownum,
                                'nowcuid': nowcuid
                            },
                            success: str => {
                                console.log(str);
                                if (str == 'yes') {
                                    let tiaook = confirm('添加成功！是否进入购物车查看？');
                                    if (tiaook) {
                                        window.open('car.html?');
                                    }
                                } else {
                                    alert('添加失败');
                                    location.reload(); //刷新页面
                                }
                            }
                        })
                    } else {
                        alert('请先登录！');
                    }
                })
            })
            
        }
        
    })

});