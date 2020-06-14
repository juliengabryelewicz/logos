let content_message = document.querySelector('.logos-messages');
let form_chatbot = document.querySelector('#logosForm');
let input_chatbot = document.querySelector('#logosForm input');

form_chatbot.addEventListener('submit', function(evt){
	evt.preventDefault();
	fetch('/messages',
	{
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    method: "POST",
	    body: JSON.stringify({text : input_chatbot.value})
	})
	.then((resp) => resp.json())
	.then(function(res){ 
		addNewMessageCustomer(res.text);
		input_chatbot.value = "";
		getNewMessageBot(res.text);
	})
	.catch(function(res){ alert("Sorry we can't send your message"); });
});

window.addEventListener('load', (event) => {
	const url = '/session';
	fetch(url)
		.then(function(data) {
		})
		.catch(function(error) {
			alert("Sorry we can't retrieve your session");
		}); 
});

function addNewMessageCustomer(text){
	let html_message = "<div class=\"message message-to\"><p class=\"message-text\">"+text+"</p></div>";
	content_message.insertAdjacentHTML('beforeend', html_message);
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
		addNewMessageBot(res.text);
	})
	.catch(function(res){ alert("Sorry we can't get the bot's message"); });
}

function addNewMessageBot(text){
	let html_message = "<div class=\"message message-from\"><p class=\"message-text\">"+text+"</p></div>";
	content_message.insertAdjacentHTML('beforeend', html_message);
}