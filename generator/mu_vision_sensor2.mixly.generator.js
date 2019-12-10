'use strict';

goog.provide('Blockly.Arduino.VisionSensor');

goog.require('Blockly.Arduino');

var kMuName = 'MU'
var funMuVs2GetColorRCGLabel = '\
int MuVs2GetColorRCGLabel(MuVisionSensor& Mu, int x, int y) {\n\
  static int x_last = -1;\n\
  static int y_last = -1;\n\
  x = x>100 ? 100:(x<0 ? 0:x);\n\
  y = y>100 ? 100:(y<0 ? 0:y);\n\
  if (x != x_last) {\n\
    x_last = x;\n\
    Mu.write(VISION_COLOR_RECOGNITION, kXValue, x);\n\
  }\n\
  if (y != y_last) {\n\
    y_last = y;\n\
    Mu.write(VISION_COLOR_RECOGNITION, kYValue, y);\n\
  }\n\
  return Mu.GetValue(VISION_COLOR_RECOGNITION, kStatus);\n\
}\n\
                              ';
var funMuVs2GetColorDetectLabel = '\
int MuVs2GetColorDetectLabel(MuVisionSensor& Mu, const int label) {\n\
  static int label_last = -1;\n\
  if (label_last != label) {\n\
    label_last = label;\n\
    Mu.write(VISION_COLOR_DETECT, kLabel, label);\n\
  }\n\
  return Mu.GetValue(VISION_COLOR_DETECT, kStatus);\n\
}\n\
        ';
var funMu3ReadGesture = '\
MuVsLsGesture Mu3ReadGesture(MuVisionSensor& Mu, int offset) {\
  mu3_gesture[offset] = Mu.LsReadGesture();\
  return mu3_gesture[offset];\
}\
';
var funMu3AtRead8 = '\
int Mu3AtRead8() {\
  unsigned long time = millis();\
  while(!SERIAL_PORT.available() && millis()-time<1000);\
  if (millis()-time>=1000) {\
    return -1;\
  }\
  return SERIAL_PORT.read();\
}\
';
var funMu3AtWrite8 = '\
void Mu3AtWrite8(uint8_t c) {\
  SERIAL_PORT.write(c);\
}\
';
var Mu3AtPort = '';

/*              Morpx Vision Sensor              */
Blockly.Arduino.Vs2MuInit = function() {
  var dropdown_mu_obj = this.getFieldValue('MU_OBJ');
  var dropdown_serial = this.getFieldValue('SERIAL');
  var offset = parseInt(dropdown_mu_obj);
  var address = 0x60 + offset;
  Blockly.Arduino.definitions_['include_vs2'] = '#include <MuVisionSensor.h>';
  Blockly.Arduino.definitions_['var_declare_vs2_mu'+dropdown_mu_obj] = 'MuVisionSensor MU'+dropdown_mu_obj+'(0x'+address.toString(16)+');';
  if (dropdown_serial == 'Wire') {
    Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
    Blockly.Arduino.setups_['setup_i2c'] = 'Wire.begin();\n';
  }
  var code = kMuName+dropdown_mu_obj+'.begin(&'+dropdown_serial+');\n';
  return code;
};

Blockly.Arduino.Vs2Setup = function() {
  var dropdown_mu_obj = this.getFieldValue('MU_OBJ');
  var branch = Blockly.Arduino.statementToCode(this, 'SETUP_BLOCK');
  branch = branch.replace(/  /g, "");   //去除所有空格
  branch = branch.replace(new RegExp(kMuName+'0.','g'), kMuName+dropdown_mu_obj+'.');
  return branch;
};

Blockly.Arduino.Vs2Reset = function() {
  var code = 'while('+kMuName+'0.SensorSetDefault() != MU_OK);\n';
  return code;
};

