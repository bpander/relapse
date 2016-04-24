define(function (require) {
    'use strict';

    var Control = require('./Control');


    function OutputControl (element) {
        Control.call(this, element);

    }
    OutputControl.prototype = Object.create(Control.prototype);
    OutputControl.prototype.constructor = OutputControl;


    OutputControl.merge = function (target, props) {
        var prop;
        var oldVal;
        var newVal;
        for (prop in props) {
            if (props.hasOwnProperty(prop)) {
                newVal = props[prop];
                if (typeof newVal === 'object') {
                    OutputControl.merge(target[prop], newVal);
                    continue;
                }
                oldVal = target[prop];
                if (oldVal !== newVal) {
                    target[prop] = props[prop];
                }
            }
        }
    };


    OutputControl.prototype.acceptState = function (state, loop, thisArg) {
        var props = this.expression.call(thisArg, state, loop);
        OutputControl.merge(this.element, props);
        this.isMounted = true;
    };


    return OutputControl;
});
