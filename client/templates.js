Template.colorbar.helpers({
    getColors: function () {
        return colors.find({});
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

Template.canvas.events({
    'click': function (event) {
        insertElement();
    },
    'mousedown': function (event) {
        Session.set('draw', true);
    },
    'mouseup': function (event) {
        Session.set('draw', false);
    },
    'mousemove': function (event) {
        if (Session.get('draw')) {
            insertElement();
        }
    }
});
