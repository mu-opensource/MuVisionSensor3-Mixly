'use strict';

goog.provide('Blockly.Blocks.VisionSensor');

goog.require('Blockly.Blocks');

var lVisionCardType = [["🔳 "+Blockly.LKL_VS2_VISION_SHAPE_CARD, "VISION_SHAPE_CARD_DETECT"],
                      ["🔳 "+Blockly.LKL_VS2_VISION_TRAFFIC_CARD, "VISION_TRAFFIC_CARD_DETECT"],
                      ["🔳 "+Blockly.LKL_VS2_VISION_NUM_CARD, "VISION_NUM_CARD_DETECT"],
                      ];
var VS_VISION_TYPE = [["🌈 "+Blockly.LKL_VS2_VISION_COLOR_DETECT, "VISION_COLOR_DETECT"],
                      ["🌈 "+Blockly.LKL_VS2_VISION_COLOR_RECOGNITION, "VISION_COLOR_RECOGNITION"],
                      ["⚽ "+Blockly.LKL_VS2_VISION_BALL, "VISION_BALL_DETECT"],
                      // ["♎ "+Blockly.LKL_VS2_VISION_LINE, "VISION_LINE_DETECT"],
                      ["👥 "+Blockly.LKL_VS2_VISION_BODY, "VISION_BODY_DETECT"],
                      // ["🔳 "+Blockly.LKL_VS2_VISION_SHAPE_CARD, "VISION_SHAPE_CARD_DETECT"],
                      // ["🔳 "+Blockly.LKL_VS2_VISION_TRAFFIC_CARD, "VISION_TRAFFIC_CARD_DETECT"],
                      // ["🔳 "+Blockly.LKL_VS2_VISION_NUM_CARD, "VISION_NUM_CARD_DETECT"],
                      // ["😉 "+Blockly.LKL_VS2_VISION_FACE, "VisionSensor::FACE"],
                      ].concat(lVisionCardType);

var lVisionZoom = [[Blockly.LKL_VS2_AUTO,"kZoomDefault"],[Blockly.LKL_VS2_LEVEL+"1", "kZoom1"],
                  [Blockly.LKL_VS2_LEVEL+"2", "kZoom2"],[Blockly.LKL_VS2_LEVEL+"3", "kZoom3"],
                  [Blockly.LKL_VS2_LEVEL+"4", "kZoom4"],[Blockly.LKL_VS2_LEVEL+"5", "kZoom5"]
                  ];

var lVisionLevel = [[Blockly.LKL_VS2_AUTO,"kLevelDefault"],
                    [Blockly.LKL_VS2_HIGH_SPEED, "kLevelSpeed"],
                    [Blockly.LKL_VS2_NORMAL, "kLevelBalance"],
                    [Blockly.LKL_VS2_HIGH_ACCURACY, "kLevelAccuracy"],
                    ];

var lVsMu = [["Mu00", "0"],["Mu01", "1"],["Mu10", "2"],["Mu11", "3"]];

// var lLedColor = [[Blockly.LKL_VS2_LED_CLOSE, "kLedClose"], [Blockly.LKL_VS2_LED_RED, "kLedRed"], 
//                 [Blockly.LKL_VS2_LED_GREEN, "kLedGreen"], [Blockly.LKL_VS2_LED_YELLOW, "kLedYellow"], 
//                 [Blockly.LKL_VS2_LED_BLUE, "kLedBlue"], [Blockly.LKL_VS2_LED_PURPLE, "kLedPurple"], 
//                 [Blockly.LKL_VS2_LED_CYAN, "kLedCyan"], [Blockly.LKL_VS2_LED_WHITE, "kLedWhite"]
//                 ];

Blockly.Blocks.VisionSensor.HUE = 20;
Blockly.Blocks.VisionSensor.HUE_SetupMode = 80;
Blockly.Blocks.VisionSensor.HUE_RunMode = 100;

Blockly.Blocks['Vs2MuInit'] = {
  init: function() {
    var dropdown_list = profile.default.serial_select.concat([["I2C","Wire"]])
    this.setColour(Blockly.Blocks.VisionSensor.HUE);
    this.appendDummyInput()
        .appendField(Blockly.LKL_VS2_MU)
        .appendField(new Blockly.FieldDropdown(lVsMu), "MU_OBJ")
        .appendField(' '+Blockly.LKL_VS2_SERIAL)
        .appendField(new Blockly.FieldDropdown(dropdown_list), "SERIAL");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.LKL_VS2_HELP_INIT);
  }
};

