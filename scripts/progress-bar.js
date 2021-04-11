
// Retrieve elements and set initial values
let bar = document.querySelector('.inner');
let progress = document.querySelector('.progress span');
let fraction = 0; 
let incrementVal;
let animate;


// Function that increments fraction of completion    
function increment () {
    if (fraction >= 0.99) {
        fraction = 1;
        update();
        clearInterval(animate);
    } 
    else {
        incrementVal = parseFloat(((Math.random() * 0.3) + 0.05)) // Updating with new incrementVal makes progress appear non-linear and realistic
        fraction += incrementVal;
        if (fraction < 1) {
            update();
        }
    }
}

// Function that updates display to reflect increased fraction 
function update () {
    let x;
    if (fraction === 1) {
        x = 0;
    } else { x = 1 }
    
    bar.style.setProperty('--fraction', fraction.toFixed(2));
    progress.innerText = (fraction * 100).toFixed(x);

    // Change background color as bar fills
    if (fraction < 0.25) {bar.style.setProperty('background-color', 'rgb(255, 30, 50)');} 
        else if (fraction < 0.50) {bar.style.setProperty('background-color', 'rgb(255, 100, 50)');} 
        else if (fraction < 0.80) {bar.style.setProperty('background-color', 'rgb(255, 160, 50)');} 
        else {bar.style.setProperty('background-color', 'rgb(160, 255, 130, 0.6)');}
}

// Add event listener to Run button that runs the program
document.querySelector('#run').addEventListener('click', () => animate = setInterval(increment, 1000))

// Add event listener to Reset button that resets everything
document.querySelector('#reset').addEventListener('click', () => {fraction = 0; update()})
