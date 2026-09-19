'use strict';

goog.provide('Blockly.FieldBooleanToggle');

goog.require('Blockly.Field');
goog.require('Blockly.Events.BlockChange');
goog.require('goog.math.Size');

/**
 * Clickable TRUE/FALSE field used by the boolean shadow block.
 * @param {string|boolean} state Initial state.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldBooleanToggle = function(state) {
  Blockly.FieldBooleanToggle.superClass_.constructor.call(this, '');
  this.size_ = new goog.math.Size(32, 24);
  this.setValue(state);
  this.addArgType('boolean');
};
goog.inherits(Blockly.FieldBooleanToggle, Blockly.Field);

Blockly.FieldBooleanToggle.fromJson = function(options) {
  return new Blockly.FieldBooleanToggle(options['value'] || 'FALSE');
};

Blockly.FieldBooleanToggle.prototype.CURSOR = 'pointer';

Blockly.FieldBooleanToggle.prototype.render_ = function() {
  this.size_.width = 32;
  this.size_.height = 24;
};

Blockly.FieldBooleanToggle.prototype.init = function() {
  if (this.fieldGroup_) return;
  Blockly.FieldBooleanToggle.superClass_.init.call(this);
  this.textElement_.style.display = 'none';
  this.iconElement_ = Blockly.utils.createSvgElement('path', {
    'fill': 'none',
    'stroke': '#ffffff',
    'stroke-width': 4,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'pointer-events': 'none'
  }, this.fieldGroup_);
  this.updateIcon_();
};

Blockly.FieldBooleanToggle.prototype.getValue = function() {
  return this.state_ ? 'TRUE' : 'FALSE';
};

Blockly.FieldBooleanToggle.prototype.setValue = function(newValue) {
  var newState = typeof newValue == 'string' ?
      newValue.toUpperCase() == 'TRUE' : !!newValue;
  if (this.state_ === newState) return;
  var oldValue = this.getValue();
  if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
    Blockly.Events.fire(new Blockly.Events.BlockChange(
        this.sourceBlock_, 'field', this.name, oldValue,
        newState ? 'TRUE' : 'FALSE'));
  }
  this.state_ = newState;
  this.updateIcon_();
  if (this.sourceBlock_ && this.sourceBlock_.rendered) {
    this.sourceBlock_.updateColour();
  }
};

Blockly.FieldBooleanToggle.prototype.updateIcon_ = function() {
  if (!this.iconElement_) return;
  this.iconElement_.setAttribute('d', this.state_ ?
      'M 8 12 L 13 17 L 24 6' :
      'M 10 6 L 22 18 M 22 6 L 10 18');
};

Blockly.FieldBooleanToggle.prototype.showEditor_ = function() {
  this.setValue(!this.state_);
};

Blockly.Field.register('field_boolean_toggle', Blockly.FieldBooleanToggle);
