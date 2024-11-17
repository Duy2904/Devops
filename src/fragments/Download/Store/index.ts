import { DownloadSignalModel } from "../Feature";
import { create } from "zustand";

interface DownloadItemStore {
    itemDownload: DownloadSignalModel | null;
    // eslint-disable-next-line no-unused-vars
    setItemDownload: (itemDownload: DownloadSignalModel | null) => void;
}

export const useDownloadStore = create<DownloadItemStore>(set => ({
    itemDownload: null,
    setItemDownload: (ItemDownload: DownloadSignalModel | null) => set({ itemDownload: ItemDownload })
}))