'use strict';

/* global assertEquals, assertNotNull, assertNull */
/* exported test_booleanToggleField, test_booleanInputGetsDefaultShadowDom,
  test_booleanShadowMatchesEmptyInputWidth,
  test_insertionMarkerDoesNotMaterializeBooleanShadow */

function booleanToggleTest_defineBooleanBlock() {
  Blockly.Blocks['operator_boolean'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldBooleanToggle('FALSE'), 'VALUE');
      this.setOutput(true, 'Boolean');
      this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
    }
  };
}

function test_booleanToggleField() {
  var field = new Blockly.FieldBooleanToggle('FALSE');
  assertEquals(32, field.getSize().width);
  assertEquals(24, field.getSize().height);
  assertEquals('FALSE', field.getValue());
  field.showEditor_();
  assertEquals('TRUE', field.getValue());
  field.showEditor_();
  assertEquals('FALSE', field.getValue());
}

function test_booleanInputGetsDefaultShadowDom() {
  var workspace = new Blockly.Workspace();
  var block = new Blockly.Block(workspace);
  var input = block.appendValueInput('CONDITION').setCheck('Boolean');
  var shadow = input.connection.getShadowDom();
  assertNotNull(shadow);
  assertEquals('operator_boolean', shadow.getAttribute('type'));
  assertEquals('FALSE', shadow.firstChild.textContent);
  workspace.dispose();
}

function test_booleanShadowMatchesEmptyInputWidth() {
  booleanToggleTest_defineBooleanBlock();
  Blockly.Blocks['boolean_parent_for_size_test'] = {
    init: function() {
      this.appendValueInput('CONDITION').setCheck('Boolean');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    }
  };
  var workspace = Blockly.inject('blocklyDiv', {});
  var block = workspace.newBlock('boolean_parent_for_size_test');
  block.initSvg();
  block.render(false);
  var shadow = block.getInputTargetBlock('CONDITION');
  assertNotNull(shadow);
  assertEquals(Blockly.BlockSvg.INPUT_SHAPE_HEXAGONAL_WIDTH,
      shadow.getHeightWidth().width);
  workspace.dispose();
  delete Blockly.Blocks['operator_boolean'];
  delete Blockly.Blocks['boolean_parent_for_size_test'];
}

function test_insertionMarkerDoesNotMaterializeBooleanShadow() {
  booleanToggleTest_defineBooleanBlock();
  Blockly.Blocks['boolean_parent_for_marker_test'] = {
    init: function() {
      this.appendValueInput('CONDITION').setCheck('Boolean');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    }
  };
  var workspace = Blockly.inject('blocklyDiv', {});
  var block = workspace.newBlock('boolean_parent_for_marker_test');
  block.initSvg();
  block.render(false);
  var manager = new Blockly.InsertionMarkerManager(block);
  var insertionMarker = workspace.getAllBlocks().filter(function(candidate) {
    return candidate.isInsertionMarker();
  })[0];
  assertNotNull(insertionMarker);
  assertNull(insertionMarker.getInputTargetBlock('CONDITION'));
  manager.dispose();
  workspace.dispose();
  delete Blockly.Blocks['operator_boolean'];
  delete Blockly.Blocks['boolean_parent_for_marker_test'];
}
