import { MessageClassTypes } from "../types/types";
import UI from "./UI";

//! Mesajları yönetmek için sınıf
class Messages {
  messages: MessageClassTypes[];
  constructor() {
    this.messages = [];
  }
  //! Yeni mesaj ekleme metodu
  add(message: MessageClassTypes): void {
    this.messages.push(message);
    UI.displayChatPanel(); //! Sohbet panelini günceller
  }
  //! Tüm mesajları temizleme metodu
  clear(): void {
    this.messages = [];
  }
  //! Tüm mesajları döndüren metot
  get(): MessageClassTypes[] {
    return this.messages;
  }
}

export default Messages;
