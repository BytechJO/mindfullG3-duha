import Q1Image from './assets/Q1.png';
import React, { useState } from 'react';
import '../../shared/Quiz.css';
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';
import ValidationAlert from '../../shared/ValidationAlert';
import Timg from '../../../../assets/Gif/Approve.gif';
import Fimg from '../../../../assets/Gif/False.gif';

export const QuizPage = () => {
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({ q1: null, q2: null, q3: null });
  const [results, setResults] = useState({ q1: null, q2: null, q3: null });
  const [showSkip, setShowSkip] = useState(false);
  const [showTry, setShowTry] = useState(false);

  const correctAnswers = { q1: "0", q2: "0", q3: "2" }; // إجابات صحيحة لأسئلة Jen

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!answers.q1 || !answers.q2 || !answers.q3) {
      ValidationAlert.info("Incomplete", "Please answer all questions before submitting!");
      return;
    }

    const newResults = {
      q1: answers.q1 === correctAnswers.q1,
      q2: answers.q2 === correctAnswers.q2,
      q3: answers.q3 === correctAnswers.q3
    };

    setResults(newResults);
    setShowSkip(true);
    setShowTry(true);

    const score = Object.values(newResults).filter(Boolean).length;
    const totalQuestions = Object.keys(newResults).length;
    const scoreString = `${score}/${totalQuestions}`;

    if (score === totalQuestions) {
      ValidationAlert.success("Good Job!", "", scoreString)
        .then(() => navigate(`/unit/${unitId}/lesson/${lessonId}/feedBack`));
    } else {
      ValidationAlert.error("Try again", "", scoreString);
    }
  };

  const handleTryAgain = () => {
    setAnswers({ q1: null, q2: null, q3: null });
    setResults({ q1: null, q2: null, q3: null });
    setShowSkip(false);
    setShowTry(false);

    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => (radio.checked = false));
  };

  const handleSkip = () => {
    navigate(`/unit/${unitId}/lesson/${lessonId}/feedBack`);
  };

  // تظهر صورة صح أو خطأ بجانب الخيار الذي اختاره الطالب فقط
  const renderAnswerGif = (question, optionValue) => {
    if (results[question] === null) return null;
    if (answers[question] !== optionValue) return null;
    return results[question] ? <img src={Timg} alt="correct" className="answer-gif" />
      : <img src={Fimg} alt="wrong" className="answer-gif" />;
  };

  return (
    <div className="story-pages-container">
      <div className="w-full max-w-6xl">
        <div className="paper animate__animated animate__backInDown" id="p3">
          <img src={Q1Image} alt="Background" className="bg-img" />

          <div className="content">
            <div className="questions">
              <div className="Q1">
                <span>Who gave Jen her pair of roller skates?</span>
                <ul>
                  <li>
                    <p> Her aunt and uncle.</p>
                    <input type="radio" name="q1" value="0" onChange={handleChange} />
                    {renderAnswerGif('q1', '0')}
                  </li>
                  <li>
                    <p> Her grandparents.</p>
                    <input type="radio" name="q1" value="1" onChange={handleChange} />
                    {renderAnswerGif('q1', '1')}
                  </li>
                  <li>
                    <p> Her friends.</p>
                    <input type="radio" name="q1" value="2" onChange={handleChange} />
                    {renderAnswerGif('q1', '2')}
                  </li>
                </ul>
              </div>

              <div className="Q2">
                <span>What did Jen do when she kept falling over?</span>
                <ul>
                  <li>
                    <p> Sit for a few minutes and then kept trying.</p>
                    <input type="radio" name="q2" value="0" onChange={handleChange} />
                    {renderAnswerGif('q2', '0')}
                  </li>
                  <li>
                    <p> Give up and quit.</p>
                    <input type="radio" name="q2" value="1" onChange={handleChange} />
                    {renderAnswerGif('q2', '1')}
                  </li>
                  <li>
                    <p> Sit and think about what is for dinner.</p>
                    <input type="radio" name="q2" value="2" onChange={handleChange} />
                    {renderAnswerGif('q2', '2')}
                  </li>
                </ul>
              </div>

              <div className="Q3">
                <span>What did Jen tell her aunt when she was practising?</span>
                <ul>
                  <li>
                    <p> ‘I am ready to try again!’</p>
                    <input type="radio" name="q3" value="0" onChange={handleChange} />
                    {renderAnswerGif('q3', '0')}
                  </li>
                  <li>
                    <p> ‘More lemonade and cake please!’</p>
                    <input type="radio" name="q3" value="1" onChange={handleChange} />
                    {renderAnswerGif('q3', '1')}
                  </li>
                  <li>
                    <p> ‘I’m going to keep trying.’</p>
                    <input type="radio" name="q3" value="2" onChange={handleChange} />
                    {renderAnswerGif('q3', '2')}
                  </li>
                </ul>
              </div>
            </div>
            <div className="quiz-buttons">
              <button type="button" id="submitBtn" onClick={handleSubmit}>Submit</button>
              {showSkip && <button type="button" className="skip-btn" onClick={handleSkip}>Skip</button>}
              {showTry && <button type="button" className="try-btn" onClick={handleTryAgain}>Try Again</button>}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
