<?php
// echo "ok";
header("Content-type:text/html;charset=UTF-8");//防止中文乱码


$page = $_REQUEST['page'];//页数，哪一页
$num = $_REQUEST['num'];//一页数据有60条
$paixu = $_REQUEST['paixu'];//升序降序
$sores = $_REQUEST['sores'];//排序依据
$quyu = $_REQUEST['quyu'];//价格区间查询标志
$lprice = $_REQUEST['lprice'];
$hprice = $_REQUEST['hprice'];


$severname = 'localhost';//或者写：http://127.0.0.1
$username = 'root';
$psw = '';
$dbname = 'h5';

//通过构造函数 mysqli()建立连接
$conn = new mysqli($severname,$username,$psw,$dbname);



//js调用对象的属性和方法：用.    arr.length  arr.sort()
//php调用对象的属性和方法：->  $conn->connect_error

if($conn->connect_error) {
    die('连接错误：'.$conn->connect_error);
}

 //sql语句
 $index = ($page - 1) * $num;

 if ($quyu) {
     // $sql = "SELECT * FROM goodlist WHERE price BETWEEN $lprice AND $hprice LIMIT $index,$num";
     if ($paixu) {
         $sql = "SELECT * FROM goodlist WHERE price BETWEEN $lprice AND $hprice ORDER BY $sores $paixu LIMIT $index,$num";
     } else {
         $sql = "SELECT * FROM goodlist WHERE price BETWEEN $lprice AND $hprice LIMIT $index,$num";
     }
 } else {
     if ($paixu) {
         $sql = "SELECT * FROM goodlist ORDER BY $sores $paixu LIMIT $index,$num";
     } else {
         $sql = "SELECT * FROM goodlist LIMIT $index,$num";
     }
 }
 
 
 // $sql = "SELECT * FROM goodlist ORDER BY price $paixu LIMIT $index,$num";
 //SELECT * FROM goodslist ORDER BY price desc LIMIT 0,10;
 mysqli_set_charset($conn,"utf8");
 //执行sql语句
 $res = $conn->query($sql);//得到结果集

 // var_dump($res);

 //读取结果集的内容部分传给前端
 $content = $res->fetch_all(MYSQLI_ASSOC);//对象  [{},{},{}]

 //将数据转成字符串传给前端
 // echo json_encode($content,JSON_UNESCAPED_UNICODE);

 
 //查询总条数
 // $sql2 = 'SELECT * FROM goodlist';
 if ($quyu) {
     $sql2 = "SELECT * FROM goodlist WHERE price BETWEEN $lprice AND $hprice";
 } else {
     $sql2 = "SELECT * FROM goodlist";
 }

 //执行语句
 $res2 = $conn->query($sql2);

 // var_dump($res2);

 //一个页面不要出现两次echo。否则前端拿到的数据不方便处理

 $data = array(
     'data' => $content,//想要的10条数据
     'pages' => $res2->num_rows,//总条数
     'page' => $page,//当前页数
     'num' => $num//每页数据数
 );

 //传给前端：先转成字符串
 echo json_encode($data,true);




?>