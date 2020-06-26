let content_message = document.querySelector('.logos-messages');
let form_chatbot = document.querySelector('#logosForm');
let input_chatbot = document.querySelector('#logosForm input');
let calendar;

form_chatbot.addEventListener('submit', function(evt){
	evt.preventDefault();
	removeAll();
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
					removeAll();
					scrollToBottom();
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
		scrollToBottom();
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
		scrollToBottom();
	})
	.catch(function(res){ alert("Sorry we can't get the bot's message"); });
}

function addNewMessageCustomer(text){
	let html_message = "<div class=\"message message-to\"><p class=\"message-text\">"+text+"</p></div>";
	content_message.insertAdjacentHTML('beforeend', html_message);
}

function addNewMessageBot(response){

	let html_message = "";
	html_message = "<div class=\"message message-from\"><p class=\"message-text\">"+response.text+"</p></div>";
	switch(response.type){
		case "SIMPLE":
			content_message.insertAdjacentHTML('beforeend', html_message);
			break;
		case "CHOICES":
			html_message+= response.choices.map(choice => "<span class=\"choice\">"+choice+"</span>").join("");
			content_message.insertAdjacentHTML('beforeend', html_message);
			addEventListenerChoices();
			break;
		case "CALENDAR":
			html_message+= "<div id=\"calendar\" class=\"vanilla-calendar\"></div>";
			content_message.insertAdjacentHTML('beforeend', html_message);
			calendar = new VanillaCalendar({
			    selector: "#calendar",
					datesFilter: false,
					onSelect: (data, elem) => {
							const date = new Date(data.date)
							getNewMessageCustomer(date.toLocaleString("en-US", {year: "numeric", month: "numeric", day: "numeric"}));
							removeAll();
					}
			});
			break;
		case "SLIDER":
			html_message+= "<div class=\"slide-wrap\"><div class=\"slideshow\">";
			html_message+= response.choices.map(choice => "<div class=\"slide-entry\"><div class=\"slide-content\">"+choice+"</div></div>").join("");
			html_message+= "</div><ul class=\"slide-nav\"><li id=\"prev-slide\"><</li><li id=\"next-slide\">></li></ul></div>";
			content_message.insertAdjacentHTML('beforeend', html_message);
			startSlider();
			break;
	}
}

function addEventListenerChoices(){
	document.querySelectorAll('.choice').forEach(item => {
		item.addEventListener('click', (event) => {
			getNewMessageCustomer(item.textContent);
			removeAll();
		});
	});
}

function removeAll(){
	undoSlider();
	document.querySelectorAll('.choice, #calendar, .slide-wrap').forEach(choice => {
		choice.remove();
	});
}

function scrollToBottom(){
	content_message.scrollTop = content_message.scrollHeight;
}
