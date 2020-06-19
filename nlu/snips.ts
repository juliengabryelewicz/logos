import { NLU_URL } from "../config.ts";
import { post } from "../helpers/http.ts";

export async function findResponseSnips(text: String): Promise<string>  {

   let response_text = "Sorry, I do not understand what you wrote";

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

   return response_text;
}
