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
                .attr("viewBox", "0 0 600 300")
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
                    .attr('width', d.s)
                    .attr('height', d.s);
            } else if (d.sh == 'circle') {
                svg.append('circle')
                    .attr('r', d.s / 2)
                    .attr('cx', d.x)
                    .attr('cy', d.y)
                    .attr('fill', d.c);
            } else if (d.sh == 'line') {
                svg.append('line')
                    .attr('x1', d.x)
                    .attr('y1', d.y)
                    .attr('x2', d.x2)
                    .attr('y2', d.y2)
                    .attr('stroke-width', d.s)
                    .attr('stroke', d.c);
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

var xPosi2 = -1;
var yPosi2 = -1;
insertElement = function (draw) {
    if (draw) {
        var offset = $('#canvas').offset();
        var canvas_width = $('#canvas').width();
        var canvas_height = $('#canvas').height();

        var xRatio = canvas_width / 600.0;
        var yRatio = canvas_height / 300.0;

        var xPosi = (event.pageX - offset.left - 20) / xRatio;
        var yPosi = (event.pageY - offset.top) / yRatio;

        if (getShape() != 'line' || xPosi2 != -1) {
            Meteor.call('insert', getShape(), xPosi, yPosi, getSize(), color, xPosi2, yPosi2, function () {});
        }
        xPosi2 = xPosi;
        yPosi2 = yPosi;
    }
}

// shape
Session.set('shape', 'circle');
setShape = function (newShape) {
    Session.set('shape', newShape);
    xPosi2 = -1;
    yPosi2 = -1;
}
getShape = function () {
    return Session.get('shape');
}

// size
Session.set('size', 20);
setSize = function (newSize) {
    Session.set('size', newSize);
}
getSize = function () {
    return Session.get('size');
}

// color
var color = "rgb(100%, 0%, 0%";
setColor = function (newColor) {
    color = newColor;
}
