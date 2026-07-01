export const EASE = [0.23, 1, 0.32, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, delay: i * 0.05, ease: EASE },
  }),
};
