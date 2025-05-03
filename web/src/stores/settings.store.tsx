import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Settings = {
    theme: 'system' | 'dark' | 'light'
}

type SettingsStore = {
    settings: Settings,
    setTheme: (theme: 'system' | 'dark' | 'light') => void
};

export const useSettingsStore = create<SettingsStore>()(
    devtools(
        persist<SettingsStore>((set) => ({
            settings: {
                theme: 'system'
            },
            setTheme: (theme) => set({ settings: { theme } })
        }), { name: 'settings' }
        )
    )
);