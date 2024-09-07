import { MessageClassTypes } from "../types/types";

class Message implements MessageClassTypes {
  content: string;
  role: string;

  constructor(content: string, role: string) {
    this.content = content;
    this.role = role;
  }
}

export default Message;