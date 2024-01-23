 export default class book{
    #onloan; // private property

    constructor(title, author){
        this.title = title 
        this.author = author
        this.#onloan = false
    }

    onLoan() {
        if (this.#onloan) {
            console.log(`The book '${this.title, this.author}' is already on loan.`);
        } else {
            this.#onloan = true;
            console.log(`You have successfully loaned '${this.title, this.author}'.`);
        }
    }
    returedBook() {
        if (this.#onloan){
            this.#onloan = false;
            console.log(`You have successfully retured '${this.title, this.author}'.`);
        } else{
            console.log(`The book '${this.title, this.author} was on loan`)
        }
        }

    isAvaliable(){
        return !this.#onloan;
    }
}

let myBook = new book("1950", "Jessica Chan-Jia");
console.log(myBook.isAvaliable()); // true
myBook.onLoan();
console.log(myBook.isAvaliable()); // false
myBook.returedBook();
console.log(myBook.isAvaliable()); // TRUE

// export default book