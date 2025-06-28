import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  RotateCcw,
  Edit3,
  Check,
  X,
} from "lucide-react";

const EdumonApp = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [editingName, setEditingName] = useState(null);
  const [tempName, setTempName] = useState("");
  const [brainBerries, setBrainBerries] = useState(10000000); // Default 10M brain berries
  const [showEvolutionAnimation, setShowEvolutionAnimation] = useState(false);

  // Edumon data structure - 3 stage evolution system
  const [edumonData, setEdumonData] = useState([
    {
      id: 1,
      evolutionStage: 0,
      customName: "",
      defaultNames: ["Flame Starter", "Flame Guardian", "Flame Master"],
      images: [
        "https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=Flame+Starter",
        "https://via.placeholder.com/200x200/FF4444/FFFFFF?text=Flame+Guardian",
        "https://via.placeholder.com/200x200/FF2222/FFFFFF?text=Flame+Master",
      ],
      elements: ["🔥"],
      bgColors: [
        "from-red-500 to-orange-600",
        "from-red-600 to-orange-700",
        "from-red-700 to-orange-800",
      ],
    },
    {
      id: 2,
      evolutionStage: 0,
      customName: "",
      defaultNames: ["Aqua Sprout", "Aqua Defender", "Aqua Champion"],
      images: [
        "https://via.placeholder.com/200x200/4ECDC4/FFFFFF?text=Aqua+Sprout",
        "https://via.placeholder.com/200x200/3ABAA8/FFFFFF?text=Aqua+Defender",
        "https://via.placeholder.com/200x200/2A9D8F/FFFFFF?text=Aqua+Champion",
      ],
      elements: ["💧"],
      bgColors: [
        "from-blue-500 to-cyan-600",
        "from-blue-600 to-cyan-700",
        "from-blue-700 to-cyan-800",
      ],
    },
    {
      id: 3,
      evolutionStage: 0,
      customName: "",
      defaultNames: ["Nature Seed", "Nature Warrior", "Nature Lord"],
      images: [
        "https://via.placeholder.com/200x200/6BCF7F/FFFFFF?text=Nature+Seed",
        "https://via.placeholder.com/200x200/4CAF50/FFFFFF?text=Nature+Warrior",
        "https://via.placeholder.com/200x200/388E3C/FFFFFF?text=Nature+Lord",
      ],
      elements: ["🌱"],
      bgColors: [
        "from-green-500 to-emerald-600",
        "from-green-600 to-emerald-700",
        "from-green-700 to-emerald-800",
      ],
    },
    {
      id: 4,
      evolutionStage: 0,
      customName: "",
      defaultNames: ["Spark Tiny", "Spark Bolt", "Spark Thunder"],
      images: [
        "https://via.placeholder.com/200x200/FFE082/000000?text=Spark+Tiny",
        "https://via.placeholder.com/200x200/FFD93D/000000?text=Spark+Bolt",
        "https://via.placeholder.com/200x200/FFA500/000000?text=Spark+Thunder",
      ],
      elements: ["⚡"],
      bgColors: [
        "from-yellow-400 to-amber-500",
        "from-yellow-500 to-amber-600",
        "from-yellow-600 to-amber-700",
      ],
    },
    {
      id: 5,
      evolutionStage: 0,
      customName: "",
      defaultNames: ["Stone Pebble", "Stone Boulder", "Stone Titan"],
      images: [
        "https://via.placeholder.com/200x200/8D6E63/FFFFFF?text=Stone+Pebble",
        "https://via.placeholder.com/200x200/6D4C41/FFFFFF?text=Stone+Boulder",
        "https://via.placeholder.com/200x200/5D4037/FFFFFF?text=Stone+Titan",
      ],
      elements: ["🪨"],
      bgColors: [
        "from-stone-500 to-gray-700",
        "from-stone-600 to-gray-800",
        "from-stone-700 to-gray-900",
      ],
    },
    {
      id: 6,
      evolutionStage: 0,
      customName: "",
      defaultNames: ["Wind Breeze", "Wind Gale", "Wind Storm"],
      images: [
        "https://via.placeholder.com/200x200/A8DADC/000000?text=Wind+Breeze",
        "https://via.placeholder.com/200x200/87CEEB/000000?text=Wind+Gale",
        "https://via.placeholder.com/200x200/6495ED/FFFFFF?text=Wind+Storm",
      ],
      elements: ["☁️"],
      bgColors: [
        "from-pink-100 to-purple-200",
        "from-pink-200 to-purple-300",
        "from-pink-300 to-purple-400",
      ],
    },
  ]);

  // Evolution costs
  const getEvolutionCost = (currentStage) => {
    if (currentStage === 0) return 25000; // Stage 1 to 2
    if (currentStage === 1) return 50000; // Stage 2 to 3
    return 0;
  };

  const canAffordEvolution = (currentStage) => {
    return brainBerries >= getEvolutionCost(currentStage);
  };

  const handleEvolution = (edumonId) => {
    const edumon = edumonData.find((e) => e.id === edumonId);
    const cost = getEvolutionCost(edumon.evolutionStage);

    if (
      edumon.evolutionStage < 2 &&
      canAffordEvolution(edumon.evolutionStage)
    ) {
      // Deduct brain berries
      setBrainBerries((prev) => prev - cost);

      // Show evolution animation
      setShowEvolutionAnimation(true);
      setTimeout(() => setShowEvolutionAnimation(false), 3000);

      // Evolve the Edumon
      setEdumonData((prev) =>
        prev.map((e) =>
          e.id === edumonId ? { ...e, evolutionStage: e.evolutionStage + 1 } : e
        )
      );
    }
  };

  const resetAllEdumon = () => {
    setEdumonData((prev) =>
      prev.map((edumon) => ({ ...edumon, evolutionStage: 0 }))
    );
  };

  const startEditingName = (edumonId) => {
    const edumon = edumonData.find((e) => e.id === edumonId);
    setEditingName(edumonId);
    setTempName(
      edumon.customName || edumon.defaultNames[edumon.evolutionStage]
    );
  };

  const saveCustomName = (edumonId) => {
    setEdumonData((prev) =>
      prev.map((edumon) =>
        edumon.id === edumonId
          ? { ...edumon, customName: tempName.trim() }
          : edumon
      )
    );
    setEditingName(null);
    setTempName("");
  };

  const cancelEditingName = () => {
    setEditingName(null);
    setTempName("");
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % edumonData.length);
  };

  const prevPage = () => {
    setCurrentPage(
      (prev) => (prev - 1 + edumonData.length) % edumonData.length
    );
  };

  const currentEdumon = edumonData[currentPage];
  const currentName =
    currentEdumon.customName ||
    currentEdumon.defaultNames[currentEdumon.evolutionStage];
  const currentImage = currentEdumon.images[currentEdumon.evolutionStage];
  const currentBgColor = currentEdumon.bgColors[currentEdumon.evolutionStage];
  const evolutionStageNames = ["Basic", "Advanced", "Master"];
  const canEvolve =
    currentEdumon.evolutionStage < 2 &&
    canAffordEvolution(currentEdumon.evolutionStage);

  // Popper-style Celebration Animation Component
  const PopperCelebration = () => {
    if (!showEvolutionAnimation) return null;

    const colors = [
      "#FFD700",
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#98D8C8",
    ];

    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {/* Ascending particles like Popper */}
        {[...Array(12)].map((_, i) => {
          const startX = 20 + Math.random() * 60; // Random horizontal start position
          const color = colors[i % colors.length];

          return (
            <div
              key={`popper-${i}`}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${startX}%`,
                bottom: "10%",
                backgroundColor: color,
                animation: `popperAscend ${
                  2.5 + Math.random() * 1
                }s ease-out forwards`,
                animationDelay: `${Math.random() * 0.8}s`,
                opacity: 0.8,
              }}
            />
          );
        })}

        {/* Additional scattered particles */}
        {[...Array(8)].map((_, i) => {
          const startX = 30 + Math.random() * 40;
          const color = colors[(i + 4) % colors.length];

          return (
            <div
              key={`scatter-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${startX}%`,
                bottom: "15%",
                backgroundColor: color,
                animation: `popperScatter ${
                  2 + Math.random() * 1
                }s ease-out forwards`,
                animationDelay: `${0.3 + Math.random() * 0.5}s`,
                opacity: 0.6,
              }}
            />
          );
        })}

        {/* Success message overlay */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-gradient-to-r from-emerald-500/90 to-teal-500/90 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/30 shadow-2xl animate-pulse">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🎉</div>
              <div>
                <p className="text-white font-bold text-lg">
                  Evolution Complete!
                </p>
                <p className="text-white/80 text-sm">
                  Your Edumon has grown stronger
                </p>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes popperAscend {
            0% {
              transform: translateY(0px) translateX(0px) scale(1);
              opacity: 0.8;
            }
            50% {
              transform: translateY(-150px)
                translateX(${Math.random() * 60 - 30}px) scale(0.8);
              opacity: 0.6;
            }
            100% {
              transform: translateY(-300px)
                translateX(${Math.random() * 80 - 40}px) scale(0.3);
              opacity: 0;
            }
          }

          @keyframes popperScatter {
            0% {
              transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
              opacity: 0.6;
            }
            100% {
              transform: translateY(-200px)
                translateX(${Math.random() * 100 - 50}px) scale(0.2)
                rotate(360deg);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    );
  };

  // Subtle Sparkle Animation Component for card
  const CardSparkle = () => {
    if (!showEvolutionAnimation) return null;

    return (
      <div className="absolute -top-1 -right-1 pointer-events-none">
        <div
          className="w-6 h-6 text-yellow-300 opacity-70 animate-pulse"
          style={{ animationDuration: "1.5s" }}
        >
          ✨
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <PopperCelebration />

      {/* Brain Berries Bar - Top Right */}
      <div className="fixed top-6 right-6 z-40">
        <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl px-6 py-3 border border-orange-400/30 backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-3">
            <img
              src="https://via.placeholder.com/24x24/FF6B6B/FFFFFF?text=BB"
              alt="Brain Berry"
              className="w-6 h-6 rounded-full"
            />
            <span className="text-white font-bold text-lg">
              {brainBerries.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text mb-3">
          <h1 className="text-5xl font-bold drop-shadow-2xl">
            ⚡ EDUMON COLLECTION ⚡
          </h1>
        </div>
        <p className="text-slate-300 text-lg mb-6">
          Master the Elements • Evolve Your Knowledge
        </p>

        <div className="flex justify-center items-center">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3">
            <span className="text-white font-semibold text-lg">
              {currentPage + 1} of {edumonData.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Edumon Card */}
      <div className="max-w-lg mx-auto">
        <div
          className={`bg-gradient-to-br ${currentBgColor} rounded-3xl shadow-2xl border border-white/20 backdrop-blur-sm p-8 transform transition-all duration-500 hover:scale-105 ${
            showEvolutionAnimation ? "ring-4 ring-yellow-300/50" : ""
          }`}
        >
          {/* Edumon Name Section */}
          <div className="text-center mb-8">
            {editingName === currentEdumon.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white text-xl font-bold text-center placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Enter custom name..."
                  maxLength={20}
                />
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => saveCustomName(currentEdumon.id)}
                    className="bg-green-500/80 hover:bg-green-500 text-white p-2 rounded-lg transition-all duration-200"
                  >
                    <Check size={20} />
                  </button>
                  <button
                    onClick={cancelEditingName}
                    className="bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-lg transition-all duration-200"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-3">
                  <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                    {currentName}
                  </h2>
                  <button
                    onClick={() => startEditingName(currentEdumon.id)}
                    className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-all duration-200 hover:scale-110"
                    title="Edit name"
                  >
                    <Edit3 size={18} />
                  </button>
                </div>

                <div className="flex justify-center items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2">
                    <span className="text-white font-semibold">
                      {evolutionStageNames[currentEdumon.evolutionStage]}
                    </span>
                  </div>
                  {currentEdumon.evolutionStage > 0 && (
                    <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-xl px-4 py-2">
                      <span className="text-yellow-200 font-semibold">
                        {currentEdumon.evolutionStage === 2
                          ? "👑 Master"
                          : "✨ Evolved"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Edumon Image */}
          <div className="relative mb-8">
            <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-3xl p-6 mx-auto w-fit">
              <div className="relative">
                <img
                  src={currentImage}
                  alt={currentName}
                  className="w-52 h-52 object-cover rounded-2xl shadow-2xl transition-all duration-500"
                />
                <CardSparkle />
                {currentEdumon.evolutionStage === 2 && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3 animate-pulse shadow-xl">
                    <span className="text-xl">👑</span>
                  </div>
                )}
                {currentEdumon.evolutionStage === 1 && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3 animate-pulse shadow-xl">
                    <span className="text-xl">✨</span>
                  </div>
                )}

                {/* Evolution Stage Indicators */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {[0, 1, 2].map((stage) => (
                    <div
                      key={stage}
                      className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
                        stage <= currentEdumon.evolutionStage
                          ? "bg-gradient-to-r from-yellow-400 to-orange-500 border-white shadow-lg scale-110"
                          : "bg-white/20 border-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Elements */}
          <div className="text-center mb-8">
            <p className="text-white/80 mb-3 font-medium text-lg">
              Element Mastery
            </p>
            <div className="flex justify-center gap-3">
              {currentEdumon.elements.map((element, index) => (
                <div
                  key={index}
                  className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl w-16 h-16 flex items-center justify-center text-3xl hover:scale-110 transition-transform duration-300 shadow-lg"
                >
                  {element}
                </div>
              ))}
            </div>
          </div>

          {/* Evolution Cost Display */}
          {currentEdumon.evolutionStage < 2 && (
            <div className="text-center mb-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                <p className="text-white/80 mb-2">Evolution Cost</p>
                <div className="flex items-center justify-center gap-2">
                  <img
                    src="https://via.placeholder.com/16x16/FF6B6B/FFFFFF?text=BB"
                    alt="Brain Berry"
                    className="w-4 h-4 rounded-full"
                  />
                  <span
                    className={`font-bold text-lg ${
                      canAffordEvolution(currentEdumon.evolutionStage)
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {getEvolutionCost(
                      currentEdumon.evolutionStage
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <button
                onClick={() => handleEvolution(currentEdumon.id)}
                disabled={!canEvolve}
                className={`flex items-center justify-center gap-3 font-bold py-4 px-8 rounded-2xl transition-all duration-300 ${
                  canEvolve
                    ? "bg-gradient-to-r from-purple-500/80 to-blue-500/80 hover:from-purple-500 hover:to-blue-500 text-white hover:scale-105 hover:shadow-xl border border-white/25"
                    : "bg-gray-500/20 border border-gray-500/30 text-gray-400 cursor-not-allowed"
                }`}
              >
                <Zap size={20} />
                Evolve
              </button>
            </div>

            {/* Evolution Progress */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-white/90 font-medium">
                  Evolution Progress
                </span>
                <span className="text-white font-bold text-lg">
                  {currentEdumon.evolutionStage + 1}/3
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 h-3 rounded-full transition-all duration-700 shadow-inner"
                  style={{
                    width: `${((currentEdumon.evolutionStage + 1) / 3) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevPage}
            className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white p-4 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-xl"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Page Indicators */}
          <div className="flex gap-3">
            {edumonData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? "bg-gradient-to-r from-purple-400 to-blue-400 scale-125 shadow-lg"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextPage}
            className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white p-4 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-xl"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Statistics Dashboard */}
        <div className="mt-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6">
          <h3 className="text-white text-xl font-bold text-center mb-4">
            Collection Statistics
          </h3>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                {edumonData.filter((e) => e.evolutionStage === 2).length}
              </div>
              <div className="text-white/70 font-medium">Masters</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                {edumonData.filter((e) => e.evolutionStage > 0).length}
              </div>
              <div className="text-white/70 font-medium">Evolved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">
                {Math.round(
                  (edumonData.reduce((sum, e) => sum + e.evolutionStage, 0) /
                    (edumonData.length * 2)) *
                    100
                )}
                %
              </div>
              <div className="text-white/70 font-medium">Complete</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdumonApp;
