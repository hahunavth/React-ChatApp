import React, { useState } from "react";

export const ThemeContext = React.createContext();

export const colorScheme = {
  light: {
    colors: {
      primary: "#014cfc",
      secondary: "#36c9b2",
      black: "#1a233b",
      white: "#f3f6fb",
      yellow: "#ffc951",
      red: "#ff5858",
      tomato: "#ff8464",
      purple: "#7563c4",
      textPrimary: "#152d43",
      textSecondary: "#9fa4b1",
      border: "#d4e1ff",
      background: "#ffffff",
      backgroundPrimary: "#e6edf4",
    },
    opacity: {
      primary: 0.6,
      secondary: 0.3,
    },
  },
  dark: {
    colors: {
      primary: "#014cfc",
      secondary: "#36c9b2",
      black: "#1a233b",
      white: "#ccc8c1",
      yellow: "#ffc951",
      red: "#ff5858",
      tomato: "#ff8464",
      purple: "#7563c4",
      textPrimary: "#152d43",
      textSecondary: "#9fa4b1",
      border: "#222526",
      background: "#181a1b",
      backgroundPrimary: "#222526",
    },
    opacity: {
      primary: 0.6,
      secondary: 0.3,
    },
  },
};

// export default function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState("light");

//   const getColorScheme = () => {
//     return colorScheme[theme];
//   };

//   const setLightTheme = () => {
//     setTheme("light");
//   };

//   const setDarkTheme = () => {
//     setTheme("dark");
//   };

//   return (
//     <ThemeContext.Provider
//       value={{ theme, setLightTheme, setDarkTheme, getColorScheme }}
//     >
//       {children}
//     </ThemeContext.Provider>
//   );
// }
