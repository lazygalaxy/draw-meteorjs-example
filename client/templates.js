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

Template.toolbar.events({
    "click button.clear": function (event) {
        clearCanvas();
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
