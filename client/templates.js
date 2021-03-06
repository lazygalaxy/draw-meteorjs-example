Template.colorbar.helpers({
    getColors: function () {
        return colors.find();
    }
});

Template.color.helpers({
    getHSLAColor: function (color) {
        return "hsla(" + color.hue + ", " + color.sat + "%, " + color.light + "%, " + color.alpha + ")";
    }
});

Template.toolbar.helpers({
    getShape: function () {
        return getShape();
    },
    getSize: function () {
        return getSize();
    }
});

Template.toolbar.events({
    "click button.clear": function (event) {
        clearCanvas();
    },
    "click .shape-dropdown li a": function (event) {
        setShape(event.target.text);
    },
    "click .size-dropdown li a": function (event) {
        setSize(event.target.text);
    },
    "click button.save": function (event) {
        saveCanvas();
    }
});

Template.colorbar.events({
    "click button.choose": function (event) {
        setColor(event.target.value);
    }
});

var draw = false;
Template.canvas.events({
    'click': function (event) {
        insertElement(true);
    },
    'mousedown': function (event) {
        draw = true;
    },
    'mouseup': function (event) {
        draw = false;
    },
    'mousemove': function (event) {
        insertElement(draw);
    }
});
