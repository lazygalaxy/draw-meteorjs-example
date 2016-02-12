Template.toolbar.helpers({
    getColors: function () {
        return colors.find({});
    },
    getHSLAColor: function () {
        return "yellow"
    }
});

Template.toolbar.events({
    "click button.clear": function (event) {
        clearCanvas();
    },
    "click button.custom": function (event) {
        setColor(event.target.value);
    },
    "click button.thicker": function () {
        incSize();
    },
    "click button.thinner": function () {
        decSize();
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
