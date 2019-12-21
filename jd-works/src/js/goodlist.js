$(() => {
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
        $('#ttbar-login').html(`<a href="#" class="link-login">你好，请登录</a>&nbsp;&nbsp;<a href="#"
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
        $('#ttbar-login').html(`<a href="#" class="link-login">你好，请登录</a>&nbsp;&nbsp;<a href="reg.html"
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
        location.href = 'reg.html';
    })
    // 登录
    $('#ttbar-login .link-login').on('click', function () {
        setCookie('url', location.href, 1);
        location.href = 'login.html';
    })

    // 分页功能
    let iPage = 1; //获取第一页内容
    let num = 30; //每页60条内容
    let paixu = ''; //默认没有排序
    let sores = ''; //排序依据(升序,降序)
    let quyu = ''; //价格区间查询标志
    let hprice = '';
    let lprice = '';

    function init() {
        $.ajax({
            type: "post",
            url: "../api/goodlist.php",
            data: {
                'page': iPage,
                'num': num,
                'paixu': paixu,
                'sores': sores,
                'quyu': quyu,
                'hprice': hprice,
                'lprice': lprice
            },
            dataType: "json",
            success: function (arr) {
                let html = arr.data.map((item) => {
                    return `<li data-gid="${item.gid}" data-cuid="${item.cuid}" class="gl-item">
                    <div class="gl-i-wrap">
                        <div class="p-img">
                            <a href="###" title="${item.words}">
                                <img src="../img/${item.src}" alt="">
                            </a>
                            <div class="picon"></div>
                        </div>
                        <div class="p-price">
                            <strong class="J_3756271">
                                <em>￥</em>
                                <i>${item.price}</i>
                            </strong>
                        </div>
                        <div class="p-name p-name-type-2">
                            <a href="###" title="${item.words}">
                                <em>
                                    <span class="p-tag">京东超市</span>${item.title}
                                </em>
                                <i class="promo-words">${item.words}</i>
                            </a>
                        </div>
                        <div class="p-commit">
                            <strong>
                                <a href="###">${item.col}万+</a>条评价
                            </strong>
                        </div>
                        <div class="p-shop">
                            <span class="J_im_icon">
                                <a href="###" target="_blank" class="curr-shop" title="${item.curr}">${item.curr}</a>
                                <b class="im-02"></b>
                            </span>
                        </div>
                        <div class="p-icons">
                            <i class="goods-icons J-picon-tips J-picon-fix">自营</i>
                            <i class="goods-icons4 J-picon-tips">放心购</i>
                            <i class="goods-icons goods-icons-jc J-picon-tips J-picon-fix">京东检测</i>
                            <i class="goods-icons-juan J-picon-tips">券159-30</i>
                        </div>
                        <div class="p-operate">
                            <a href="###" class="p-o-btn contrast J_contrast">
                                <i></i>对比
                            </a>
                            <a href="###" class="p-o-btn focus J_focus">
                                <i></i>关注
                            </a>
                            <a href="###" class="p-o-btn addcart">
                                <i></i>加入购物车
                            </a>
                        </div>
                    </div>
                </li>`;
                }).join('');

                $('#goodlistxuan').html(html);

                //2.根据总条数和每页显示条数，计算总页数，生成页码；
                let pagesNum = Math.ceil(arr.pages / arr.num); //总页数
                // console.log(pagesNum);
                let pageBtns = '';

                if (pagesNum < 7) {
                    for (let i = 0; i < pagesNum; i++) {
                        pageBtns += `<a class="pgbtn" href="###">${i + 1}</a>`;
                    }
                } else {
                    if (iPage <= 5) {
                        for (let i = 0; i < 7; i++) {
                            pageBtns += `<a class="pgbtn" href="###">${i + 1}</a>`;
                        }
                    } else if (iPage < pagesNum - 2) {
                        pageBtns = `<a class="pgbtn" href="###">1</a><a class="pgbtn" href="###">2</a>`;
                        for (let i = iPage - 2; i < iPage - 0 + 3; i++) {
                            pageBtns += `<a class="pgbtn" href="###">${i}</a>`;
                        }
                    } else {
                        pageBtns = `<a class="pgbtn" href="###">1</a><a class="pgbtn" href="###">2</a>`;
                        for (let i = pagesNum - 4; i < pagesNum + 1; i++) {
                            pageBtns += `<a class="pgbtn" href="###">${i}</a>`;
                        }
                    }
                }

                let pagehtml = `<span class="p-num">
                  <a href="###" class="pn-prev"><i>&lt;</i><em>上一页</em></a>
                  ${pageBtns}<a href="###" class="pn-next"><em>下一页</em><i>&gt;</i></a>
              </span>
              <span class="p-skip">
                  <em>共<b>${pagesNum}</b>页&nbsp;&nbsp;到第</em><input type="text" class="input-txt"
                      value="${iPage}"><em>页</em>
                  <a href="###" class="btn btn-default">确定</a>
              </span>`;

                $('#J_bottomPage').html(pagehtml); //渲染页
                // console.log('iPage' + iPage);

                // 给上下按钮添加状态
                if (iPage > 1) {
                    $('#J_bottomPage .pn-prev').removeClass('disabled');
                    $('#J_topPage .fp-prev').removeClass('disabled');
                } else {
                    $('#J_bottomPage .pn-prev').addClass('disabled');
                    $('#J_topPage .fp-prev').addClass('disabled');
                }
                if (iPage < pagesNum) {
                    $('#J_bottomPage .pn-next').removeClass('disabled');
                    $('#J_topPage .fp-next').removeClass('disabled');
                } else {
                    $('#J_bottomPage .pn-next').addClass('disabled');
                    $('#J_topPage .fp-next').addClass('disabled');
                }

                // 当前页高亮
                if (iPage <= 5) {
                    $('#J_bottomPage .p-num .pgbtn').eq(iPage - 1).addClass('curr'); //高亮
                } else if (iPage < pagesNum - 2) {
                    $('#J_bottomPage .p-num .pgbtn').eq(4).addClass('curr'); //高亮
                } else {
                    $('#J_bottomPage .p-num .pgbtn').eq(iPage - pagesNum + 2 + 4).addClass('curr'); //高亮
                }

                // 插入省略号
                if (pagesNum > 6) {
                    if (iPage < 6) {
                        $('<b class="pn-break">...</b>').insertBefore('#J_bottomPage .p-num a:last');
                    } else if (iPage < pagesNum - 2) {
                        $('<b class="pn-break">...</b>').insertAfter('#J_bottomPage .p-num a:eq(2)');
                        $('<b class="pn-break">...</b>').insertBefore('#J_bottomPage .p-num a:last');
                    } else {
                        $('<b class="pn-break">...</b>').insertAfter('#J_bottomPage .p-num a:eq(2)');
                    }
                }
                

                // 列表动画
                $('#J_goodsList .gl-item').hover(function () {
                    $(this).addClass('hover').siblings().removeClass('hover');
                }, function () {
                    $(this).removeClass('hover');
                })

                // 对比勾选
                $('.p-operate .contrast').on('click', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    } else {
                        $(this).addClass('selected');
                    }
                })
                // 改变头部页码
                $('#J_topPage .fp-text b').html(iPage);
                $('#J_topPage .fp-text i').html(pagesNum);

                $('.addcart').on('click', function () {
                    // 获取 cid、数量和gid
                    let nownum = 1;
                    let nowcid = getCookie('cid');
                    let nowgid = $(this).parent().parent().parent().attr('data-gid');
                    let nowcuid = $(this).parent().parent().parent().attr('data-cuid');
                    // console.log(nownum, nowgid, nowcid);
                    if (nowcid) {
                        $.ajax({
                            type: 'get',
                            url: '../api/car.php',
                            data: {
                                'cid': nowcid,
                                'gid': nowgid,
                                'goodnum': nownum,
                                'cuid': nowcuid
                            },
                            success: str => {
                                console.log(str);
                                if (str == 'yes') {
                                    let tiaook = confirm('添加成功！是否进入购物车查看？');
                                    if (tiaook) {
                                        window.open('car.html?');
                                        window.open("car.html?")
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

            }
        });

    }
    init();//进入页面直接渲染一次


    // 根据价格区间查找
    // 点击确认，获取hprice和lprice，渲染
    $('#J_selectorPrice .item2').on('click', function () {
        quyu = 'quyu';
        lprice = $('#J_selectorPrice .input-txt').eq(0).val();
        hprice = $('#J_selectorPrice .input-txt').eq(1).val();
        init();
    })

    // 点击价格区间查找
    $('#J_filter .f-datagrid .fdg-item').on('click', function () {
        quyu = 'quyu';
        lprice = $('#J_selectorPrice .input-txt').eq(0).val();
        hprice = $('#J_selectorPrice .input-txt').eq(1).val();
        init();
    })


    //排序
    $('#J_filter .f-sort a').on('click', function () {
        // 改变高亮
        $(this).addClass('curr').siblings().removeClass('curr');

        // 功能
        paixu = $(this).children(1).attr('data-paixu');
        sores = $(this).children(1).attr('data-sores');
        // console.log($(this).children(1).attr('data-sores'));
        // 价格排序
        // console.log($(this).children(1).attr('data-sores') == 'price');
        // console.log($(this).children(1).attr('data-paixu') == 'desc');

        if ($(this).children(1).attr('data-sores') == 'price') {
            // console.log('price');
            if ($(this).children(1).attr('data-paixu') == 'desc') {
                paixu = 'desc';
                $(this).children(1).attr('data-paixu', 'asc');
                $('.arrow-top').css('opacity', 0.5);
                $('.arrow-bottom').css('opacity', 1);
                // console.log($(this).children(2).children(1).attr('class'));
            } else {
                paixu = 'asc';
                $(this).children(1).attr('data-paixu', 'desc');
                $('.arrow-top').css('opacity', 1);
                $('.arrow-bottom').css('opacity', 0.5);
                // console.log('desc');
            }
        }
        init();
    });

    //点击页码，能够按需加载新一页数据过来渲染；事件委托实现事件绑定
    $('#J_bottomPage').on('click', '.pgbtn', function (event) {
        // console.log('a');
        iPage = $(event.target).html();
        init();
    })

    //点击上下一页，能够按需加载新一页数据过来渲染；事件委托实现事件绑定
    // 上
    $('#J_bottomPage').on('click', '.pn-prev', function () {
        if (!$(this).hasClass('disabled')) {
            // console.log(12);
            iPage -= 1;
            init();
        }
    })

    $('#J_topPage').on('click', '.fp-prev', function () {
        if (!$(this).hasClass('disabled')) {
            // console.log(12);
            iPage -= 1;
            init();
        }
    })

    // 下一页
    $('#J_bottomPage').on('click', '.pn-next', function () {
        if (!$(this).hasClass('disabled')) {
            iPage += 1;
            init();
        }
    })

    $('#J_topPage').on('click', '.fp-next', function () {
        if (!$(this).hasClass('disabled')) {
            iPage += 1;
            init();
        }
    })

    // 输入页码，点击确定跳转到指定的页面
    $('#J_bottomPage').on('click', '.p-skip .btn', function () {
        if ($('#J_bottomPage .input-txt').val()) {
            iPage = $('#J_bottomPage .input-txt').val();
            init();
        } else {
            alert('请输入要跳转的页码');
        }
    })

    // 价格区间
    // 输入表单
    $(function () {
        $('#J_selectorPrice .input-txt').bind({
            focus: function () {
                if (this.value == this.defaultValue) {
                    this.value = "";
                    $(this).css('color', 'rgb(51,51,51)');
                }
            },
            blur: function () {
                if (this.value == "") {
                    this.value = this.defaultValue;
                    $(this).css('color', 'rgb(204,204,204)');
                }
            }
        });

        $('.f-datagrid .fdg-item').hover(function () {
            $('#J_selectorPrice .input-txt').css('color', 'rgb(51,51,51)');
            // 新建提示节点并插入.f-datagrd中，给定位的属性值
            var tip = `<div class="ui-tips ui-tips-bottom ui-tips-x-center ui-tips-price-grid">
            <div class="ui-tips-main">${$(this).attr('data-tips')}</div>
            <span class="ui-tips-arrow"></span>
            </div>`;
            var tipleft = $(this).position().left + $('.fdg-item').width() / 2 - 75;
            $(tip).appendTo('.f-datagrid').css('left', tipleft);
            // 滑过时把.fdg-item上的data-range属性填入价格搜索框
            var rangeA = $(this).attr('data-range').split('-');
            $('#J_selectorPrice .input-txt').eq(0).val(rangeA[0]);
            $('#J_selectorPrice .input-txt').eq(1).val(rangeA[1]);
        }, function () {
            $('#J_selectorPrice .input-txt').css('color', 'rgb(204,204,204)');
            // 移出时移除节点
            $('.ui-tips').remove();
            $('#J_selectorPrice .input-txt').val('￥');
        });
    })

    // 显示输入价格部分的按钮
    $('#J_selectorPrice').hover(function () {
        $('#J_selectorPrice').addClass('f-price-focus');
    }, function () {
        $('#J_selectorPrice').removeClass('f-price-focus');
    })

    // 价格筛选输入-清空
    $('.J-price-cancle').on('click', function () {
        $('.f-price-set .input-txt').val('￥');
    })


    // 跳转详情页
    $('#goodlistxuan').on('click', '.p-img', function () {
        // 参数--gid
        var gidhtml = $(this).parent().parent().attr('data-gid');
        // console.log(gidhtml);
        // 跳转传参
        window.open('goodlists.html?' + 'gid=' + gidhtml);
        // // location.href = 'goodlists.html?' + 'gid=' + gidhtml;
    })
})