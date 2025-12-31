import { Suspense, lazy, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, PlayCircle, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import { AnimatedCharacter } from "./AnimatedCharacter";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../assets/PreissMurphy Logo-BGSDEhSA (1).svg";

// ... (كود استيراد الصفحات والدروس يبقى كما هو)
const pages = {
    "One-1": lazy(() => import("../units/g1/unitOne/L1/QuizPage.jsx")),
    "One-2": lazy(() => import("../units/g1/unitOne/L2/QuizPage.jsx")),
    "One-3": lazy(() => import("../units/g1/unitOne/L3/QuizPage.jsx")),
  
    "Two-1": lazy(() => import("../units/g1/unitTwo/L1/QuizPage.jsx")),
    "Two-2": lazy(() => import("../units/g1/unitTwo/L2/QuizPage.jsx")),
    "Two-3": lazy(() => import("../units/g1/unitTwo/L3/QuizPage.jsx")),
  
    "Three-1": lazy(() => import("../units/g1/unitThree/L1/QuizPage.jsx")),
    "Three-2": lazy(() => import("../units/g1/unitThree/L2/QuizPage.jsx")),
    "Three-3": lazy(() => import("../units/g1/unitThree/L3/QuizPage.jsx")),
  
    "Four-1": lazy(() => import("../units/g1/unitFour/L1/QuizPage.jsx")),
    "Four-2": lazy(() => import("../units/g1/unitFour/L2/QuizPage.jsx")),
    "Four-3": lazy(() => import("../units/g1/unitFour/L3/QuizPage.jsx")),
  };
  
  const lessons = [
    { number: 1, color: "from-blue-400 to-blue-500" },
    { number: 2, color: "from-green-400 to-green-500" },
    { number: 3, color: "from-pink-400 to-pink-500" },
  ];

export default function VideoPlayerPage() {
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const key = `${unitId}-${lessonId}`;
  const Component = pages[key];

  const handleLessonSelect = (lessonNumber) => {
    navigate(`/unit/${unitId}/lesson/${lessonNumber}`);
    setIsMenuOpen(false);
  };

  const handleBackToUnits = () => {
    navigate("/UnitsPage");
  };

  const handlePrevious = () => {
    navigate(-1);
  };
  const handleSkip = () => {
    navigate(`/unit/${unitId}/lesson/${lessonId}/feedBack`);
  };

  if (!Component) return <div>Quiz Not Found</div>;

  return (
    <div className="h-screen w-screen relative overflow-hidden flex flex-col ">
      <AnimatedBackground />
      <AnimatedCharacter />

      <div className="flex-1 p-4 sm:p-6 md:p-8 flex items-center justify-center overflow-hidden">
        <button onClick={handlePrevious} className="feedquiz left">
          <ChevronLeft className="w-8 h-8" />
        </button>
        <div className="max-w-5xl mx-auto relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full h-full"
          >
            <Suspense fallback={<div>Loading...</div>}>
              <Component />
            </Suspense>
          </motion.div>
        </div>
        <button onClick={handleSkip} className="feedquiz right">
          <ChevronRight className="w-8 h-8 z-[10000]" />
        </button>
      </div>

      <div className="w-full h-[2px] bg-white/30 relative z-10"></div>

          <motion.div
        className="relative z-10 py-4 px-4 sm:px-6 bg-white border-t"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-8xl mx-auto flex items-center justify-between">
          {/* ===== يسار: Logo + Home ===== */}
          <div className="flex items-center gap-4">
            <img src={logo} alt="J1 Logo" className="h-10 w-auto" />

            <motion.button
              onClick={handleBackToUnits}
              className="
             relative z-50
             px-4 py-2 rounded-xl border font-medium
             transition-all duration-200 text-sm
             flex items-center gap-2
             border-[#b99cfa] text-[#6B40C8] hover:bg-purple-50
           "
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline text-base">Units</span>
            </motion.button>
          </div>

          {/* ===== يمين: Lessons (Desktop) / Menu (Mobile) ===== */}
          <div className="relative flex items-center gap-2">
            {/* دروس – ديسكتوب فقط */}
            <div className="hidden xl:flex items-center absolute right-80 gap-2">
              {lessons.map((l) => (
                <button
                  key={l.number}
                  onClick={() => handleLessonSelect(l.number)}
                  className={`whitespace-nowrap
                 rounded-xl border font-medium transition-all duration-200
                 px-4 py-2 text-sm flex items-center gap-2 
                 ${
                   Number(lessonId) === l.number
                     ? `border-[#6B40C8] text-white bg-gradient-to-r ${l.color}`
                     : "border-[#b99cfa] text-[#6B40C8] hover:bg-purple-50"
                 }
               `}
                >
                  <PlayCircle className="w-5 h-5" />
                  Lesson {l.number}
                </button>
              ))}
            </div>

            {/* Menu – موبايل وتابلت */}
            <div className="xl:hidden">
              <button
                onClick={() => setIsMenuOpen((v) => !v)}
                className="
               relative z-50 right-40
               p-2 rounded-md border
               border-[#b99cfa] text-[#6B40C8]
               hover:bg-purple-50
             "
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="
                 absolute bottom-full right-20 mb-2 w-48
                 bg-white rounded-lg shadow-xl border z-[999]
               "
                >
                  <div className="p-2">
                    <p className="px-3 py-1 text-sm font-semibold text-gray-500">
                      Select Lesson
                    </p>

                    {lessons.map((l) => (
                      <button
                        key={l.number}
                        onClick={() => handleLessonSelect(l.number)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-3 transition-colors ${
                          Number(lessonId) === l.number
                            ? `font-bold text-white bg-gradient-to-r ${l.color}`
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <PlayCircle className="w-5 h-5" />
                        Lesson {l.number}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
