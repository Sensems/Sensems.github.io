<?php

//获取页码
$page=$_POST['page'];
//php加载json数据  file_get_contents("文件地址"); 读取文件的内容 file_put_contents();
//json_decode(); 把json转化为数组
$imgAll=json_decode(file_get_contents("img.json"),true);
/*
每次加载15条件
          页码     数据  
	1.       1-15      ($page-1)*15  0
	2.        16-30   ($page-1)*15  15
	3.         31-45                         30
*/
$startData=($page-1)*15;
//array_slice(); 截取数组 array_slice($数组,开始截取位置,截取多少条数据);
$pageData=array_slice($imgAll,$startData,15);

echo json_encode($pageData);


// echo "hello liuxiong";