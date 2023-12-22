const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)') //return a nodeList like array
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie');

populateUI()

let ticketPrice = +movieSelect.value // movieSelect.value is a string, add + to convert it to number
// console.log(ticketPrice) // 10
// console.log(typeof ticketPrice) // number

// save selected movie index and price
function SetMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update total price and count seats
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected'); //.class .subclass: must has whitespace in between
    // console.log(selectedSeats);

    /**
     * remember selections even after refreshing the page
     */
    // copy selectedSeats into arr; Map through arr
    const seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat) //return an array of index of selected seats
    })
    //console.log(seatsIndex)
    // JSON.stringify: convert to string before saving to localStorage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); // check it at browser-inspection-Application-LocalStorage-URL

    const selectedSeatsCount = selectedSeats.length;
    //console.log(selectedSeatsCount)

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice; 
}

// get data from localStorage and populate UI
function populateUI(){
    // when get from localStorage, parse to JSON/array from string
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    // console.log(selectedSeats); // print selectedSeats array

    // populate selectedSeats UI from localStorage
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){ //by default: if index doesn't exist, return -1, so must be > -1
                seat.classList.add('selected');
            }
        });
    }

     // populate selectedMovie UI from localStorage
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex
    }
}

// movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value
    SetMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount()
})


// Seat click event
container.addEventListener('click', (e) => {
    // console.log(e.target) // return the clicked HTML target
    if(e.target.classList.contains('seat') && 
    !e.target.classList.contains('occupied')){
        // console.log(e.target)
        e.target.classList.toggle('selected'); //switch seat style between default & selected 
        updateSelectedCount();
    }
})

// Initial count and total set
updateSelectedCount();




