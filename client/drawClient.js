//collections
Meteor.subscribe("colors");
Meteor.subscribe("elements");

// canvas
var canvas;
Meteor.startup(function () {
    canvas = new function () {
        var self = this;
        var svg;

        var createSvg = function () {
            svg = d3.select('#canvas')
                .classed("svg-container", true) //container class to make it responsive
                .append("svg")
                //responsive SVG needs these 2 attributes and no width and height attr
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "0 0 600 400")
                //class to make it responsive
                .classed("svg-content-responsive", true);
        };
        createSvg();

        self.clear = function () {
            d3.select('svg').remove();
            createSvg();
        };

        self.draw = function (data) {
            if (data.length < 1) {
                self.clear();
                return;
            }
            if (svg) {
                //                    // to draw a circle -
                //                    svg.selectAll('circle').data(data, function (d) {
                //                            return d._id;
                //                        })
                //                        .enter().append('circle')
                //                        .attr('r', function (d) {
                //                            return d.s;
                //                        })
                //                        .attr('cx', function (d) {
                //                            return d.x;
                //                        })
                //                        .attr('cy', function (d) {
                //                            return d.y;
                //                        }).attr('fill', function (d) {
                //                            return d.c;
                //                        });


                // to draw a square -
                svg.selectAll('circle').data(data, function (d) {
                        return d._id;
                    })
                    .enter().append('rect')
                    .attr('x', function (d) {
                        return d.x;
                    }).attr('y', function (d) {
                        return d.y;
                    }).attr('fill', function (d) {
                        return d.c;
                    }).attr('width', function (d) {
                        return d.x + d.s;
                    }).attr('height', function (d) {
                        return d.y + d.s;
                    });
            }
        };
    }

    Deps.autorun(function () {
        var data = elements.find({}).fetch();

        if (canvas) {
            canvas.draw(data);
        }
    });
});

clearCanvas = function () {
    Meteor.call('clear', function () {
        canvas.clear();
    });
}

insertElement = function (draw) {
    if (draw) {
        var offset = $('#canvas').offset();
        Meteor.call('insert', event.pageX - offset.left, event.pageY - offset.top, getSize(), color, function () {});
    }
}

// size
var size = 20;
setSize = function (newSize) {
    size = newSize;
}
getSize = function () {
    return size;
}

// color
var color = "rgb(100%, 0%, 0%";
setColor = function (newColor) {
    color = newColor;
}
