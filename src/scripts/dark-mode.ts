/**
 * Smart Dark Mode with Greece (Europe/Athens) timezone detection.
 * - First visit: checks if it's nighttime in Greece (20:00 - 07:00) → dark mode
 * - Manual toggle overrides and saves to localStorage
 * - Respects saved preference on subsequent visits
 */

export function initDarkMode(): void {
  const STORAGE_KEY = 'ergasias-theme';
  const html = document.documentElement;

  function isNightInGreece(): boolean {
    const now = new Date();
    const greekTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Athens' }));
    const hour = greekTime.getHours();
    return hour >= 20 || hour < 7;
  }

  function applyTheme(dark: boolean): void {
    if (dark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }

  function getInitialTheme(): boolean {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      return saved === 'dark';
    }
    return isNightInGreece();
  }

  // Apply initial theme
  const isDark = getInitialTheme();
  applyTheme(isDark);

  // Toggle function exposed globally
  (window as any).toggleDarkMode = () => {
    const currentlyDark = html.classList.contains('dark');
    const newDark = !currentlyDark;
    applyTheme(newDark);
    localStorage.setItem(STORAGE_KEY, newDark ? 'dark' : 'light');
    
    // Update toggle button icons
    updateToggleIcons(newDark);
  };
}

function updateToggleIcons(isDark: boolean): void {
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  if (sunIcon && moonIcon) {
    sunIcon.classList.toggle('hidden', !isDark);
    moonIcon.classList.toggle('hidden', isDark);
  }
}
