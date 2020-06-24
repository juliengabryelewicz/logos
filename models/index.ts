interface User {
  id: string;
  username: string;
}

export interface Message {
  id: string;
  text: string;
  userFrom: string;
  userTo: string;
  choices: Array<string>;
  type: string;
}

export interface ResponseMessage {
  text: string;
  type: string;
  choices: Array<string>;
}

export let user : User = {id:'', username: ''};

export let messages = Array<Message>();

export default {
  user,
  messages,
};
