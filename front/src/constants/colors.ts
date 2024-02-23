export type ColorTheme = {
  primary: string;
  primaryDark: string;
  secondary: string;
  secondaryDark: string;
  canvas: string;
  background: string;
  icon: string;
  text: {
    body: string;
    title: string;
    subtitle: string;
    header: string;
  };
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
    canvas: "#1d2437",
    background: "#faf1ff",
    text: {
      body: "#000",
      title: "#000",
      subtitle: "grey",
      header: "#000",
    },
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
    canvas: "#ffffffeb",
    background: "#faf1ff",
    text: {
      body: "#000",
      title: "#000",
      subtitle: "grey",
      header: "#000",
    },
    textInput: {
      background: "white",
      placeholder: "#6A6A6A",
      text: "#FFFFFF",
    },
    ...sharedColors,
  },
};

export default Colors;
