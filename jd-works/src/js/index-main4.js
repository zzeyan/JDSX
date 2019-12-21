$(() => {
    //(banner区)选项卡
    $.getJSON("../api/nav.json",
        function (data) {
            let navhtml = data.map(function (ele, index) {
                return ` <div class="tab_head_item">
                <div class="tab_head_item_inner item${index + 1}">
                    <i class="item_icon"></i>
                    <a href="#" class="item_title">${ele.title}</a>
                    <div class="item_children">
                        <a href="#" class="item_children_item first">${ele.item[0]}</a><a href="#"
                            class="item_children_item">${ele.item[1]}</a><a href="#"
                            class="item_children_item">${ele.item[2]}</a>
                    </div>
                </div>
            </div>`
            }).join("")
            $(".tab_head").eq(0).html(navhtml);


           //二级导航
            $('.tab_head_item').hover(function () {
                $(this).addClass('active').siblings().removeClass('active');
                const i = $(this).index()
                $.getJSON("../api/nav_shuiguoTog1.json",
                    function (data) {
                        $(".tab_body").eq(0).append($('<div class="tab_body_item"><div class="fresh_fs_nav_cate cate"></div></div>'));
                        let htmlTog = data[i].rightContent.list.map(function (ele, index) {
                            return `<dl class="cate_item">
                            <dt class="cate_tit">
                                <a href="goodlist.html" class="cate_tit_lk"
                                    target="_blank">${ele.minTitle}
                                    <i class="cate_tit_arrow">&gt;</i>
                                </a>
                            </dt>
                            <dd class="cate_con">
                            ${ele.minList.map(function (item) {
                                return ` <a href="goodlist.html" class="cate_con_lk"
                                target="_blank">${item}</a>`
                            }).join("")}
                               
                            </dd>
                        </dl>`
                        }).join("")

                        $(".fresh_fs_nav_cate").html(htmlTog)

                    }
                );
                $('.tab_body_item').eq($(this).index()).show().siblings().hide();
            });

            $(".fresh_fs_nav_tab").mouseleave(function () {
                $(".tab_body_item").hide();
                $(".tab_head_item").removeClass("active");
            });
            
            //特色购
            $.getJSON("../api/tsg.json",
                function (data) {
                    // console.log(data);
                    var html1 = data.map(function (ele, index) {
                        return ` <a href="html/goodlist.html" class="goods_item">
                    <div class="goods_item_pic">
                        <img class="goods_item_img" src=${ele.src} alt="">
                    </div>
                    <div class="goods_item_priceg">
                        <p class="goods_item_price">${ele.price}</p>
                        <p class="goods_item_g">${ele.item_g}</p>
                    </div>
                    <div class="goods_item_info">
                        <p class="goods_item_promote">${ele.title}</p>
                        <i class="goods_item_line"></i>
                        <p class="goods_item_name">${ele.name}</p>
                        <p class="goods_item_desc"></p>
                    </div>
                </a>`
                    }).join("")
                    $(".fresh_top100_goods").html(html1);


                    $.getJSON("../api/tsg-left.json",
                        function (data, textStatus, jqXHR) {
                            var html2 = data.map(function (ele, index) {
                                return `<li class="goods_item">
                                <a href="#" class="goods_item_link">
                                    <img class="goods_item_img" src=${ele.src} alt="">
                                    <div class="goods_item_info">
                                        <p class="goods_item_name">${ele.name}</p>
                                        <p class="goods_item_desc">${ele.title}</p>
                                        <p class="goods_item_seebtn">${ele.item_seebtn}</p>
                                    </div>
                                </a>
                            </li>`
                            }).join("")
                            $(".fresh_dong_goods").html(html2);
                        }
                    )
                }


            );

        }
    );
    
    // setTimeout(function () {
    //     $("#fresh_unique_4").css("display", "none");
    //     $(".J_lift").eq(0).css("display","none");
    // }, 3000)
})