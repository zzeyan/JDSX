
(function () {
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
		location.href = 'reg.html';
	})
	// 登录
	$('#ttbar-login .link-login').on('click', function () {
		setCookie('url', location.href, 1);
		location.href = 'login.html';
	})
}());


$(function () {
	let elem = document.querySelector('#goodli');
	// console.log(elem);

	let carcid = getCookie('cid');
	// let carcid = 1;
	// console.log(carcid);

	//渲染数据：jq的ajax
	
	$.ajax({
		type: "get",
		url: "../api/getmycar.php",
		// async: true,
		// data:"",
		data: {
			'cid': carcid
		},
		dataType: "json",
		success: function (str) {
			// console.log(111,str.data1[0].gid);
			// let arr = JSON.parse(str)
			// console.log(222,arr);
			// var arr2 = arr.data1;

			str.data1.map((item) => {
				$.ajax({
					type: 'get',
					url: '../api/getmycar1.php',
					data: 'gid=' + item.gid,
					dataType:"json",
					success:function(arr){
						let nowtotal = (arr.data2[0].price * item.goodnum).toFixed(2);
						var htmlCart = `<ul class="order_lists" data-gid="${item.gid}">
						<li class="list_chk">
							<input type="checkbox" id="checkbox_6" class="son_check">
							<label for="checkbox_6"></label>
						</li>
						<li class="list_con">
							<div class="list_img"><a href="javascript:;"><img src="../img/${arr.data2[0].src}" alt=""></a></div>
							<div class="list_text"><a href="javascript:;">${arr.data2[0].title}</a></div>
						</li>
						<li class="list_info">
						</li>
						<li class="list_price">
							<p class="price">￥${arr.data2[0].price}</p>
						</li>
						<li class="list_amount">
							<div class="amount_box">
								<a href="javascript:;" class="reduce">-</a>
								<input type="text" data-num="${arr.data2[0].kucun}" value="${item.goodnum}" class="sum">
								<a href="javascript:;" class="plus">+</a>
							</div>
						</li>
						<li class="list_sum">
							<p class="sum_price">￥${nowtotal}</p>
						</li>
						<li class="list_op">
							<p class="del"><a href="javascript:;" class="delBtn">移除商品</a></p>
						</li>
					</ul>`;
						// console.log(elem.innerHTML);
						elem.innerHTML += htmlCart;
						// console.log(elem.innerHTML);
					}
				})

			});  
		}
	});


	//数量的加
	$('#goodli').on('click', '.plus', function () {
		//点击加号：数量增1
		let num = $(this).prev().val();
		let kucun = $(this).prev().data('num');
		num++;
		if (num >= kucun) {
			num = kucun;
		}
		$(this).prev().val(num)
		// console.log(num,kuncun);
		goodTotal($(this)); //把点击当前的那个按钮传到函数，通过节点的关系查找其他节点
	});

	//数量的减
	$('#goodli').on('click', '.reduce', function () {
		let num = $(this).next().val();
		num--;
		if (num <= 1) {
			num = 1;
		}
		$(this).next().val(num);
		goodTotal($(this));
	});

	//手动输入数量的变化
	$('#goodli').on('input', '.sum', function () {
		let num = $(this).val();
		let kucun = $(this).data('num');
		if (num <= 1) {
			num = 1;
		} else if (num >= kucun) {
			num = kucun;
		}
		$(this).val(num);
		goodTotal($(this)); //小计变化
	});

	//2.小计=单价*数量
	function goodTotal(now) {
		//单价
		let price = $(now).parent().parent().prev().children().text().slice(1); //获取到单价是有单位，去掉多余的单位
		//数量
		let num = $(now).parent().find('input').val();
		let total = (price * num).toFixed(2); //保留两位小数
		$(now).parent().parent().next().children().html('￥' + total);
		numAndToal(); //总数量和总价变化
		// console.log(price,num,total);
	}

	//3.删除当行商品；
	$('#goodli').on('click', '.delBtn', function () {
		//要删除的节点.remove()
		let res = confirm('是否要移除该商品？');
		if (res) {
			$(this).parent().parent().parent().remove();
		}
		update();
		numAndToal();
	});

	function update() {
		let num = $('.plus').size();
		if (num == 0) {
			//证明已经没有商品了。就可以隐藏
			// $('#del').css('display','none');
			$('.bar-wrapper').hide();
			$('.cartMain_hd').hide();
		} else {
			$('.bar-wrapper').show();
			$('.cartMain_hd').show();
		}
	}

	//全选
	$('.cartTop .list_chk label').on('click', function () {
		// console.log($('.cartTop .list_chk label').is('.mark'));
		// let quanxuan = $('.cartTop .list_chk label');
		// console.log(quanxuan.classList.contains("mark"));
		
		if ($(this).is('.mark')) {
			// console.log(2);
			$(this).removeClass('mark');
      $('#goodli .list_chk label').removeClass('mark');      
		} else {
			// console.log(3);
			$(this).addClass('mark');
			$('#goodli .list_chk label').addClass('mark');
		}

		numAndToal();
	});

	//总数量和总价格的变化
	function checkedRows() {
		let arr = []; //存被勾选的下标
		$('#goodli .list_chk label').each(function (i, item) {
			if ($(item).is('.mark')) {
				//被勾选的复选框把他的下标存起来
				arr.unshift(i);
			}
		});
		//降序
		arr.sort(function (a, b) {
			return b - a;
		});
		return arr;
	}

	function numAndToal() {
		//判断哪一行是被勾选的
		let arr = checkedRows();
		// console.log(arr);
		// $(".calBtn>a").css("background","#e64347");
 
		//计算总数量和总价格
		let sum = 0; //总数量
		let priceAll = 0;
		arr.forEach(function (item) {
			sum += $('.sum').eq(item).val() * 1;
			priceAll += $('.sum_price').eq(item).text().slice(1) * 1;
		});

		$('.piece_num').html(sum);
		$('.total_text').html('￥' + priceAll.toFixed(2));

	}

	//点击每一行复选框反过来控制全选按钮
	$('#goodli').on('click', '.order_lists .list_chk label', function () {
		if ($(this).is('.mark')) {
			$(this).removeClass('mark');
		} else {
			$(this).addClass('mark');
		}
		//被勾选的个数==本来集合的个数  全选
		let checkedNum = $('#goodli .list_chk .mark').size();
		let num = $('#goodli .list_chk label').size();
		if (checkedNum == num) {
			$('.cartTop .list_chk label').addClass('mark');
		} else {
			$('.cartTop .list_chk label').removeClass('mark');
		}
		numAndToal(); //总数量和总价跟着变
	});

	//全删
	$('#delall').on('click', function () {
		let arr = checkedRows(); //被勾选的行对应的下标
		let res = confirm('您要删除我们吗？');
		if (res) {
			arr.forEach(function (item) {
				$('#goodli .order_lists').eq(item).remove();
			});
		}
		update();
		numAndToal(); //总数量和总价跟着变
  });
  
  //结算按钮
 $(".calBtn").click(function(){
   location.href='https://www.alipay.com/';
 })
});