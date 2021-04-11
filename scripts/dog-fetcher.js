
let images;

// Function that capitalizes first letter of a word
function capitalize(word){
    return word[0].toLocaleUpperCase() + word.slice(1);
};

// Retrieve dog breeds from dog API with AJAX and populate the 'select' tag
let req1 = new XMLHttpRequest();

req1.open("GET","https://dog.ceo/api/breeds/list/all");

req1.onreadystatechange = function(){

    if(this.readyState == 4){

        let breeds = JSON.parse(this.responseText);
        let list = '';

        for(let breed in breeds.message){
            if(breeds.message[breed].length < 1) {
                breed = capitalize(breed);
                list += `<option value="${breed}">${breed}</option>`;
            } else {
                for(let subBreed of breeds.message[breed]) {
                    breed = capitalize(breed);
                    subBreed = capitalize(subBreed);
                    list += `<option value="${breed}-${subBreed}">${breed}-${subBreed}</option>`;
                }
            }
        }
        document.getElementById("breed").insertAdjacentHTML("beforeend",list);  

        // Add event listener to 'select' element which loads an image and disables the button if no breed is selected
        let btn = document.getElementById("btn");
        document.getElementById("breed").addEventListener('change',function(e){
            if(!/^[a-z]/i.test(e.currentTarget.value)){
                btn.setAttribute('disabled', 'disabled')
            } else{
                btn.removeAttribute('disabled');
                getImage();
            } 

        // Display button
            document.getElementById('btn').style.display = 'inline'
        })
    }
}

req1.send();

// Add click event to button
document.getElementById('btn').addEventListener('click',function() {
    outputImage();
})

// Retrieve random image for selected breed with AJAX
function getImage(){

    // breed can be either of type 'breed' or 'breed-subBreed'
    let breedArr = document.getElementById("breed").value.toLowerCase().split('-');
    
    // Construct correct url depending on whether a breed + subBreed is selected
    let url = '';
    if(breedArr.length < 2) {
        url = `https://dog.ceo/api/breed/${breedArr[0]}/images`;
    } else {
        url = `https://dog.ceo/api/breed/${breedArr[0]}/${breedArr[1]}/images`;
    }
   
    let req2 = new XMLHttpRequest();

    req2.open("GET",url);
    
    req2.onreadystatechange = function(){
        if(this.readyState == 4) {
            images = JSON.parse(this.responseText).message;
            outputImage();
        }
    }
    req2.send();
}

function outputImage() {

    // Get a random image
    let randomIndex = Math.round((Math.random() * (images.length - 1))),
        randomImageURL = images[randomIndex],
        image = document.getElementById("output-wrap"),
        outputDiv = document.getElementById("output"),
        output = `<img src="${randomImageURL}">`;
    
    // If image already displayed
    if(image.classList.contains("on-screen")) {
        // Replace image
        outputDiv.innerHTML = output;
        image.classList.add("on-screen");
       
    // If no image is displayed
    } else {
        outputDiv.innerHTML = output;
        image.classList.add("on-screen");
    }
}