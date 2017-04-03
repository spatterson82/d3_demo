window.onload = function() {
    var w = 900, h = 500;

    // d3 chaining
    var container = d3.select('body')
        .append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr('class', 'container')
        .style('background-color', 'rgba(0,0,0,0.2)');

    var innerRect = container.append('rect')
        .datum(400)
        .attr('width', function(d) {
            return d * 2;
        })
        .attr('height', function(d) {
            return d;
        })
        .attr('class', 'innerRect')
        .attr('x', 50)
        .attr('y', 50)
        .style('fill', '#FFFFFF');

    var cityArray = [
        {
            city: 'Lafayette',
            pop: 200000
        }, {
            city: 'Atlanta',
            pop: 1000000
        },{
            city: 'Tallahassee',
            pop: 400000
        },{
            city: 'New Orleans',
            pop: 2000000
        }];

    // scale variables
    var minPop = d3.min(cityArray, function(d) {
        return d.pop;
    });
    var maxPop = d3.max(cityArray, function(d) {
        return d.pop;
    });
    var x = d3.scaleLinear()
        .range([90, 750])
        .domain([0, 3]);
    var y = d3.scaleLinear()
        .range([450, 50])
        .domain([0, 2600000]);
    var color = d3.scaleLinear()
        .range(['#FDBE85', '#D94701'])
        .domain([minPop, maxPop]);


    // circle containers
    var circles = container.selectAll('.circles')
        .data(cityArray)
        .enter()
        .append('circle')
        .attr('class', 'circles')
        .attr('id', function(d) {
            return d.city;
        })
        .attr('r', function(d) {
            var area = d.pop * 0.01;
            return Math.sqrt(area/Math.PI);
        })
        .attr('cx', function(d, i) {
            return x(i);
        })
        .attr('cy', function(d) {
            return y(d.pop);
        })
        .style('fill', function(d, i) {
            return color(d.pop);
        })
        .style('stroke', '#000');

    var yAxis = d3.axisLeft(y)
        .scale(y)

    var axis = container.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(50, 0)')
        .call(yAxis);

    var title = container.append('text')
        .attr('class', 'title')
        .attr('text-anchor', 'middle')
        .attr('x', 450)
        .attr('y', 30)
        .text('City Populations');

    var labels = container.selectAll('.labels')
        .data(cityArray)
        .enter()
        .append('text')
        .attr('class', 'labels')
        .attr('text-anchor', 'left')
        .attr('y', function(d) {
            return y(d.pop);
        });

    var nameLine = labels.append('tspan')
        .attr('class', 'nameLine')
        .attr('x', function(d, i) {
            if (d.city == 'New Orleans') {
                return x(i) - Math.sqrt(d.pop * .055/Math.PI) + 5;
            }
            return x(i) + Math.sqrt(d.pop * 0.01/Math.PI) + 5;
        })
        .text(function(d) {
            return d.city;
        });

    var format = d3.format(',');

    var popLine = labels.append('tspan')
        .attr('class', 'popLine')
        .attr('x', function(d, i) {
            if (d.city == 'New Orleans') {
                return x(i) - Math.sqrt(d.pop * .055/Math.PI) + 5;
            }
            return x(i) + Math.sqrt(d.pop * 0.01/Math.PI) + 5;
        })
        .attr('dy', 15)
        .text(function(d) {
            return 'Pop. ' + format(d.pop);
        });
};


