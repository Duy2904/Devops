import * as signalR from '@microsoft/signalr';

export class SignalRService {
    private static instance: SignalRService;
    private connection: signalR.HubConnection;

    private constructor(token: string) {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(import.meta.env.VITE_NOTIFICATION_HUB, { accessTokenFactory: () => token })
            .withAutomaticReconnect()
            .build();
    }

    public static getInstance(token?: string): SignalRService {
        if (!SignalRService.instance && token) {
            SignalRService.instance = new SignalRService(token);
        } else if (SignalRService.instance && token) {
            SignalRService.instance.updateToken(token);
        }

        return SignalRService.instance;
    }

    async startConnection() {
        try {
            if (this.connection.state === signalR.HubConnectionState.Disconnected) {
                await this.connection.start();
                // eslint-disable-next-line no-console
                console.log('SignalR Connected.');
                return this.connection.connectionId;
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('SignalR Connection Error: ', err);
            return null;
        }
    }

    async updateToken(token: string) {
        if (this.connection.state !== signalR.HubConnectionState.Disconnected) {
            this.connection
                .stop()
                .then(() => {
                    this.connection = new signalR.HubConnectionBuilder()
                        .withUrl(import.meta.env.VITE_NOTIFICATION_HUB, { accessTokenFactory: () => token })
                        .withAutomaticReconnect()
                        .build();
                    this.startConnection(); // restart the connection with new token
                })
                .catch(err => {
                    // eslint-disable-next-line no-console
                    console.error('Error while stopping the connection: ', err);
                });
        }
    }

    // eslint-disable-next-line no-unused-vars
    on(callback: (message: string) => void) {
        this.connection.off(import.meta.env.VITE_NOTIFICATION_METHOD_NAME);
        this.connection.on(import.meta.env.VITE_NOTIFICATION_METHOD_NAME, callback);
    }
}
