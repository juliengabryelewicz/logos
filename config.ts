const env = Deno.env.toObject();
export const APP_HOST = env.APP_HOST || 'localhost';
export const APP_PORT = env.APP_PORT || 8000;

export const NLU_TYPE = env.NLU_TYPE || "";
export const NLU_URL = env.NLU_URL || "";