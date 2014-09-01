define(function(require) {

    var d3 = require('d3');

    function TimelineView() {
    };

    TimelineView.prototype.show = function(container) {
        var margin = {top: 20, right: 60, bottom: 30, left: 20},
            width = container.getBoundingClientRect().width - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var parseDate = d3.time.format("%Y-%m-%d").parse,
            formatDate = d3.time.format("%Y");

        var x = d3.time.scale()
            .range([0, width]);

        this.xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickSize(-height, 0)
            .tickPadding(6);

        var zoom = d3.behavior.zoom()
            .on("zoom", this.draw.bind(this));

        this.svg = d3.select(container).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .call(zoom);

        this.svg.append("rect")
            .attr("width", width)
            .attr("height", height);

        this.svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(this.xAxis);

        x.domain([new Date(2014, 0, 0), new Date(2015, 0, 0)]);
        zoom.x(x);

        this.draw();
    };

    TimelineView.prototype.draw = function(container) {
        this.svg.select(".x.axis").call(this.xAxis);
    };

    return TimelineView;
});
