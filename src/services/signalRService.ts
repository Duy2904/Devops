import * as signalR from "@microsoft/signalr";

import { showLogError } from "@/utils/show-log-error.ts";
import { SIGNALR_HUB_ADDRESS } from "@/configs";

class SignalRService {
  static instance: SignalRService;

  public events: (onMessageReceived: (message: string) => void) => void;

  private connection: signalR.HubConnection;

  constructor(token: string) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(SIGNALR_HUB_ADDRESS, { accessTokenFactory: () => token })
      .withAutomaticReconnect()
      .build();

    this.connection.start().catch((err) => showLogError(err));

    this.events = (onMessageReceived) => {
      this.connection.on("ReceiveMessage", (message) => {
        onMessageReceived(message);
      });
    };
  }

  public static getInstance(token?: string): SignalRService {
    if (!SignalRService.instance && token) {
      SignalRService.instance = new SignalRService(token);
    }

    return SignalRService.instance;
  }

  // public newMessage = (messages: string) => {
  //     this.connection.send('newMessage', 'foo', messages).then(x => console.log('sent'));
  // };
}

export default SignalRService;
