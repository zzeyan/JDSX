<?php
// echo "ok";
 //接口功能：获取商品详情
 $gid = $_REQUEST['gid'];//商品id
    

 // echo $page,$num;
 include 'conn.php';//连接数据库

 //sql语句
 $sql = "SELECT * FROM goodlist WHERE gid LIKE $gid";

 mysqli_set_charset($conn,"utf8");
 //执行sql语句
 $res = $conn->query($sql);//得到结果集

 // var_dump($res);

 //读取结果集的内容部分传给前端
 $content = $res->fetch_all(MYSQLI_ASSOC);//对象  [{},{},{}]

 //将数据转成字符串传给前端
 echo json_encode($content,true);

?>