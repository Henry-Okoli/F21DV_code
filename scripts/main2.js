let data = await d3.csv("data/movies_mock.csv", (d) => {
    // for each row d, return a new object
    return {
        release_year: +d.release_year,
        budget: +d.budget,
        director: d.director,
        genre: d.genre,
        ratings_A: +d.ratings_A,
        ratings_B: +d.ratings_B,
        ratings_C: +d.ratings_C,
        release_month: +d.release_month,
        revenues: +d.revenues
};
});
console.log(data);

let data1 = [{name:'Pete',age:26},{name:'Johanna',age:27},
            {name:'Jamie',age:38},{name:'Aleksy',age:29},
            {name:'Akira',age:25},{name:'Adesina',age:32},
            {name:'Lorenzo',age:30},{name:'Julien',age:26}];

console.log(data1);

let sizes = data1.filter(d=>d.age<35 && d.age>25) // filter ages
    .map(d=>d.name) // grab names only
    .filter(d=>d.startsWith('J')) // filter first letters
    .map(d=>d.length); // map to name length

let avgSize = sizes.reduce((a,b)=>a+b, 0)/sizes.length; // sum sizes divided by length

console.log(sizes);
console.log(avgSize);

let unique = new Set(data.map(d=>d.genre));
console.log("unique genre", unique)

let uniqueDirector = new Set(data.map(d=>d.director));
let NumberOfuniqueDirector = uniqueDirector.size;
console.log("unique Directors", uniqueDirector)
console.log("Number of Nuique Directors", NumberOfuniqueDirector)

let MoviesRelease = data.filter(d=>d.release_year<=2012 && d.release_year>=2014)
    .map(d=>d.genre)
console.log(MoviesRelease)