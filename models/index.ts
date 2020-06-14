interface User {
  id: string;
  username: string;
}

export interface Message {
  id: string;
  text: string;
  userFrom: string;
  userTo: string;
}

export let user : User = {id:'', username: ''};

export let messages = Array<Message>();

export default {
  user,
  messages,
};
