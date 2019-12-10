// This file was automatically generated.  Do not modify.
'use strict';

goog.provide('Blockly.Msg.zh.hans');

goog.require('Blockly.Msg');

/*          Morpx Vision Sensor          */
/*Help文本*/
Blockly.LKL_VS2_HELP_INIT = '初始化视觉传感器，并选择相关的端口';
Blockly.LKL_VS2_HELP_VISION_LEVEL = '设置识别等级，等级升高，误报率降低，识别率也会相应降低';
Blockly.LKL_VS2_HELP_VISION_ZOOM = '设置图像缩放等级，等级升高，识别距离越远，识别角度越小';

/*Warning文本**/
Blockly.LKL_VS2_WARNING_SETUP_ONLY = '该模块只能置于设置模块中！';
Blockly.LKL_VS2_WARNING_MU_INIT = '请勿同时使用Serial连接MU与电脑打印字符，此操作会导致电脑端打印字符错乱或通信异常';

/*参数文本*/
//LED color type
Blockly.LKL_VS2_LED_CLOSE = '关闭';
Blockly.LKL_VS2_LED_RED = '红色';
Blockly.LKL_VS2_LED_GREEN = '绿色';
Blockly.LKL_VS2_LED_YELLOW = '黄色';
Blockly.LKL_VS2_LED_BLUE = '蓝色';
Blockly.LKL_VS2_LED_PURPLE = '紫色';
Blockly.LKL_VS2_LED_CYAN = '青色';
Blockly.LKL_VS2_LED_WHITE = '白色';
//Vision Zoom
Blockly.LKL_VS2_AUTO = '自动';
Blockly.LKL_VS2_VISION_ZOOM = '缩放';
//Vision Level
Blockly.LKL_VS2_LEVEL = '等级';
Blockly.LKL_VS2_HIGH_SPEED = '速度优先';
Blockly.LKL_VS2_NORMAL = '性能均衡';
Blockly.LKL_VS2_HIGH_ACCURACY = '准确率优先';
//UART status
Blockly.LKL_VS2_UART_OPEN = '打开';
Blockly.LKL_VS2_UART_CLOSE = '关闭';
//Vision type
Blockly.LKL_VS2_COLOR_BLOCK = '色块';
Blockly.LKL_VS2_VISION_COLOR_DETECT = '色块检测';
Blockly.LKL_VS2_VISION_COLOR_RECOGNITION = '颜色识别';
Blockly.LKL_VS2_VISION_BALL = '球';
Blockly.LKL_VS2_VISION_LINE = '线条';
Blockly.LKL_VS2_VISION_BODY = '人体';
Blockly.LKL_VS2_VISION_FACE = '人脸';
Blockly.LKL_VS2_VISION_TRAFFIC_CARD = '交通卡片';
Blockly.LKL_VS2_VISION_SHAPE_CARD = '形状卡片';
Blockly.LKL_VS2_VISION_NUM_CARD = '数字卡片';
//Card type
Blockly.LKL_VS2_CARD_CIRCLE = '圆形';
Blockly.LKL_VS2_CARD_TRIANGLE = '三角形';
Blockly.LKL_VS2_CARD_SQUARE = '方形';
Blockly.LKL_VS2_CARD_TICK = '钩';
Blockly.LKL_VS2_CARD_CROSS = '叉';
Blockly.LKL_VS2_CARD_STRAIGHT = '向前';
Blockly.LKL_VS2_CARD_TURN_LEFT = '向左';
Blockly.LKL_VS2_CARD_TURN_RIGHT = '向右';
Blockly.LKL_VS2_CARD_TURN_AROUND = '掉头';
Blockly.LKL_VS2_CARD_WHISTLE = '鸣笛';
Blockly.LKL_VS2_CARD_STOP = '停止';
//Vision state
Blockly.LKL_VS2_STATE_VALUE_X = '横向坐标';
Blockly.LKL_VS2_STATE_VALUE_Y = '纵向坐标';
Blockly.LKL_VS2_STATE_VALUE_WIDTH = '宽度';
Blockly.LKL_VS2_STATE_VALUE_HEIGHT = '高度';
Blockly.LKL_VS2_STATE_VALUE_R_CHANNEL = '红色通道';
Blockly.LKL_VS2_STATE_VALUE_G_CHANNEL = '绿色通道';
Blockly.LKL_VS2_STATE_VALUE_B_CHANNEL = '蓝色通道';
Blockly.LKL_VS2_STATE_VALUE_LABEL = '标签';
//True False
Blockly.LKL_VS2_TRUE = '是';
Blockly.LKL_VS2_FALSE = '否';
//Enable Disable
Blockly.LKL_VS2_ENABLE = '启用';
Blockly.LKL_VS2_DISABLE = '关闭';
//Camera AWB
Blockly.LKL_VS2_LOCK_AWB = '锁定白平衡';
Blockly.LKL_VS2_WHITE_LIGHT = '白光模式';
Blockly.LKL_VS2_YELLOW_LIGHT = '黄光模式';
Blockly.LKL_VS2_ALL = '所有';

