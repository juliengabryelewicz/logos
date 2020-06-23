import { NLU_URL } from "../config.ts";
import { post } from "../helpers/http.ts";

export async function findResponseRasa(text: String): Promise<string>  {

   let response_text = "Sorry, I do not understand what you wrote";

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

   return response_text;
}
