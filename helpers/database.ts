import { Message } from "../models/index.ts";
import { client } from "./env.ts";
import { USE_DATABASE} from "../config.ts";


export async function createTable(){

	if(USE_DATABASE){
	  	await client.connect();
		const result = await client.query("create table if not exists Conversations (id varchar(255), text text not null, userFrom varchar(100), userTo varchar(100) not null, choices text, type varchar(30))");
		await client.end();
	}


}

export async function insertMessage(message: Message){

	if(USE_DATABASE){
		await client.connect();
		const result = await client.query("insert into Conversations (id, text, userFrom, userTo, choices, type) values ('"+message.id+"','"+message.text.replace(/(["'])/g, " ")+"','"+message.userFrom+"','"+message.userTo+"','"+message.choices.join(", ")+"','"+message.type+"')");
		await client.end();
	}

}
