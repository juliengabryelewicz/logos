interface User {
  id: string;
  username: string;
}

export enum TypeMessage{
  Simple = "SIMPLE",
  Choices = "CHOICES",
  Calendar = "CALENDAR",
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

export default {
  user,
};