Blockly.Arduino.Vs2SetLEDColor = function() {
  var color_dic = {'#000000':'kLedClose', '#ff0000':'kLedRed', '#00ff00':'kLedGreen',
                  '#ffff00':'kLedYellow', '#0000ff':'kLedBlue', '#ff00ff':'kLedPurple',
                  '#00ffff':'kLedCyan', '#ffffff':'kLedWhite'};
  var dropdown_led_id = this.getFieldValue('LED_ID');
  var dropdown_led_detect_color = color_dic[this.getFieldValue('LEDColorDetect')];
  var dropdown_led_undetect_color = color_dic[this.getFieldValue('LEDColorUndetect')];
  var input_led_level = Blockly.Arduino.valueToCode(this, "LEDLevel",
          Blockly.Arduino.ORDER_NONE) || '1';
  var code = 'while('+kMuName+'0.LedSetColor('+dropdown_led_id+', '+
  dropdown_led_detect_color+', '+dropdown_led_undetect_color+', '+input_led_level+') != MU_OK);\n';
  if (dropdown_led_detect_color == dropdown_led_undetect_color) {
    code += 'while('+kMuName+'0.LedSetMode('+dropdown_led_id+', 1, 1) != MU_OK);\n';
  } else {
    code += 'while('+kMuName+'0.LedSetMode('+dropdown_led_id+', 0, 0) != MU_OK);\n';
  }
  return code;
};

Blockly.Arduino.Vs2VisionBegin = function() {
  var dropdown_vision_status = this.getFieldValue('VisionStatus');
  var dropdown_vision_type = this.getFieldValue('VisionType');
  var code = '';
  code += 'while('+kMuName+'0.Vision'+dropdown_vision_status+'('+dropdown_vision_type+') != MU_OK);\n';
  return code;
};

Blockly.Arduino.Vs2SetVisionLevel = function() {
  var dropdown_vision_type = this.getFieldValue('VisionType');
  var dropdown_vision_level = this.getFieldValue('VisionLevel');
  var code = 'while('+kMuName+'0.VisionSetLevel('+dropdown_vision_type+', '+dropdown_vision_level+') != MU_OK);\n';
  return code;
};

Blockly.Arduino.Vs2SetVisionZoom = function() {
  var dropdown_vision_zoom = this.getFieldValue('VisionZoom');
  var code = 'while('+kMuName+'0.CameraSetZoom('+dropdown_vision_zoom+') != MU_OK);\n';
  return code;
};

Blockly.Arduino.Vs2SetColorRecognitionRegion = function() {
  var input_width = Blockly.Arduino.valueToCode(this, "Width",
                    Blockly.Arduino.ORDER_NONE) || '5';
  var input_height = Blockly.Arduino.valueToCode(this, "Height",
                    Blockly.Arduino.ORDER_NONE) || '5';
  var code = 'while('+kMuName+'0.write(VISION_COLOR_RECOGNITION, kWidthValue,'+input_width+') != MU_OK);\n';
  code += 'while('+kMuName+'0.write(VISION_COLOR_RECOGNITION, kHeightValue,'+input_height+') != MU_OK);\n';
  return code;
};

Blockly.Arduino.Vs2SetColorBlockMinBlob = function() {
  var input_width = Blockly.Arduino.valueToCode(this, "Width",
                    Blockly.Arduino.ORDER_NONE) || '5';
  var input_height = Blockly.Arduino.valueToCode(this, "Height",
                    Blockly.Arduino.ORDER_NONE) || '5';
  var code = 'while('+kMuName+'0.write(VISION_COLOR_DETECT, kWidthValue,'+input_width+') != MU_OK);\n';
  code += 'while('+kMuName+'0.write(VISION_COLOR_DETECT, kHeightValue,'+input_height+') != MU_OK);\n';
  return code;
};

Blockly.Arduino.Vs2SetUARTBaud = function() {
  var dropdown_uart_baud = this.getFieldValue('BAUD');
  var code = 'while('+kMuName+'0.UartSetBaudrate('+dropdown_uart_baud+') != MU_OK);\n';
  return code;
};

Blockly.Arduino.Vs2SetCameraRotate = function() {
  var dropdown_rotate = this.getFieldValue('FRAME_ROTATE');
  if (dropdown_rotate == 'TRUE') {
    dropdown_rotate = 'true';
  } else {
    dropdown_rotate = 'false';
  }
  var code = 'while('+kMuName+'0.CameraSetRotate('+dropdown_rotate+') != MU_OK);\n';
  return code;
};

Blockly.Arduino.Vs2SetCameraHFR = function() {
  var dropdown_HFR = this.getFieldValue('CameraHFR');
  if (dropdown_HFR == 'TRUE') {
    dropdown_HFR = 'kFPSHigh';
  } else {
    dropdown_HFR = 'kFPSNormal';
  }
  var code = 'while('+kMuName+'0.CameraSetFPS('+dropdown_HFR+') != MU_OK);\n';
  return code;
};

