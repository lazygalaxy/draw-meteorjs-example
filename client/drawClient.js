// canvas
var canvas;
Meteor.startup(function () {
    canvas = new function () {
            var self = this;
            var svg;

            var createSvg = function () {
                svg = d3.select('#canvas').append('svg')
                    .attr('width', 800)
                    .attr('height', 600);
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

// strokeThick
var size = 5;
incSize = function () {
    size += 1;
}

decSize = function () {
    size -= 1;
    if (size == 0) {
        size = 1;
    }
}

// strokeColor
var color = "rgb(100%, 100%, 0%";
setColor = function (newColor) {
    color = newColor;
}

insertElement = function () {

    var offset = $('#canvas').offset();

    elements.insert({
        //this draws a point exactly where you click the mouse
        // x: (event.pageX - offset.left),
        // y: (event.pageY - offset.top)});


        //We can do more interesting stuff
        //We need to input data in the right format
        //Then we can send this to d3 for drawing


        //1) Algorithmic mouse follower
        // x: (event.pageX - offset.left)+(Math.cos((event.pageX/10  ))*30),
        // y: (event.pageY - offset.top)+(Math.sin((event.pageY)/10)*30)});

        //2) draw a line - requires you to change the code in drawing.js
        x: (event.pageX - offset.left),
        y: (event.pageY - offset.top),
        s: size,
        c: color
    }); // end of elements.insert()
}
