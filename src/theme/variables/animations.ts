const animations = {
  fadeIn: {
    from: {
      opacity: 0,
      pointerEvents: "none",
    },

    to: {
      opacity: 1,
      pointerEvents: "auto",
    },
  },

  fadeInDown: {
    from: {
      opacity: 0,
      pointerEvents: "none",
      transform: "translate3d(0, -4px, 0)",
    },

    to: {
      opacity: 1,
      pointerEvents: "auto",
      transform: "translate3d(0, 0, 0)",
    },
  },

  fadeInUp: {
    from: {
      opacity: 0,
      pointerEvents: "none",
      transform: "translate3d(0, 15px, 0)",
    },

    to: {
      opacity: 1,
      pointerEvents: "auto",
      transform: "translate3d(0, 0, 0)",
    },
  },

  fadeOut: {
    "0%": { opacity: 1 },
    "80%": { opacity: 1 },
    "100%": { opacity: 0, visibility: "hidden" },
  },
};

export { animations };
