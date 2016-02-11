Template.toolbar.helpers({
    getColors: function () {
        return colors.find({});
    }
});

Template.toolbar.events({
    "click button.clear": function (event) {
        clearCanvas();
    },
    "click button.red": function () {
        setColor("red");
    },
    "click button.black": function () {
        setColor("black");
    },
    "click button.white": function () {
        setColor("white");
    },
    "click button.blue": function () {
        setColor("blue");
    },
    "click button.green": function () {
        setColor("green");
    },
    "click button.thicker": function () {
        incSize();
    },
    "click button.thinner": function () {
        decSize();
    },
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
