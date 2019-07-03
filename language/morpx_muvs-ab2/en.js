// This file was automatically generated.  Do not modify.

'use strict';

goog.provide('Blockly.Msg.en');

goog.require('Blockly.Msg');

/*          Morpx Vision Sensor          */
/*Help文本*/
Blockly.LKL_VS2_HELP_INIT = '初始化视觉传感器，并选择相关的串口号';
Blockly.LKL_VS2_HELP_SAVE = '保存视觉传感器的相关设置（只能在设置模式中使用）';
Blockly.LKL_VS2_HELP_VISION_LEVEL = '设置识别等级，等级升高，误报率降低，识别率也会相应降低';
Blockly.LKL_VS2_HELP_VISION_ZOOM = '设置图像缩放等级，等级升高，识别距离越远，识别角度越小';
Blockly.LKL_VS2_HELP_WARNING_ONLY_USE_IN_CALLBACK_MODE = '警告！该函数只能在串口CALLBACK模式下使用！';

/*Warning文本**/
Blockly.LKL_VS2_WARNING_SETUP_ONLY = 'This block can only be placed in the setup block!';
Blockly.LKL_VS2_WARNING_MU_INIT = 'Please DON\'T connect MU and your computer on Serial port in the same time, this operation will cause the computer to print error characters or communication abnormalities.';             //'请勿同时使用Serial连接MU与电脑打印字符，此操作会导致电脑端打印字符错乱或通信异常';

/*参数文本*/
//LED color type
Blockly.LKL_VS2_LED_CLOSE = 'Close';					//'关闭';
Blockly.LKL_VS2_LED_RED = 'Red';						//'红色';
Blockly.LKL_VS2_LED_GREEN = 'Green';					//'绿色';
Blockly.LKL_VS2_LED_YELLOW = 'Yellow';					//'黄色';
Blockly.LKL_VS2_LED_BLUE = 'Blue';						//'蓝色';
Blockly.LKL_VS2_LED_PURPLE = 'Purple';					//'紫色';
Blockly.LKL_VS2_LED_CYAN = 'Cyan';						//'青色';
Blockly.LKL_VS2_LED_WHITE = 'White';					//'白色';
//Vision Zoom
Blockly.LKL_VS2_AUTO = 'auto';							//'自动';
Blockly.LKL_VS2_VISION_ZOOM = 'Zoom';					//'缩放';
//Vision Level
Blockly.LKL_VS2_LEVEL = 'level';						//'等级';
Blockly.LKL_VS2_HIGH_SPEED = 'highSpeed';				//'速度优先';
Blockly.LKL_VS2_NORMAL = 'normal';						//'性能均衡';
Blockly.LKL_VS2_HIGH_ACCURACY = 'highAccuracy';			//'准确度优先';
//UART status
Blockly.LKL_VS2_UART_OPEN = 'Open';						//'打开';
Blockly.LKL_VS2_UART_CLOSE = 'Close';					//'关闭';
//Vision type
Blockly.LKL_VS2_COLOR_BLOCK = 'ColorBlock';             //'色块';
Blockly.LKL_VS2_VISION_COLOR_DETECT = 'ColorDetect';	//'颜色识别';
Blockly.LKL_VS2_VISION_COLOR_RECOGNITION = 'ColorRecognition';	//'颜色检测';
Blockly.LKL_VS2_VISION_BALL = 'Ball';					//'球';
Blockly.LKL_VS2_VISION_LINE = 'Line';					//'线条';
Blockly.LKL_VS2_VISION_BODY = 'Body';					//'人体';
Blockly.LKL_VS2_VISION_FACE = 'Face';					//'人脸';
Blockly.LKL_VS2_VISION_TRAFFIC_CARD = 'TrafficCard';	//'交通卡片';
Blockly.LKL_VS2_VISION_SHAPE_CARD = 'ShapeCard';		//'形状卡片';
Blockly.LKL_VS2_VISION_NUM_CARD = 'NumberCard';			//'数字卡片';
//Card type
Blockly.LKL_VS2_CARD_CIRCLE = 'Circle';					//'圆形';
Blockly.LKL_VS2_CARD_TRIANGLE = 'Triangle';				//'三角形';
Blockly.LKL_VS2_CARD_SQUARE = 'Square';					//'方形';
Blockly.LKL_VS2_CARD_TICK = 'Tick';						//'正确';
Blockly.LKL_VS2_CARD_CROSS = 'Cross';					//'错误';
Blockly.LKL_VS2_CARD_STRAIGHT = 'Straight';				//'向前';
Blockly.LKL_VS2_CARD_TURN_LEFT = 'TurnLeft';			//'向左';
Blockly.LKL_VS2_CARD_TURN_RIGHT = 'TurnRight';			//'向右';
Blockly.LKL_VS2_CARD_TURN_AROUND = 'TurnAround';		//'掉头';
Blockly.LKL_VS2_CARD_WHISTLE = 'Whistle';				//'鸣笛';
Blockly.LKL_VS2_CARD_STOP = 'Stop';						//'停止';
//Vision state
Blockly.LKL_VS2_STATE_VALUE_X = 'Horizontal';			//'横向坐标';
Blockly.LKL_VS2_STATE_VALUE_Y = 'Vertical';				//'纵向坐标';
Blockly.LKL_VS2_STATE_VALUE_WIDTH = 'Width';			//'宽度';
Blockly.LKL_VS2_STATE_VALUE_HEIGHT = 'Height';			//'高度';
Blockly.LKL_VS2_STATE_VALUE_R_CHANNEL = 'ChannelR';		//'红色通道';
Blockly.LKL_VS2_STATE_VALUE_G_CHANNEL = 'ChannelG';		//'绿色通道';
Blockly.LKL_VS2_STATE_VALUE_B_CHANNEL = 'ChannelB';		//'蓝色通道';
Blockly.LKL_VS2_STATE_VALUE_LABEL = 'Label';			//'类型';
//True False
Blockly.LKL_VS2_TRUE = 'True';							//'是';
Blockly.LKL_VS2_FALSE = 'False';						//'否';
//Enable Disable
Blockly.LKL_VS2_ENABLE = 'enable';						//'开启';
Blockly.LKL_VS2_DISABLE = 'disable';					//'关闭';
//Camera AWB
Blockly.LKL_VS2_LOCK_AWB = 'LockAWB';					//'锁定白平衡';
Blockly.LKL_VS2_WHITE_LIGHT = 'WhiteLight';				//'白光模式';
Blockly.LKL_VS2_YELLOW_LIGHT = 'YellowLght';			//'黄光模式';

