//collections
Meteor.subscribe("colors");
Meteor.subscribe("elements");

// canvas
var canvas;
var lastDate = new Date(2000, 0, 0, 0, 0, 0, 0);
Meteor.startup(function () {
    canvas = new function () {

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

        this.clear = function () {
            d3.select('svg').remove();
            createSvg();
            console.log("cleared!");
        };

        this.drawElement = function (d) {
            if (d.sh == 'square') {
                svg.append('rect')
                    .attr('x', d.x)
                    .attr('y', d.y)
                    .attr('fill', d.c)
                    .attr('width', d.x + d.s)
                    .attr('height', d.y + d.s);
            } else if (d.sh == 'circle') {
                svg.append('circle')
                    .attr('r', d.s)
                    .attr('cx', d.x)
                    .attr('cy', d.y)
                    .attr('fill', d.c);
            }

            lastDate = d.createdAt;
        };

        this.drawAll = function (data) {
            //console.log(data);
            if (data.length < 1) {
                canvas.clear();
                return;
            }

            if (svg) {
                data.forEach(function (d) {
                    canvas.drawElement(d);
                });
            }
        };
    }

    Deps.autorun(function () {
        //console.log('drawing ' + lastDate);
        var data = elements.find({
            "ignore": {
                "$ne": true,

            },
            "createdAt": {
                "$gt": lastDate
            }
        }).fetch();
        canvas.drawAll(data);
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
        Meteor.call('insert', shape, event.pageX - offset.left, event.pageY - offset.top, getSize(), color, function () {});
    }
}

var shape = 'circle';
setShape = function (newShape) {
    shape = newShape;
}
getShape = function () {
    return shape;
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
