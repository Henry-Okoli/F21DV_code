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

    // year: new Date(+d.Year, 0, 1), // convert "Year" column to Date
    // make: d.Make,
    // model: d.Model,
    // length: +d.Length, // convert "Length" column to number
    // registered: d.Reg==='Yes', // convert "Reg" column to boolean
    // large: +d.Length > 100 // create new boolean attribute

};
});
console.log(data);


let data1 = await d3.csv("data/movies_mock.csv");
console.log(data1);