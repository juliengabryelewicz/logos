import { Client } from "https://deno.land/x/postgres/mod.ts";
import { USER_DATABASE, NAME_DATABASE, HOST_DATABASE, PORT_DATABASE } from "../config.ts";

export const client = new Client({
	user: USER_DATABASE,
	database: NAME_DATABASE,
	hostname: HOST_DATABASE,
	port: 5432
});