//Other
Blockly.LKL_VS2_COLOR = 'color';						//'颜色';

/*模块文本*/
Blockly.LKL_VS2_MU = 'initialize';									//'初始化';
Blockly.LKL_VS2_MODE = 'mode';										//'模式';
Blockly.LKL_VS2_SetupVS = 'setup';          						//'设置';
Blockly.LKL_VS2_SERIAL = 'port';									//'串口号';
Blockly.LKL_VS2_ADDRESS = 'address';								//'地址';
Blockly.LKL_VS2_RESET = 'setDefault';								//'恢复默认设置';
Blockly.LKL_VS2_LED_DETECT_COLOR = 'detectedColor';					//'识别到物体亮';
Blockly.LKL_VS2_LED_UNDETECT_COLOR = 'else';				        //'没识别到物体亮';
Blockly.LKL_VS2_BRIGHTNESS = 'brightness';							//'亮度';
Blockly.LKL_VS2_VISION_TYPE = 'vision';						        //'算法';
Blockly.LKL_VS2_SET_VISION_LEVEL = 'level';				            //'设置识别等级';
Blockly.LKL_VS2_SET_FRAME_ROTATE = 'rotateFrame';					//'图像翻转';
Blockly.LKL_VS2_SET_CAMERA_HFR = 'cameraHFRMode';   				//'高帧率模式';
Blockly.LKL_VS2_SET_CAMERA_AWB = 'cameraAWB';					    //'摄像头白平衡';
Blockly.LKL_VS2_SET_VISION_ZOOM = 'zoom';   					    //'图像缩放等级';
Blockly.LKL_VS2_SET_UART_BAUD = 'UARTBaudrate';					    //'串口波特率';
Blockly.LKL_VS2_DETECTED = 'detect';								//'检测到';
Blockly.LKL_VS2_RECOGNIZED = 'recognized';                          //'识别到';
Blockly.LKL_VS2_GET_DETECTED_MESSAGE = 'get';						//'获取';
Blockly.LKL_VS2_VALUE = 'value';									//'值';
Blockly.LKL_VS2_GET_PIX_COLOR = 'getPosition';						//'捕获坐标';
Blockly.LKL_VS2_CARD_TYPE = 'cardType';								//'卡片类型';
Blockly.LKL_VS2_SET_DETECT_COLOR = 'setDetectColor';				//'设置识别颜色';
Blockly.LKL_VS2_COORDINATE = 'coordinate';                          //'坐标';

