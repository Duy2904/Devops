import { SignalRService } from '../services/signalRService';
import { create } from 'zustand';

interface SignalRStore {
    signalRInstance: SignalRService | null;
    signalConnectedId: string | null;
    initializeSignalR: (signalRInstance: SignalRService) => void;
    setSignalConnectedId: (connectedId: string | null) => void;
}

export const useSignalRStore = create<SignalRStore>(set => ({
    signalRInstance: null,
    signalConnectedId: null,
    initializeSignalR: (signalRInstance: SignalRService) => {
        set({ signalRInstance });
    },
    setSignalConnectedId: (connectedId: string | null) => {
        set({ signalConnectedId: connectedId });
    },
}));
