import { Router, helpers } from 'https://deno.land/x/oak/mod.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { findResponse } from '../nlu/nlu.ts';
import { Message } from '../models/index.ts';
import { insertMessage } from "../helpers/database.ts";

const router = new Router();

router.get('/messages', async (context) => {
  let userId = await context.state.session.get("logos_userId");
  let userMessages = await context.state.session.get("logos_userMessages");
  context.response.body = userMessages;
});

router.post('/messages', async (context) => {
  let userMessages = await context.state.session.get("logos_userMessages");

  const id = v4.generate();

  const {
    value: { text },
  } = await context.request.body();

  const messageUser = {
    id: id,
    text: text,
    userFrom: await context.state.session.get("logos_userId"),
    userTo: "0",
    choices: [],
    type: "SIMPLE"
  };

  userMessages.push(messageUser);
  await insertMessage(messageUser);
  await context.state.session.set("logos_userMessages",userMessages);

  context.response.body = messageUser;
});

router.post('/messages_bot', async (context) => {
  const id = v4.generate();
  let userMessages = await context.state.session.get("logos_userMessages");

  let {
    value: { text },
  } = await context.request.body();

  let responseMessage = await findResponse(text);

  const messageBot = {
    id: id,
    text: responseMessage.text,
    userFrom: "0",
    userTo: await context.state.session.get("logos_userId"),
    choices: responseMessage.choices,
    type: responseMessage.type
  };

  userMessages.push(messageBot);
  await insertMessage(messageBot);
  await context.state.session.set("logos_userMessages",userMessages);

  context.response.body = messageBot;
});

export default router;
