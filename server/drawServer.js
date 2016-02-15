//collections
Meteor.publish("colors", function () {
    return colors.find();
});

Meteor.publish("configs", function () {
    return configs.find();
});

Meteor.publish("elements", function () {
    return elements.find();
});

//methods
Meteor.methods({
    'clear': function () {
        elements.remove({});
    }
});

//data initialize
if (!configs.findOne()) {
    console.log("adding configs");

    configs.insert({
        tag: "color",
        value: "blue"
    });
    configs.insert({
        tag: "size",
        value: 20
    });
}

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
