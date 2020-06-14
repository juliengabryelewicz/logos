interface User {
  id: string;
  username: string;
}

interface Message {
  id: string;
  text: string;
  userFrom: string;
  userTo: string;
}

export let user : User = {id:'', username: ''};

export const messages = new Map<string, Message>();

export default {
  user,
  messages,
};
