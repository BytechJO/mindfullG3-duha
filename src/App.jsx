import {Routes, Route } from "react-router-dom";
import StoryWrapper from './pages/StoryWrapper.jsx';
import Home from "./pages/home";
import QuizWrapper from "./pages/quizwrapper.jsx";
import FeedBackWrapper from "./pages/feedbackwrapper.jsx";
import HomePage from "./pages/HomePage.jsx";
import UnitsPage from "./pages/UnitsPage.jsx";
import VideoPlayerPage from './pages/VideoPlayerPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/UnitsPage" element={<UnitsPage />} />
      <Route path="/unit/:unitId/lesson/:lessonId" element={<VideoPlayerPage />} />
      <Route path="/unit/:unitId/lesson/:lessonId/quiz" element={<QuizWrapper />} />
      <Route path="/unit/:unitId/lesson/:lessonId/feedback" element={<FeedBackWrapper />} />
    </Routes>
  );
};

export default App;
