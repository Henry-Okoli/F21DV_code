'use strict'; // to prevent us from overwriting important variables
let cities = [
    {city: 'Edinburgh', pop: 506000, area: 119, alt: 47},
    {city: 'Dubai', pop: 3604000, area: 1610, alt: 5},
    {city: 'Putrajaya', pop: 109000, area: 49, alt: 38},
    {city: 'Qingdao', pop: 10071000, area: 11228, alt: 25},
    {city: 'Lagos', pop: 8048000, area: 1171, alt: 41},
    {city: 'Ottawa', pop: 1017000, area: 2790, alt: 70}
    ]
// let dataCity = ["Ediburgh", "Dubia", "Putrajaya", "Quingdao", "Lagos", "Ottawa"];
let dataCity = cities.map(d => d.city)
let scaleBar = d3.scaleBand()
    .domain(dataCity)
    .range([0, 400])
    .padding(0.1);// Adjust padding between bars

let scaleAxis = d3.axisBottom(scaleBar);

let svg = d3.select('div#bar1').append('svg')
    .attr('width', 400)
    .attr('height', 500)
    .classed('barchart', true);

let barWidth = 40; // Width of each bar
let barPadding = 5; // Padding between bars

// let barGroup = barSvg.append('g');
svg.selectAll('rect')
    .data(cities)
    .join('rect')
        // .attr('x', (d, i) => i * (40 + 5)+5)
        .attr('x', d => scaleBar(d.city)) 
        .attr('y', d => 500 - (d.alt * 10)) // Example positioning
        .attr('width', scaleBar.bandwidth())
        .attr('height', d => d.alt * 10)
        .attr('fill', 'steelblue') // Optional color
svg.append('g')
    .attr('class', 'scaleBar axis')
    .attr('transform', 'translate(0,480)')
    .call(scaleAxis)