Blockly.Blocks['Vs2Setup'] = {
  init: function() {
    this.setColour(Blockly.Blocks.VisionSensor.HUE_SetupMode);
    this.appendDummyInput()
        .appendField(Blockly.LKL_VS2_SetupVS)
        .appendField(new Blockly.FieldDropdown(lVsMu), "MU_OBJ");
    this.appendStatementInput('SETUP_BLOCK');
        // .setCheck(kSetupBlock, 1);
        // .appendField('');
    // this.appendDummyInput('SAVE_REGISTER')
    //     .appendField(Blockly.LKL_VS2_SAVE)
    //     .appendField(new Blockly.FieldCheckbox('TRUE'), 'SAVE_REG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['Vs2Reset'] = {
  init: function() {
    this.setColour(Blockly.Blocks.VisionSensor.HUE_SetupMode);
    this.appendDummyInput()
        .appendField(Blockly.LKL_VS2_RESET);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
  onchange: function(e) {
    var surround_parent = this.getSurroundParent();
    if (surround_parent && surround_parent.type == 'Vs2Setup') {
      this.setWarningText(null);
    } else {
      this.setWarningText(Blockly.LKL_VS2_WARNING_SETUP_ONLY);
    }
  }
};

Blockly.Blocks['Vs2SetLEDColor'] = {
  init: function() {
    var led_color = ['#000','#f00','#0f0','#ff0','#00f','#f0f','#0ff','#fff'];
    var color_detected = new Blockly.FieldColour('#0000ff');
    color_detected.setColours(led_color).setColumns(3);
    var color_undetected = new Blockly.FieldColour('#ff0000');
    color_undetected.setColours(led_color).setColumns(3);

    this.setColour(Blockly.Blocks.VisionSensor.HUE_SetupMode);
    this.appendDummyInput()
        .appendField('LED')
        .appendField(new Blockly.FieldDropdown([["1", "kLed1"], ["2", "kLed2"]]), "LED_ID")
        .appendField(' '+Blockly.LKL_VS2_LED_DETECT_COLOR)
        .appendField(color_detected, "LEDColorDetect")
        .appendField(' '+Blockly.LKL_VS2_LED_UNDETECT_COLOR)
        .appendField(color_undetected, "LEDColorUndetect");
    this.appendValueInput("LEDLevel")
        .setCheck([Number, Boolean])
        .appendField(' '+Blockly.LKL_VS2_BRIGHTNESS+'(0~15)');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
  },
  onchange: function(e) {
    var surround_parent = this.getSurroundParent();
    if (surround_parent && surround_parent.type == 'Vs2Setup') {
      this.setWarningText(null);
    } else {
      this.setWarningText(Blockly.LKL_VS2_WARNING_SETUP_ONLY);
    }
  }
};

// Blockly.Blocks['Vs2LedSetLevel'] = {
//   init: function() {
//     this.setColour(Blockly.Blocks.VisionSensor.HUE_SetupMode);
//     this.appendValueInput("LED1Level")
//         .setCheck([Number, Boolean])
//         .appendField("LED1"+Blockly.LKL_VS2_BRIGHTNESS);
//     this.appendValueInput("LED2Level")
//         .setCheck([Number, Boolean])
//         .appendField("LED2"+Blockly.LKL_VS2_BRIGHTNESS);
//     this.setInputsInline(true);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//   },
//   onchange: function(e) {
//     var surround_parent = this.getSurroundParent();
//     if (surround_parent && surround_parent.type == 'Vs2Setup') {
//       this.setWarningText(null);
//     } else {
//       this.setWarningText(Blockly.LKL_VS2_WARNING_SETUP_ONLY);
//     }
//   }
// };

Blockly.Blocks['Vs2VisionBegin'] = {
  init: function() {
    var lVs2VisionStatus = [[Blockly.LKL_VS2_ENABLE, "Begin"],[Blockly.LKL_VS2_DISABLE, "End"]];
    this.setColour(Blockly.Blocks.VisionSensor.HUE_SetupMode);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(lVs2VisionStatus), "VisionStatus")
        .appendField(Blockly.LKL_VS2_SET_VISION_TYPE)
        .appendField(new Blockly.FieldDropdown(VS_VISION_TYPE), "VisionType");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    // this.vision_type_ = this.getFieldValue("VisionType");
    // this.params_num_ = 0;
    // this.updateParams_();
  },
  onchange: function(e) {
    var surround_parent = this.getSurroundParent();
    if (surround_parent && surround_parent.type == 'Vs2Setup') {
      this.setWarningText(null);
    } else {
      this.setWarningText(Blockly.LKL_VS2_WARNING_SETUP_ONLY);
    }

    // var vision_type = this.getFieldValue("VisionType");
    // if (this.vision_type_ != vision_type) {
    //   this.vision_type_ = vision_type;
    //   this.updateParams_();
    // }
  },
  // updateParams_: function() {
  //   for (var i = 0; i < this.params_num_; ++i) {
  //     this.removeInput("VISION_PARAMTER"+i);
  //   }
  //   this.params_num_ = 0;
  //   if (this.vision_type_ == 'VISION_COLOR_RECOGNITION') {
  //       this.appendValueInput("VISION_PARAMTER"+this.params_num_)
  //           .setCheck(Number)
  //           .setAlign(Blockly.ALIGN_RIGHT)
  //           .appendField(Blockly.LKL_VS2_SET_X_VALUE+"(0~100)%");
  //       this.params_num_++;
  //       this.appendValueInput("VISION_PARAMTER"+this.params_num_)
  //           .setCheck(Number)
  //           .setAlign(Blockly.ALIGN_RIGHT)
  //           .appendField(Blockly.LKL_VS2_SET_Y_VALUE+"(0~100)%");
  //       this.params_num_++;
  //   } else if (this.vision_type_ == 'VISION_COLOR_DETECT') {
  //     var led_color = ['#000','#f00','#0f0','#ff0','#00f','#f0f','#0ff','#fff'];
  //     var color_detect = new Blockly.FieldColour('#ff0000');
  //     color_detect.setColours(led_color).setColumns(3);
  //     this.appendDummyInput("VISION_PARAMTER"+this.params_num_)
  //         .setAlign(Blockly.ALIGN_RIGHT)
  //         .appendField(Blockly.LKL_VS2_SET_DETECT_COLOR)
  //         .appendField(color_detect, "ColorDetect");
  //     this.params_num_++;
  //   }
  // },
};

Blockly.Blocks['Vs2SetVisionLevel'] = {
  init: function() {
    this.setColour(Blockly.Blocks.VisionSensor.HUE_SetupMode);
    this.appendDummyInput()
        .appendField(Blockly.LKL_VS2_SET_VISION)
        .appendField(new Blockly.FieldDropdown(VS_VISION_TYPE), "VisionType")
        .appendField(' '+Blockly.LKL_VS2_SET_VISION_LEVEL)
        .appendField(new Blockly.FieldDropdown(lVisionLevel), "VisionLevel");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.LKL_VS2_HELP_VISION_LEVEL);
  },
  onchange: function(e) {
    var surround_parent = this.getSurroundParent();
    if (surround_parent && surround_parent.type == 'Vs2Setup') {
      this.setWarningText(null);
    } else {
      this.setWarningText(Blockly.LKL_VS2_WARNING_SETUP_ONLY);
    }
  }
};

