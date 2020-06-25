import { NLU_URL } from "../config.ts";
import { post } from "../helpers/http.ts";
import { ResponseMessage, TypeMessage } from "../models/index.ts";

export async function findResponseSnips(text: String): Promise<ResponseMessage>  {

   let response_text = "Sorry, I do not understand what you wrote";
   let response_type = TypeMessage.Simple;
   let response_choices = Array<string>();

   const data = await post<any>(
     `${NLU_URL}`,
     { 'content': text }
   );

   switch(data.parsedBody.intent.intentName) {
      case "prepareBeverage": {
         response_text = "I am preparing your beverage right now";
         break;
      }
      default: {
         break;
      }
   }

   return {text: response_text, type: response_type, choices: response_choices};
}
