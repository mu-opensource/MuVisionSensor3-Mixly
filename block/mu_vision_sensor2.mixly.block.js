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

Blockly.Blocks.VisionSensor.HUE = "#EF5411";            //30;
Blockly.Blocks.VisionSensor.HUE_SetupMode = "#EF5411";  //30;
Blockly.Blocks.VisionSensor.HUE_RunMode = "#EAA20A"; //60;

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
  },
  onchange: function(e) {
    var surround_parent = this.getSurroundParent();
    if (surround_parent && surround_parent.type == 'Vs2Setup') {
      this.setWarningText(null);
    } else {
      this.setWarningText(Blockly.LKL_VS2_WARNING_SETUP_ONLY);
    }
  },
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
