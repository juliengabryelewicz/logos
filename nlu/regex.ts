import { ResponseMessage, TypeMessage } from "../models/index.ts";

export function findResponseRegex(text: String): ResponseMessage  {

	let response_text = "Sorry, I do not understand what you wrote";
	let response_type = TypeMessage.Simple;
	let response_choices = Array<string>();

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

   return {text: response_text, type: response_type, choices: response_choices};
}