Blockly.Blocks['Vs2SetVisionZoom'] = {
  init: function() {
    this.setColour(Blockly.Blocks.VisionSensor.HUE_SetupMode);
    this.appendDummyInput()
        .appendField(Blockly.LKL_VS2_SET_VISION_ZOOM)
        .appendField(new Blockly.FieldDropdown(lVisionZoom), "VisionZoom");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	 this.setTooltip(Blockly.LKL_VS2_HELP_VISION_ZOOM);
  },
  onchange: function(e) {
    var surround_parent = this.getSurroundParent();
    if (surround_parent && surround_parent.type == 'Vs2Setup') {
      this.setWarningText(null);
    } else {
      this.setWarningText(Blockly.LKL_VS2_WARNING_SETUP_ONLY);
    }
  }
};

Blockly.Blocks['Vs2SetUARTBaud'] = {
  init: function() {
		var BAUD = [["9600","kBaud9600"],["19200","kBaud19200"],["38400","kBaud38400"],["57600","kBaud57600"],
    ["115200","kBaud115200"],["230400","kBaud230400"],["460800","kBaud460800"],["921600","kBaud921600"]];
    this.setColour(Blockly.Blocks.VisionSensor.HUE_SetupMode);
    this.appendDummyInput()
				.appendField(Blockly.LKL_VS2_SET_UART_BAUD)
        .appendField(new Blockly.FieldDropdown(BAUD), "BAUD");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
  onchange: function(e) {
    var surround_parent = this.getSurroundParent();
    if (surround_parent && surround_parent.type == 'Vs2Setup') {
      this.setWarningText(null);
    } else {
      this.setWarningText(Blockly.LKL_VS2_WARNING_SETUP_ONLY);
    }
  }
};

Blockly.Blocks['Vs2SetCameraRotate'] = {
  init: function() {
    this.setColour(Blockly.Blocks.VisionSensor.HUE_SetupMode);
    this.appendDummyInput('')
        .appendField(Blockly.LKL_VS2_SET_FRAME_ROTATE)
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'FRAME_ROTATE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
  onchange: function(e) {
    var surround_parent = this.getSurroundParent();
    if (surround_parent && surround_parent.type == 'Vs2Setup') {
      this.setWarningText(null);
    } else {
      this.setWarningText(Blockly.LKL_VS2_WARNING_SETUP_ONLY);
    }
  }
};

Blockly.Blocks['Vs2SetCameraHFR'] = {
  init: function() {
    this.setColour(Blockly.Blocks.VisionSensor.HUE_SetupMode);
    this.appendDummyInput('')
        .appendField(Blockly.LKL_VS2_SET_CAMERA_HFR)
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'CameraHFR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
  onchange: function(e) {
    var surround_parent = this.getSurroundParent();
    if (surround_parent && surround_parent.type == 'Vs2Setup') {
      this.setWarningText(null);
    } else {
      this.setWarningText(Blockly.LKL_VS2_WARNING_SETUP_ONLY);
    }
  }
};

Blockly.Blocks['Vs2SetCameraWhiteBalance'] = {
  init: function() {
    var lCameraAWB = [[Blockly.LKL_VS2_AUTO, "kAutoWhiteBalance"],[Blockly.LKL_VS2_LOCK_AWB, "kLockWhiteBalance"],
                      [Blockly.LKL_VS2_WHITE_LIGHT, "kWhiteLight"],[Blockly.LKL_VS2_YELLOW_LIGHT, "kYellowLight"]];
    this.setColour(Blockly.Blocks.VisionSensor.HUE_SetupMode);
    this.appendDummyInput('')
        .appendField(Blockly.LKL_VS2_SET_CAMERA_AWB)
        .appendField(new Blockly.FieldDropdown(lCameraAWB), 'CameraAWB');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
  onchange: function(e) {
    var surround_parent = this.getSurroundParent();
    if (surround_parent && surround_parent.type == 'Vs2Setup') {
      this.setWarningText(null);
    } else {
      this.setWarningText(Blockly.LKL_VS2_WARNING_SETUP_ONLY);
    }
  }
};

Blockly.Blocks['Vs2Detected'] = {
  init: function() {
    this.setColour(Blockly.Blocks.VisionSensor.HUE_RunMode);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(lVsMu), "MU_OBJ")
				.appendField(Blockly.LKL_VS2_DETECTED)
        .appendField(new Blockly.FieldDropdown(VS_VISION_TYPE), "VISION_TYPE");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks['Vs2DetectedRegionColor'] = {
  init: function() {
    this.setColour(Blockly.Blocks.VisionSensor.HUE_RunMode);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(lVsMu), "MU_OBJ")
        .appendField(Blockly.LKL_VS2_DETECTED)
        .appendField(Blockly.LKL_VS2_VISION_COLOR_RECOGNITION);
    this.appendValueInput('XValue')
        .setCheck(Number)
        .appendField('x=');
    this.appendValueInput('YValue')
        .setCheck(Number)
        .appendField('y=');
    this.setOutput(true, Number);
    this.setInputsInline(true);
  },
};

Blockly.Blocks['Vs2DetectedColorDetect'] = {
  init: function() {
    var led_color = ['#000','#f00','#0f0','#ff0','#00f','#f0f','#0ff','#fff'];
    var color = new Blockly.FieldColour('#ff0000');
    color.setColours(led_color).setColumns(3);

    this.setColour(Blockly.Blocks.VisionSensor.HUE_RunMode);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(lVsMu), "MU_OBJ")
        .appendField(Blockly.LKL_VS2_DETECTED)
        .appendField(Blockly.LKL_VS2_VISION_COLOR_DETECT)
        .appendField(Blockly.LKL_VS2_COLOR+"=")
        .appendField(color, 'DetectColor');

    this.setOutput(true, Number);
  }
};

Blockly.Blocks['Vs2GetColorLabel'] = {
  init: function() {
    var led_color = ['#000','#f00','#0f0','#ff0','#00f','#f0f','#0ff','#fff'];
    var color = new Blockly.FieldColour('#ff0000');
    color.setColours(led_color).setColumns(3);

    this.setColour(Blockly.Blocks.VisionSensor.HUE_RunMode);
    this.appendDummyInput()
        .appendField(Blockly.LKL_VS2_GET_DETECTED_MESSAGE)
        .appendField(new Blockly.FieldDropdown(lVsMu), "MU_OBJ")
        .appendField(Blockly.LKL_VS2_SET_VISION_TYPE)
        .appendField(Blockly.LKL_VS2_VISION_COLOR_RECOGNITION);
    this.appendDummyInput()
        .appendField(Blockly.LKL_VS2_COLOR+"=")
        .appendField(color, 'RCGColor');
    this.setOutput(true, Boolean);
    this.setInputsInline(true);
  }
};

// Blockly.Blocks['Vs2GetColorRCGLabel'] = {
//   init: function() {
//     var led_color = ['#000','#f00','#0f0','#ff0','#00f','#f0f','#0ff','#fff'];
//     var color = new Blockly.FieldColour('#ff0000');
//     color.setColours(led_color).setColumns(3);

//     this.setColour(Blockly.Blocks.VisionSensor.HUE_RunMode);
//     this.appendDummyInput()
//         .appendField(Blockly.LKL_VS2_GET_DETECTED_MESSAGE)
//         .appendField(new Blockly.FieldDropdown(lVsMu), "MU_OBJ")
//         .appendField(Blockly.LKL_VS2_SET_VISION_TYPE
//                     +Blockly.LKL_VS2_VISION_COLOR_RECOGNITION);
//     this.appendValueInput('XValue')
//         .setCheck(Number)
//         .appendField('x:');
//     this.appendValueInput('YValue')
//         .setCheck(Number)
//         .appendField('y:');
//     this.appendDummyInput()
//         .appendField(Blockly.LKL_VS2_COLOR+"=")
//         .appendField(color, 'RCGColor');
//     this.setOutput(true, Boolean);
//     this.setInputsInline(true);
//   }
// };

Blockly.Blocks['Vs2GetMessage'] = {
  init: function() {
  	this.DETECTED_MESSAGE = [[Blockly.LKL_VS2_STATE_VALUE_X,"kXValue"], 
                            [Blockly.LKL_VS2_STATE_VALUE_Y,"kYValue"],
                            [Blockly.LKL_VS2_STATE_VALUE_WIDTH,"kWidthValue"], 
                            [Blockly.LKL_VS2_STATE_VALUE_HEIGHT,"kHeightValue"],
                            [Blockly.LKL_VS2_STATE_VALUE_LABEL,"kLabel"]
                            ];
    this.ColorRCGMessage = [[Blockly.LKL_VS2_STATE_VALUE_R_CHANNEL,"kRValue"],
                            [Blockly.LKL_VS2_STATE_VALUE_G_CHANNEL,"kGValue"],
                            [Blockly.LKL_VS2_STATE_VALUE_B_CHANNEL,"kBValue"],
                            [Blockly.LKL_VS2_STATE_VALUE_LABEL,"kLabel"]
                            ];
    var vision_type = VS_VISION_TYPE.slice();
    // vision_type.splice(1,1);

    this.setColour(Blockly.Blocks.VisionSensor.HUE_RunMode);
    this.appendDummyInput()
				.appendField(Blockly.LKL_VS2_GET_DETECTED_MESSAGE)
        .appendField(new Blockly.FieldDropdown(lVsMu), "MU_OBJ")
        .appendField(Blockly.LKL_VS2_SET_VISION_TYPE)
        .appendField(new Blockly.FieldDropdown(vision_type), "VISION_TYPE");
    this.vision_type_ = '';
    this.generateMessageType();
    this.setOutput(true, Number);
    this.setInputsInline(true);
  },
  onchange: function(e) {
    var vision_type = this.getFieldValue("VISION_TYPE");
    if (this.vision_type_ != vision_type) {
      if (this.vision_type_ == "VISION_COLOR_RECOGNITION"
        || vision_type == "VISION_COLOR_RECOGNITION") {
        this.generateMessageType();
      } else {
        this.vision_type_ = vision_type;
      }
    }
  },
  generateMessageType: function() {
    var type_index = -1;
    if (this.vision_type_ != '') {
      var last_message_type = this.getFieldValue("DETECTED_MESSAGE");
      var color_message = [];
      var other_message = [];
      for (var i = 0; i < this.ColorRCGMessage.length; i++) {
        color_message.push(this.ColorRCGMessage[i][1]);
      }
      for (var i = 0; i < this.DETECTED_MESSAGE.length; i++) {
        other_message.push(this.DETECTED_MESSAGE[i][1]);
      }
      if (color_message.indexOf(last_message_type) != -1) {
        type_index = color_message.indexOf(last_message_type);
      } else if (other_message.indexOf(last_message_type) != -1) {
        type_index = other_message.indexOf(last_message_type);
      }
    }

    this.vision_type_ = this.getFieldValue("VISION_TYPE");
    this.removeInput("DetectedMessage");
    if (this.vision_type_ == "VISION_COLOR_RECOGNITION") {
      this.appendDummyInput("DetectedMessage")
          .appendField(new Blockly.FieldDropdown(this.ColorRCGMessage), "DETECTED_MESSAGE")
          .appendField(Blockly.LKL_VS2_VALUE);
      if (type_index != -1) {
        if (type_index == this.DETECTED_MESSAGE.length-1) {
          this.setFieldValue(this.ColorRCGMessage[this.ColorRCGMessage.length-1][1], "DETECTED_MESSAGE");
        } else {
          this.setFieldValue(this.ColorRCGMessage[type_index][1], "DETECTED_MESSAGE");
        }
      }
    } else {
      this.appendDummyInput("DetectedMessage")
          .appendField(new Blockly.FieldDropdown(this.DETECTED_MESSAGE), "DETECTED_MESSAGE")
          .appendField(Blockly.LKL_VS2_VALUE);
      if (type_index != -1) {
        if (type_index == this.ColorRCGMessage.length-1) {
          this.setFieldValue(this.DETECTED_MESSAGE[this.DETECTED_MESSAGE.length-1][1], "DETECTED_MESSAGE");
        } else {
          this.setFieldValue(this.DETECTED_MESSAGE[type_index][1], "DETECTED_MESSAGE");
        }
      }
    }
  },
};

Blockly.Blocks['Vs2GetCardType'] = {
  init: function() {
    this.traffic_card_type_ = [["⬆ "+Blockly.LKL_VS2_CARD_STRAIGHT, "MU_TRAFFIC_CARD_FORWARD"],
                              ["⬅ "+Blockly.LKL_VS2_CARD_TURN_LEFT, "MU_TRAFFIC_CARD_LEFT"],
                              ["➡ "+Blockly.LKL_VS2_CARD_TURN_RIGHT, "MU_TRAFFIC_CARD_RIGHT"],
                              ["🔙 "+Blockly.LKL_VS2_CARD_TURN_AROUND, "MU_TRAFFIC_CARD_TURN_AROUND"],
                              ["🅿️ "+Blockly.LKL_VS2_CARD_STOP, "MU_TRAFFIC_CARD_PARK"]
                              ];
    this.number_card_type_ = [["1", "1"],["2", "2"],["3", "3"],["4", "4"],["5", "5"],
                            ["6", "6"],["7", "7"],["8", "8"],["9", "9"],["0", "0"]
                            ];
    this.shape_card_type_ = [["✔ "+Blockly.LKL_VS2_CARD_TICK, "MU_SHAPE_CARD_TICK"],
                            ["✖ "+Blockly.LKL_VS2_CARD_CROSS, "MU_SHAPE_CARD_CROSS"],
                            ["⭕ "+Blockly.LKL_VS2_CARD_CIRCLE, "MU_SHAPE_CARD_CIRCLE"],
                            ["◻ "+Blockly.LKL_VS2_CARD_SQUARE, "MU_SHAPE_CARD_SQUARE"],
                            ["🛆 "+Blockly.LKL_VS2_CARD_TRIANGLE, "MU_SHAPE_CARD_TRIANGLE"],
                            ];
    this.card_class_dic_ = {'VISION_SHAPE_CARD_DETECT':this.shape_card_type_,
                            'VISION_TRAFFIC_CARD_DETECT':this.traffic_card_type_,
                            'VISION_NUM_CARD_DETECT':this.number_card_type_
                            };
    this.setColour(Blockly.Blocks.VisionSensor.HUE_RunMode);
    this.appendDummyInput()
        .appendField(Blockly.LKL_VS2_GET_DETECTED_MESSAGE)
        .appendField(new Blockly.FieldDropdown(lVsMu), "MuObj")
        .appendField(Blockly.LKL_VS2_SET_VISION_TYPE)
        .appendField(new Blockly.FieldDropdown(lVisionCardType), "VisionCardType")
        .appendField(" "+Blockly.LKL_VS2_CARD_TYPE+"=");
    this.vision_type_ = this.getFieldValue("VisionCardType");
    this.appendDummyInput("CARD_TYPE")
        .appendField(new Blockly.FieldDropdown(this.card_class_dic_[this.vision_type_]), "CardType");
    this.setInputsInline(true);
    this.setOutput(true, Boolean);
  },
  onchange: function(e) {
    var vision_type = this.getFieldValue("VisionCardType");
    if (this.vision_type_ != vision_type) {
      this.vision_type_ = vision_type;
      var last_card_type = this.getFieldValue("CardType");
      var traffic_card_type = [];
      var number_card_type = [];
      var shape_card_type = [];
      var type_index = -1;
      for (var i = 0; i < this.traffic_card_type_.length; i++) {
        traffic_card_type.push(this.traffic_card_type_[i][1]);
      }
      for (var i = 0; i < this.number_card_type_.length; i++) {
        number_card_type.push(this.number_card_type_[i][1]);
      }
      for (var i = 0; i < this.shape_card_type_.length; i++) {
        shape_card_type.push(this.shape_card_type_[i][1]);
      }
      if (traffic_card_type.indexOf(last_card_type) != -1) {
        type_index = traffic_card_type.indexOf(last_card_type);
      } else if (number_card_type.indexOf(last_card_type) != -1) {
        type_index = number_card_type.indexOf(last_card_type);
      } else if (shape_card_type.indexOf(last_card_type) != -1) {
        type_index = shape_card_type.indexOf(last_card_type);
      }
      this.removeInput("CARD_TYPE");
      this.appendDummyInput("CARD_TYPE")
          .appendField(new Blockly.FieldDropdown(this.card_class_dic_[this.vision_type_]), "CardType");
      this.setFieldValue(this.card_class_dic_[this.vision_type_][type_index][1], "CardType");
    }
  },
};


// Blockly.Blocks['VS_GetPixColor'] = {
//   init: function() {
//     var DETECTED_MESSAGE = [[Blockly.LKL_VS2_STATE_VALUE_R_CHANNEL, "kChannelRValue"],
//                             [Blockly.LKL_VS2_STATE_VALUE_G_CHANNEL, "kChannelGValue"],
//                             [Blockly.LKL_VS2_STATE_VALUE_B_CHANNEL, "kChannelBValue"]
//                             ];
//     this.setColour(Blockly.Blocks.VisionSensor.HUE_RunMode);
//     this.appendDummyInput()
//         .appendField(new Blockly.FieldDropdown(lVsMu), "MU_OBJ");
//     this.appendValueInput('X_POSITION')
//         .appendField(Blockly.LKL_VS2_GET_PIX_COLOR)
//         .appendField('x:')
//         .setCheck(Number);
//     this.appendValueInput('Y_POSITION')
//         .appendField('y:')
//         .setCheck(Number);
//     this.appendDummyInput()
//         .appendField(new Blockly.FieldDropdown(DETECTED_MESSAGE), "COLOR_CHANNEL")
//         .appendField(Blockly.LKL_VS2_COLOR);
//     this.setInputsInline(true);
//     this.setOutput(true, Boolean);
//   }
// };


//////////////////////////////////////////////////////test block
Blockly.Blocks['test_block'] = {
  init: function() {
    //this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendValueInput('IF0')
        .setCheck([Boolean,Number])
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
    this.appendStatementInput('DO0')
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['controls_if_elseif',
                                         'controls_if_else']));
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      if (!thisBlock.elseifCount_ && !thisBlock.elseCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
      } else if (!thisBlock.elseifCount_ && thisBlock.elseCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;
      } else if (thisBlock.elseifCount_ && !thisBlock.elseCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;
      } else if (thisBlock.elseifCount_ && thisBlock.elseCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_4;
      }
      return '';
    });
    this.elseifCount_ = 0;
    this.elseCount_ = 0;

    this.mutationToDom_ = 0;
    this.domToMutation_ = 0;
    this.decompose_ = 0;
    this.compose_ = 0;
    this.saveConnections_ = 0;
  },
  /**
   * Create XML to represent the number of else-if and else inputs.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    this.mutationToDom_++;
    this.print_text();
    if (!this.elseifCount_ && !this.elseCount_) {
      return null;
    }
    var container = document.createElement('mutation');
    if (this.elseifCount_) {
      container.setAttribute('elseif', this.elseifCount_);
    }
    if (this.elseCount_) {
      container.setAttribute('else', 1);
    }
    return container;
  },
  /**
   * Parse XML to restore the else-if and else inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.domToMutation_++;
    this.print_text();
    this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10);
    this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10);
    for (var i = 1; i <= this.elseifCount_; i++) {
      this.appendValueInput('IF' + i)
          .setCheck([Boolean,Number])
          .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
      this.appendStatementInput('DO' + i)
          .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
    }
    if (this.elseCount_) {
      this.appendStatementInput('ELSE')
          .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
    }
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    this.decompose_++;
    this.print_text();
    var containerBlock = Blockly.Block.obtain(workspace, 'controls_if_if');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 1; i <= this.elseifCount_; i++) {
      var elseifBlock = Blockly.Block.obtain(workspace, 'controls_if_elseif');
      elseifBlock.initSvg();
      connection.connect(elseifBlock.previousConnection);
      connection = elseifBlock.nextConnection;
    }
    if (this.elseCount_) {
      var elseBlock = Blockly.Block.obtain(workspace, 'controls_if_else');
      elseBlock.initSvg();
      connection.connect(elseBlock.previousConnection);
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    this.compose_++;
    this.print_text();
    // Disconnect the else input blocks and remove the inputs.
    if (this.elseCount_) {
      this.removeInput('ELSE');
    }
    this.elseCount_ = 0;
    // Disconnect all the elseif input blocks and remove the inputs.
    for (var i = this.elseifCount_; i > 0; i--) {
      this.removeInput('IF' + i);
      this.removeInput('DO' + i);
    }
    this.elseifCount_ = 0;
    // Rebuild the block's optional inputs.
    var clauseBlock = containerBlock.getInputTargetBlock('STACK');
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_if_elseif':
          this.elseifCount_++;
          var ifInput = this.appendValueInput('IF' + this.elseifCount_)
              .setCheck([Boolean,Number])
              .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
          var doInput = this.appendStatementInput('DO' + this.elseifCount_);
          doInput.appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
          // Reconnect any child blocks.
          if (clauseBlock.valueConnection_) {
            ifInput.connection.connect(clauseBlock.valueConnection_);
          }
          if (clauseBlock.statementConnection_) {
            doInput.connection.connect(clauseBlock.statementConnection_);
          }
          break;
        case 'controls_if_else':
          this.elseCount_++;
          var elseInput = this.appendStatementInput('ELSE');
          elseInput.appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
          // Reconnect any child blocks.
          if (clauseBlock.statementConnection_) {
            elseInput.connection.connect(clauseBlock.statementConnection_);
          }
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var clauseBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 1;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_if_elseif':
          var inputIf = this.getInput('IF' + i);
          var inputDo = this.getInput('DO' + i);
          clauseBlock.valueConnection_ =
              inputIf && inputIf.connection.targetConnection;
          clauseBlock.statementConnection_ =
              inputDo && inputDo.connection.targetConnection;
          i++;
          break;
        case 'controls_if_else':
          var inputDo = this.getInput('ELSE');
          clauseBlock.statementConnection_ =
              inputDo && inputDo.connection.targetConnection;
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
  },
  print_text: function(containerBlock) {
    this.setWarningText('this.mutationToDom = '+this.mutationToDom_+
    '\nthis.domToMutation = '+this.domToMutation_+
    '\nthis.decompose = '+this.decompose_+
    '\nthis.compose = '+this.compose_);
  }
};

var exampleAngleJson = {
  "message0": "angle: %1",
  "args0": [{"type": "field_angle",
      "name": "FIELDNAME",
      "angle": "90"}
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230
};
Blockly.Blocks['example_angle'] = {
  init: function() {
    this.jsonInit(exampleAngleJson);
    var thisBlock = this;
    // var field_angle = parseInt(thisBlock.getFieldValue('FIELDNAME'));
    // if (field_angle) {
    //   this.setTooltip('Please input angle less than 180.'+field_angle);
    //   // return 'Please input angle less than 180.';
    // }
    this.setTooltip(function() {
      return 'type:'+thisBlock.getParent().type+','+thisBlock.getSurroundParent().type;
      var field_angle = parseInt(thisBlock.getFieldValue('FIELDNAME'));
      if (field_angle > 180) {
        // thisBlock.setWarningText('Please input angle less than 180.'+field_angle);
        return 'Please input angle less than 180.'+thisBlock.getParent();
      } else {
        // thisBlock.setWarningText('field_angle = '+field_angle);
        return thisBlock.getParent().type+','+thisBlock.getSurroundParent().type;
      }
    });
  },
  onchange: function(e) {
    var field_angle = parseInt(this.getFieldValue('FIELDNAME'));
    if (field_angle>180) {
      this.setWarningText('Please input angle less than 180.');
    } else {
      this.setWarningText(null);
    }
  }
};
// Blockly.Blocks['example_angle'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField('angle:')
//         .appendField(new Blockly.FieldAngle(90), 'FIELDNAME');
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);    
//     // Example validation upon block change:
//     this.setOnChange(function(changeEvent) {
//       // var field_angle = parseInt(thisBlock.getFieldValue('FIELDNAME'));
//       if (1) {
//         this.setWarningText('Please input angle less than 180.');
//       } else {
//         this.setWarningText(null);
//       }
//     });

//     // this.setTooltip(function() {
//     //   var field_angle = parseInt(thisBlock.getFieldValue('FIELDNAME'));
//     //   if (field_angle > 180) {
//     //     return 'Please input angle less than 180.';
//     //   } else {
//     //     return null;
//     //   }
//     // });
//   }
// };

Blockly.Blocks['example_colour'] = {
  init: function() {
    // Blockly.FieldColour.COLOURS = ['#f00','#0f0','#00f','#000','#888','#fff'];
    // Blockly.FieldColour.COLUMNS = 3;var colour = new Blockly.FieldColour('#ff0000');
    var colour = new Blockly.FieldColour('#ff0000');
    colour.setColours(['#f00','#0f0','#00f','#000','#888','#fff']).setColumns(3);
    var colour2 = new Blockly.FieldColour('#ff0000');
    colour2.setColours(['#f00','#0f0','#00f','#000','#888','#fff']).setColumns(3);
    // input.appendField(colour, 'COLOUR');
    this.appendDummyInput()
        .appendField('colour picker:')
        .appendField(colour, 'FIELDNAME1')
        .appendField(colour2, 'FIELDNAME2');
  }
};

Blockly.Blocks['example_change_paramter'] = {
  init: function() {
    var DETECTED_MESSAGE = [[Blockly.LKL_VS2_STATE_VALUE_X,"kXValue"], 
                            [Blockly.LKL_VS2_STATE_VALUE_Y,"kYValue"],
                            [Blockly.LKL_VS2_STATE_VALUE_WIDTH,"kWidthValue"], 
                            [Blockly.LKL_VS2_STATE_VALUE_HEIGHT,"kHeightValue"],
                            // [Blockly.LKL_VS2_STATE_VALUE_R_CHANNEL,"kChannelRValue"],
                            // [Blockly.LKL_VS2_STATE_VALUE_G_CHANNEL,"kChannelGValue"],
                            // [Blockly.LKL_VS2_STATE_VALUE_B_CHANNEL,"kChannelBValue"],
                            [Blockly.LKL_VS2_STATE_VALUE_CARD_TYPE,"kLabel"]
                            ];
    this.detected_message_ = new Blockly.FieldDropdown(DETECTED_MESSAGE);
    this.setColour(Blockly.Blocks.VisionSensor.HUE_RunMode);
    this.appendDummyInput()
        .appendField(Blockly.LKL_VS2_GET_DETECTED_MESSAGE)
        .appendField(new Blockly.FieldDropdown(lVsMu), "MU_OBJ")
        .appendField(new Blockly.FieldDropdown(VS_VISION_TYPE), "VISION_TYPE");
    this.appendDummyInput('DETECTED_MESSAGE_TYPE')
        .appendField(this.detected_message_, "DETECTED_MESSAGE");
    this.appendDummyInput()
        .appendField(Blockly.LKL_VS2_VALUE);
    this.setOutput(true, Number);
    this.vision_type_ = this.getFieldValue("VISION_TYPE");
  },
  onchange: function(e) {
    var DETECTED_MESSAGE = [[Blockly.LKL_VS2_STATE_VALUE_X,"kXValue"], 
                            [Blockly.LKL_VS2_STATE_VALUE_Y,"kYValue"],
                            [Blockly.LKL_VS2_STATE_VALUE_WIDTH,"kWidthValue"], 
                            [Blockly.LKL_VS2_STATE_VALUE_HEIGHT,"kHeightValue"],
                            // [Blockly.LKL_VS2_STATE_VALUE_R_CHANNEL,"kChannelRValue"],
                            // [Blockly.LKL_VS2_STATE_VALUE_G_CHANNEL,"kChannelGValue"],
                            // [Blockly.LKL_VS2_STATE_VALUE_B_CHANNEL,"kChannelBValue"],
                            [Blockly.LKL_VS2_STATE_VALUE_CARD_TYPE,"kLabel"]
                            ];
    var vision_type = this.getFieldValue('VISION_TYPE');
    this.setWarningText('vision_type:'+vision_type);
    if (this.vision_type_ != vision_type) {
      this.vision_type_ = vision_type;
      // var detected_message_field = this.getField('DETECTED_MESSAGE');
      if (vision_type == 'VISION_BALL_DETECT') {
        this.detected_message_ = new Blockly.FieldDropdown(DETECTED_MESSAGE.concat([["test","test"]]));
        // this.removeInput('DETECTED_MESSAGE_TYPE');
        // this.appendDummyInput('DETECTED_MESSAGE_TYPE')
        //     .appendField(this.detected_message_, "DETECTED_MESSAGE");
        // field = new Blockly.FieldLabel(this.arguments_[i]);
        var input = this.appendValueInput('DETECTED_MESSAGE_TYPE')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(this.detected_message_, 'DETECTED_MESSAGE');
        input.init();
      } else {
        this.detected_message_ = new Blockly.FieldDropdown(DETECTED_MESSAGE.concat([["test2","tes222t"]]));
        // this.removeInput('DETECTED_MESSAGE_TYPE');
        // this.appendDummyInput('DETECTED_MESSAGE_TYPE')
        //     .appendField(this.detected_message_, "DETECTED_MESSAGE");
        // this.replaceFieldValue(new Blockly.FieldDropdown(DETECTED_MESSAGE.concat([["test22","test22"]])), "DETECTED_MESSAGE");
        var input = this.appendValueInput('DETECTED_MESSAGE_TYPE')
            .setAlign(Blockly.ALIGN_RIGHT)
            .removeField('DETECTED_MESSAGE')
            .appendField(this.detected_message_, 'DETECTED_MESSAGE');
        input.init();
      }
    }
  }
};