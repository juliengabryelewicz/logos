import { Router } from 'https://deno.land/x/oak/mod.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { Message } from '../models/index.ts';

const router = new Router();

router.get('/session', async (context) => {
	try {
		if (await context.state.session.get("logos_userId") === undefined) {
			const id = v4.generate();
		    await context.state.session.set("logos_userId", id);
		}

		if (await context.state.session.get("logos_userUsername") === undefined) {
		    await context.state.session.set("logos_userUsername", "");
		}

    let userMessages = await context.state.session.get("logos_userMessages");
		if (userMessages === undefined) {
				await context.state.session.set("logos_userMessages", Array<Message>());
		}else{
			  await context.state.session.set("logos_userMessages", userMessages.slice(-20));
		}

		let userId = await context.state.session.get("logos_userId");
		let userName = await context.state.session.get("logos_userUsername");

		context.state.me = {id: userId, username: userName};

		context.response.body = context.state.me;
	} catch (e) {
		console.log(e);
	}

});

export default router;
