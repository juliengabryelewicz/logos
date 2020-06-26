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

		case text.search(/(show me some coffee cups)/gi) >= 0: {
			response_text = "Here you go";
			response_type = TypeMessage.Slider;
			response_choices = ["<p><img src=\"https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2017/09/flat-white.jpg\"/></p>", "<p><img src=\"https://www.bbcgoodfood.com/sites/default/files/styles/teaser_item/public/recipe/recipe-image/2018/03/cappucino.jpg\"/></p>", "<p>And that's it!</p>"];
			break;
		}
	}

   return {text: response_text, type: response_type, choices: response_choices};
}
