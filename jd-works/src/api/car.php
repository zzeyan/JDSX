<?php
//接口功能：加入购物车
$cid = isset($_GET['cid']) ? $_GET['cid'] : '';//用户id
$gid = isset($_GET['gid']) ? $_GET['gid'] : '';//商品id
$goodnum = isset($_GET['goodnum']) ? $_GET['goodnum'] : '';//商品数量
$cuid = isset($_GET['cuid']) ? $_GET['cuid'] : '';//商品id


// echo $page,$num;
include 'conn.php';//连接数据库

//先判断cid下的gid是否存在，存在则goodnum相加，不存在则添加,操作成功返回yes，否则no
$sql = "SELECT * FROM car WHERE cid LIKE '$cid' AND gid LIKE '$gid'";
$res = $conn->query($sql);//得到结果集
// var_dump($res);
$content = $res->fetch_all(MYSQLI_ASSOC);

// var_dump($content);

if ($res->num_rows) {
    // echo 'no<br>';
    $updatanum = $content[0]['goodnum'] + $goodnum;
    // echo $updatanum + '<br>';
    // 修改cid和gid下面的goodnum
    //sql语句
    $sql3 = "UPDATE car set goodnum=$updatanum WHERE cid='$cid' AND gid='$gid'";

    //执行sql语句
    $res3 = $conn->query($sql3);//得到结果集
    // echo $res3;
    if ($res3) {
        echo 'yes';
    } else {
        echo 'no';
    }
} else {
    //sql语句
    $sql2 = "INSERT INTO car(cid,gid,goodnum,cuid) VALUES('$cid','$gid','$goodnum','$cuid')";

    //执行sql语句
    $res2 = $conn->query($sql2);//得到结果集

    if ($res2) {
        echo 'yes';
    } else {
        echo 'no';
    }
    
}

?>