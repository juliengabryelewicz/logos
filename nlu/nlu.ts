import { NLU_TYPE } from "../config.ts";

import { findResponseRegex } from "./regex.ts";
import { findResponseSnips } from "./snips.ts";

export async function findResponse(text: string): Promise<string>  {

	let response_text = "";

	switch(NLU_TYPE) {
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
