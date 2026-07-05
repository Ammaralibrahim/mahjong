import { Variants } from "framer-motion";

// Gerçekçi kart çevirme animasyonu
export const tileFlipVariants: Variants = {
  hidden: {
    rotateY: 180,
    scale: 0.8,
    opacity: 0,
    zIndex: 1,
  },
  visible: {
    rotateY: 0,
    scale: 1,
    opacity: 1,
    zIndex: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
      duration: 0.6,
    },
  },
  exit: {
    rotateY: -90,
    scale: 0.9,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

// Destansı kart patlama efekti (yeni kart geldiğinde)
export const tileBurstVariants: Variants = {
  hidden: {
    scale: 0,
    rotate: 180,
    opacity: 0,
  },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 300,
      duration: 0.8,
      delay: 0.1,
    },
  },
};

// Kart fırlatma efekti (bet atarken)
export const tileThrowVariants: Variants = {
  initial: {
    y: 0,
    x: 0,
    scale: 1,
    rotate: 0,
    opacity: 1,
  },
  higher: {
    y: -100,
    x: 80,
    scale: 1.3,
    rotate: 15,
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1], // Custom cubic-bezier
    },
  },
  lower: {
    y: 100,
    x: -80,
    scale: 0.7,
    rotate: -15,
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

// Puan patlaması efekti
export const scorePopVariants: Variants = {
  hidden: {
    scale: 0,
    y: 20,
    opacity: 0,
  },
  visible: {
    scale: 1.5,
    y: -40,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 8,
      stiffness: 400,
      duration: 0.5,
    },
  },
  exit: {
    scale: 0,
    y: -80,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// Kart sallama efekti (hover)
export const tileWobbleVariants: Variants = {
  idle: {
    rotate: 0,
    scale: 1,
  },
  hover: {
    rotate: [0, -3, 3, -2, 2, 0],
    scale: 1.05,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.95,
    rotate: 0,
    transition: {
      duration: 0.1,
    },
  },
};

// Sayfa geçiş efektleri
export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: -20,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

// Buton patlama efekti
export const buttonPopVariants: Variants = {
  idle: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 400,
    },
  },
  tap: {
    scale: 0.92,
    transition: {
      duration: 0.1,
    },
  },
};

// Leaderboard sıralama animasyonu
export const leaderboardItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
    scale: 0.9,
  },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 200,
      delay: index * 0.08,
    },
  }),
};

// Particles/konfeti efekti (kutlama)
export const confettiVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    y: 0,
  },
  visible: (index: number) => ({
    opacity: [0, 1, 0],
    scale: [0, 1.5, 0],
    y: [0, -100 - Math.random() * 100, -200 - Math.random() * 100],
    x: [0, (Math.random() - 0.5) * 200],
    rotate: [0, Math.random() * 720],
    transition: {
      duration: 1.5,
      delay: index * 0.05,
      ease: "easeOut",
    },
  }),
};

// Gerçekçi kart dağıtma animasyonu
export const dealCardVariants: Variants = {
  hidden: {
    rotateY: 90,
    scale: 0.6,
    opacity: 0,
    x: 50,
  },
  visible: (index: number) => ({
    rotateY: 0,
    scale: 1,
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 250,
      delay: index * 0.12,
      duration: 0.5,
    },
  }),
};