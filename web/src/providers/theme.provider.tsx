import { useSettingsStore } from "@/stores/settings.store"
import { useEffect } from "react"


type ThemeProviderProps = {
    children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const { settings } = useSettingsStore()

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove("light", "dark")

        if (settings.theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
            root.classList.add(systemTheme)
            return
        }

        root.classList.add(settings.theme)
    }, [settings.theme])

    return <>{children}</>
}
