Template.wall.events({
    "click button.clear": function (event) {
        clearCanvas();
    },

    //choose a color
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
        incStrokeThick();
    },
    "click button.thinner": function () {
        decStrokeThick();
    },
});

Template.canvas.events({
    'click': function (event) {
        markPoint();
    },
    'mousedown': function (event) {
        Session.set('draw', true);
    },
    'mouseup': function (event) {
        Session.set('draw', false);
    },
    'mousemove': function (event) {
        if (Session.get('draw')) {
            markPoint();
        }
    }
});
