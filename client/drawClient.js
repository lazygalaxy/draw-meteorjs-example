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

                    // Remember to format the data properly in markPoints

                    // to draw a circle -
                    svg.selectAll('circle').data(data, function (d) {
                            return d._id;
                        })
                        .enter().append('circle')
                        .attr('r', strokeThick)
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
        var data = points.find({}).fetch();

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
var strokeThick = 5;
incStrokeThick = function () {
    strokeThick += 1;
}

decStrokeThick = function () {
    strokeThick -= 1;
    if (strokeThick == 0) {
        strokeThick = 1;
    }
}

// strokeColor
var strokeColor = "black";
setColor = function (color) {
    strokeColor = color;
}

//functions
markPoint = function () {

    var offset = $('#canvas').offset();

    points.insert({
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
        // Or we could just set the line thickness using buttons and variable
        w: strokeThick,
        // We can also use strokeColor, defined by a selection
        c: strokeColor,


    }); // end of points.insert()
}
