Meteor.startup(function () {
    if (!config.findOne()) {
        config.insert({
            tag: "color",
            value: "blue"
        });
        config.insert({
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
});

Meteor.methods({
    'clear': function () {
        elements.remove({});
    }
});
