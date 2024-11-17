import { useSignalRStore } from '../store/useSignalRStore';

export const useSignalRInstance = () => {
    const { signalRInstance } = useSignalRStore();

    return signalRInstance;
};

export default useSignalRStore;
