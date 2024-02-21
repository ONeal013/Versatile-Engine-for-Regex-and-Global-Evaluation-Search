export type ColorTheme = {
  primary: string;
  primaryDark: string;
  secondary: string;
  secondaryDark: string;
  icon: string;
  text: string;
  textInput: {
    background: string;
    placeholder: string;
    text: string;
  };
};

const sharedColors = {
  black: "#000000",
  white: "#FFFFFF",
};

type SharedColors = typeof sharedColors;

export type TColors = ColorTheme & SharedColors;

type ColorPalettes = {
  light: TColors;
  dark: TColors;
};

const Colors: ColorPalettes = {
  dark: {
    primary: "#1d2437",
    primaryDark: "#4d5e92",
    secondary: "#737df7",
    secondaryDark: "#ea5cc3",
    icon: "#566fb0",
    text: "#FFFFFF",
    textInput: {
      background: "white",
      placeholder: "#6A6A6A",
      text: "#FFFFFF",
    },
    ...sharedColors,
  },
  light: {
    primary: "#1d2437",
    primaryDark: "#4d5e92",
    secondary: "#737df7",
    secondaryDark: "#ea5cc3",
    icon: "#566fb0",
    text: "#FFFFFF",
    textInput: {
      background: "white",
      placeholder: "#6A6A6A",
      text: "#FFFFFF",
    },
    ...sharedColors,
  },
};

export default Colors;
