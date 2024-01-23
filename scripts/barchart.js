 export default class BarChart{
        // Attributes (you can make those private too)
        width; height; // size
        svg; chart; bars; // selections
        data; // internal data
        
        // Constructor
    constructor(container, width, height, margin){
        this.width = width;
        this.height = height;
        this.margin = margin;

        this.svg = d3.select(container)
            .append('svg')
            .classed('barchart', true)
            .attr('width', this.width)
            .attr('height', this.height);

        this.chart = this.svg.append('g')
            .attr('transform',
                `translate(${this.margin[2]}, ${this.margin[0]})`);

        this.bars = this.chart.selectAll('rect.bar');// Initialize empty selection
    }

    // Private methods
    // data is in the format [[key,value],...]
    #updateBars(){
        this.bars = this.chart.selectAll('rect.bar') // Re-select to include new data-bound bars
        // this.bars = this.bars
            .data(this.data, d=>d[0])
            .join('rect')
            .classed('bar', true)
            .attr('x', (d,i) => i*(40+10)+10)
            .attr('y', d => this.height - d[1]*10)
            .attr('width', 40)
            .attr('height', d => d[1]*10);
            attr
    }
    // Implement Scale
    // 
    #updateScales(){
        let chartWidth = this.width-this.margin[2]-this.margin[3];
            chartHeight = this.height-this.margin[0]-this.margin[1];

        let rangeX = [0, chartWidth];
            rangeY = [chartHeight, 0];
        let domainX = this.data.map(d=>d[0]);
        }
    // Public API
    // The dataset parameter needs to be in a generic format,
    // so that it works for all future data
    // here we assume a [[k,v], ...] format for efficiency
    render(dataset){
        this.data = dataset;
        this.#updateBars();
        this.#updateScales();
        return this; // to allow chaining
        }
}
    