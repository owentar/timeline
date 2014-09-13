define(function(require) {

    var d3 = require('d3');

    var dateFn = function(d) { return d3.time.format("%d/%m/%Y").parse(d.date); };

    function TimelineView(data, container) {
        this.data = data;
        this.container = container;
        this.margin = {top: 20, right: 60, bottom: 30, left: 20};
        this.width = container.getBoundingClientRect().width - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
    };

    TimelineView.prototype.show = function() {
        this.x = d3.time.scale()
            .range([0, this.width])
            .domain(d3.extent(this.data, dateFn));

        this.xAxis = d3.svg.axis()
            .scale(this.x)
            .orient("bottom")
            .tickSize(-this.height, 0)
            .tickPadding(6);

        this.zoom = d3.behavior.zoom()
            .x(this.x)
            .on("zoom", this.draw.bind(this));

        this.svg = d3.select(this.container).append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
          .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
            .call(this.zoom);

        this.svg.append("rect")
            .attr("width", this.width)
            .attr("height", this.height);

        // show x axis
        this.svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + this.height + ")")
            .call(this.xAxis);

        this.zoom.x(this.x);

        this.draw();
    };

    TimelineView.prototype.draw = function() {
        var that = this,
            circles = this.svg.selectAll("circle").data(this.data, dateFn);

        circles.transition()
            .attr("cx", function(d) { return that.x(dateFn(d)) });

        circles.enter()
                    .append("svg:circle")
                    .attr("r", 10)
                    .attr("cx", function(d) {
                        return that.x(dateFn(d));
                    })
                    .attr("cy", this.height / 2);

        circles.exit().remove();

        this.svg.select(".x.axis").call(this.xAxis);
    };

    return TimelineView;
});
