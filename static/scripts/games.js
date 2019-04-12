(function () {
	enableJS();

	function enableJS() {
		document.body.classList.replace('no-js', 'js-enabled');
	}
})();

let edit = document.querySelector('#edit-button');

edit.addEventListener('click', function() {
	if (edit.innerHTML === 'Edit') {
		edit.innerHTML = 'Done';
		
	} else {
		edit.innerHTML = 'Edit';
	}
    
});

