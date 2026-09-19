'use strict';

goog.provide('Blockly.Blocks.boolean');

goog.require('Blockly.Blocks');
goog.require('Blockly.constants');

/** A compact boolean literal used as the default shadow for boolean inputs. */
Blockly.Blocks['operator_boolean'] = {
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [{
        "type": "field_boolean_toggle",
        "name": "VALUE",
        "value": "FALSE"
      }],
      "output": "Boolean",
      "outputShape": Blockly.OUTPUT_SHAPE_HEXAGONAL,
      "colour": "#59C059",
      "colourSecondary": "#389438",
      "colourTertiary": "#2E7D32"
    });
  },

  getShadowColour: function() {
    var value = this.getFieldValue('VALUE');
    if (value === 'TRUE') return '#20D94B';
    return this.parentBlock_ ? this.parentBlock_.getColourTertiary() : '#666666';
  }
};
