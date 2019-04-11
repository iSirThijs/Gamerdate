(function(){
	let body = document.body;
	body.classList.replace('no-js', 'js');
}());



// function ShowFieldSet(){

// }

// function HideFieldSet(){
	
// }

function GetFieldSet(){


	let buttonClicked = event.target.id;
	let sliderDirection = buttonClicked.substr(-5,4);
	let sliderLevel = buttonClicked.substr(-1,1);

	if(sliderDirection == 'Next'){
		if(sliderLevel == 1){ 
			document.getElementById('fieldset1id').style.visibility = 'hidden';
			document.getElementById('fieldset2id').style.visibility = 'visible';
		}
		if(sliderLevel == 2){ 
			document.getElementById('fieldset2id').style.visibility = 'hidden';
			document.getElementById('fieldset3id').style.visibility = 'visible';	
		}
	} else {
		if(sliderLevel == 2){ 
			document.getElementById('fieldset1id').style.visibility = 'visible';
			document.getElementById('fieldset2id').style.visibility = 'hidden';
		}
		if(sliderLevel == 3){ 
			document.getElementById('fieldset2id').style.visibility = 'visible';
			document.getElementById('fieldset3id').style.visibility = 'hidden';	
		}
	}

}

document.getElementById('fieldsetNext1').addEventListener('click', GetFieldSet);
document.getElementById('fieldsetNext2').addEventListener('click', GetFieldSet);
document.getElementById('fieldsetBack2').addEventListener('click', GetFieldSet);
document.getElementById('fieldsetBack3').addEventListener('click', GetFieldSet);
