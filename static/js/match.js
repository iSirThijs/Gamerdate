let currentMatch = 0;
const match = document.getElementsByClassName('match');
const content = document.getElementById('content');

// Make sure the script only works when js is enabled
content.className += 'jsEnabled';

// show only one match
showMatch(currentMatch);

function showMatch(n){
	match[n].style.display = 'block';
}

function nextMatch(n){ //eslint-disable-line
	match[currentMatch].style.display = 'none';
	currentMatch = currentMatch + n;
	showMatch(currentMatch);
}
