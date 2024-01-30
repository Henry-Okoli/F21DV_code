 export default class BarChart{
        // Attributes (you can make those private too)
        width; height; margin // size
        svg; chart; bars; axisX; axisY; labelX; labelY;
        scaleX; scaleY; // selections
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
       
        // to display axis in the chart
        this.chart = this.svg.append('g')
            .attr('transform',
            `translate(${this.margin[2]},${this.margin[0]})`);
        this.bars = this.chart.selectAll('rect.bar');
        
        this.axisX = this.svg.append('g')
            .attr('transform',
            `translate(${this.margin[2]},${this.height-this.margin[1]})`);
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


    // Implement Scale
    // 
    #updateScales(){
        let chartWidth = this.width-this.margin[2]-this.margin[3],
            chartHeight = this.height-this.margin[0]-this.margin[1];
        let rangeX = [0, chartWidth],
            rangeY = [chartHeight, 0];
        let domainX = this.data.map(d=>d[0]),
            domainY = [0, d3.max(this.data, d => d[1])];
        this.scaleX = d3.scaleBand(domainX, rangeX).padding(0.2); // Note that we are giving a padding to our band scale in order to separate the bars a bit
        this.scaleY = d3.scaleLinear(domainY, rangeY);
    }

    // to display axis on the bar chart
    #updateAxes(){
        let axisGenX = d3.axisBottom(this.scaleX),
            axisGenY = d3.axisLeft(this.scaleY);
        this.axisX.call(axisGenX);
        this.axisY.call(axisGenY);
    }
    // Private methods
    // data is in the format [[key,value],...]
    #updateBars(){
        this.bars = this.chart.selectAll('rect.bar') // Re-select to include new data-bound bars
        // this.bars = this.bars
            .data(this.data, d=>d[0])
            .join('rect')
            .classed('bar', true)  
            .attr('x', d =>this.scaleX(d[0]))
            .attr('y', d =>this.scaleY(d[1]))         
            .attr('width', this.scaleX.bandwidth())
            .attr('height', d =>this.scaleY(0)-this.scaleY(d[1]))
            // .attr('x', (d,i) => i*(40+10)+10)
            // .attr('y', d => this.height - d[1]*10)
            // .attr('width', 40)
            // .attr('height', d => d[1]*10); 
    }
    // Public API
    // The dataset parameter needs to be in a generic format,
    // so that it works for all future data
    // here we assume a [[k,v], ...] format for efficiency
    render(dataset){
        this.data = dataset;
        this.#updateScales();        
        this.#updateBars();
        this.#updateAxes();
        return this; // to allow chaining
        }
        
    setLabels(labelX='categories', labelY='values'){
        this.labelX.text(labelX);
        this.labelY.text(labelY);
        return this;
    }
}
    