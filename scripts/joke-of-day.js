
let jokes = ["I got hit in the head with a can of Diet Coke today. Don’t worry, I’m not hurt. It was a soft drink.","The difference between a numerator and a denominator is a short line. Only a fraction of people will understand it.","We all know about Murphy’s Law: anything that can go wrong will go wrong. But have you heard of Cole’s Law? It’s thinly sliced cabbage.","I've been thinking about taking up meditation. Better than sitting around doing nothing.","I bought some shoes from a drug dealer. I don't know what he laced them with, but I was tripping all day!","I heard Youtube, Twitter, and Facebook are all merging. They're going to call it You-Twit-Face." ];

// Insert random joke with random number of likes immediately after document has loaded
$(document).ready(function(){
    let likes = Math.round((Math.random() * 500));
    let random = Math.round((Math.random() * (jokes.length - 1)));
    $('#total-likes').text(likes);
    $('#joke p').text(jokes[random]).fadeIn(500);
})

function randomGenerator(){
    return Math.round((Math.random() * (jokes.length - 1)));
}

$('#new-joke').click(function() {

    // Get current joke being displayed
    let current = $('#joke p').text();
    
    // Get index of current joke 
    let currentIndex = jokes.indexOf(current);

    // Generate random index
    let random = randomGenerator();

    // Check if random index === current index and correct if true
    if(random === currentIndex) {
        random = recurse();
    }

    // Recursive function that ensures that the newly generated index !== index of current joke, i.e. same joke isn't displayed after clicking 'New joke'
    function recurse() {
        random = randomGenerator();
        if(random !== currentIndex) {return random}
        if(random === currentIndex) {recurse()}
    }

    let likes = Math.round((Math.random() * 500));
    
    // Replace with new content with animation
    $('#joke p').fadeOut(1);
    $('#total-likes').text(likes);
    $('#joke p').text(jokes[random]).fadeIn(200);
})

$('i').click(function() {
let likes = parseInt($('#total-likes').text());
$('#total-likes').text(likes + 1);
})