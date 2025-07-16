module.exports = {
  theme: {
    extend: {
      animation: {
        fade: 'fade 0.3s ease-in-out',
      },
      keyframes: {
        fade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
