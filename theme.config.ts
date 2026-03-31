export const themeConfig = {
  name: "Curtain Bluff",
  domain: "curtainbluff.com",

  colors: {
    sand: "#E8DED1",
    "sand-light": "#F5F0EA",
    "sand-dark": "#D4C8B8",
    ocean: "#1A4B5C",
    "ocean-deep": "#0D2F3A",
    "ocean-light": "#2A7A8F",
    coral: "#C4705A",
    "coral-soft": "#D4917E",
    gold: "#B8944F",
    "gold-light": "#D4B87A",
    white: "#FEFCF9",
    text: "#3A342E",
    "text-light": "#7A7068",
  },

  fonts: {
    heading: "Cormorant Garamond",
    body: "Libre Franklin",
  },

  borderRadius: "0px",
} as const;

export type ThemeConfig = typeof themeConfig;
