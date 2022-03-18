const output= document.getElementById("output");
const arrival= document.getElementById("pickupdate");
const departure= document.getElementById("handindate");
const error= document.getElementById("error");
const form =document.getElementById("form");

//car info//
 const carlist = [
     {  
         name: "Suzuki Swift",
         category:"Sedan",
         people:4,
         suitcases:2,
         price: 850,
         image: scr="images/suzuki.jpg"       
     },
     {
         name: "Citroen Grand C4 Picasso",
         category:"Minivan",
         people:7,
         suitcases:4,
         price: 1420,
         image: scr="images/citroen.jpg",     
     },
     {
         name: "Mazda-3",
         category:"Sedan",
         people:5,
         suitcases:3,
         price: 1170,
         image: scr="images/Mazda-3.jpg",
     }
 ]


let template="";
function validDates (arrivaldate, departuredate) {
    const arrival = new Date(arrivaldate);
    const departure = new Date(departuredate);
    if (arrival > departure) {
        return false;
    } else {
        return true;
    }
}


function calculateDays(arrivaldate, departuredate) {
    const arrival = new Date(arrivaldate);
    const departure = new Date(departuredate);
    const timediff = departure.getTime() - arrival.getTime();
    const diffindays = timediff / (1000 * 3600 * 24) + 1;
    return diffindays;
}

function calculatePrice(days, price) {
    const totalprice = (495 + (price * days)) * 1.25;
    return totalprice;
}


form.addEventListener("submit", function (event) {
    event.preventDefault();
    output.innerHTML = "";
    error.innerHTML = "";
    const datesValid = validDates(arrival.value, departure.value);
    console.log(datesValid)
    if (datesValid) {
        for (const car of carlist){
        const pnumber = parseFloat(document.getElementById("personnumber").value);
        const snumber = parseFloat(document.getElementById("suitcases").value);
        const days = calculateDays(arrival.value, departure.value);
        console.log(days)
        const price = calculatePrice(days, car.price);
        if (car.people >= pnumber && car.suitcases >= snumber) {
            template = `
    <section class="car" style="margin:30px ">
        <img src="${car.image}" alt="car" class="image" style="width:120px " >
            <div class="names">
                ${car.name}
            </div>
            <div class="category">
                category: ${car.category}
            </div>
            <div class="people">
                people: ${car.people}
            </div>
            <div class="suitcases">
                suitcases: ${car.suitcases}
            </div>
            <div class="costtnbook-cont">
            <div class="cost-cont">
                <p class="cost">kr. ${price}</p>
            </div>
            <div class="book-cont">
                <button onclick='buttonclick(${JSON.stringify(car)})' type="button" class="choosethis" >
                    Choose this
                </button>
            </div>
    </section>`

    output.insertAdjacentHTML ("beforeend", template)
        }

        }
        
    } else {
        error.innerHTML = "The day of departure must be later than the day of arrival";
    }
    

})
function buttonclick(car){
    sessionStorage.setItem('car', JSON.stringify(car));
    window.location.href = 'accesories.html';
};