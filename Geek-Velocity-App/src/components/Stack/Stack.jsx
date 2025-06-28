// File: Stack.jsx
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

function CardRotate({ children, onSendToBack, sensitivity }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_, info) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 208, height: 208 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  onSelect,
  selectedId,
}) {
  const [cards, setCards] = useState(cardsData);

  const sendToBack = (id) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div
      className="relative"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height + 80,
        perspective: 600,
      }}
    >
      {cards.map((card, index) => {
        const isSelected = card.id === selectedId;
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
          >
            <motion.div
              className={`rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-black relative ${isSelected ? 'animate-pulse scale-105 z-10' : ''
                }`}
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: 0,
                scale: 1 + index * 0.06 - cards.length * 0.06,
                transformOrigin: "center",
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height,
              }}
            >
              <img
                src={card.img}
                alt={`card-${card.id}`}
                className="w-full h-full object-cover pointer-events-none"
              />
              <motion.button
                onClick={() => onSelect?.(card)}
                whileHover={{ scale: 1.05 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 mt-2 px-5 py-2 bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-semibold rounded-full border-2 border-white animate-border-wave"
              >
                Select
              </motion.button>
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
