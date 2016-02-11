Meteor.startup(function () {
    if (!colors.findOne()) {
        console.log("adding colors");

        colors.insert({
            text: "Blue",
            class: "blue"
        });

        colors.insert({
            text: "Red",
            class: "red"
        });
    }
});

Meteor.methods({
    'clear': function () {
        elements.remove({});
    }
});
