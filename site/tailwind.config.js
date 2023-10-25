import colors from "tailwindcss/colors";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        gray: colors.stone,
      },
      typography(theme) {
        return {
          DEFAULT: {
            css: {
              a: {
                "&:hover": {
                  color: theme("colors.orange.500"),
                },
                "&:focus": {
                  color: theme("colors.orange.500"),
                  outlineColor: theme("colors.orange.500"),
                },
              },
              "code::before": {
                content: "none",
              },
              "code::after": {
                content: "none",
              },
              code: {
                color: theme("colors.gray.500"),
                backgroundColor: theme("colors.stone.50"),
                borderRadius: theme("borderRadius.DEFAULT"),
                borderWidth: theme("borderWidth.DEFAULT"),
                borderColor: theme("colors.stone.200"),
                paddingLeft: theme("spacing[1.5]"),
                paddingRight: theme("spacing[1.5]"),
                paddingTop: theme("spacing.1"),
                paddingBottom: theme("spacing.1"),
              },
            },
          },
        };
      },
    },
  },
  darkMode: "class",
  plugins: [typography()],
};
