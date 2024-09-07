export type DOMElementType = HTMLElement | null;
export type InputElementType = HTMLInputElement;

export interface MessageClassTypes {
    content: string
    role:string
}

export interface APIMessageData {
    messages: MessageClassTypes[];
    web_access: boolean;
  }