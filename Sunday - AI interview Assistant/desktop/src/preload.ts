import { contextBridge, ipcRenderer } from 'electron';

export interface AudioSource {
  id: string;
  name: string;
}

export interface ScreenSource {
  id: string;
  name: string;
  thumbnailDataURL: string;
}

const sundayAPI = {
  app: {
    getVersion: (): Promise<string> => ipcRenderer.invoke('sunday:app:get-version'),
  },
  overlay: {
    show: (): Promise<void> => ipcRenderer.invoke('sunday:overlay:show'),
    hide: (): Promise<void> => ipcRenderer.invoke('sunday:overlay:hide'),
    toggle: (): Promise<void> => ipcRenderer.invoke('sunday:overlay:toggle'),
  },
  audio: {
    getSources: (): Promise<AudioSource[]> => ipcRenderer.invoke('sunday:audio:get-sources'),
  },
  screen: {
    getSources: (): Promise<ScreenSource[]> => ipcRenderer.invoke('sunday:screen:get-sources'),
  },
};

contextBridge.exposeInMainWorld('sunday', sundayAPI);

export type SundayAPI = typeof sundayAPI;
