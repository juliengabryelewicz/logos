const env = Deno.env.toObject();
export const APP_HOST = env.APP_HOST || 'localhost';
export const APP_PORT = env.APP_PORT || 8000;

export const NUM_MESSAGES_SESSION = env.NUM_MESSAGES_SESSION || 20;

export const NLU_TYPE = env.NLU_TYPE || "";
export const NLU_URL = env.NLU_URL || "";

export const USE_DATABASE = env.USE_DATABASE || false;
export const USER_DATABASE = env.USER_DATABASE || "";
export const PASSWORD_DATABASE = env.PASSWORD_DATABASE || "";
export const NAME_DATABASE = env.NAME_DATABASE || "";
export const HOST_DATABASE = env.HOST_DATABASE || "localhost";
export const PORT_DATABASE = env.PORT_DATABASE || 5432;