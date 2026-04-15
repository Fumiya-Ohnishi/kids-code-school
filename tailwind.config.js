/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky:   { DEFAULT: "#3B9EFF", light: "#7EC8FF", dark: "#1A6FD4" },
        lemon: { DEFAULT: "#FFD94A", light: "#FFF0A0", dark: "#E6B800" },
        mint:  { DEFAULT: "#2DD4A0", light: "#A7F3D0", dark: "#0FA876" },
        coral: { DEFAULT: "#FF7B7B", light: "#FFB3B3" },
        navy:  { DEFAULT: "#1E3A5F", light: "#2C5282" },
        cream: "#FFFBF0",
      },
      fontFamily: {
        round: ['"M PLUS Rounded 1c"', '"Nunito"', 'sans-serif'],
        sans:  ['"Noto Sans JP"', 'sans-serif'],
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
        xl4: "2.5rem",
      },
      keyframes: {
        float:     { "0%,100%": { transform: "translateY(0)" },  "50%": { transform: "translateY(-12px)" } },
        floatSlow: { "0%,100%": { transform: "translateY(0)" },  "50%": { transform: "translateY(-8px)"  } },
        bounce2:   { "0%,100%": { transform: "translateY(0)" },  "40%": { transform: "translateY(-18px)" }, "60%": { transform: "translateY(-8px)" } },
        spin2:     { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
        spinSlow:  { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
        wiggle:    { "0%,100%": { transform: "rotate(-5deg)" }, "50%": { transform: "rotate(5deg)" } },
        pop:       { "0%": { transform: "scale(0.8)", opacity: "0" }, "70%": { transform: "scale(1.05)" }, "100%": { transform: "scale(1)", opacity: "1" } },
        fadeUp:    { from: { opacity: "0", transform: "translateY(28px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        shimmer:   { "0%": { backgroundPosition: "-200% center" }, "100%": { backgroundPosition: "200% center" } },
        pulse2:    { "0%,100%": { transform: "scale(1)" }, "50%": { transform: "scale(1.06)" } },
        blink:     { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
        slideLeft: { from: { transform: "translateX(60px)", opacity: "0" }, to: { transform: "translateX(0)", opacity: "1" } },
        typewriter:{ from: { width: "0" }, to: { width: "100%" } },
      },
      animation: {
        float:      "float 3s ease-in-out infinite",
        floatSlow:  "floatSlow 4s ease-in-out infinite",
        floatDelay: "float 3s ease-in-out 1s infinite",
        bounce2:    "bounce2 1.8s ease-in-out infinite",
        spin2:      "spin2 2s linear infinite",
        spinSlow:   "spinSlow 8s linear infinite",
        wiggle:     "wiggle 1.5s ease-in-out infinite",
        pop:        "pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
        fadeUp:     "fadeUp 0.6s cubic-bezier(0.4,0,0.2,1) both",
        shimmer:    "shimmer 3s ease-in-out infinite",
        pulse2:     "pulse2 2s ease-in-out infinite",
        blink:      "blink 1s step-end infinite",
        slideLeft:  "slideLeft 0.5s ease both",
      },
    },
  },
  plugins: [],
}
