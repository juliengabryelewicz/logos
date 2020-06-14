import { Application } from 'https://deno.land/x/oak/mod.ts';
import { Session } from "https://deno.land/x/session/mod.ts";

import models from './models/index.ts';
import routes from './routes/index.ts';

const port = 8000;
const app = new Application();

const session = new Session({ framework: "oak" });
await session.init();

app.use(async (ctx, next) => {
  ctx.state = {
    me: models.user,
    messages: models.messages,
  };

  await next();
});

app.use(session.use()(session));

app.use(routes.session.allowedMethods());
app.use(routes.session.routes());
app.use(routes.message.allowedMethods());
app.use(routes.message.routes());

app.use(async (context) => {
  await context.send({
    root: `${Deno.cwd()}/static`,
    index: "index.html",
  });
});

app.addEventListener('listen', () => {
  console.log(`Listening on: localhost:${port}`);
});

await app.listen({ port });
