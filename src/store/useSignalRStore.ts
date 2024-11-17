import SignalRService from "@/services/signalRService";
import { create } from "zustand";

interface SignalRStore {
  signalRInstance: SignalRService | null;
  initializeSignalR: (signalRInstance: SignalRService) => void;
}

export const useSignalRStore = create<SignalRStore>((set) => ({
  signalRInstance: null,
  initializeSignalR: (signalRInstance: SignalRService) => {
    set({ signalRInstance });
  },
}));
