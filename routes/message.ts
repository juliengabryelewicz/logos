import { Router, helpers } from 'https://deno.land/x/oak/mod.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { findResponseRegex } from '../helpers/regex.ts';

const router = new Router();

router.get('/messages', (context) => {
  context.response.body = Array.from(context.state.messages.values());
});

router.post('/messages', async (context) => {
  const id = v4.generate();

  const {
    value: { text },
  } = await context.request.body();

  context.state.messages.set(id, {
    id,
    text,
    userFrom: context.state.me.id,
    userTo: "0",
  });

  context.response.body = context.state.messages.get(id);
});

router.post('/messages_bot', async (context) => {
  const id = v4.generate();

  let {
    value: { text },
  } = await context.request.body();

  text = findResponseRegex(text);

  context.state.messages.set(id, {
    id,
    text,
    userFrom: "0",
    userTo: context.state.me.id,
  });

  context.response.body = context.state.messages.get(id);
});

export default router;
