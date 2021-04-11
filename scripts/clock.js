setInterval(time,1000)

function time () {

    let hourHand = document.querySelector('[data-hour]')
    let minHand = document.querySelector('[data-mins]')
    let secsHand = document.querySelector('[data-secs]')

    let date = new Date;

    let secs = date.getSeconds();
    let secsRatio = secs/60;

    // Position of min hand in between each minute depends on how many secs have passed
    let mins = date.getMinutes();
    let minsRatio = (mins + secsRatio)/60;

    // Position of hour hand in between each minute depends on how many mins have passed
    let hour = date.getHours();
    let hourRatio = (hour + minsRatio)/12;


    rotate(hourHand,hourRatio);
    rotate(minHand,minsRatio);
    rotate(secsHand,secsRatio);
}

function rotate (hand,ratio) {
    hand.style.setProperty('--rot', ratio * 360)
} 