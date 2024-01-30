export default class ScatterPlot{
    // Attributes (you can make those private too)
    width; height; margin // size
    svg; chart; dots; axisX; axisY; labelX; labelY;
    scaleX; scaleY; // selections
    data; // internal data
    
    // Constructor
constructor(container, width, height, margin){
    this.width = width;
    this.height = height;
    this.margin = margin;
    
    this.svg = d3.select(container)
        .append('svg')
        .classed('scatter', true)
        .attr('width', this.width)
        .attr('height', this.height);

    this.chart = this.svg.append('g')
        .attr('transform', `translate(${this.margin[2]}, ${this.margin[0]})`);
    this.dots = this.chart.selectAll('circle.dot');


    // initiallse the axis
    this.axisX = this.svg.append('g')
        .attr('transform', `translate(${this.margin[2]},${this.height-this.margin[1]})`);
    this.axisY = this.svg.append('g')
        .attr('transform',
        `translate(${this.margin[2]},${this.margin[0]})`);
    this.labelX = this.svg.append('text')
        .attr('transform', `translate(${this.width/2},${this.height})`)
        .style('text-anchor', 'middle').attr('dy',-5);
    this.labelY = this.svg.append('text')
        .attr('transform', `translate(0,${this.margin[0]})rotate(-90)`)
        .style('text-anchor', 'end').attr('dy',15);
}


// method to Implement Scale
#updateScales(){
    let chartWidth = this.width - this.margin[2] - this.margin[3];
    let chartHeight = this.height - this.margin[0] - this.margin[1];

    this.scaleX = d3.scaleLinear()
        .domain([0, d3.max(this.data, d => d[0])])
        .range([0, chartWidth]);

    this.scaleY = d3.scaleLinear()
        .domain([0, d3.max(this.data, d => d[1])])
        .range([chartHeight, 0]);
}

// method to Implement axis
// to display axis on the bar chart
#updateAxes(){
    let axisGenX = d3.axisBottom(this.scaleX);
    let axisGenY = d3.axisLeft(this.scaleY);
    this.axisX.call(axisGenX);
    this.axisY.call(axisGenY);
}

// method to Implement scatterPlolt
// data is in the format [[key,value],...]
#updateScatterPlot(){
    this.dots = this.dots
        .data(this.data)
        .join('circle')
        .classed('dot', true)
        .attr('cx', d => this.scaleX(d[0]))
        .attr('cy', d => this.scaleY(d[1]))
        .attr('r', 5);
}
// Public API
// The dataset parameter needs to be in a generic format,
// so that it works for all future data
// here we assume a [[k,v], ...] format for efficiency
render(dataset){
    this.data = dataset;
    this.#updateScales();    
    this.#updateAxes();    
    this.#updateScatterPlot();
    return this; // to allow chaining
    }
    
setLabels(labelX='X Axis', labelY='Y Axis'){
    this.labelX.text(labelX)
        .attr('x', (this.width - this.margin.left - this.margin.right) / 2)
        .attr('y', this.height - this.margin.bottom);
    this.labelY.text(labelY).attr('y', 6)
        .attr('dy', '.75em').attr('transform', 'rotate(-90)')
        .attr('x', 0 - (this.height / 2));
    return this;
}
}


