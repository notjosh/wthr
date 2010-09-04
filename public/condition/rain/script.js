/* Define the number of snowflakes to be used in the animation */
const SNOWFLAKES = 60;

function init() {
	
	/* Fill the empty container with freshly driven snow */
	var first = true;
	var container = document.getElementById('leafContainer');
	for (var i = 0; i < SNOWFLAKES; i++) {
		container.appendChild(createASnowflake(first));
		first = false;
	}
}

/*
	Receives the lowest and highest values of a range and
	returns a random integer that falls within that range.
*/
function randomInteger(low, high) {
	return low + Math.round(Math.random() * (high - low));
}

/*
   Receives the lowest and highest values of a range and
   returns a random float that falls within that range.
*/
function randomFloat(low, high) {
	return low + Math.random() * (high - low);
}

function randomItem(items) {
	return items[randomInteger(0, items.length - 1)]
}

/* Returns a duration value for the falling animation.*/
function durationValue(value) {
	return value + 's';
}

function createASnowflake(is_first) {
	var flakes = ['25CF', '25CB'];
	var sizes = ['tiny', 'tiny', 'tiny', 'small', 'small', 'small', 'small', 'medium', 'medium', 'medium', 'medium', 'medium', 'medium', 'large', 'massive'];

	/* Start by creating a wrapper div, and an empty span  */
	var snowflakeElement = document.createElement('div');
	snowflakeElement.className = 'snowflake ' + randomItem(sizes);

	var snowflake = document.createElement('span');
	snowflake.innerHTML = '&#x' + randomItem(flakes) + ';';
	snowflakeElement.appendChild(snowflake);

	/* Randomly choose a spin animation */
	var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpin';

	 /* Randomly choose a side to anchor to, keeps the middle more dense and fits liquid layout */
	 var anchorSide = (Math.random() < 0.5) ? 'left' : 'right';

	/* Figure out a random duration for the fade and drop animations */
	var fadeAndDropDuration = durationValue(randomFloat(0.2, 1));

	/* Figure out another random duration for the spin animation */
  // var spinDuration = durationValue(randomFloat(4, 8));

	// how long to wait before the flakes arrive
	var flakeDelay = is_first ? 0 : durationValue(randomFloat(0, 1));

	snowflakeElement.style.webkitAnimationName = 'fade, drop';
	snowflakeElement.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
	snowflakeElement.style.webkitAnimationDelay = flakeDelay;

	/* Position the snowflake at a random location along the screen, anchored to either the left or the right*/
	snowflakeElement.style[anchorSide] = randomInteger(0, 60) + '%';

//	snowflake.style.webkitAnimationName = spinAnimationName;
//	snowflake.style.webkitAnimationDuration = spinDuration;


	/* Return this snowflake element so it can be added to the document */
	return snowflakeElement;
}


/* Calls the init function when the "Falling Leaves" page is full loaded */
window.addEventListener('load', init, false);