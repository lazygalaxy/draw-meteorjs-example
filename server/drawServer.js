Meteor.startup(function () {
    if (!colors.findOne()) {
        console.log("adding colors");

        colors.insert({
            hue: 0,
            sat: 100,
            light: 50,
            alpha: 1
        });

        colors.insert({
            hue: 90,
            sat: 100,
            light: 50,
            alpha: 1
        });

        colors.insert({
            hue: 180,
            sat: 100,
            light: 50,
            alpha: 1
        });

        colors.insert({
            hue: 270,
            sat: 100,
            light: 50,
            alpha: 1
        });
    }
});

Meteor.methods({
    'clear': function () {
        elements.remove({});
    }
});
