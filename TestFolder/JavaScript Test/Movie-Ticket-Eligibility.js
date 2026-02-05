let age = 20
let isStudent = true

function checkMovieTicketEligibility(age, isStudent) {
    if (age < 18 || isStudent) {
    console.log("Discount ticket granted ✅");
} else {
    console.log("Regular ticket only ❌");
}
}