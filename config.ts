const env = Deno.env.toObject();
export const APP_HOST = env.APP_HOST || 'localhost';
export const APP_PORT = env.APP_PORT || 8000;