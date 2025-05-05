class ReverbService {
    constructor() {
        this.socket = null;
        this.listeners = {};
    }

    connect() {
        this.socket = new WebSocket('wss://bf0c-2a09-bac1-34e0-18-00-da-ec.ngrok-free.app');

        this.socket.onopen = () => {
            console.log('Connected to Laravel Reverb');
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const channel = data.channel;
            if (this.listeners[channel]) {
                this.listeners[channel](data.payload);
            }
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        this.socket.onclose = () => {
            console.log('Disconnected from Laravel Reverb');
        };
    }

    subscribe(channel, callback) {
        if (!this.socket) this.connect();

        this.listeners[channel] = callback;
        console.log(`Subscribed to ${channel}`);
    }

    unsubscribe(channel) {
        delete this.listeners[channel];
        console.log(`Unsubscribed from ${channel}`);
    }
}

export default new ReverbService();