import { create } from "zustand";

interface GlobalState {
  // Current active section (Dashboard, Pages, etc.)
  activeSection: string;
  // Active menu item in Dashboard section
  activeDashboardItem: string;
  activeDashboardChild: string;
  // Active menu item in Pages section
  activePagesItem: string;
  activePagesChild: string;
  // Legacy support - computed based on current section
  activeIndexServicesCard: string;
  activeChildIndexServicesCard: string;
  activeSelection: string;
  isNotificationPanelActive: boolean;
  isSidebarCollapsed: boolean;
  
  // Section management
  setActiveSection: (section: string) => void;
  // Dashboard section methods
  setActiveDashboardItem: (value: string) => void;
  setActiveDashboardChild: (value: string) => void;
  // Pages section methods
  setActivePagesItem: (value: string) => void;
  setActivePagesChild: (value: string) => void;
  // Legacy methods - will delegate to appropriate section
  setActiveIndexServicesCard: (value: string) => void;
  setActiveChildIndexServicesCard: (value: string) => void;
  setActiveSelection: (value: string) => void;
  setNotificationPanelActive: (value: boolean) => void;
  setSidebarCollapsed: (value: boolean) => void;
  // Utility methods
  clearSectionStates: () => void;
}

export const useGlobalStore = create<GlobalState>((set, get) => ({
  // State
  activeSection: "Dashboard",
  activeDashboardItem: "Default",
  activeDashboardChild: "Default",
  activePagesItem: "User Profile",
  activePagesChild: "Default",
  // Legacy properties - will be updated when section changes
  activeIndexServicesCard: "Default",
  activeChildIndexServicesCard: "Default",
  activeSelection: "Default",
  isNotificationPanelActive: false,
  isSidebarCollapsed: false,

  // Actions
  setActiveSection: (section: string) => {
    const state = get();
    set({
      activeSection: section,
      // Update legacy properties based on new section
      activeIndexServicesCard: section === "Dashboard" ? state.activeDashboardItem : state.activePagesItem,
      activeChildIndexServicesCard: section === "Dashboard" ? state.activeDashboardChild : state.activePagesChild,
      // Clear child states when switching sections if needed
      activeDashboardChild: section === "Dashboard" ? state.activeDashboardChild : "Default",
      activePagesChild: section === "Pages" ? state.activePagesChild : "Default",
    });
  },

  setActiveDashboardItem: (value: string) => {
    set((state) => ({
      activeDashboardItem: value,
      activeSection: "Dashboard",
      activeIndexServicesCard: value,
      activeDashboardChild: "Default", // Reset child when parent changes
      activeChildIndexServicesCard: "Default",
    }));
  },
  
  setActiveDashboardChild: (value: string) => {
    set({
      activeDashboardChild: value,
      activeSection: "Dashboard",
      activeChildIndexServicesCard: value,
    });
  },

  setActivePagesItem: (value: string) => {
    set((state) => ({
      activePagesItem: value,
      activeSection: "Pages",
      activeIndexServicesCard: value,
      activePagesChild: "Default", // Reset child when parent changes
      activeChildIndexServicesCard: "Default",
    }));
  },
    
  setActivePagesChild: (value: string) => {
    set({
      activePagesChild: value,
      activeSection: "Pages",
      activeChildIndexServicesCard: value,
    });
  },

  // Legacy methods for backward compatibility
  setActiveIndexServicesCard: (value: string) => {
    const state = get();
    if (state.activeSection === "Dashboard") {
      set({
        activeDashboardItem: value,
        activeIndexServicesCard: value,
        activeDashboardChild: "Default",
        activeChildIndexServicesCard: "Default",
      });
    } else {
      set({
        activePagesItem: value,
        activeIndexServicesCard: value,
        activePagesChild: "Default",
        activeChildIndexServicesCard: "Default",
      });
    }
  },

  setActiveChildIndexServicesCard: (value: string) => {
    const state = get();
    if (state.activeSection === "Dashboard") {
      set({
        activeDashboardChild: value,
        activeChildIndexServicesCard: value,
      });
    } else {
      set({
        activePagesChild: value,
        activeChildIndexServicesCard: value,
      });
    }
  },

  setActiveSelection: (value: string) => set({ activeSelection: value }),
  
  setNotificationPanelActive: (value: boolean) =>
    set({ isNotificationPanelActive: value }),

  setSidebarCollapsed: (value: boolean) =>
    set({ isSidebarCollapsed: value }),

  clearSectionStates: () =>
    set({
      activeDashboardItem: "Default",
      activeDashboardChild: "Default",
      activePagesItem: "User Profile",
      activePagesChild: "Default",
      activeIndexServicesCard: "Default",
      activeChildIndexServicesCard: "Default",
      // Don't reset sidebar state when clearing sections
    }),
}));
