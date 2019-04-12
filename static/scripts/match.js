const content = document.getElementById('content');
content.className = 'jsEnabled';

(function() {
	const forms = document.getElementsByClassName('match-dec');
	for (let i = 0; i < forms.length; i++) {
		forms[i].addEventListener('submit', handleMatch );
	}

	function handleMatch(event) {
		event.preventDefault();
		const form = event.target;
		const matchSection = form.parentNode;
		matchSection.style.display = 'none';
		const nextMatch = matchSection.nextElementSibling;
		nextMatch.style.display= 'flex';
		postMatch(form);
	}

	async function postMatch(form){
		let url= form.getAttribute('action');
		const request = new Request(url,{
			method: 'post',
			headers: new Headers({
				'Accept': 'text/plain'
			})
		});
		const response = await fetch(request);
		console.log(response.status); //eslint-disable-line
	}
}());
<<<<<<< HEAD






//const button = document.getElementsByName('add');

// Make sure the script only works when js is enabled
=======
>>>>>>> development
