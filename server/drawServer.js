//collections
Meteor.publish("colors", function () {
    return colors.find();
});

Meteor.publish("elements", function () {
    return elements.find();
});

//methods
Meteor.methods({
    'insert': function (xPosi, yPosi, size, color) {
        elements.insert({
            x: xPosi,
            y: yPosi,
            s: size,
            c: color
        });
    },
    'clear': function () {
        elements.remove({});
    }
});

//data initialize
if (!colors.findOne()) {
    console.log("adding colors");

    colors.insert({
        hue: 0,
        sat: 100,
        light: 0,
        alpha: 1
    });

    colors.insert({
        hue: 0,
        sat: 100,
        light: 100,
        alpha: 1
    });

    var totalColors = 16;
    var hueStep = 360 / totalColors;
    for (var i = 0; i < totalColors; i++) {
        colors.insert({
            hue: i * hueStep,
            sat: 100,
            light: 50,
            alpha: 1
        });
    }
}
