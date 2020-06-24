import { NLU_TYPE } from "../config.ts";

import { findResponseRasa } from "./rasa.ts";
import { findResponseRegex } from "./regex.ts";
import { findResponseSnips } from "./snips.ts";
import { ResponseMessage } from "../models/index.ts";

export async function findResponse(text: string): Promise<ResponseMessage>  {

	let response;

	switch(NLU_TYPE) {
		case "rasa": {
				 response = await findResponseRasa(text).then(res => {
			 return res;
			 })
				 break;
		}
	   case "snips": {
	        response = await findResponseSnips(text).then(res => {
			  return res;
		    })
	        break;
	   }
	   default: {
	      response = findResponseRegex(text);
	      break;
	   }
	}

	return response;
}
