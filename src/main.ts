import { DOMElementType } from "./types/types";
import Messages from "./class/Messages";
import UI from "./class/UI";

export const messagesClass = new Messages();

/**
 * ! DOM ilk yüklendiğinde butonlara event listenerları ekliyoruz.
 *
 */
const firstDOMLoadingHandle = (): void => {
  const themeButton: DOMElementType = document.getElementById("theme-button");
  const sendButton: DOMElementType = document.getElementById("send-button");
  const clearButton: DOMElementType = document.getElementById("clear-button");
  themeButton?.addEventListener("click", (): void => UI.handleTheme());
  sendButton?.addEventListener("click", (): Promise<void> => UI.sendMessage());
  clearButton?.addEventListener("click", (): void => UI.clearMessages());
  UI.applyTheme();
};

window.addEventListener("DOMContentLoaded", firstDOMLoadingHandle);
