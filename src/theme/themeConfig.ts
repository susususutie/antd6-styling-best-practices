import { theme, type ThemeConfig } from "antd";

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeSettings {
  mode: ThemeMode;
  primaryColor: string;
  borderRadius: number;
  fontSize: number;
  compact: boolean;
}

export const DEFAULT_THEME_SETTINGS: ThemeSettings = {
  mode: "system",
  primaryColor: "#1677ff",
  borderRadius: 6,
  fontSize: 14,
  compact: false,
};

export function resolveDarkMode(mode: ThemeMode, systemDark: boolean) {
  return mode === "system" ? systemDark : mode === "dark";
}

export function createThemeConfig(settings: ThemeSettings, systemDark: boolean): ThemeConfig {
  const dark = resolveDarkMode(settings.mode, systemDark);
  const baseAlgorithm = dark ? theme.darkAlgorithm : theme.defaultAlgorithm;

  return {
    cssVar: {
      key: "styling-lab",
      prefix: "app",
    },
    algorithm: settings.compact ? [baseAlgorithm, theme.compactAlgorithm] : baseAlgorithm,
    token: {
      colorPrimary: settings.primaryColor,
      borderRadius: settings.borderRadius,
      fontSize: settings.fontSize,
    },
  };
}
