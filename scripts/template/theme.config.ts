export const themeConfig = {
  name: "Hotel Name",
  domain: "example.com",

  colors: {
    sand: "#F5F0EB",
    "sand-light": "#FAF8F5",
    "sand-dark": "#E0D8CD",
    ocean: "#2C3E50",
    "ocean-deep": "#1A252F",
    "ocean-light": "#3D5A6E",
    coral: "#C0392B",
    "coral-soft": "#D4635A",
    gold: "#B8860B",
    "gold-light": "#D4A84B",
    white: "#FEFEFE",
    text: "#333333",
    "text-light": "#777777",
  },

  fonts: {
    heading: "Playfair Display",
    body: "Inter",
  },

  borderRadius: "0px",
} as const;

export type ThemeConfig = typeof themeConfig;
