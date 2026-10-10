export const colors = {
  primary: "#713600",
  secondary: "#C05800",
  light: "#FDFBD4",
  dark: "#38240D",

  // Additional utility colors
  white: "#FFFFFF",
  black: "#000000",
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
  red: {
    50: "#FEF2F2",
    500: "#EF4444",
    600: "#DC2626",
  },
  green: {
    50: "#F0FDF4",
    500: "#22C55E",
    600: "#16A34A",
  },
} as const;

export type ColorKey = keyof typeof colors;
