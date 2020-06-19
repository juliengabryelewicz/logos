export function findResponseRegex(text: String): string  {

	let response_text = "Sorry, I do not understand what you wrote";

	switch(true) { 
	   case text.search(/good morning/gi) >= 0: { 
	      response_text = "Good morning to you";
	      break; 
	   } 
	   case text.search(/(hello|hey)/gi) >= 0: { 
	      response_text = "hey you :)";
	      break; 
	   } 
	} 

  return response_text;
}