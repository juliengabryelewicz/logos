let content_message = document.querySelector('.logos-messages');
let form_chatbot = document.querySelector('#logosForm');
let input_chatbot = document.querySelector('#logosForm input');

form_chatbot.addEventListener('submit', function(evt){
	evt.preventDefault();
	getNewMessageCustomer(input_chatbot.value);
});

window.addEventListener('load', (event) => {
	const url = '/session';
	const url_message = '/messages';
	fetch(url)
		.then(function(data) {
			fetch(url_message)
				.then((resp) => resp.json())
				.then(function(data) {
					data.map(function(message) {
						if(message.userFrom=="0"){
							addNewMessageBot(message);
						}else{
							addNewMessageCustomer(message.text);
						}
					});
					removeAllChoices();
				})
				.catch(function(error) {
					alert("Sorry we can't retrieve your session");
				});
		})
		.catch(function(error) {
			alert("Sorry we can't retrieve your session");
		});
});

function getNewMessageCustomer(text){
	fetch('/messages',
	{
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify({text : text})
	})
	.then((resp) => resp.json())
	.then(function(res){
		addNewMessageCustomer(res.text);
		input_chatbot.value = "";
		getNewMessageBot(res.text);
	})
	.catch(function(res){ alert("Sorry we can't send your message"); });
}

function getNewMessageBot(text){
	fetch('/messages_bot',
	{
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    method: "POST",
	    body: JSON.stringify({text : text})
	})
	.then((resp) => resp.json())
	.then(function(res){
		addNewMessageBot(res);
	})
	.catch(function(res){ alert("Sorry we can't get the bot's message"); });
}

function addNewMessageCustomer(text){
	let html_message = "<div class=\"message message-to\"><p class=\"message-text\">"+text+"</p></div>";
	content_message.insertAdjacentHTML('beforeend', html_message);
}

function addNewMessageBot(response){

	let html_message = "";

	switch(response.type){
		case "SIMPLE":
			html_message = "<div class=\"message message-from\"><p class=\"message-text\">"+response.text+"</p></div>";
		case "CHOICES":
			html_message = "<div class=\"message message-from\"><p class=\"message-text\">"+response.text+"</p></div>";
			html_message+= response.choices.map(choice => "<span class=\"choice\">"+choice+"</span>").join("");
	}
	content_message.insertAdjacentHTML('beforeend', html_message);
	addEventListenerChoices();
}

function addEventListenerChoices(){
	document.querySelectorAll('.choice').forEach(item => {
		item.addEventListener('click', (event) => {
			getNewMessageCustomer(item.textContent);
			removeAllChoices();
		});
	});
}

function removeAllChoices(){
	document.querySelectorAll('.choice').forEach(choice => {
		choice.remove();
	});
}
