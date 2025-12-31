import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Subtitles, Maximize2, Minimize2, MessageSquareText } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';

import video1 from "./assets/1.mp4";
import video2 from "./assets/2.mp4";
import video3 from "./assets/3.mp4";
import video4 from "./assets/4.mp4";
import video5 from "./assets/5-1.mp4";
import video6 from "./assets/5-2.mp4";

export const StoryPage = () => {
  const [extraBubble, setExtraBubble] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const [selectedWords, setSelectedWords] = useState([]);
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const [showFeedback, setShowFeedback] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(0.75);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [showCaption, setShowCaption] = useState(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const availableSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenContainerRef = useRef(null);

  const videos = [
    {
      url: video1,
      title: "Section 1",
      subtitles: []
    },
    {
      url: video2,
      title: "Section 2",
      subtitles: [
      ]
    },
    {
      url: video3,
      title: "Section 3",
      subtitles: [
        {
          start: 9.2, end: 11.5,
          words: [
            { text: "Have", start: 9.8, end: 10.1 },
            { text: "you", start: 10.1, end: 10.3 },
            { text: "seen", start: 10.3, end: 10.6 },
            { text: "my", start: 10.6, end: 10.8 },
            { text: "salt?", start: 10.8, end: 11.2 },
          ]
        },
        {
          start: 11.5, end: 16.2,
          words: [
            { text: "I", start: 11.6, end: 11.9 },
            { text: "had", start: 11.9, end: 12.2 },
            { text: "lots", start: 12.2, end: 12.5 },
            { text: "in", start: 12.5, end: 12.8 },
            { text: "the", start: 12.8, end: 13.1 },
            { text: "bag,", start: 13.1, end: 13.4 },
            { text: "now", start: 14.0, end: 14.3 },
            { text: "I", start: 14.3, end: 14.6 },
            { text: "only", start: 14.6, end: 14.9 },
            { text: "have", start: 14.9, end: 15.2 },
            { text: "a", start: 15.2, end: 15.5 },
            { text: "little", start: 15.5, end: 15.8 },
            { text: "bit,", start: 15.8, end: 16.1 },
          ]
        },
        {
          start: 16.2, end: 18.3,
          words: [
            { text: "I", start: 16.2, end: 16.4 },
            { text: "can't", start: 16.4, end: 16.7 },
            { text: "do", start: 16.7, end: 16.9 },
            { text: "my", start: 16.9, end: 17.1 },
            { text: "experiment.", start: 17.1, end: 18.1 },
          ]
        },

        {
          start: 28.8, end: 32.3,
          words: [
            { text: "No,", start: 29.0, end: 29.5 },
            { text: "sorry", start: 29.5, end: 30.0 },
            { text: "I", start: 30.5, end: 30.6 },
            { text: "don't", start: 30.6, end: 30.8 },
            { text: "know", start: 30.8, end: 31.1 },
            { text: "where", start: 31.1, end: 31.4 },
            { text: "your", start: 31.4, end: 31.6 },
            { text: "salt", start: 31.6, end: 31.9 },
            { text: "is.", start: 31.9, end: 32.3 },
          ]
        },
        {
          start: 32.3, end: 32.8,
          words: [
            { text: "Rob", start: 6.4, end: 6.8 },
            { text: "does", start: 6.8, end: 7.2 },
            { text: "not", start: 7.2, end: 7.6 },
            { text: "look", start: 7.6, end: 8.0 },
            { text: "happy", start: 8.0, end: 8.4 },
            { text: ", Adam", start: 21.5, end: 21.9 },
            { text: "feels", start: 21.9, end: 22.2 },
            { text: "sad", start: 22.2, end: 22.4 },
            { text: "that", start: 22.4, end: 22.6 },
            { text: "he", start: 22.6, end: 22.8 },
            { text: "took", start: 22.8, end: 23.1 },
            { text: "Rob's", start: 23.1, end: 23.4 },
            { text: "salt,", start: 23.4, end: 23.7 },
            { text: "but", start: 24.2, end: 24.4 },
            { text: "he", start: 24.4, end: 24.6 },
            { text: "is", start: 24.6, end: 24.8 },
            { text: "scared", start: 24.8, end: 25.2 },
            { text: "he", start: 25.2, end: 25.4 },
            { text: "will", start: 25.4, end: 25.6 },
            { text: "be", start: 25.6, end: 25.8 },
            { text: "angry", start: 25.8, end: 26.2 },
            { text: "if", start: 26.2, end: 26.4 },
            { text: "he", start: 26.4, end: 26.6 },
            { text: "tells", start: 26.6, end: 26.9 },
            { text: "the", start: 26.9, end: 27.1 },
            { text: "truth.", start: 27.1, end: 27.4 },
          ]
        },
      ]
    },
    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 0.0, end: 1.0,
          words: [
            { text: "Are", start: 0.0, end: 0.3 },
            { text: "you", start: 0.3, end: 0.6 },
            { text: "okay?'", start: 0.6, end: 0.9 },
          ]
        },
        {
          start: 1.1, end: 3.3,
          words: [
            { text: "I", start: 1.2, end: 1.4 },
            { text: "think", start: 1.4, end: 1.7 },
            { text: "I", start: 1.7, end: 1.8 },
            { text: "forgot", start: 1.8, end: 2.2 },
            { text: "to", start: 2.2, end: 2.4 },
            { text: "bring", start: 2.4, end: 2.7 },
            { text: "enough", start: 2.7, end: 3.0 },
            { text: "salt,", start: 3.0, end: 3.2 },
          ]
        },
        {
          start: 3.5, end: 8.5,
          words: [
            { text: "That's", start: 4.0, end: 4.3 },
            { text: "a", start: 4.3, end: 4.5 },
            { text: "shame,", start: 4.5, end: 4.8 },
            { text: "we", start: 5.5, end: 5.7 },
            { text: "sent", start: 5.7, end: 6.0 },
            { text: "a", start: 6.0, end: 6.1 },
            { text: "letter", start: 6.1, end: 6.5 },
            { text: "home", start: 6.5, end: 6.8 },
            { text: "that", start: 6.8, end: 7.0 },
            { text: "told", start: 7.0, end: 7.3 },
            { text: "you", start: 7.3, end: 7.5 },
            { text: "how", start: 7.5, end: 7.7 },
            { text: "much", start: 7.7, end: 7.9 },
            { text: "you", start: 7.9, end: 8.1 },
            { text: "needed,", start: 8.1, end: 8.4 },
          ]
        },
        {
          start: 14.1, end: 19.0,
          words: [
            { text: "I'm", start: 14.5, end: 14.7 },
            { text: "sorry", start: 14.7, end: 15.2 },
            { text: "I", start: 16.1, end: 16.2 },
            { text: "took", start: 16.2, end: 16.5 },
            { text: "the", start: 16.5, end: 16.6 },
            { text: "salt", start: 16.6, end: 16.8 },
            { text: "because", start: 16.8, end: 17.1 },
            { text: "I", start: 17.1, end: 17.2 },
            { text: "didn't", start: 17.2, end: 17.7 },
            { text: "have", start: 17.7, end: 18.1 },
            { text: "enough,", start: 18.1, end: 18.5 },
          ]
        },
        {
          start: 19.0, end: 22.6,
          words: [
            { text: "You", start: 19.5, end: 19.8 },
            { text: "did", start: 19.8, end: 20.1 },
            { text: "the", start: 20.1, end: 20.4 },
            { text: "right", start: 20.4, end: 20.8 },
            { text: "thing", start: 20.8, end: 21.2 },
            { text: "by", start: 21.2, end: 21.5 },
            { text: "telling", start: 21.5, end: 21.8 },
            { text: "the", start: 21.8, end: 22.1 },
            { text: "truth,", start: 22.1, end: 22.5 },
          ]
        },
        {
          start: 22.6, end: 26.5,
          words: [
            { text: "It", start: 22.6, end: 22.8 },
            { text: "is", start: 22.8, end: 23.0 },
            { text: "good", start: 23.0, end: 23.3 },
            { text: "to", start: 23.3, end: 23.5 },
            { text: "tell", start: 23.5, end: 23.8 },
            { text: "the", start: 23.8, end: 24.1 },
            { text: "truth", start: 24.1, end: 24.5 },
            { text: "when", start: 24.5, end: 24.8 },
            { text: "you", start: 24.8, end: 25.1 },
            { text: "make", start: 25.1, end: 25.4 },
            { text: "a", start: 25.4, end: 25.6 },
            { text: "mistake.", start: 25.6, end: 26.0 },
          ]
        },
        {
          start: 26.5, end: 28.5,
          words: [
            { text: "But", start: 26.5, end: 26.8 },
            { text: "what", start: 26.8, end: 27.1 },
            { text: "about", start: 27.1, end: 27.4 },
            { text: "my", start: 27.4, end: 27.7 },
            { text: "experiment?", start: 27.7, end: 28.0 },
          ]
        },
      ]
    },
    {
      url: video5,
      title: "Section 5",
      subtitles: [
        {
          start: 10.0, end: 15.3,
          words: [
            { text: "We", start: 10.5, end: 10.8 },
            { text: "could", start: 10.8, end: 11.1 },
            { text: "ask", start: 11.1, end: 11.4 },
            { text: "the", start: 11.4, end: 11.7 },
            { text: "cook", start: 11.7, end: 12.0 },
            { text: "in", start: 12.0, end: 12.3 },
            { text: "the", start: 12.3, end: 12.6 },
            { text: "cafeteria", start: 12.6, end: 12.9 },
            { text: "if", start: 12.9, end: 13.2 },
            { text: "he", start: 13.2, end: 13.5 },
            { text: "can", start: 13.5, end: 13.8 },
            { text: "give", start: 13.8, end: 14.1 },
            { text: "us", start: 14.1, end: 14.4 },
            { text: "some", start: 14.4, end: 14.7 },
            { text: "salt.", start: 14.7, end: 15.0 }
          ]
        },
        {
          start: 15.5, end: 17.6,
          words: [
            { text: "That's", start: 15.8, end: 16.1 },
            { text: "a", start: 16.1, end: 16.4 },
            { text: "good", start: 16.4, end: 16.7 },
            { text: "idea", start: 16.7, end: 17.0 },
            { text: "Adam", start: 17.0, end: 17.3 }
          ]
        }
      ]
    },
    {
      url: video6,
      title: "Section 6",
      subtitles: [
        {
          start: 6.4, end: 10.3,
          words: [
            { text: "I'm", start: 6.5, end: 6.85 },
            { text: "happy", start: 6.85, end: 7.2 },
            { text: "you", start: 7.2, end: 7.55 },
            { text: "can", start: 7.55, end: 7.9 },
            { text: "make", start: 7.9, end: 8.25 },
            { text: "your", start: 8.25, end: 8.6 },
            { text: "modelling", start: 8.6, end: 8.95 },
            { text: "dough", start: 8.95, end: 9.3 },
            { text: "now", start: 9.3, end: 9.65 },
            { text: "Rob", start: 9.65, end: 10.0 }
          ]
        },
      ]
    }
  ];
  const cloudPositions = {
    0: [],
    1: [
    ],
    2: [
      { top: '10%', right: '45%', left: 'auto' },
      { top: '10%', left: '15%' },
      { top: '15%', left: '15%' },
      { top: '30%', right: '10%', left: 'auto', isFlipped: true },
      { top: '0%', left: '50%', isFlipped: true },
    ],
    3: [
      { bottom: '80%', left: '68%', transform: 'translateX(-50%)', isFlipped: true },
      { top: '50%', left: '50%' },
      { top: '10%', left: '60%', isFlipped: true },
      { top: '10%', left: '50%', isFlipped: true },
      { bottom: '80%', left: '18%', transform: 'translateX(-50%)' },
      { top: '10%', left: '20%' },
      { top: '10%', left: '20%' },
    ],
    4: [
      { top: '10%', left: '40%', transform: 'translateX(-50%)', isFlipped: true },
      { top: '10%', left: '45%' },
    ],
    5: [
      { top: '25%', left: '35%', isFlipped: true },
    ],
  };
  // 2
  const extraBubblesData = [
    {
      videoIndex: 1,
      start: 0,
      end: 2.2,
      words: [
        { text: "Adam", start: 0.0, end: 0.5 },
        { text: "is", start: 0.5, end: 0.9 },
        { text: "at", start: 0.9, end: 1.2 },
        { text: "the", start: 1.2, end: 1.4 },
        { text: "Science", start: 1.4, end: 2.0 },
        { text: "Fair.", start: 2.0, end: 2.2 },
      ]
    },
    {
      videoIndex: 1,
      start: 1.7,
      end: 4.8,
      words: [
        { text: "and", start: 1.7, end: 2.0 },
        { text: "is", start: 2.0, end: 2.3 },
        { text: "getting", start: 2.3, end: 2.7 },
        { text: "everything", start: 2.7, end: 3.2 },
        { text: "ready", start: 3.2, end: 3.6 },
        { text: "for", start: 3.6, end: 3.8 },
        { text: "his", start: 3.8, end: 4.0 },
        { text: "experiment.", start: 4.0, end: 4.6 },
      ]
    },
    {
      videoIndex: 1,
      start: 5.0,
      end: 8.0,
      words: [
        { text: "The", start: 5.0, end: 5.2 },
        { text: "children", start: 5.2, end: 5.7 },
        { text: "are", start: 5.7, end: 5.9 },
        { text: "making", start: 5.9, end: 6.4 },
        { text: "modelling", start: 6.4, end: 6.9 },
        { text: "dough.", start: 6.9, end: 7.5 },
      ]
    },
    {
      videoIndex: 1,
      start: 8.0,
      end: 14.0,
      words: [
        { text: "He", start: 8.0, end: 8.3 },
        { text: "needs", start: 8.3, end: 8.7 },
        { text: "a", start: 8.7, end: 8.9 },
        { text: "scale,", start: 8.9, end: 9.5 },
        { text: "a bowl", start: 10.0, end: 10.5 },
        { text: "flour,", start: 11.0, end: 11.5 },
        { text: "water", start: 12.0, end: 12.5 },
        { text: "and", start: 12.9, end: 13.3 },
        { text: "salt.", start: 13.5, end: 13.8 }
      ]
    },
    {
      videoIndex: 1,
      start: 14.0,
      end: 18.5,
      words: [
        { text: "He measures", start: 14.0, end: 14.4 },
        { text: "all", start: 14.4, end: 14.7 },
        { text: "his", start: 14.7, end: 14.9 },
        { text: "ingredients,", start: 14.9, end: 15.5 },
        { text: "but", start: 16.0, end: 16.4 },
        { text: "he", start: 16.4, end: 16.7 },
        { text: "doesn't", start: 16.7, end: 17.1 },
        { text: "have", start: 17.1, end: 17.5 },
        { text: "enough", start: 17.5, end: 18.0 },
        { text: "salt.", start: 18.0, end: 18.4 }
      ]
    },
    {
      videoIndex: 1,
      start: 18.5,
      end: 19.4,
      words: [
        { text: "Oh", start: 18.6, end: 18.9 },
        { text: "no!", start: 18.9, end: 19.2 }
      ]
    },
    {
      videoIndex: 1,
      start: 19.5,
      end: 21.5,
      words: [
        { text: "His", start: 19.5, end: 19.8 },
        { text: "experiment", start: 19.8, end: 20.5 },
        { text: "won't", start: 20.5, end: 20.7 },
        { text: "work.", start: 20.7, end: 21.0 },
      ]
    },
    {
      videoIndex: 1,
      start: 21.5,
      end: 27.0,
      words: [
        { text: "While", start: 22.0, end: 22.3 },
        { text: "the", start: 22.3, end: 22.6 },
        { text: "boy", start: 22.6, end: 22.9 },
        { text: "next", start: 22.9, end: 23.2 },
        { text: "to", start: 23.2, end: 23.5 },
        { text: "him", start: 23.5, end: 23.8 },
        { text: "is", start: 23.8, end: 24.1 },
        { text: "chatting,", start: 24.1, end: 24.4 },
        { text: "Adam", start: 25.0, end: 25.3 },
        { text: "takes", start: 25.3, end: 25.6 },
        { text: "some", start: 25.6, end: 25.9 },
        { text: "salt", start: 25.9, end: 26.2 },
        { text: "from", start: 26.2, end: 26.5 },
        { text: "his", start: 26.5, end: 26.8 },
        { text: "table.", start: 26.8, end: 27.0 },
      ]
    },
    {
      videoIndex: 1,
      start: 27.0,
      end: 29.0,
      words: [
        { text: "Now", start: 27.0, end: 27.3 },
        { text: "he", start: 27.3, end: 27.6 },
        { text: "has", start: 27.6, end: 27.9 },
        { text: "everything", start: 27.9, end: 28.2 },
        { text: "he", start: 28.2, end: 28.5 },
        { text: "needs.", start: 28.5, end: 28.5 },
      ]
    },


    {
      videoIndex: 2,
      start: 0, end: 2.0,
      words: [
        { text: "Adam's", start: 0.1, end: 0.4 },
        { text: "experiment", start: 0.4, end: 1.2 },
        { text: "is", start: 1.2, end: 1.5 },
        { text: "good.", start: 1.5, end: 2.0 },
      ]
    },
    {
      videoIndex: 2,
      start: 2.0, end: 4.9,
      words: [
        { text: "His", start: 2.1, end: 2.4 },
        { text: "modelling", start: 2.4, end: 3.1 },
        { text: "dough", start: 3.1, end: 3.4 },
        { text: "is", start: 3.5, end: 4.0 },
        { text: "perfect.", start: 4.3, end: 4.8 },
      ]
    },
    {
      videoIndex: 2,
      start: 6.0, end: 9.0,
      words: [
        { text: "Rob", start: 6.4, end: 6.8 },
        { text: "does", start: 6.8, end: 7.2 },
        { text: "not", start: 7.2, end: 7.6 },
        { text: "look", start: 7.6, end: 8.0 },
        { text: "happy.", start: 8.0, end: 8.4 },
      ]
    },
    {
      videoIndex: 2,
      start: 21.0, end: 27.5,
      words: [
        { text: "Adam", start: 21.5, end: 21.9 },
        { text: "feels", start: 21.9, end: 22.2 },
        { text: "sad", start: 22.2, end: 22.4 },
        { text: "that", start: 22.4, end: 22.6 },
        { text: "he", start: 22.6, end: 22.8 },
        { text: "took", start: 22.8, end: 23.1 },
        { text: "Rob's", start: 23.1, end: 23.4 },
        { text: "salt,", start: 23.4, end: 23.7 },
        { text: "but", start: 24.2, end: 24.4 },
        { text: "he", start: 24.4, end: 24.6 },
        { text: "is", start: 24.6, end: 24.8 },
        { text: "scared", start: 24.8, end: 25.2 },
        { text: "he", start: 25.2, end: 25.4 },
        { text: "will", start: 25.4, end: 25.6 },
        { text: "be", start: 25.6, end: 25.8 },
        { text: "angry", start: 25.8, end: 26.2 },
        { text: "if", start: 26.2, end: 26.4 },
        { text: "he", start: 26.4, end: 26.6 },
        { text: "tells", start: 26.6, end: 26.9 },
        { text: "the", start: 26.9, end: 27.1 },
        { text: "truth.", start: 27.1, end: 27.4 },
      ]
    },

    {
      videoIndex: 3,
      start: 8.9, end: 13.0,
      words: [
        { text: "Adam", start: 9.0, end: 9.5 },
        { text: "feels", start: 9.5, end: 10.0 },
        { text: "terrible,", start: 10.0, end: 10.5 },
        { text: "he", start: 11.0, end: 11.2 },
        { text: "decides", start: 11.2, end: 11.6 },
        { text: "to", start: 11.6, end: 11.7 },
        { text: "tell", start: 11.7, end: 12.0 },
        { text: "the", start: 12.0, end: 12.3 },
        { text: "truth.", start: 12.3, end: 12.8 },
      ]
    },

    {
      videoIndex: 4,
      start: 0.0, end: 2.5,
      words: [
        { text: "Adam", start: 0.0, end: 0.5 },
        { text: "offers", start: 0.5, end: 1.0 },
        { text: "Rob", start: 1.0, end: 1.3 },
        { text: "his", start: 1.3, end: 1.5 },
        { text: "modelling", start: 1.5, end: 2.0 },
        { text: "dough,", start: 2.0, end: 2.5 },
      ]
    },
    {
      videoIndex: 4,
      start: 2.6, end: 4.0,
      words: [
        { text: "but", start: 2.6, end: 2.8 },
        { text: "Rob", start: 2.8, end: 3.0 },
        { text: "isn't", start: 3.0, end: 3.3 },
        { text: "happy.", start: 3.3, end: 4.0 },
      ]
    },
    {
      videoIndex: 4,
      start: 5.1, end: 7.5,
      words: [
        { text: "He", start: 5.1, end: 5.3 },
        { text: "wants", start: 5.3, end: 5.6 },
        { text: "to", start: 5.6, end: 5.7 },
        { text: "make", start: 5.7, end: 5.9 },
        { text: "his", start: 5.9, end: 6.1 },
        { text: "own", start: 6.1, end: 6.4 },
        { text: "modelling", start: 6.4, end: 6.8 },
        { text: "dough.", start: 6.8, end: 7.5 },
      ]
    },
    {
      videoIndex: 4,
      start: 7.8, end: 9.3,
      words: [
        { text: "Adam", start: 8.0, end: 8.3 },
        { text: "has", start: 8.3, end: 8.6 },
        { text: "an", start: 8.6, end: 8.8 },
        { text: "idea.", start: 8.8, end: 9.1 }
      ]
    },

    {
      videoIndex: 5,
      start: 0.0, end: 6.2,
      words: [
        { text: "Adam", start: 0.0, end: 0.5 },
        { text: "and", start: 0.5, end: 1.0 },
        { text: "Rob", start: 1.0, end: 1.5 },
        { text: "go", start: 1.5, end: 2.0 },
        { text: "to", start: 2.0, end: 2.5 },
        { text: "the", start: 2.5, end: 3.0 },
        { text: "kitchen", start: 3.0, end: 3.5 },
        { text: "and", start: 3.5, end: 3.8 },
        { text: "ask", start: 3.8, end: 4.1 },
        { text: "the", start: 4.1, end: 4.3 },
        { text: "cook", start: 4.3, end: 4.8 },
        { text: "for", start: 4.8, end: 5.1 },
        { text: "some", start: 5.1, end: 5.4 },
        { text: "salt.", start: 5.4, end: 6.0 }
      ]
    },
    {
      videoIndex: 5,
      start: 10.5, end: 13.9,
      words: [
        { text: "Adam", start: 10.5, end: 10.8 },
        { text: "was", start: 10.8, end: 11.0 },
        { text: "glad", start: 11.0, end: 11.3 },
        { text: "he", start: 11.3, end: 11.4 },
        { text: "could", start: 11.4, end: 11.7 },
        { text: "fix", start: 11.7, end: 11.8 },
        { text: "his", start: 11.8, end: 11.9 },
        { text: "mistake", start: 11.9, end: 12.2 },
        { text: "and", start: 12.2, end: 12.4 },
        { text: "help", start: 12.4, end: 12.8 },
        { text: "Rob.", start: 12.8, end: 13.3 }
      ]
    },
  ];




  const [showWrongFeedback, setShowWrongFeedback] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const [autoPlayNext, setAutoPlayNext] = useState(true);
  const [textHighlight, setTextHighlight] = useState(true);
  const settingsPopupRef = useRef(null);
  const [narrationHighlight, setNarrationHighlight] = useState(true);
  const currentVideoData = videos[currentVideo];


  useEffect(() => {
    if (showSettingsPopup && videoRef.current) {
      videoRef.current.pause();
    }
  }, [showSettingsPopup]);

  const activeSubtitleIndex = currentVideoData.subtitles.findIndex(
    sub => currentTime >= sub.start && currentTime < sub.end
  );
  const activeSubtitle = activeSubtitleIndex !== -1
    ? currentVideoData.subtitles[activeSubtitleIndex]
    : null;
  const bubbleStyle = cloudPositions[currentVideo] && cloudPositions[currentVideo][activeSubtitleIndex]
    ? cloudPositions[currentVideo][activeSubtitleIndex]
    : {};

  const handleMouseDown = () => {
    setIsSelecting(true);
  };
  const handleMouseUp = () => {
    if (isSelecting) {
      handleTextSelection();
    }
    setIsSelecting(false);
  };
  useEffect(() => {
    const bubbleToShow = extraBubblesData.find(bubble =>
      bubble.videoIndex === currentVideo &&
      currentTime >= bubble.start &&
      currentTime < bubble.end
    );

    setExtraBubble(bubbleToShow || null);

  }, [currentVideo, currentTime]);
  useEffect(() => {
    const nextVideoIndex = currentVideo + 1;
    if (nextVideoIndex < videos.length) {
      const nextVideoUrl = videos[nextVideoIndex].url;
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = nextVideoUrl;
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [currentVideo, videos]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (currentVideo === 2 && isPlaying) {
      console.log(`Current Time: ${currentTime}, Duration: ${duration}`);
      if (duration > 0 && currentTime >= duration - 0.1) {
        video.pause();
        setShowBanner(true);
      }
    }
  }, [currentTime, currentVideo, isPlaying, duration]);

  const handleTryAgain = () => {
    setSelectedWords([]);
    setShowFeedback(false);
  };
  useEffect(() => {
    setSelectedWords([]);
    setShowFeedback(false);
  }, [currentVideo]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleLoadedData = () => setDuration(video.duration);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);
  useEffect(() => {
    if (showBanner && videoRef.current) {
      videoRef.current.pause();
    }
  }, [showBanner]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      setCurrentTime(0);
      setShowBubble(true);

      // حاول تشغيل الفيديو الجديد تلقائيًا
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // لا بأس، المتصفح منع التشغيل التلقائي
        });
      }
    }
  }, [currentVideo]);
  useEffect(() => {
    if (showBanner && videoRef.current) {
      videoRef.current.pause();
    }
  }, [showBanner]);

  const handleWordClick = (word) => {
    const cleanWord = word.toLowerCase().replace(/[.,?!]/g, "");

    if (cleanWord !== "sad") {
      setShowWrongFeedback(true);
      setTimeout(() => setShowWrongFeedback(false), 2000);
      return;
    }

    setShowFeedback(true);
    setShowBanner(false);
    setTimeout(() => {
      setShowFeedback(false);
      handleNext();
    }, 2000);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [currentVideo, isPlaying, playbackSpeed]);

  const handlePrevious = () => {
    setCurrentVideo(prev => (prev > 0 ? prev - 1 : videos.length - 1));
    setShowBanner(false);
  };
  const handleNext = () => {
    if (currentVideo === videos.length - 1) {
      navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
    } else {
      setCurrentVideo(prev => prev + 1);
      setShowBanner(false);
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const selectedText = selection.toString().trim();
    if (!selectedText) return;

    const allCorrectWords = ["sad"];

    const wordsInSelection = selectedText
      .split(/\s+/)
      .map(word => word.replace(/[.,?!]/g, '').toLowerCase());

    const hasWrongWords = wordsInSelection.some(word =>
      word && !allCorrectWords.includes(word)
    );

    if (hasWrongWords) {
      setShowWrongFeedback(true);
      setTimeout(() => setShowWrongFeedback(false), 2000);
      selection.removeAllRanges();
      return;
    }

    const correctWordsInSelection = wordsInSelection.filter(word =>
      allCorrectWords.includes(word)
    );

    if (correctWordsInSelection.length > 0) {
      setSelectedWords(prev => {
        const newWords = [...new Set([...prev, ...correctWordsInSelection])];
        const allCorrectSelected = allCorrectWords.every(correctWord =>
          newWords.some(w => w.toLowerCase() === correctWord)
        );

        // *** بداية التعديل ***
        if (allCorrectSelected && newWords.length === allCorrectWords.length) {
          setShowFeedback(true);
          setShowBanner(true);
          setTimeout(() => {
            setShowBanner(true);
            setShowFeedback(false);
            handleNext(); 
          }, 2000);
        }
        // *** نهاية التعديل ***

        return newWords;
      });
    }

    selection.removeAllRanges();
  };

  const togglePlay = () => {
    if (selectedWords.length === 1) {
      handleNext();
      return;
    }

    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };
  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };
  const selectPlaybackSpeed = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };
  const toggleFullscreen = () => {
    const container = fullscreenContainerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        settingsPopupRef.current &&
        !settingsPopupRef.current.contains(event.target)
      ) {
        setShowSettingsPopup(false);

      }
    };

    if (showSettingsPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, [showSettingsPopup]);

  

  const handleEnded = useCallback(() => {
    if (currentVideo === 2) {
      setShowBanner(true);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = videoRef.current.duration;
      }
    }
    else if (currentVideo === videos.length - 1) {
      navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
    }
    else {
      setShowBanner(false);
      if (autoPlayNext) {
        setCurrentVideo(prev => (prev < videos.length - 1 ? prev + 1 : prev));
      } else {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }
    }
  }, [currentVideo, videos.length, navigate, unitId, lessonId, autoPlayNext]);


  return (
    <div className="story-page-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <div className="w-full max-w-6xl">
        <div ref={fullscreenContainerRef} className="video-wrapper">
          {videos.map((vid, index) => (
            <video
              key={index}
              src={vid.url}
              preload="auto"
              style={{ display: 'none' }}
            />
          ))}

          <video
            ref={videoRef}
            className={`
    w-full
    h-full
    object-cover

    ${isFullscreen ? 'fixed inset-0' : 'aspect-video'}
  `}
            muted={isMuted}
            onEnded={handleEnded}
            preload="auto"
            src={currentVideoData.url}
          >
            Your browser does not support the video tag.
          </video>

          {showWrongFeedback && currentVideo === 2 && showBanner && (
            <div className="wrong-feedback">
              Try Again! ❌
            </div>
          )}

          {showFeedback && (
            <div className="feedback-popup">
              Good Job! 👍
            </div>
          )}

          {currentVideo === 2 && showBanner && (
            <div className={`instruction-banner show ${isFullscreen ? 'fullscreen-banner' : ''}`}>
              <p style={{ fontSize: '1.6em', textAlign: 'left' }}>
                Highlight how Adam feels when he takes the salt
              </p>
              <p style={{ fontSize: '1.6em', textAlign: 'left' }}>
                and how his feelings change by the end of the story.
              </p>
            </div>
          )}

          {showBubble && showSubtitles && activeSubtitle && activeSubtitle.words && (
            <div className="subtitle-container" style={bubbleStyle}>

              <div className={`bubble-cloud animate__animated animate__fadeIn ${bubbleStyle?.isFlipped ? 'flipped' : ''}
`}>
                <p
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  style={{ userSelect: 'text', cursor: 'text' }}
                >
                  {activeSubtitle.words.map((word, index) => {
                    const isHighlighted = currentTime >= word.start && currentTime < word.end;
                    const cleanWord = word.text.replace(/[.,?!]/g, '');
                    const isSelected = selectedWords.some(w =>
                      w.toLowerCase() === cleanWord.toLowerCase()
                    );

                    return (
                      <span
                        key={index}
                        onClick={() => handleWordClick(word.text)}
                        className={`word-span 
        ${isHighlighted && textHighlight ? 'active-word' : ''} 
        ${isSelected ? 'selected-word' : ''}`}
                      >
                        {word.text}{' '}
                      </span>
                    );
                  })}
                </p>


              </div>
            </div>
          )}

          {showCaption && extraBubble && extraBubble.words && (
            <div
              className="subtitle-container"
              style={{ bottom: '0%', left: '50%', transform: 'translateX(-50%)', zIndex: 101 }}
            >
              <div className="extra-cloud animate__animated animate__fadeIn">
                <p>
                  {extraBubble.words.map((word, index) => {
                    const isHighlighted = currentTime >= word.start && currentTime < word.end;
                    return (
                      <span
                        key={index}
                        className={`word-span ${isHighlighted && narrationHighlight ? 'active-word' : ''}`}
                      >
                        {word.text}{' '}
                      </span>
                    );
                  })}
                </p>
              </div>
            </div>
          )}

          <div className="video-overlay" />
          <div className="controls-container">

            <div className="controlbbtn">
              <button onClick={handlePrevious} className="control-btn left-nav-btn">
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button onClick={handleNext} className="control-btn right-nav-btn">
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            <div className="controls-wrapper-new">
              <div className="controls-row">
                <div className="controls-group-left">

                  <div className="settings-container">
                    <button
                      onClick={() => setShowSettingsPopup(prev => !prev)}
                      className="control-btn settings-btn"
                      title="Settings"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="control-label">Settings</span>
                    </button>

                    {showSettingsPopup && (
                      <>
                        {/* 1. الخلفية الضبابية (Overlay) */}
                        <div className="settings-overlay" onClick={() => setShowSettingsPopup(false)}></div>

                        {/* 2. حاوية النافذة لتوسيطها */}
                        <div className="settings-popup-container">
                          <div ref={settingsPopupRef} className="settings-popup">
                            <button
                              onClick={() => setShowSettingsPopup(false)}
                              className="close-popup-btn"
                            >
                              ×
                            </button>

                            <h3>Settings</h3>

                            <div className="settings-options-grid">
                              <div className="setting-item">
                                <span className="setting-label">Conversation Caption</span>
                                <label className="toggle-switch">
                                  <input
                                    type="checkbox"
                                    checked={showSubtitles}
                                    onChange={() => setShowSubtitles(!showSubtitles)}
                                  />
                                  <span className="toggle-slider"></span>
                                </label>
                              </div>

                              <div className="setting-item">
                                <span className="setting-label">Text Highlight</span>
                                <label className="toggle-switch">
                                  <input
                                    type="checkbox"
                                    checked={textHighlight}
                                    onChange={() => setTextHighlight(!textHighlight)}
                                  />
                                  <span className="toggle-slider"></span>
                                </label>
                              </div>

                              <div className="setting-item">
                                <span className="setting-label">Narration</span>
                                <label className="toggle-switch">
                                  <input
                                    type="checkbox"
                                    checked={showCaption}
                                    onChange={() => setShowCaption(!showCaption)}
                                  />
                                  <span className="toggle-slider"></span>
                                </label>
                              </div>

                              <div className="setting-item">
                                <span className="setting-label">Narration Highlight</span>
                                <label className="toggle-switch">
                                  <input
                                    type="checkbox"
                                    checked={narrationHighlight}
                                    onChange={() => setNarrationHighlight(!narrationHighlight)}
                                  />
                                  <span className="toggle-slider"></span>
                                </label>
                              </div>

                              <div className="setting-item">
                                <span className="setting-label">Auto Page Turn</span>
                                <label className="toggle-switch">
                                  <input
                                    type="checkbox"
                                    checked={autoPlayNext}
                                    onChange={() => setAutoPlayNext(!autoPlayNext)}
                                  />
                                  <span className="toggle-slider"></span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div
                    className="volume-control"
                    onMouseEnter={() => setShowVolumeSlider(true)}
                    onMouseLeave={() => setShowVolumeSlider(false)}
                  >
                    <button onClick={toggleMute} className="control-btn">
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-6 h-6" />
                      ) : (
                        <Volume2 className="w-6 h-6" />
                      )}
                    </button>
                    {showVolumeSlider && (
                      <div className="volume-slider-container">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="volume-slider"
                          orient="vertical"
                        />
                      </div>
                    )}
                  </div>

                  <div className="speed-control-container">
                    <button
                      onClick={() => setShowSpeedMenu(prev => !prev)}
                      className="control-btn speed-btn"
                      title="Playback Speed"
                    >
                      <span className="speed-label">{playbackSpeed}x</span>
                    </button>

                    {showSpeedMenu && (
                      <ul className="speed-dropdown-list">
                        {availableSpeeds.map((speed) => (
                          <li
                            key={speed}
                            onClick={() => selectPlaybackSpeed(speed)}
                            className={playbackSpeed === speed ? 'active-speed' : ''}
                          >
                            {speed}x
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="controls-group-center">
                  <button onClick={togglePlay} className="control-btn play-btn">
                    {isPlaying ? (
                      <Pause className="w-12 h-12" fill="white" />
                    ) : (
                      <Play className="w-12 h-12" fill="white" />
                    )}
                  </button>
                </div>

                <div className="controls-group-right">
                  <button onClick={toggleFullscreen} className="control-btn">
                    {isFullscreen ? (
                      <Minimize2 className="w-6 h-6" />
                    ) : (
                      <Maximize2 className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>

          <div className="progress-indicator-container">
            {videos.map((_, index) => (
              <div
                key={index}
                className={`progress-dot ${index === currentVideo ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default StoryPage;