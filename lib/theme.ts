export type ThemePreference = 'light' | 'dark' | 'system'

export const THEME_STORAGE_KEY = 'linearlab:theme'

/**
 * Runs before first paint (inlined in <head>) so the stored theme applies
 * without a flash. Kept dependency-free and wrapped in try/catch because
 * storage can be blocked.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t}}catch(e){}})()`
