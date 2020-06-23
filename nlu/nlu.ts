import { NLU_TYPE } from "../config.ts";

import { findResponseRasa } from "./rasa.ts";
import { findResponseRegex } from "./regex.ts";
import { findResponseSnips } from "./snips.ts";

export async function findResponse(text: string): Promise<string>  {

	let response_text = "";

	switch(NLU_TYPE) {
		case "rasa": {
				 response_text = await findResponseRasa(text).then(res => {
			 return res;
			 })
				 break;
		}
	   case "snips": {
	        response_text = await findResponseSnips(text).then(res => {
			  return res;
		    })
	        break;
	   }
	   default: {
	      response_text = findResponseRegex(text);
	      break;
	   }
	}

	return response_text;
}
