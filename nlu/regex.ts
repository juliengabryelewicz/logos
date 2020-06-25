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

		 case text.search(/(help)/gi) >= 0: {
				response_text = "how can i help you?";
				response_type = TypeMessage.Choices;
				response_choices = ["hey", "good morning"];
				break;
		 }

		 case text.search(/(i want to make an appointment)/gi) >= 0: {
				response_text = "Sure, when?";
				response_type = TypeMessage.Calendar;
				break;
		 }
	}

   return {text: response_text, type: response_type, choices: response_choices};
}
