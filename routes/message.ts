import { Router, helpers } from 'https://deno.land/x/oak/mod.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { findResponseRegex } from '../helpers/regex.ts';
import { Message } from '../models/index.ts';

const router = new Router();

router.get('/messages', async (context) => {
  let userId = await context.state.session.get("logos_userId");
  context.response.body = context.state.messages.filter((message : Message) => message.userFrom === userId || message.userTo === userId);
});

router.post('/messages', async (context) => {
  const id = v4.generate();

  const {
    value: { text },
  } = await context.request.body();

  const messageUser = {
    id,
    text,
    userFrom: await context.state.session.get("logos_userId"),
    userTo: "0",
  };

  context.state.messages.push(messageUser);

  context.response.body = messageUser;
});

router.post('/messages_bot', async (context) => {
  const id = v4.generate();

  let {
    value: { text },
  } = await context.request.body();

  text = findResponseRegex(text);

  const messageBot = {
    id,
    text,
    userFrom: "0",
    userTo: await context.state.session.get("logos_userId"),
  };

  context.state.messages.push(messageBot);

  context.response.body = messageBot;
});

export default router;
