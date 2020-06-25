import { NLU_URL } from "../config.ts";
import { post } from "../helpers/http.ts";
import { ResponseMessage, TypeMessage } from "../models/index.ts";

export async function findResponseRasa(text: String): Promise<ResponseMessage>  {

   let response_text = "Sorry, I do not understand what you wrote";
   let response_type = TypeMessage.Simple;
   let response_choices = Array<string>();

   const data = await post<any>(
     `${NLU_URL}`,
     { 'text': text }
   );

   switch(data.parsedBody.intent.name) {
      case "greet": {
         response_text = "Greetings, human!";
         break;
      }
      default: {
         break;
      }
   }

   return {text: response_text, type: response_type, choices: response_choices};
}
