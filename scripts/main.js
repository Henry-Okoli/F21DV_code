// to prevent us from overwriting important variables
// const c = 'constant'; // a constant value, assignment to c is no longer allowed
// let v = 'variable'; // a primitive variable
// let a = [1, 2, 3, false]; // an array
// let o = { // an object
// 'key1': 1,
// 'key2': 'something'
// };
// console.log(c);
// console.log(v);
// console.log(a);
// console.log(o);
// console.log(o['key1']);
// console.log(o.key2);

// function one(a, b){return a+b;}
//     let two = function(a, b){
//     return a+b;
//     }
//     let three = (a,b)=>a+b;

// console.log(one(2,3))
// console.log(three(2,6))


// import {GCD} from './math.js';
// console.log(GCD(84, 52));

// import {factorial as myFactorial} from './math.js';
// console.log(myFactorial(5));


// import book from './book.js';

// console.log('d3 version: ', d3.version);




// 'use strict'; // to prevent us from overwriting important variables
// let city = ["Edinburgh", "Dubia", "Putrajaya","Qiangdal", "Lagos", "Ottawa"]
// let scale = d3.scalePoint()
//     .domain(city)
//     .range([500, 540, 580, 620, 660, 700])

// let scaleAxis = d3.axisBottom(scale)
// let barContainer = d3.select('div#bar1'); // selecting the bar as the first thing
// let barSvg = barContainer.append('svg') // we are appending a container to our bar1
// // after container the next is to creat attribute like height, width and class for the container created above 
//     .attr('width', 400)
//     .attr('height', 500)
//     .classed('barchart', true);

// let cities = [
//     {city: 'Edinburgh', pop: 506000, area: 119, alt: 47},
//     {city: 'Dubai', pop: 3604000, area: 1610, alt: 5},
//     {city: 'Putrajaya', pop: 109000, area: 49, alt: 38},
//     {city: 'Qingdao', pop: 10071000, area: 11228, alt: 25},
//     {city: 'Lagos', pop: 8048000, area: 1171, alt: 41},
//     {city: 'Ottawa', pop: 1017000, area: 2790, alt: 70}
//     ]


// let barWidth = 40; // Width of each bar
// let barPadding = 5; // Padding between bars

// let barGroup = barSvg.append('g');
// let bars = barGroup.selectAll('rect')
//     .data(cities, d=>d.city)
//     // .join(
//     //     enter => enter.append('rect') , // create new elements
//     //     update => update , // don't do anything
//     //     exit => exit.remove() // remove elements
//     // );
//     .join('rect')
//     .attr('x', (d, i) => i * (barWidth + barPadding)+barPadding)
//     .attr('y', d => 500 - d.alt * 10) // Example positioning
//     .attr('width', barWidth)
//     .attr('height', d => d.alt * 10)
//     .attr('fill', 'steelblue') // Optional color
//     .attr('class', 'scale axis')
//     .call(scaleAxis);

    






'use strict'; // to prevent us from overwriting important variables
import BarChart from './Visualization/barchart.js';
import ScatterPlot from './Visualization/ScatterPlot.js'

let cities = [
    {city: 'Edinburgh', pop: 506000, area: 119, alt: 47},
    {city: 'Dubai', pop: 3604000, area: 1610, alt: 5},
    {city: 'Putrajaya', pop: 109000, area: 49, alt: 38},
    {city: 'Qingdao', pop: 10071000, area: 11228, alt: 25},
    {city: 'Lagos', pop: 8048000, area: 1171, alt: 41},
    {city: 'Ottawa', pop: 1017000, area: 2790, alt: 70}
 ]
 let scatter1 = new ScatterPlot('div#scatter1', 700, 500, [10,40,45,20]);
// this line transforms the cities dataset in the generic format
// that BarChart expects: [[k, v], ...]
// we will explain it further in the next lab

let bar1 = new BarChart('div#bar1', 700, 500, [10,40,45,20]);
// this line transforms the cities dataset in the generic format
// that BarChart expects: [[k, v], ...]
// we will explain it further in the next lab

let citiesElevation = cities.map(d=>[d.city, d.alt]);
bar1.render(citiesElevation);

let citiesPopArea = cities.map(d=>[d.pop, d.area]);
scatter1.render(citiesPopArea)
