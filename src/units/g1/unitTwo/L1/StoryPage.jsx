import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Subtitles, Maximize2, Minimize2, MessageSquareText } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';
import ValidationAlert from '../../shared/ValidationAlert';

import video1 from "./assets/1.mp4";
import video2 from "./assets/2.mp4";
import video3 from "./assets/3-1.mp4";
import video4 from "./assets/3-2.mp4";
import video5 from "./assets/4.mp4";


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
      subtitles: [
      ]
    },

    {
      url: video2,
      title: "Section 2",
      subtitles: [
        {
          start: 7.8, end: 8.7,
          words: [
            { text: "Hey!", start: 8.0, end: 8.5 },
          ]
        },
      ]
    },

    {
      url: video3,
      title: "Section 3",
      subtitles: [

        {
          start: 10.0, end: 12.5,
          words: [
            { text: "Don’t", start: 10.5, end: 10.8 },
            { text: "you", start: 10.8, end: 11.0 },
            { text: "care", start: 11.0, end: 11.3 },
            { text: "about", start: 11.3, end: 11.6 },
            { text: "the", start: 11.6, end: 11.8 },
            { text: "circus?", start: 11.8, end: 12.2 }

          ]
        },

      ]
    },

    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 0, end: 1.8,
          words: [
            { text: "I", start: 0.1, end: 0.3 },
            { text: "am", start: 0.3, end: 0.5 },
            { text: "happy,", start: 0.5, end: 0.9 },
            { text: "it’s", start: 0.9, end: 1.2 },
            { text: "just...", start: 1.2, end: 1.5 }
          ]
        },

        {
          start: 4.5, end: 9.5,
          words: [
            { text: "It’s", start: 5.0, end: 5.3 },
            { text: "just", start: 5.3, end: 5.5 },
            { text: "that", start: 5.5, end: 5.8 },
            { text: "I", start: 5.8, end: 6.0 },
            { text: "feel", start: 6.0, end: 6.3 },
            { text: "uncomfortable", start: 6.3, end: 6.8 },
            { text: "when", start: 6.8, end: 7.0 },
            { text: "someone", start: 7.0, end: 7.4 },
            { text: "stands", start: 7.4, end: 7.7 },
            { text: "too", start: 7.7, end: 7.9 },
            { text: "closely", start: 7.9, end: 8.3 },
            { text: "next", start: 8.3, end: 8.5 },
            { text: "to", start: 8.5, end: 8.6 },
            { text: "me.", start: 8.6, end: 9.0 }
          ]
        },

        {
          start: 11.5, end: 12.7,
          words: [
            { text: "You’re", start: 11.6, end: 12.1 },
            { text: "right!", start: 12.1, end: 12.6 }
          ]
        },

        {
          start: 12.7, end: 14.8,
          words: [
            { text: "I’m", start: 12.8, end: 13.1 },
            { text: "standing", start: 13.1, end: 13.8 },
            { text: "too", start: 13.8, end: 14.2 },
            { text: "close.", start: 14.2, end: 14.7 }
          ]
        },

        {
          start: 15.0, end: 19.3,
          words: [
            { text: "And", start: 15.5, end: 15.9 },
            { text: "I", start: 16.3, end: 17.5 },
            { text: "squeeze", start: 16.3, end: 17.5 },
            { text: "too", start: 17.5, end: 17.8 },
            { text: "tight", start: 17.8, end: 18.1 },
            { text: "when", start: 18.1, end: 18.6 },
            { text: "I", start: 18.6, end: 18.9 },
            { text: "hug", start: 18.9, end: 19.2 }
          ]
        },

        {
          start: 19.3, end: 23.8,
          words: [
            { text: "Sorry,", start: 19.4, end: 19.7 },
            { text: "I’m", start: 20.5, end: 20.8 },
            { text: "just", start: 20.8, end: 21.1 },
            { text: "so", start: 21.1, end: 21.3 },
            { text: "excited", start: 21.3, end: 21.7 },
            { text: "to", start: 21.7, end: 21.9 },
            { text: "talk", start: 21.9, end: 22.2 },
            { text: "to", start: 22.2, end: 22.4 },
            { text: "you", start: 22.4, end: 22.6 },
            { text: "about", start: 22.6, end: 22.9 },
            { text: "the", start: 22.9, end: 23.1 },
            { text: "circus.", start: 23.1, end: 23.5 }
          ]
        },

        {
          start: 29.0, end: 36.5,
          words: [
            { text: "That’s okay", start: 29.0, end: 29.5 },
            { text: "I", start: 29.6, end: 29.9 },
            { text: "just", start: 29.9, end: 30.2 },
            { text: "don’t", start: 30.2, end: 30.5 },
            { text: "like", start: 30.5, end: 30.8 },
            { text: "hugging", start: 30.8, end: 31.1 },
            { text: "as", start: 31.1, end: 31.4 },
            { text: "much", start: 31.4, end: 31.7 },
            { text: "as", start: 31.7, end: 32.0 },
            { text: "you", start: 32.0, end: 32.3 },
            { text: "but", start: 34.0, end: 34.3 },
            { text: "I’m", start: 34.3, end: 34.6 },
            { text: "really", start: 34.6, end: 34.9 },
            { text: "excited", start: 34.9, end: 35.2 },
            { text: "about", start: 35.2, end: 35.5 },
            { text: "the", start: 35.5, end: 35.8 },
            { text: "circus.", start: 35.8, end: 36.1 }
          ]
        },

        {
          start: 36.8, end: 40.5,
          words: [
            { text: "Let’s", start: 37.0, end: 37.3 },
            { text: "ask", start: 37.3, end: 37.6 },
            { text: "our", start: 37.6, end: 37.8 },
            { text: "mums", start: 37.8, end: 38.1 },
            { text: "if", start: 38.1, end: 38.3 },
            { text: "we", start: 38.3, end: 38.5 },
            { text: "can", start: 38.5, end: 38.7 },
            { text: "buy", start: 38.7, end: 38.9 },
            { text: "tickets", start: 38.9, end: 39.3 },
            { text: "and", start: 39.3, end: 39.5 },
            { text: "go", start: 39.5, end: 39.7 },
            { text: "together!", start: 39.7, end: 40.2 }
          ]
        },



        {
          start: 40.0, end: 45.0,
          words: [
            { text: "I’m", start: 12.8, end: 13.1 },
            { text: "standing", start: 13.1, end: 13.8 },
            { text: "too", start: 13.8, end: 14.2 },
            { text: "close.", start: 14.2, end: 14.7 },
            { text: "And", start: 15.5, end: 15.9 },
            { text: "I", start: 16.3, end: 17.5 },
            { text: "squeeze", start: 16.3, end: 17.5 },
            { text: "too", start: 17.5, end: 17.8 },
            { text: "tight", start: 17.8, end: 18.1 },
            { text: "when", start: 18.1, end: 18.6 },
            { text: "I", start: 18.6, end: 18.9 },
            { text: "hug", start: 18.9, end: 19.2 }
          ]
        },

      ]
    },

    {
      url: video5,
      title: "Section 5",
      subtitles: [
      ]
    },
  ];

  const extraBubblesData = [
    {
      videoIndex: 1,
      start: 0, end: 2.5,
      words: [
        { text: "Molly", start: 0.1, end: 0.4 },
        { text: "is", start: 0.4, end: 0.6 },
        { text: "excited", start: 0.6, end: 1.0 },
        { text: "to", start: 1.0, end: 1.2 },
        { text: "see", start: 1.2, end: 1.4 },
        { text: "her", start: 1.4, end: 1.6 },
        { text: "friend", start: 1.6, end: 2.0 },
        { text: "Emma.", start: 2.0, end: 2.3 }
      ]
    },
    {
      videoIndex: 1,
      start: 2.8, end: 7.5,
      words: [
        { text: "She", start: 3.0, end: 3.2 },
        { text: "wants", start: 3.2, end: 3.5 },
        { text: "to", start: 3.5, end: 3.7 },
        { text: "talk", start: 3.7, end: 4.0 },
        { text: "to", start: 4.0, end: 4.2 },
        { text: "her", start: 4.2, end: 4.4 },
        { text: "about", start: 4.4, end: 4.7 },
        { text: "the", start: 4.7, end: 4.9 },
        { text: "circus", start: 4.9, end: 5.3 },
        { text: "that", start: 5.3, end: 5.5 },
        { text: "is", start: 5.5, end: 5.7 },
        { text: "coming", start: 5.7, end: 6.1 },
        { text: "to", start: 6.1, end: 6.3 },
        { text: "town", start: 6.3, end: 6.6 },
        { text: "tomorrow.", start: 6.6, end: 7.0 }
      ]
    },
    {
      videoIndex: 1,
      start: 8.9, end: 13.5,
      words: [
        { text: "Molly", start: 9.0, end: 9.3 },
        { text: "shouts,", start: 9.3, end: 9.6 },
        { text: "jumping", start: 10.0, end: 10.3 },
        { text: "up", start: 10.3, end: 10.6 },
        { text: "and", start: 10.6, end: 10.9 },
        { text: "hugging", start: 10.9, end: 11.3 },
        { text: "her", start: 11.3, end: 11.5 },
        { text: "friend", start: 11.5, end: 11.8 },
        { text: "tight.", start: 11.8, end: 12.3 }
      ]
    },
    {
      videoIndex: 1,
      start: 14.0, end: 15.0,
      words: [
        { text: "Molly", start: 14.0, end: 14.3 },
        { text: "loves", start: 14.3, end: 14.6 },
        { text: "hugs!", start: 14.6, end: 14.9 }
      ]
    },
    {
      videoIndex: 1,
      start: 16.0, end: 21.5,
      words: [
        { text: "Emma", start: 16.5, end: 16.8 },
        { text: "likes", start: 16.8, end: 17.1 },
        { text: "hugs", start: 17.1, end: 17.4 },
        { text: "sometimes,", start: 17.4, end: 17.7 },
        { text: "but", start: 18.2, end: 18.5 },
        { text: "this", start: 18.5, end: 18.8 },
        { text: "hug", start: 18.8, end: 19.1 },
        { text: "is", start: 19.1, end: 19.4 },
        { text: "too", start: 19.4, end: 19.7 },
        { text: "tight", start: 19.7, end: 20.0 },
        { text: "and", start: 20.0, end: 20.2 },
        { text: "feels", start: 20.2, end: 20.5 },
        { text: "uncomfortable.", start: 20.5, end: 21.5 }
      ]
    },

    {
      videoIndex: 2,
      start: 0, end: 1.8,
      words: [
        { text: "Something", start: 0.1, end: 0.5 },
        { text: "doesn’t", start: 0.5, end: 0.9 },
        { text: "feel", start: 0.9, end: 1.2 },
        { text: "right.", start: 1.2, end: 1.5 }
      ]
    },
    {
      videoIndex: 2,
      start: 2.2, end: 5.4,
      words: [
        { text: "Molly", start: 2.5, end: 2.8 },
        { text: "knows", start: 2.8, end: 3.1 },
        { text: "Emma", start: 3.1, end: 3.4 },
        { text: "loves", start: 3.4, end: 3.7 },
        { text: "the", start: 3.7, end: 3.9 },
        { text: "circus", start: 3.9, end: 4.3 },
        { text: "as", start: 4.3, end: 4.5 },
        { text: "much", start: 4.5, end: 4.8 },
        { text: "as", start: 4.8, end: 5.0 },
        { text: "she", start: 5.0, end: 5.2 },
        { text: "does", start: 5.2, end: 5.5 }
      ]
    },
    {
      videoIndex: 2,
      start: 5.5, end: 9.0,
      words: [
        { text: "but", start: 6.5, end: 6.8 },
        { text: "Emma", start: 6.8, end: 7.1 },
        { text: "isn’t", start: 7.1, end: 7.4 },
        { text: "smiling", start: 7.4, end: 7.8 },
        { text: "or", start: 7.8, end: 8.0 },
        { text: "talking", start: 8.0, end: 8.4 },
        { text: "to", start: 8.4, end: 8.6 },
        { text: "her.", start: 8.6, end: 8.8 }
      ]
    },
    {
      videoIndex: 2,
      start: 14.0, end: 18.0,
      words: [
        { text: "Molly", start: 14.5, end: 14.8 },
        { text: "can’t", start: 14.8, end: 15.1 },
        { text: "understand", start: 15.1, end: 15.6 },
        { text: "why", start: 15.6, end: 15.9 },
        { text: "Emma", start: 15.9, end: 16.2 },
        { text: "isn’t", start: 16.2, end: 16.5 },
        { text: "as", start: 16.5, end: 16.7 },
        { text: "excited", start: 16.7, end: 17.1 },
        { text: "as", start: 17.1, end: 17.3 },
        { text: "she", start: 17.3, end: 17.5 },
        { text: "is.", start: 17.5, end: 17.8 }
      ]
    },

    {
      videoIndex: 3,
      start: 2.0, end: 4.0,
      words: [
        { text: "Emma", start: 2.5, end: 2.8 },
        { text: "takes", start: 2.8, end: 3.1 },
        { text: "a", start: 3.1, end: 3.2 },
        { text: "deep", start: 3.2, end: 3.5 },
        { text: "breath", start: 3.5, end: 3.8 }
      ]
    },
    {
      videoIndex: 3,
      start: 9.8, end: 11.5,
      words: [
        { text: "Molly", start: 10.0, end: 10.3 },
        { text: "smiles", start: 10.3, end: 10.6 },
        { text: "and", start: 10.6, end: 10.8 },
        { text: "moves", start: 10.8, end: 11.1 },
        { text: "back.", start: 11.1, end: 11.4 }
      ]
    },
    {
      videoIndex: 3,
      start: 26.0, end: 28.5,
      words: [
        { text: "Emma", start: 26.0, end: 26.3 },
        { text: "smiles", start: 26.3, end: 26.6 },
        { text: "and", start: 26.6, end: 26.8 },
        { text: "laughs", start: 26.8, end: 27.4 },
        { text: "with", start: 27.4, end: 27.7 },
        { text: "her", start: 27.7, end: 28.0 },
        { text: "friend.", start: 28.0, end: 28.4 }
      ]
    },

    {
      videoIndex: 4,
      start: 0.0, end: 4.2,
      words: [
        { text: "Molly", start: 0.1, end: 0.4 },
        { text: "is", start: 0.4, end: 0.6 },
        { text: "glad", start: 0.6, end: 0.9 },
        { text: "that", start: 0.9, end: 1.1 },
        { text: "Emma", start: 1.1, end: 1.4 },
        { text: "told", start: 1.4, end: 1.7 },
        { text: "her", start: 1.7, end: 1.9 },
        { text: "how", start: 1.9, end: 2.2 },
        { text: "she", start: 2.2, end: 2.4 },
        { text: "feels", start: 2.4, end: 2.7 },
        { text: "about", start: 2.7, end: 3.0 },
        { text: "her", start: 3.0, end: 3.2 },
        { text: "personal", start: 3.2, end: 3.6 },
        { text: "space.", start: 3.6, end: 4.0 }
      ]
    },
    {
      videoIndex: 4,
      start: 4.4, end: 7.5,
      words: [
        { text: "Emma", start: 4.5, end: 4.8 },
        { text: "is", start: 4.8, end: 5.0 },
        { text: "happy", start: 5.0, end: 5.3 },
        { text: "that", start: 5.3, end: 5.5 },
        { text: "Molly", start: 5.5, end: 5.8 },
        { text: "listened", start: 5.8, end: 6.2 },
        { text: "to", start: 6.2, end: 6.4 },
        { text: "how", start: 6.4, end: 6.6 },
        { text: "she", start: 6.6, end: 6.8 },
        { text: "felt.", start: 6.8, end: 7.1 }
      ]
    },
  ];

  const cloudPositions = {

    0: [

    ],

    1: [
      { top: '15%', left: '10%' },
      { top: '15%', left: '15%' },
      { top: '5%', left: '30%' },
      { top: '0%', left: '40%' },
      { top: '15%', left: '15%' },
      { top: '15%', left: '15%' },
    ],

    2: [
      { top: '10%', right: '5%', isFlipped: true },
      { top: '10%', right: '5%', isFlipped: true },
      { top: '10%', right: '5%', isFlipped: true },
      { top: '5%', right: '45%' },
      { top: '60%', right: '35%' },
      { top: '10%', right: '35%' },
      { top: '10%', right: '35%' },
      { top: '1%', left: '35%' },

    ],

    3: [
      { bottom: '80%', left: '10%' },
      { top: '10%', left: '35%', isFlipped: true },
      { top: '10%', left: '30%' },
      { top: '10%', left: '15%' },
      { top: '20%', left: '15%' },
      { top: '10%', left: '20%' },
      { top: '10%', left: '60%', isFlipped: true },
      { top: '10%', left: '60%', isFlipped: true },
      { top: '10%', left: '60%', isFlipped: true },
    ],

    4: [
      { top: '10%', left: '10%' },
      { top: '5%', left: '35%' },
      { top: '5%', left: '55%', isFlipped: true },
      { top: '15%', left: '75%', isFlipped: true },
      { top: '25%', left: '10%' },
      { top: '25%', left: '15%' },
    ],
    5: [
    ],
    6: [
    ],
  };



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

    if (currentVideo === 3 && isPlaying) {
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

    const allCorrectWords = ["i’m", "standing", "too", "close", "and", "i", "squeeze", "tight", "when", "hug"];

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

        if (allCorrectSelected && newWords.length === allCorrectWords.length) {
          setShowFeedback(true); 
          setShowBanner(false);
          setTimeout(() => {
            setShowFeedback(false);
            setShowBanner(false);
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
    if (selectedWords.length === 10) {
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
    if (currentVideo === 3) {
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



  const handleWordClick = (word) => {
    const cleanWord = word.toLowerCase().replace(/[.,?!]/g, "");
    const allCorrectWords = [
      "i’m", "standing", "too", "close", "and", "i", "squeeze", "tight", "when", "hug"
    ];
    if (!allCorrectWords.includes(cleanWord)) {
      setShowWrongFeedback(true);
      setTimeout(() => setShowWrongFeedback(false), 2000);
      return;
    }

    setSelectedWords(prev => {
      const newWords = [...new Set([...prev, cleanWord])];

      const allCorrectSelected = allCorrectWords.every(correctWord =>
        newWords.includes(correctWord)
      );

      if (allCorrectSelected) {
        setShowFeedback(true);
        setShowBanner(false);
        setTimeout(() => {
          setShowBanner(false);
          setShowFeedback(false);
          handleNext();
        }, 2000);
      }

      return newWords;
    });
  };

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

          {showWrongFeedback && currentVideo === 3 && showBanner && (
            <div className="wrong-feedback">
              Try Again! ❌
            </div>
          )}

          {showFeedback && (
            <div className="feedback-popup">
              Good Job! 👍
            </div>
          )}

          {currentVideo === 3 && showBanner && (
            <div className={`instruction-banner show ${isFullscreen ? 'fullscreen-banner' : ''}`}>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                Highlight how Molly shows that she
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                cares about Emma’s feelings.
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