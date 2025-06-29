import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  Edit3,
  Check,
  X,
  Lock,
  ArrowLeft,
  Send,
  MessageCircle,
  ClipboardList,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const EduMonApp = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [editingName, setEditingName] = useState<number | null>(null);
  const [tempName, setTempName] = useState("");
  const [brainBerries, setBrainBerries] = useState(10000000); // Default 10M brain berries
  const [xp, setXp] = useState(2500);
  const [showEvolutionAnimation, setShowEvolutionAnimation] = useState(false);

  // Chatbot state
  const [messages, setMessages] = useState<
    Array<{ sender: "user" | "edumon"; text: string; timestamp: Date }>
  >([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  // Resize state for Windows-style resizing
  const [chatSize, setChatSize] = useState({ width: 320, height: 384 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState("");
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // Quiz system state
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<
    Array<{
      id: number;
      question: string;
      options: string[];
      correctAnswer: string;
      explanation: string;
    }>
  >([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizPrompt, setQuizPrompt] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);

  const navigate = useNavigate();

  // Edumon data structure with unlock system
  const [edumonData, setEdumonData] = useState([
    {
      id: 1,
      evolutionStage: 0,
      customName: "",
      defaultNames: ["Flame Starter", "Flame Guardian", "Flame Master"],
      images: [
        "https://raw.githubusercontent.com/rutviktayde/EduMon-IMGs/main/Flame%201BG.jpg",
        "https://raw.githubusercontent.com/rutviktayde/EduMon-IMGs/main/Flame%202BG.jpg",
        "https://raw.githubusercontent.com/rutviktayde/EduMon-IMGs/main/Flame%203BG.jpg",
      ],
      elements: ["🔥"],
      bgColors: [
        "from-red-500 to-orange-600",
        "from-red-600 to-orange-700",
        "from-red-700 to-orange-800",
      ],
      unlocked: true,
    },
    {
      id: 2,
      evolutionStage: 0,
      customName: "",
      defaultNames: ["Aqua Sprout", "Aqua Defender", "Aqua Champion"],
      images: [
        "https://raw.githubusercontent.com/rutviktayde/EduMon-IMGs/main/Water%201BG.jpg",
        "https://raw.githubusercontent.com/rutviktayde/EduMon-IMGs/main/Water%202BG.jpg",
        "https://raw.githubusercontent.com/rutviktayde/EduMon-IMGs/main/Water%203BG.jpg",
      ],
      elements: ["💧"],
      bgColors: [
        "from-blue-500 to-cyan-600",
        "from-blue-600 to-cyan-700",
        "from-blue-700 to-cyan-800",
      ],
      unlocked: false,
    },
    {
      id: 3,
      evolutionStage: 0,
      customName: "",
      defaultNames: ["Nature Seed", "Nature Warrior", "Nature Lord"],
      images: [
        "https://raw.githubusercontent.com/rutviktayde/EduMon-IMGs/main/Grass%201BG.jpg",
        "https://raw.githubusercontent.com/rutviktayde/EduMon-IMGs/main/Grass%202BG.jpg",
        "https://raw.githubusercontent.com/rutviktayde/EduMon-IMGs/main/Grass%203BG.jpg",
      ],
      elements: ["🌱"],
      bgColors: [
        "from-green-500 to-emerald-600",
        "from-green-600 to-emerald-700",
        "from-green-700 to-emerald-800",
      ],
      unlocked: false,
    },
    {
      id: 4,
      evolutionStage: 0,
      customName: "",
      defaultNames: ["Spark Tiny", "Spark Bolt", "Spark Thunder"],
      images: [
        "https://raw.githubusercontent.com/rutviktayde/EduMon-IMGs/main/Thunder%201BG.jpg",
        "https://raw.githubusercontent.com/rutviktayde/EduMon-IMGs/main/Thunder%202BG.jpg",
        "https://raw.githubusercontent.com/rutviktayde/EduMon-IMGs/main/Thunder%203BG.jpg",
      ],
      elements: ["⚡"],
      bgColors: [
        "from-yellow-400 to-amber-500",
        "from-yellow-500 to-amber-600",
        "from-yellow-600 to-amber-700",
      ],
      unlocked: false,
    },
    {
      id: 5,
      evolutionStage: 0,
      customName: "",
      defaultNames: ["Stone Pebble", "Stone Boulder", "Stone Titan"],
      images: [
        "https://raw.githubusercontent.com/rutviktayde/EduMon-IMGs/main/Stone%201BG.jpg",
        "https://raw.githubusercontent.com/rutviktayde/EduMon-IMGs/main/Stone%202BG.jpg",
        "https://raw.githubusercontent.com/rutviktayde/EduMon-IMGs/main/Stone%203BG.jpg",
      ],
      elements: ["🪨"],
      bgColors: [
        "from-stone-500 to-gray-700",
        "from-stone-600 to-gray-800",
        "from-stone-700 to-gray-900",
      ],
      unlocked: false,
    },
    {
      id: 6,
      evolutionStage: 0,
      customName: "",
      defaultNames: ["Wind Breeze", "Wind Gale", "Wind Storm"],
      images: [
        "https://raw.githubusercontent.com/rutviktayde/EduMon-IMGs/main/Wind%201BG.jpg",
        "https://raw.githubusercontent.com/rutviktayde/EduMon-IMGs/main/Wind%202BG.jpg",
        "https://raw.githubusercontent.com/rutviktayde/EduMon-IMGs/main/Wind%203BG.jpg",
      ],
      elements: ["☁️"],
      bgColors: [
        "from-sky-400 to-blue-500",
        "from-sky-500 to-blue-600",
        "from-sky-600 to-blue-700",
      ],
      unlocked: false,
    },
  ]);

  // Evolution costs and rewards
  const getEvolutionCost = (currentStage: number) => {
    if (currentStage === 0) return 25000;
    if (currentStage === 1) return 50000;
    return 0;
  };

  const getXpReward = (currentStage: number) => {
    if (currentStage === 0) return 500;
    if (currentStage === 1) return 1000;
    return 0;
  };

  const canAffordEvolution = (currentStage: number) => {
    return brainBerries >= getEvolutionCost(currentStage);
  };

  const unlockNextEdumon = (currentEdumonIndex: number) => {
    const nextIndex = currentEdumonIndex + 1;
    if (nextIndex < edumonData.length) {
      setEdumonData((prev) =>
        prev.map((edumon, index) =>
          index === nextIndex ? { ...edumon, unlocked: true } : edumon
        )
      );
    }
  };

  const handleEvolution = (edumonId: number) => {
    const edumon = edumonData.find((e) => e.id === edumonId);
    const edumonIndex = edumonData.findIndex((e) => e.id === edumonId);

    if (!edumon || !edumon.unlocked) return;

    const cost = getEvolutionCost(edumon.evolutionStage);
    const xpReward = getXpReward(edumon.evolutionStage);

    if (
      edumon.evolutionStage < 2 &&
      canAffordEvolution(edumon.evolutionStage)
    ) {
      setBrainBerries((prev) => prev - cost);
      setXp((prev) => prev + xpReward);

      setShowEvolutionAnimation(true);
      setTimeout(() => setShowEvolutionAnimation(false), 3000);

      setEdumonData((prev) =>
        prev.map((e) =>
          e.id === edumonId ? { ...e, evolutionStage: e.evolutionStage + 1 } : e
        )
      );

      if (edumon.evolutionStage === 1) {
        setTimeout(() => {
          unlockNextEdumon(edumonIndex);
        }, 1000);
      }
    }
  };

  const startEditingName = (edumonId: number) => {
    const edumon = edumonData.find((e) => e.id === edumonId);
    if (!edumon?.unlocked) return;

    setEditingName(edumonId);
    setTempName(
      edumon.customName || edumon.defaultNames[edumon.evolutionStage]
    );
  };

  const saveCustomName = (edumonId: number) => {
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

  // Chatbot functions
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const originalMessage = inputMessage.trim();
    const userMessage = originalMessage.toLowerCase();
    setInputMessage("");

    // Check for clear chat command
    if (
      userMessage.includes("clear") &&
      (userMessage.includes("chat") || userMessage.includes("this"))
    ) {
      setMessages([]);
      return;
    }

    // Add user message to chat
    const newUserMessage = {
      sender: "user" as const,
      text: originalMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);

    // Start thinking animation
    setIsThinking(true);

    // Get current Edumon name for response
    const currentEdumonName =
      currentEdumon.customName ||
      currentEdumon.defaultNames[currentEdumon.evolutionStage];

    try {
      // Call OpenAI API for intelligent response
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              process.env.REACT_APP_OPENAI_API_KEY || "your-api-key-here"
            }`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: `You are ${currentEdumonName}, an educational companion and tutor. You should:
              - Respond as a friendly, knowledgeable tutor
              - Use the Edumon's name in your responses naturally
              - Provide helpful, educational explanations
              - Keep responses conversational and engaging
              - Be encouraging and supportive
              - If asked about subjects you're not sure about, suggest related topics or ask for clarification
              - Maintain the personality of an educational companion`,
              },
              {
                role: "user",
                content: originalMessage,
              },
            ],
            max_tokens: 150,
            temperature: 0.7,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const aiResponse =
          data.choices[0]?.message?.content ||
          `Hi! I'm ${currentEdumonName}, your educational companion! How can I help you today?`;

        const edumonMessage = {
          sender: "edumon" as const,
          text: aiResponse,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, edumonMessage]);
      } else {
        // Intelligent fallback responses based on user input
        const intelligentResponse = generateIntelligentResponse(
          userMessage,
          currentEdumonName
        );

        const edumonMessage = {
          sender: "edumon" as const,
          text: intelligentResponse,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, edumonMessage]);
      }
    } catch (error) {
      console.error("Error calling AI API:", error);

      // Intelligent fallback responses based on user input
      const intelligentResponse = generateIntelligentResponse(
        userMessage,
        currentEdumonName
      );

      const edumonMessage = {
        sender: "edumon" as const,
        text: intelligentResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, edumonMessage]);
    } finally {
      // Stop thinking animation after a short delay
      setTimeout(() => {
        setIsThinking(false);
      }, 500);
    }
  };

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (isChatOpen && messages.length > 0) {
      const messagesContainer = document.querySelector(".custom-scrollbar");
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
  }, [messages, isChatOpen]);

  // Windows-style resize handlers
  const handleMouseDown = (e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: chatSize.width,
      height: chatSize.height,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;

    const deltaX = e.clientX - resizeStart.x;
    const deltaY = e.clientY - resizeStart.y;

    let newWidth = resizeStart.width;
    let newHeight = resizeStart.height;

    // Handle different resize directions
    if (resizeDirection.includes("e")) {
      // right edge
      newWidth = Math.max(280, Math.min(600, resizeStart.width + deltaX));
    }
    if (resizeDirection.includes("w")) {
      // left edge
      newWidth = Math.max(280, Math.min(600, resizeStart.width - deltaX));
    }
    if (resizeDirection.includes("s")) {
      // bottom edge
      newHeight = Math.max(300, Math.min(600, resizeStart.height + deltaY));
    }
    if (resizeDirection.includes("n")) {
      // top edge
      newHeight = Math.max(300, Math.min(600, resizeStart.height - deltaY));
    }

    setChatSize({ width: newWidth, height: newHeight });
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    setResizeDirection("");
  };

  // Add global mouse event listeners for resize
  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isResizing, resizeDirection, resizeStart]);

  // Quiz functions
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const generateQuiz = async () => {
    if (!quizPrompt.trim() && !uploadedFile) return;

    setIsGeneratingQuiz(true);

    // Add user message
    const userMessage = uploadedFile
      ? `Uploaded ${uploadedFile.name} based on ${
          quizPrompt || "the document"
        }?`
      : `Generate a quiz in this format but about the subject which user is asking about . dont give photosynthesis quiz unless asked: ${quizPrompt}`;

    const newUserMessage = {
      sender: "user" as const,
      text: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      // Simulate AI quiz generation (replace with actual API call)
      setTimeout(() => {
        const sampleQuestions = [
          {
            id: 1,
            question: "What is the main purpose of photosynthesis?",
            options: [
              "Produce oxygen",
              "Make food for the plant",
              "Absorb water",
              "Release carbon dioxide",
            ],
            correctAnswer: "Make food for the plant",
            explanation:
              "Photosynthesis helps plants make their own food (glucose) using sunlight, carbon dioxide, and water — this is essential for their growth and survival.",
          },
          {
            id: 2,
            question: "Which gas do plants absorb during photosynthesis?",
            options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
            correctAnswer: "Carbon dioxide",
            explanation:
              "Plants absorb carbon dioxide from the atmosphere during photosynthesis and convert it into glucose and oxygen.",
          },
          {
            id: 3,
            question: "What is the primary energy source for photosynthesis?",
            options: ["Water", "Soil nutrients", "Sunlight", "Air"],
            correctAnswer: "Sunlight",
            explanation:
              "Sunlight provides the energy needed to convert carbon dioxide and water into glucose and oxygen.",
          },
          {
            id: 4,
            question:
              "What is the green pigment responsible for capturing light energy?",
            options: ["Chlorophyll", "Carotene", "Xanthophyll", "Anthocyanin"],
            correctAnswer: "Chlorophyll",
            explanation:
              "Chlorophyll is the green pigment in plant cells that captures light energy and is essential for photosynthesis.",
          },
          {
            id: 5,
            question: "What are the main products of photosynthesis?",
            options: [
              "Water and carbon dioxide",
              "Glucose and oxygen",
              "Nitrogen and hydrogen",
              "Carbon and hydrogen",
            ],
            correctAnswer: "Glucose and oxygen",
            explanation:
              "The main products of photosynthesis are glucose (food for the plant) and oxygen (released into the atmosphere).",
          },
          {
            id: 6,
            question: "Where does photosynthesis primarily occur in plants?",
            options: ["Roots", "Stems", "Leaves", "Flowers"],
            correctAnswer: "Leaves",
            explanation:
              "Photosynthesis primarily occurs in the leaves where chloroplasts containing chlorophyll are most abundant.",
          },
          {
            id: 7,
            question: "What is the chemical equation for photosynthesis?",
            options: [
              "CO2 + H2O → C6H12O6 + O2",
              "O2 + H2O → CO2 + C6H12O6",
              "C6H12O6 + O2 → CO2 + H2O",
              "CO2 + O2 → H2O + C6H12O6",
            ],
            correctAnswer: "CO2 + H2O → C6H12O6 + O2",
            explanation:
              "The chemical equation shows that carbon dioxide and water are converted into glucose and oxygen using light energy.",
          },
          {
            id: 8,
            question:
              "What happens to the oxygen produced during photosynthesis?",
            options: [
              "It's stored in the plant",
              "It's released into the atmosphere",
              "It's converted to carbon dioxide",
              "It's absorbed by the roots",
            ],
            correctAnswer: "It's released into the atmosphere",
            explanation:
              "Oxygen is released into the atmosphere as a byproduct of photosynthesis, which is essential for other living organisms.",
          },
          {
            id: 9,
            question: "What is the role of water in photosynthesis?",
            options: [
              "It provides oxygen atoms",
              "It cools the plant",
              "It provides hydrogen atoms",
              "It provides carbon atoms",
            ],
            correctAnswer: "It provides hydrogen atoms",
            explanation:
              "Water provides hydrogen atoms that are used to form glucose molecules during the photosynthesis process.",
          },
          {
            id: 10,
            question:
              "What would happen if a plant couldn't perform photosynthesis?",
            options: [
              "It would grow faster",
              "It would die",
              "It would change color",
              "It would produce more oxygen",
            ],
            correctAnswer: "It would die",
            explanation:
              "Without photosynthesis, plants cannot produce their own food (glucose) and would eventually die from lack of energy.",
          },
        ];

        setQuizQuestions(sampleQuestions);

        const edumonMessage = {
          sender: "edumon" as const,
          text: `OK, here's the quiz...All the best!`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, edumonMessage]);
        setIsGeneratingQuiz(false);
      }, 2000);
    } catch (error) {
      console.error("Error generating quiz:", error);
      setIsGeneratingQuiz(false);
    }
  };

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const submitQuiz = () => {
    setShowResults(true);
  };

  const startNewQuiz = () => {
    setIsQuizMode(true);
    setMessages([]);
    setQuizQuestions([]);
    setUserAnswers({});
    setShowResults(false);
    setQuizPrompt("");
    setUploadedFile(null);
  };

  const exitQuiz = () => {
    setIsQuizMode(false);
    setMessages([]);
    setQuizQuestions([]);
    setUserAnswers({});
    setShowResults(false);
    setQuizPrompt("");
    setUploadedFile(null);
  };

  // Generate intelligent responses based on user input
  const generateIntelligentResponse = (
    userMessage: string,
    edumonName: string
  ): string => {
    const message = userMessage.toLowerCase();

    // Greetings
    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("hey")
    ) {
      return `Hello there! I'm ${edumonName}, your educational companion! How can I help you with your studies today?`;
    }

    // Science related
    if (message.includes("science") || message.includes("scientific")) {
      return `Great choice! I'm ${edumonName}, and I love science! We can explore biology, chemistry, physics, or astronomy. What specific area interests you?`;
    }

    // Math related
    if (
      message.includes("math") ||
      message.includes("mathematics") ||
      message.includes("algebra") ||
      message.includes("geometry")
    ) {
      return `Excellent! I'm ${edumonName}, and I'm here to help with math! Whether it's algebra, geometry, calculus, or basic arithmetic, I'm ready to assist. What math topic would you like to explore?`;
    }

    // Photosynthesis
    if (
      message.includes("photosynthesis") ||
      message.includes("photo synthesis")
    ) {
      return `Awesome question! I'm ${edumonName}, and I'd love to explain photosynthesis! It's the amazing process where plants use sunlight, water, and carbon dioxide to create their own food and oxygen. Think of it as nature's solar power system! 🌱☀️`;
    }

    // History
    if (message.includes("history") || message.includes("historical")) {
      return `Fascinating! I'm ${edumonName}, and history is full of incredible stories! We can explore ancient civilizations, world wars, famous leaders, or any historical period that interests you. What would you like to learn about?`;
    }

    // English/Language
    if (
      message.includes("english") ||
      message.includes("grammar") ||
      message.includes("writing") ||
      message.includes("literature")
    ) {
      return `Perfect! I'm ${edumonName}, and I'm here to help with English! Whether it's grammar, writing, reading comprehension, or literature analysis, I'm ready to assist. What aspect of English would you like to work on?`;
    }

    // Geography
    if (
      message.includes("geography") ||
      message.includes("countries") ||
      message.includes("continents") ||
      message.includes("map")
    ) {
      return `Exciting! I'm ${edumonName}, and geography is amazing! We can explore countries, continents, climate, natural resources, or world cultures. What geographical topic interests you?`;
    }

    // Physics
    if (
      message.includes("physics") ||
      message.includes("force") ||
      message.includes("energy") ||
      message.includes("motion")
    ) {
      return `Brilliant! I'm ${edumonName}, and physics is fascinating! We can explore forces, energy, motion, electricity, magnetism, or any physics concept. What would you like to understand better?`;
    }

    // Chemistry
    if (
      message.includes("chemistry") ||
      message.includes("chemical") ||
      message.includes("molecule") ||
      message.includes("atom")
    ) {
      return `Excellent! I'm ${edumonName}, and chemistry is incredible! We can explore atoms, molecules, chemical reactions, elements, or any chemistry topic. What would you like to learn about?`;
    }

    // Biology
    if (
      message.includes("biology") ||
      message.includes("cell") ||
      message.includes("organism") ||
      message.includes("living")
    ) {
      return `Wonderful! I'm ${edumonName}, and biology is amazing! We can explore cells, organisms, ecosystems, genetics, or any living systems. What biological topic interests you?`;
    }

    // Computer Science
    if (
      message.includes("computer") ||
      message.includes("programming") ||
      message.includes("coding") ||
      message.includes("software")
    ) {
      return `Fantastic! I'm ${edumonName}, and computer science is exciting! We can explore programming, algorithms, data structures, or any tech topic. What would you like to learn about?`;
    }

    // Art
    if (
      message.includes("art") ||
      message.includes("drawing") ||
      message.includes("painting") ||
      message.includes("creative")
    ) {
      return `Beautiful! I'm ${edumonName}, and art is wonderful! We can explore different art styles, techniques, famous artists, or creative expression. What artistic topic interests you?`;
    }

    // Music
    if (
      message.includes("music") ||
      message.includes("song") ||
      message.includes("instrument") ||
      message.includes("melody")
    ) {
      return `Harmonious! I'm ${edumonName}, and music is magical! We can explore different genres, instruments, music theory, or famous composers. What musical topic would you like to explore?`;
    }

    // Help
    if (
      message.includes("help") ||
      message.includes("assist") ||
      message.includes("support")
    ) {
      return `Of course! I'm ${edumonName}, and I'm here to help! I can assist with any subject - math, science, history, English, and more. Just let me know what you'd like to learn about!`;
    }

    // Default response for unrecognized topics
    return `Interesting! I'm ${edumonName}, and I'd love to help you learn! Could you tell me more about what you'd like to study? I'm knowledgeable about many subjects including math, science, history, English, and more!`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Load selected Edumon from sessionStorage and reorder
  useEffect(() => {
    const stored = sessionStorage.getItem("selectedEdumon");
    if (stored) {
      const selected = JSON.parse(stored);
      setEdumonData((prev) => {
        // Find the selected Edumon by element
        const selectedIdx = prev.findIndex(
          (e) => e.elements[0] === selected.element
        );
        if (selectedIdx === -1) return prev;
        // Move selected Edumon to front and unlock it
        const reordered = [
          prev[selectedIdx],
          ...prev.filter((_, i) => i !== selectedIdx),
        ];
        return reordered.map((e, i) =>
          i === 0
            ? { ...e, unlocked: true }
            : { ...e, unlocked: e.evolutionStage > 0 }
        );
      });
      setCurrentPage(0);
    }
  }, []);

  const currentEdumon = edumonData[currentPage];
  const currentName =
    currentEdumon.customName ||
    currentEdumon.defaultNames[currentEdumon.evolutionStage];
  const currentImage = currentEdumon.images[currentEdumon.evolutionStage];
  const currentBgColor = currentEdumon.bgColors[currentEdumon.evolutionStage];
  const evolutionStageNames = ["Basic", "Advanced", "Master"];
  const canEvolve =
    currentEdumon.evolutionStage < 2 &&
    canAffordEvolution(currentEdumon.evolutionStage) &&
    currentEdumon.unlocked;
  const isLocked = !currentEdumon.unlocked;

  // Animation Components
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
        {[...Array(12)].map((_, i) => {
          const startX = 20 + Math.random() * 60;
          const color = colors[i % colors.length];

          return (
            <div
              key={`popper-${i}`}
              className="absolute w-3 h-3 rounded-full animate-bounce"
              style={{
                left: `${startX}%`,
                bottom: "10%",
                backgroundColor: color,
                animationDelay: `${Math.random() * 0.8}s`,
                animationDuration: `${2.5 + Math.random() * 1}s`,
              }}
            />
          );
        })}

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
      </div>
    );
  };

  const CardSparkle = () => {
    if (!showEvolutionAnimation) return null;

    return (
      <div className="absolute -top-1 -right-1 pointer-events-none">
        <div className="w-6 h-6 text-yellow-300 opacity-70 animate-pulse">
          ✨
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <PopperCelebration />

      {/* Back Button */}
      <div className="fixed top-6 left-6 z-40">
        <button
          onClick={() => navigate("/student-dashboard")}
          className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white p-3 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-xl flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Dashboard</span>
        </button>
      </div>

      {/* Currency Bars - Top Right */}
      <div className="fixed top-6 right-6 z-40 space-y-3">
        {/* Brain Berries Bar */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl px-6 py-3 border border-orange-400/30 backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-3">
            <img
              src="https://raw.githubusercontent.com/rutviktayde/EduMon-IMGs/main/Brain%20Berries.png"
              alt="Brain Berry"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-white font-bold text-lg">
              {brainBerries.toLocaleString()}
            </span>
          </div>
        </div>

        {/* XP Bar */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl px-6 py-3 border border-purple-400/30 backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
              XP
            </div>
            <span className="text-white font-bold text-lg">
              {xp.toLocaleString()}
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
          className={`bg-gradient-to-br ${
            isLocked ? "from-gray-600 to-gray-800" : currentBgColor
          } rounded-3xl shadow-2xl border border-white/20 backdrop-blur-sm p-8 transform transition-all duration-500 hover:scale-105 ${
            showEvolutionAnimation ? "ring-4 ring-yellow-300/50" : ""
          } ${isLocked ? "opacity-75" : ""}`}
        >
          {/* Edumon Name Section */}
          <div className="text-center mb-8">
            {isLocked ? (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-3">
                  <Lock size={24} className="text-gray-400" />
                  <h2 className="text-3xl font-bold text-gray-400 drop-shadow-lg">
                    Locked
                  </h2>
                  <Lock size={24} className="text-gray-400" />
                </div>
                <div className="bg-gray-500/20 backdrop-blur-sm border border-gray-500/30 rounded-xl px-4 py-2 mx-auto w-fit">
                  <span className="text-gray-400 font-semibold">
                    Complete previous EduMon to unlock
                  </span>
                </div>
              </div>
            ) : editingName === currentEdumon.id ? (
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
                  className={`w-52 h-52 object-cover rounded-2xl shadow-2xl transition-all duration-500 ${
                    isLocked ? "grayscale blur-sm" : ""
                  }`}
                />

                {/* Lock Overlay */}
                {isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
                    <div className="bg-gray-800/90 rounded-full p-6 border-4 border-gray-600">
                      <Lock size={48} className="text-gray-300" />
                    </div>
                  </div>
                )}

                <CardSparkle />
                {!isLocked && currentEdumon.evolutionStage === 2 && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3 animate-pulse shadow-xl">
                    <span className="text-xl">👑</span>
                  </div>
                )}
                {!isLocked && currentEdumon.evolutionStage === 1 && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3 animate-pulse shadow-xl">
                    <span className="text-xl">✨</span>
                  </div>
                )}

                {/* Evolution Stage Indicators */}
                {!isLocked && (
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
                )}
              </div>
            </div>
          </div>

          {/* Elements */}
          <div className="text-center mb-8">
            <p
              className={`mb-3 font-medium text-lg ${
                isLocked ? "text-gray-400" : "text-white/80"
              }`}
            >
              Element Mastery
            </p>
            <div className="flex justify-center gap-3">
              {currentEdumon.elements.map((element, index) => (
                <div
                  key={index}
                  className={`backdrop-blur-md border rounded-2xl w-16 h-16 flex items-center justify-center text-3xl transition-transform duration-300 shadow-lg ${
                    isLocked
                      ? "bg-gray-500/15 border-gray-500/25 grayscale"
                      : "bg-white/15 border-white/25 hover:scale-110"
                  }`}
                >
                  {element}
                </div>
              ))}
            </div>
          </div>

          {/* Evolution Cost Display */}
          {!isLocked && currentEdumon.evolutionStage < 2 && (
            <div className="text-center mb-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                <p className="text-white/80 mb-2">Evolution Cost</p>
                <div className="flex items-center justify-center gap-2">
                  <img
                    src="https://raw.githubusercontent.com/rutviktayde/EduMon-IMGs/main/Brain%20Berries.png"
                    alt="Brain Berry"
                    className="w-6 h-6 rounded-full object-cover"
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
                <p className="text-white/60 text-sm mt-2">
                  +{getXpReward(currentEdumon.evolutionStage)} XP
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <button
                onClick={() => handleEvolution(currentEdumon.id)}
                disabled={!canEvolve || isLocked}
                className={`flex items-center justify-center gap-3 font-bold py-4 px-8 rounded-2xl transition-all duration-300 ${
                  canEvolve && !isLocked
                    ? "bg-gradient-to-r from-purple-500/80 to-blue-500/80 hover:from-purple-500 hover:to-blue-500 text-white hover:scale-105 hover:shadow-xl border border-white/25"
                    : "bg-gray-500/20 border border-gray-500/30 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isLocked ? <Lock size={20} /> : <Zap size={20} />}
                {isLocked ? "Locked" : "Evolve"}
              </button>
            </div>

            {/* Evolution Progress */}
            {!isLocked && (
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
                      width: `${
                        ((currentEdumon.evolutionStage + 1) / 3) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            )}
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
            {edumonData.map((edumon, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 relative ${
                  index === currentPage
                    ? "bg-gradient-to-r from-purple-400 to-blue-400 scale-125 shadow-lg"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              >
                {!edumon.unlocked && (
                  <Lock
                    size={8}
                    className="absolute -top-1 -right-1 text-gray-400"
                  />
                )}
              </button>
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
                {
                  edumonData.filter((e) => e.evolutionStage === 2 && e.unlocked)
                    .length
                }
              </div>
              <div className="text-white/70 font-medium">Masters</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                {edumonData.filter((e) => e.unlocked).length}
              </div>
              <div className="text-white/70 font-medium">Unlocked</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">
                {Math.round(
                  (edumonData
                    .filter((e) => e.unlocked)
                    .reduce((sum, e) => sum + e.evolutionStage, 0) /
                    (edumonData.filter((e) => e.unlocked).length * 2)) *
                    100
                ) || 0}
                %
              </div>
              <div className="text-white/70 font-medium">Complete</div>
            </div>
          </div>
        </div>

        {/* Floating Chat Icon */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="bg-gradient-to-r from-purple-500/90 to-blue-500/90 hover:from-purple-500 hover:to-blue-500 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl border border-white/25 shadow-xl"
          >
            {isChatOpen ? <X size={28} /> : <MessageCircle size={28} />}
          </button>
        </div>

        {/* Floating Chat Window */}
        {isChatOpen && (
          <div
            className="fixed bottom-20 right-6 z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
            style={{
              width: chatSize.width,
              height: chatSize.height,
            }}
          >
            {/* Windows-style resize borders */}
            {/* Top edge */}
            <div
              className="absolute top-0 left-0 right-0 h-2 cursor-ns-resize z-10"
              onMouseDown={(e) => handleMouseDown(e, "n")}
            />

            {/* Bottom edge */}
            <div
              className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize z-10"
              onMouseDown={(e) => handleMouseDown(e, "s")}
            />

            {/* Left edge */}
            <div
              className="absolute top-0 bottom-0 left-0 w-2 cursor-ew-resize z-10"
              onMouseDown={(e) => handleMouseDown(e, "w")}
            />

            {/* Right edge */}
            <div
              className="absolute top-0 bottom-0 right-0 w-2 cursor-ew-resize z-10"
              onMouseDown={(e) => handleMouseDown(e, "e")}
            />

            {/* Top-left corner */}
            <div
              className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize z-10"
              onMouseDown={(e) => handleMouseDown(e, "nw")}
            />

            {/* Top-right corner */}
            <div
              className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize z-10"
              onMouseDown={(e) => handleMouseDown(e, "ne")}
            />

            {/* Bottom-left corner */}
            <div
              className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize z-10"
              onMouseDown={(e) => handleMouseDown(e, "sw")}
            />

            {/* Bottom-right corner */}
            <div
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-10"
              onMouseDown={(e) => handleMouseDown(e, "se")}
            />

            {/* Chat Header */}
            <div className="bg-gradient-to-r from-purple-500/80 to-blue-500/80 p-4 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg">
                    Chat with{" "}
                    {currentEdumon.customName ||
                      currentEdumon.defaultNames[currentEdumon.evolutionStage]}
                  </h3>
                  <p className="text-white/80 text-sm">
                    Your educational companion
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (isQuizMode) {
                      setIsQuizMode(false);
                    } else {
                      setIsQuizMode(true);
                      setMessages([]);
                      setQuizQuestions([]);
                      setUserAnswers({});
                      setShowResults(false);
                      setQuizPrompt("");
                      setUploadedFile(null);
                    }
                  }}
                  className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-all duration-200 hover:scale-110"
                  title={isQuizMode ? "Back to Chat" : "Start Quiz"}
                >
                  {isQuizMode ? (
                    <MessageCircle size={20} />
                  ) : (
                    <ClipboardList size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Quiz Setup Interface */}
            {isQuizMode && quizQuestions.length === 0 && !isGeneratingQuiz && (
              <div className="p-4 bg-white/5 border-b border-white/20 max-h-64 overflow-y-auto custom-scrollbar">
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Enter a topic or prompt for the quiz:
                    </label>
                    <input
                      type="text"
                      value={quizPrompt}
                      onChange={(e) => setQuizPrompt(e.target.value)}
                      placeholder="Enter data"
                      className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Or upload a document (PDF/DOC):
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-2 text-white text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-purple-500/80 file:text-white hover:file:bg-purple-500"
                    />
                    {uploadedFile && (
                      <p className="text-green-400 text-xs mt-1">
                        ✓ {uploadedFile.name} uploaded
                      </p>
                    )}
                  </div>

                  <button
                    onClick={generateQuiz}
                    disabled={!quizPrompt.trim() && !uploadedFile}
                    className="w-full bg-gradient-to-r from-purple-500/80 to-blue-500/80 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-500/50 disabled:to-gray-600/50 text-white py-2 px-4 rounded-xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed font-medium"
                  >
                    Generate Quiz
                  </button>
                </div>
              </div>
            )}

            {/* Quiz Questions Interface */}
            {isQuizMode && quizQuestions.length > 0 && !showResults && (
              <>
                <div
                  className="bg-white/5 border-b border-white/20"
                  style={{ height: `calc(${chatSize.height - 120}px)` }}
                >
                  <div className="overflow-y-auto custom-scrollbar p-4 h-full">
                    <div className="space-y-4">
                      {quizQuestions.map((question) => (
                        <div
                          key={question.id}
                          className="bg-white/10 rounded-xl p-4"
                        >
                          <h4 className="text-white font-medium mb-3">
                            {question.id}) {question.question}
                          </h4>
                          <div className="space-y-2">
                            {question.options.map((option, index) => (
                              <label
                                key={index}
                                className="flex items-center space-x-3 cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name={`question-${question.id}`}
                                  value={option}
                                  checked={userAnswers[question.id] === option}
                                  onChange={() =>
                                    handleAnswerSelect(question.id, option)
                                  }
                                  className="w-4 h-4 text-purple-500 bg-white/20 border-white/30 focus:ring-purple-500/50"
                                />
                                <span className="text-white/90 text-sm">
                                  {String.fromCharCode(65 + index)}) {option}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-white/10 bg-white/5 sticky bottom-0 z-10">
                  <button
                    onClick={submitQuiz}
                    disabled={
                      Object.keys(userAnswers).length < quizQuestions.length
                    }
                    className="w-full bg-gradient-to-r from-green-500/80 to-emerald-500/80 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-500/50 disabled:to-gray-600/50 text-white py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed font-medium"
                  >
                    Submit Quiz
                  </button>
                </div>
              </>
            )}

            {/* Quiz Results Interface */}
            {isQuizMode && showResults && (
              <>
                <div
                  className="bg-white/5 border-b border-white/20"
                  style={{ height: `calc(${chatSize.height - 120}px)` }}
                >
                  <div className="overflow-y-auto custom-scrollbar p-4 h-full">
                    <div className="space-y-4">
                      <h3 className="text-white font-bold text-lg text-center">
                        Quiz Results
                      </h3>

                      {quizQuestions.map((question) => {
                        const userAnswer = userAnswers[question.id];
                        const isCorrect = userAnswer === question.correctAnswer;

                        return (
                          <div
                            key={question.id}
                            className="bg-white/10 rounded-xl p-4"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="text-white font-medium">
                                {question.id}) {question.question}
                              </h4>
                              <span
                                className={`text-lg ${
                                  isCorrect ? "text-green-400" : "text-red-400"
                                }`}
                              >
                                {isCorrect ? "✅" : "❌"}
                              </span>
                            </div>

                            <div className="text-white/80 text-sm mb-2">
                              <span className="font-medium">Your Answer:</span>{" "}
                              {userAnswer || "Not answered"}
                            </div>

                            <div className="text-green-400 text-sm font-medium mb-2">
                              ✅ Answer: {question.correctAnswer}
                            </div>

                            <div className="text-white/70 text-sm">
                              <span className="font-medium">Why?</span>{" "}
                              {question.explanation}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-white/10 bg-white/5 sticky bottom-0 z-10">
                  <div className="flex gap-3">
                    <button
                      onClick={startNewQuiz}
                      className="flex-1 bg-gradient-to-r from-purple-500/80 to-blue-500/80 hover:from-purple-500 hover:to-blue-500 text-white py-2 px-4 rounded-xl transition-all duration-300 hover:scale-105 font-medium"
                    >
                      New Quiz
                    </button>
                    <button
                      onClick={exitQuiz}
                      className="flex-1 bg-gradient-to-r from-gray-500/80 to-gray-600/80 hover:from-gray-500 hover:to-gray-600 text-white py-2 px-4 rounded-xl transition-all duration-300 hover:scale-105 font-medium"
                    >
                      Exit Quiz
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Messages Container */}
            <div
              className="overflow-y-auto p-4 space-y-3 bg-white/5 custom-scrollbar"
              style={{ height: chatSize.height - 160 }}
            >
              <style>
                {`
                  .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 3px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(180deg, rgba(168, 85, 247, 0.5), rgba(59, 130, 246, 0.5));
                    border-radius: 3px;
                    transition: all 0.3s ease;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(180deg, rgba(168, 85, 247, 0.7), rgba(59, 130, 246, 0.7));
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb:active {
                    background: linear-gradient(180deg, rgba(168, 85, 247, 0.9), rgba(59, 130, 246, 0.9));
                  }
                `}
              </style>
              {messages.length === 0 ? (
                <div className="text-center text-white/60 py-8">
                  <MessageCircle
                    size={48}
                    className="mx-auto mb-2 opacity-50"
                  />
                  <p>Start a conversation with your Edumon!</p>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-2xl ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-purple-500/80 to-blue-500/80 text-white"
                            : "bg-white/20 text-white border border-white/30"
                        }`}
                      >
                        <div className="text-xs font-semibold mb-1">
                          {message.sender === "user"
                            ? "ME"
                            : currentEdumon.customName ||
                              currentEdumon.defaultNames[
                                currentEdumon.evolutionStage
                              ]}
                        </div>
                        <div className="text-sm">{message.text}</div>
                        <div className="text-xs opacity-60 mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Thinking Animation */}
                  {isThinking && (
                    <div className="flex justify-start">
                      <div className="bg-white/20 text-white border border-white/30 max-w-xs px-3 py-2 rounded-2xl">
                        <div className="text-xs font-semibold mb-1">
                          {currentEdumon.customName ||
                            currentEdumon.defaultNames[
                              currentEdumon.evolutionStage
                            ]}
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="flex space-x-1">
                            <div
                              className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                          <span className="text-xs text-white/60 ml-2">
                            thinking...
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Input Section */}
            <div className="p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-t border-white/20">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/30 backdrop-blur-sm border border-white/40 rounded-2xl px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 text-sm font-medium shadow-lg"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-gradient-to-r from-purple-500/90 to-blue-500/90 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-500/50 disabled:to-gray-600/50 text-white p-3 rounded-2xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );


export default EduMonApp;

