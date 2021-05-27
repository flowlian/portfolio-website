console.log ("Hola! I am Julián. Welcome to My Portfolio Site");



function menuToggle() {
var x = document.getElementById('myNavtoggle');
if (x.className === 'navtoggle' && screen.width < 640) {
x.className += ' responsive';
} else {
x.className = 'navtoggle';
}
}
