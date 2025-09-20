import { create } from "zustand";

interface GlobalState {
  activeIndexServicesCard: string;
  activeChildIndexServicesCard: string;
  activeSelection: string;
  isNotificationPanelActive: boolean;
  setActiveIndexServicesCard: (value: string) => void;
  setActiveChildIndexServicesCard: (value: string) => void;
  setActiveSelection: (value: string) => void;
  setNotificationPanelActive: (value: boolean) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  activeIndexServicesCard: "Default",
  activeChildIndexServicesCard: "Default",
  activeSelection: "Default",
  isNotificationPanelActive: false,
  setActiveIndexServicesCard: (value: string) =>
    set({ activeIndexServicesCard: value }),
  setActiveChildIndexServicesCard: (value: string) =>
    set({ activeChildIndexServicesCard: value }),
  setActiveSelection: (value: string) => set({ activeSelection: value }),
  setNotificationPanelActive: (value: boolean) =>
    set({ isNotificationPanelActive: value }),
}));
