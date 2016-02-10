Template.wall.events({
    "click button.clear": function (event) {
        clearCanvas();
    },

    //choose a color. Initialise the last vals, otherwise a stray line will appear.
    "click button.red": function () {
        setLastXandY(0, 0);
        setColor("red");
    },
    "click button.black": function () {
        setLastXandY(0, 0);
        setColor("black");
    },
    "click button.white": function () {
        setLastXandY(0, 0);
        setColor("white");
    },
    "click button.blue": function () {
        setLastXandY(0, 0);
        setColor("blue");
    },
    "click button.green": function () {
        setLastXandY(0, 0);
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
        setLastXandY(0, 0);
    },
    'mousemove': function (event) {
        if (Session.get('draw')) {
            markPoint();
        }
    }
});