//Other
Blockly.LKL_VS2_COLOR = '颜色';
Blockly.LKL_VS2_DEFAULT = '默认';
Blockly.LKL_VS2_LOW = '低';
Blockly.LKL_VS2_MID = '中';
Blockly.LKL_VS2_HIGH = '高';

/*模块文本*/
Blockly.LKL_VS2_MU = '初始化';
Blockly.LKL_VS2_MODE = '模式';
Blockly.LKL_VS2_SetupVS = '设置';
Blockly.LKL_VS2_SET_RECOGNITION_REGION = '设置识别区域';
Blockly.LKL_VS2_SET_MIN_RECOGNITION_SIZE = '设置最小识别尺寸';
Blockly.LKL_VS2_SERIAL = '端口';
Blockly.LKL_VS2_ADDRESS = '地址';
Blockly.LKL_VS2_RESET = '恢复默认设置';
Blockly.LKL_VS2_LED_DETECT_COLOR = '检测到物体时显示';
Blockly.LKL_VS2_LED_UNDETECT_COLOR = '否则';
Blockly.LKL_VS2_BRIGHTNESS = '亮度';
Blockly.LKL_VS2_VISION_TYPE = '算法';
Blockly.LKL_VS2_SET_VISION_LEVEL = '性能';
Blockly.LKL_VS2_SET_FRAME_ROTATE = '翻转图像';
Blockly.LKL_VS2_SET_CAMERA_HFR = '高帧率模式';
Blockly.LKL_VS2_SET_CAMERA_AWB = '摄像头白平衡';
Blockly.LKL_VS2_SET_VISION_ZOOM = '数码变焦';
Blockly.LKL_VS2_SET_UART_BAUD = '串口波特率';
Blockly.LKL_VS2_DETECTED = '检测到';
Blockly.LKL_VS2_RECOGNIZED = '识别到';
Blockly.LKL_VS2_GET_DETECTED_MESSAGE = '获取';
Blockly.LKL_VS2_VALUE = '值';
Blockly.LKL_VS2_GET_PIX_COLOR = '捕获坐标';
Blockly.LKL_VS2_CARD_TYPE = '卡片类型';
Blockly.LKL_VS2_SET_DETECT_COLOR = '设置识别颜色';
Blockly.LKL_VS2_COORDINATE = '坐标';

// Light sensor
Blockly.LKL_VS2_LIGHT_SENSOR = '光线传感器';
Blockly.LKL_VS2_SET = '设置';
Blockly.LKL_VS2_SENSITIVITY = '灵敏度';
Blockly.LKL_VS2_WB_CORRECTION = '白平衡校准';
Blockly.LKL_VS2_READ = '读取';
Blockly.LKL_VS2_PROXIMITY = '接近检测';
Blockly.LKL_VS2_ALS = '环境光检测';
Blockly.LKL_VS2_GESTURE_SENSOR = '手势检测';
Blockly.LKL_VS2_GESTURE = '手势';
Blockly.LKL_VS2_GESTURE_UP = '上划';
Blockly.LKL_VS2_GESTURE_DOWN = '下划';
Blockly.LKL_VS2_GESTURE_LEFT = '左划';
Blockly.LKL_VS2_GESTURE_RIGHT = '右划';
Blockly.LKL_VS2_GESTURE_LIFT_UP = '前进';
Blockly.LKL_VS2_GESTURE_PUSH_DOWN = '后退';

// AT WiFi
Blockly.LKL_VS2_SSID = "名称";
Blockly.LKL_VS2_PASSWORD = "密码";
Blockly.LKL_VS2_WAIT_CONNECT = "连接成功";
Blockly.LKL_VS2_DISCONNECT = "断开连接";
Blockly.LKL_VS2_CLIENT = "客户端";
Blockly.LKL_VS2_HOT_SPOT = "热点";
Blockly.LKL_VS2_TARGET_IP = "目标IP";
Blockly.LKL_VS2_LOCAL_IP = "本地IP";
Blockly.LKL_VS2_WRITE = "写入";
