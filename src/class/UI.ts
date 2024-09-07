import { DOMElementType, InputElementType } from "../types/types";
import API from "./API";
import { messagesClass } from "../main";
import Message from "./Message";
import ThemeMode from "./ThemeMode";

class UI {
  //! Yükleyici oluşturma ve kaldırma
  static loader(status: string): void {
    const loader: DOMElementType = document.getElementById("loader");
    if (status === "show") {
      loader?.classList.add("d-flex");
      loader?.classList.remove("d-none");
    } else if (status === "hide") {
      loader?.classList.add("d-none");
      loader?.classList.remove("d-flex");
    }
  }
  //! Sohbet arayüzünü güncelleme
  static displayChatPanel() {
    const messages = messagesClass.get();
    const chatPanel: DOMElementType = document.querySelector("#chat");
    let result = "";
    messages.forEach((message) => {
      result += `
          <div class="message d-flex ${
            message.role === "user" ? "justify-content-end" : ""
          } gap-2 gap-md-4">
          ${
            message.role === "AI"
              ? "<img src='/ChatGPT-Logo.svg.png'  class='bg-white p-1 rounded-circle' alt='' />"
              : ""
          }  
          <div style="width: max-content" class="p-3 message-content ${
            message.role === "user" ? "" : "border"
          }  rounded">
              ${message.content}
            </div>
          </div>
          `;
    });
    if (chatPanel) chatPanel.innerHTML = result;
  }
  //! Ana paneli değiştirme metodu
  static chanceMainPanel() {
    const panel: DOMElementType = document.getElementById("main-panel");
    //! Ana paneli değiştirme metodu
    if (!panel?.classList.contains("d-none")) {
      const chatPanel: DOMElementType =
        document.querySelector("#chat-container");
      panel?.classList.add("d-none");
      chatPanel?.classList.remove("d-none");
      chatPanel?.classList.add("d-flex");
    }
  }
  //! Mesaj gönderme işlemi
  static async sendMessage() : Promise<void> {
    const messageInput = <InputElementType>
      document.getElementById("message-input");
    UI.chanceMainPanel(); //! Ana paneli değiştirir
    const message = new Message(messageInput?.value, "user");
    messageInput.value = ""; //! Mesaj girişini temizler
    messagesClass.add(message);
    //! API'ye mesaj gönderir ve cevabı bekler
    const { result } = await API.sendMessage(message);
    //! Cevapdaki bold yazıları ,boşlukları , ve kod satırlarını HTML'E uygun olcak şekilde işler
    const parts = result.split(/(```[\s\S]*?```|`[\s\S]*?`)/g);
    const processedParts = parts.map((part: string) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        return `<pre><code>${part.replace(/```/g, "")}</code></pre>`;
      } else if (part.startsWith("`") && part.endsWith("`")) {
        return `<code>${part.replace(/`/g, "")}</code>`;
      } else {
        return part
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .split("\n")
          .map((desc) => `${desc} <br>`)
          .join("");
      }
    });
    const resultMessage  = new Message(processedParts.join(""), "AI");
    //! Mesajlara ekle
    messagesClass.add(resultMessage);
  }
  //! Mevcut Temayı uygular
  static applyTheme() : void {
    const body: DOMElementType = document.getElementsByTagName("body")[0];
    const themeButton: HTMLElement | null = document.getElementById("theme-button");
    const theme = new ThemeMode();
    if(!themeButton)
        return;
    if (theme.getTheme() === "dark") {
      body.classList.add("dark-mode");
      themeButton.classList = "bi bi-moon-fill border px-3 py-2 rounded";
    } else {
      body.classList.remove("dark-mode");
      themeButton.classList =
        "bi bi-brightness-high-fill border px-3 py-2 rounded";
    }
  }
  //! Tema butonuna basıldığında temayı değiştirir
  static handleTheme() : void {
    const theme = new ThemeMode();
    theme.changeTheme();
    UI.applyTheme(); //! Yeni temayı uygular
  }
  //! Mesajları temizleme
  static clearMessages() : void {
    messagesClass.clear();
    UI.displayChatPanel();
  }
}

export default UI;
