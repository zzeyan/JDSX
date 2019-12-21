<?php

//接口功能：查询cid的个人购物车，返回gid和goodnum
// $cid = $_REQUEST['cid'];//用户id
$gid = $_REQUEST['gid'];//用户id


// echo $page,$num;
include 'conn.php';//连接数据库

//先判断cid是否存在
// if ($cid) {
//     $sql = "SELECT * FROM car WHERE cid LIKE $cid";
//   //   mysqli_set_charset($conn,"utf8");
//     $res = $conn->query($sql);//得到结果集
//     $content = $res->fetch_all(MYSQLI_ASSOC);
//     $data = array(
//         'data1'=>$content
//     );
// } 

if($gid){
    $sql2 = "SELECT * FROM goodlist WHERE gid LIKE $gid";
    mysqli_set_charset($conn,"utf8");
    $res2 = $conn->query($sql2);//得到结果集
    $content2 = $res2->fetch_all(MYSQLI_ASSOC);
    $data = array(
        'data2'=>$content2
    );
}

  // $sql = "SELECT * FROM goodlist";
  // mysqli_set_charset($conn,"utf8");
  // $res = $conn->query($sql);//得到结果集
  // $content = $res->fetch_all(MYSQLI_ASSOC);


// var_dump($res);


//   print_r($data);

//   var_dump(333,$data);
//传给前端：先转成字符串
echo json_encode($data,true);


?>