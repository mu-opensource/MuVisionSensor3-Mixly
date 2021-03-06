V1.2.1
======
- 1.添加了对光线传感器的支持以及相关模块
- 2.添加了对`颜色识别` `色块检查` 算法的大小设置模块
- 3.添加 MU AT 指令的相关模块

V1.1.7b
=======
* 1.添加了繁体中文语言支持

V1.1.7a
=======
* 1.修改了库名：`MuVisionSensorIII`->`MuVisionSensor3`

V1.1.7
======
* 1.修复了I2C模式下无法初始化MU的问题

V1.1.6
======
* 1.修改了`初始化MU`的参数`端口`的默认排序，且当参数为`Serial`时，添加了相关提示
* 2.修改部分中英问名词：`颜色检测`==>`色块检测`等
* 3.对应的Arduino库升级至V1.1.6

V1.1.5
======
* 1.修复了颜色检测算法无法设置颜色的问题
* 2.修改部分名词解释
* 3.修改了配色方案

V1.1.4
======
* 1.修复了初始化模块生成地址错误的问题
* 2.修复了“颜色检测”“颜色识别”两个算法的中文文字翻译错误
* 3.修改了结果获取模块，当算法为颜色识别算法时对应结果的文字显示
* 4.修复了卡片结果获取模块打开文件后参数配置与保存时不同的bug
* 5.中英文翻译文字修改

V1.1.3 20190117
===============
* 1.更新了因Arduino库更改出现的参数生成错误问题
* 2.关闭摄像头翻转模块

V1.0.2 alpha 20190114
=====================
* 1.针对颜色算法添加了特殊性添加了单独的数据读取模块
* 2.更新了因Arduino库更改出现的参数生成错误问题
* 3.更新了LED模块
