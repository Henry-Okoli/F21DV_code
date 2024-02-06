// Donut chart class

export default class DonutChart{

    // Object properties
    width; height; margin;
    svg; chart; arcs; labels;
    data; sum;

    pieGenerator; arcGenerator; labelGenerator;

    // Constructor: setup size and selections
    // Parameters: selector, width, height, [top,bottom,left,right]margin
    constructor(container, width, height, margin){
        this.width = width;
        this.height = height;
        this.margin = margin;
        let innerWidth = this.width - this.margin[2] - this.margin[3],
            innerHeight = this.height - this.margin[0] - this.margin[1];
        this.svg = d3.select(container).append('svg')
            .classed('donutchart vis', true)
            .attr('width', this.width).attr('height', this.height);
        this.chart = this.svg.append('g')
            .attr('transform', `translate(${this.margin[2]+innerWidth/2},${this.margin[0]+innerHeight/2})`);
        this.arcs = this.chart.selectAll('path.arc');
        this.labels = this.chart.selectAll('text.label');

        // Create data and shape generators (not depending on data)
        this.pieGenerator = d3.pie()
            .padAngle(0.02)
            .value(d=>d[1]);
        // Establish minimum fitting dimension
        let size = Math.min(innerWidth,innerHeight);
        this.arcGenerator = d3.arc()
            .outerRadius(size/2-20)
            .innerRadius(size/4);
        this.labelGenerator = d3.arc()
            .innerRadius(size/2-20)
            .outerRadius(size/2);
    }

    // Private methods

    #updateArcs(){
        this.arcs = this.arcs
            .data(this.data, d=>d.data[0])
            .join('path')
            .classed('arc', true)
            .attr('d', this.arcGenerator)
    }

    #updateLabels(){
        let format = d3.format('.1%');
        this.labels = this.labels
            .data(this.data, d=>d.data[0])
            .join('text')
            .classed('label', true)
            .attr('font-family','sans-serif')
            .attr('font-size', 10)
            .attr('transform', d=>`translate(${this.labelGenerator.centroid(d)})`)
            .text(d=>`${d.data[0]} - ${format(d.data[1]/this.sum)}`)
            .attr('text-anchor', d=>d.startAngle+(d.endAngle-d.startAngle)>3.14?'end':'start')
    }

    // Public API

    // dataset should be in the format [[k,v],...]
    render(dataset){
        this.data = this.pieGenerator(dataset);
        this.sum = d3.sum(dataset, d=>d[1]);
        this.#updateArcs();
        this.#updateLabels();
        return this;
    }
}