Blockly.Arduino.Vs2SetCameraWhiteBalance = function() {
  var dropdown_AWB = this.getFieldValue('CameraAWB');
  var code = 'while('+kMuName+'0.CameraSetAwb('+dropdown_AWB+') != MU_OK);\n';
  return code;
};

Blockly.Arduino.Vs2Detected = function() {
  var dropdown_mu_obj = this.getFieldValue('MU_OBJ');
  var dropdown_vision_type = this.getFieldValue('VISION_TYPE');
  var code = kMuName+dropdown_mu_obj+'.GetValue('+dropdown_vision_type+', kStatus)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];  
};

Blockly.Arduino.Vs2DetectedRegionColor = function() {
  var dropdown_mu_obj = this.getFieldValue('MU_OBJ');
  var input_value_x = Blockly.Arduino.valueToCode(this, "XValue",
                      Blockly.Arduino.ORDER_NONE) || '50';
  var input_value_y = Blockly.Arduino.valueToCode(this, "YValue",
                      Blockly.Arduino.ORDER_NONE) || '50';

  Blockly.Arduino.definitions_['funMuVs2GetColorRCGLabel'] = funMuVs2GetColorRCGLabel;
  var code = 'MuVs2GetColorRCGLabel('+kMuName+dropdown_mu_obj+', '+input_value_x+', '+input_value_y+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Vs2GetColorLabel = function() {
  var dropdown_mu_obj = this.getFieldValue('MU_OBJ');
  var color_dic = {'#000000':'MU_COLOR_BLACK', '#ff0000':'MU_COLOR_RED', '#00ff00':'MU_COLOR_GREEN',
                  '#ffff00':'MU_COLOR_YELLOW', '#0000ff':'MU_COLOR_BLUE', '#ff00ff':'MU_COLOR_PURPLE',
                  '#00ffff':'MU_COLOR_CYAN', '#ffffff':'MU_COLOR_WHITE'};
  var color = color_dic[this.getFieldValue("RCGColor")];

  var code = '('+kMuName+dropdown_mu_obj+'.GetValue(VISION_COLOR_RECOGNITION, kLabel) == '+color+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Vs2DetectedColorDetect = function() {
  var dropdown_mu_obj = this.getFieldValue('MU_OBJ');
  var color_dic = {'#000000':'MU_COLOR_BLACK', '#ff0000':'MU_COLOR_RED', '#00ff00':'MU_COLOR_GREEN',
                  '#ffff00':'MU_COLOR_YELLOW', '#0000ff':'MU_COLOR_BLUE', '#ff00ff':'MU_COLOR_PURPLE',
                  '#00ffff':'MU_COLOR_CYAN', '#ffffff':'MU_COLOR_WHITE'};
  var color = color_dic[this.getFieldValue("DetectColor")];

  Blockly.Arduino.definitions_['funMuVs2GetColorDetectLabel'] = funMuVs2GetColorDetectLabel;
  var code = 'MuVs2GetColorDetectLabel('+kMuName+dropdown_mu_obj+', '+color+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Vs2GetMessage = function() {
  var dropdown_mu_obj = this.getFieldValue('MU_OBJ');
  var dropdown_vision_type = this.getFieldValue('VISION_TYPE');
  var dropdown_detected_message = this.getFieldValue('DETECTED_MESSAGE');
  var code = kMuName+dropdown_mu_obj+'.GetValue('+dropdown_vision_type+', '+dropdown_detected_message+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Vs2GetCardType = function() {
  var dropdown_mu_obj = this.getFieldValue('MuObj');
  var dropdown_vision_type = this.getFieldValue('VisionCardType');
  var dropdown_card_type = this.getFieldValue('CardType');
  var code = '('+kMuName+dropdown_mu_obj+'.GetValue('+dropdown_vision_type+', kLabel) == '+dropdown_card_type+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Mu3LsBegin = function() {
  var dropdown_mu_obj = this.getFieldValue('MU_OBJ');
  var dropdown_ls_type = this.getFieldValue('LS_TYPE');
  var code = kMuName+dropdown_mu_obj+'.LsBegin('+dropdown_ls_type+');\n';
  return code;
};

Blockly.Arduino.Mu3LsSetSensitivity = function() {
  var dropdown_mu_obj = this.getFieldValue('MU_OBJ');
  var dropdown_sensitivity = this.getFieldValue('SENSITIVITY');
  var code = kMuName+dropdown_mu_obj+'.LsSetSensitivity('+dropdown_sensitivity+');\n';
  return code;
};

Blockly.Arduino.Mu3LsWhiteBalanceEnable = function() {
  var dropdown_mu_obj = this.getFieldValue('MU_OBJ');
  var code = kMuName+dropdown_mu_obj+'.LsWhiteBalanceEnable();\n';
  return code;
};

Blockly.Arduino.Mu3LsReadProximity = function() {
  var dropdown_mu_obj = this.getFieldValue('MU_OBJ');
  var code = kMuName+dropdown_mu_obj+'.LsReadProximity()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Mu3LsReadAmbientLight = function() {
  var dropdown_mu_obj = this.getFieldValue('MU_OBJ');
  var code = kMuName+dropdown_mu_obj+'.LsReadAmbientLight()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Mu3LsDetectedGesture = function() {
  var dropdown_mu_obj = this.getFieldValue('MU_OBJ');
  Blockly.Arduino.definitions_['declare_gesture'] = 'MuVsLsGesture mu3_gesture[4];';
  Blockly.Arduino.definitions_['funMu3ReadGesture'] = funMu3ReadGesture;
  var code = 'Mu3ReadGesture('+kMuName+dropdown_mu_obj+', '+dropdown_mu_obj+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Mu3LsDetectedGestureType = function() {
  var dropdown_mu_obj = this.getFieldValue('MU_OBJ');
  var dropdown_gesture = this.getFieldValue('GESTURE');
  var code = '(mu3_gesture['+dropdown_mu_obj+'] == '+dropdown_gesture+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Mu3AtWiFiInit = function() {
  var dropdown_serial = this.getFieldValue('SERIAL');
  var baud = Blockly.Arduino.valueToCode(this, "BAUD",
             Blockly.Arduino.ORDER_NONE) || '9600';
  Mu3AtPort = dropdown_serial;
  Blockly.Arduino.definitions_['include_mu3_at'] = '#include <MuVisionSensor3_AT.h>';
  Blockly.Arduino.definitions_['funMu3AtRead8'] = funMu3AtRead8.replace(/SERIAL_PORT/g, dropdown_serial);
  Blockly.Arduino.definitions_['funMu3AtWrite8'] = funMu3AtWrite8.replace("SERIAL_PORT", dropdown_serial);
  Blockly.Arduino.definitions_['define_mu3_at'] = 'MuVisionSensor3_AT MU3_AT(Mu3AtRead8, Mu3AtWrite8);';
  var code = dropdown_serial+'.begin(9600);\n';
  if (baud != '9600') {
    code += 'MU3_AT.UartBaud("'+baud+'");\n';
    code += dropdown_serial+'.begin('+baud+');\n';
  }
  return code;
};

Blockly.Arduino.Mu3AtWiFiSet = function() {
  var ssid = Blockly.Arduino.valueToCode(this, "SSID",
              Blockly.Arduino.ORDER_NONE);
  var password = Blockly.Arduino.valueToCode(this, "PASSWORD",
                  Blockly.Arduino.ORDER_NONE);
  var mode = this.getFieldValue('MODE');
  var code = 'MU3_AT.WifiSet('+ssid+', '+password+', '+mode+');\n';
  return code;
};

Blockly.Arduino.Mu3AtWiFiCon = function() {
  var code = '!MU3_AT.WifiCon("1")';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Mu3AtWiFiDiscon = function() {
  var code = 'MU3_AT.WifiCon("0");\n';
  return code;
};

Blockly.Arduino.Mu3AtWiFiUDP = function() {
  var ip = Blockly.Arduino.valueToCode(this, "IP",
            Blockly.Arduino.ORDER_NONE);
  var port = Blockly.Arduino.valueToCode(this, "PORT",
              Blockly.Arduino.ORDER_NONE);
  var code = 'MU3_AT.WifiUDP('+ip+', '+port+');\n';
  return code;
};

Blockly.Arduino.Mu3AtWiFiCip = function() {
  var code = 'MU3_AT.WifiCIP().begin()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Mu3AtWiFiSip = function() {
  var code = 'MU3_AT.WifiSIP().begin()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Mu3AtWiFiRead = function() {
  var code = Mu3AtPort+'.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.Mu3AtWiFiWrite = function() {
  var number = Blockly.Arduino.valueToCode(this, "NUMBER",
                Blockly.Arduino.ORDER_NONE);
  var code = Mu3AtPort+'.write('+number+');\n';
  return code;
};
