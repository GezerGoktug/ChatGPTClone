import { APIMessageData, MessageClassTypes } from "../types/types";
import UI from "./UI";
import api from "../utils/api";

class API {
  //! API ye bizim yazdığımız mesaj verisi ile bir POST isteği(http isteği) yollar
  //! Karşılığında yapay zekanın bize döndüğü cevabı yollar

  static async sendMessage(message: MessageClassTypes) {
    UI.loader("show"); //! Yüklemeyi başlat

    const messageData : APIMessageData = {
      messages: [
        {
          role: message.role,
          content: message.content,
        },
      ],
      web_access: false,
    };

    try {
      const { data } = await api.post("chatgpt", messageData);
      return data;
    } catch (error) {
      console.error(error);
    } finally {
      UI.loader("hide"); //! Yüklemeyi sonlandır
    }
  }
}

export default API;
