
let bookingBtn = document.getElementById("booking");
let div = document.getElementById("mainDiv");

bookingBtn.addEventListener("click",()=>{
fetch('/booking').then(function (response) {
    // The API call was successful!
    return response.text();
}).then(function (html) {

    div.innerHTML=html;

}).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
});
})


