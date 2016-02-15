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
                svg = d3.select('#canvas').append('svg')
                    .attr('width', 2000)
                    .attr('height', 300);
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
                    // to draw a circle -
                    svg.selectAll('circle').data(data, function (d) {
                            return d._id;
                        })
                        .enter().append('circle')
                        .attr('r', function (d) {
                            return d.s;
                        })
                        .attr('cx', function (d) {
                            return d.x;
                        })
                        .attr('cy', function (d) {
                            return d.y;
                        }).attr('fill', function (d) {
                            return d.c;
                        });

                    //to draw a line
                    //                    svg.selectAll('line').data(data, function (d) {
                    //                            return d._id;
                    //                        })
                    //                        .enter().append('line')
                    //                        .attr('x1', function (d) {
                    //                            return d.x;
                    //                        })
                    //                        .attr('y1', function (d) {
                    //                            return d.y;
                    //                        })
                    //                        .attr('x2', function (d) {
                    //                            return d.x1;
                    //                        })
                    //                        .attr('y2', function (d) {
                    //                            return d.y1;
                    //                        })
                    //                        .attr("stroke-width", function (d) {
                    //                            return d.w;
                    //                        })
                    //                        .attr("stroke", function (d) {
                    //                            return d.c;
                    //                        })
                    //                        .attr("stroke-linejoin", "round");


                } // end of the if(svg) statement
            }; // end of the canvas.draw function
        } //end of the canvas function

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
