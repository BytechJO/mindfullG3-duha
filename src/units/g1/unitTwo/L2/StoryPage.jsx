import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Subtitles, Maximize2, Minimize2, MessageSquareText } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';
import ValidationAlert from '../../shared/ValidationAlert';

import video1 from "./assets/1.mp4";
import video2 from "./assets/2.mp4";
import video3 from "./assets/3-1.mp4";
import video4 from "./assets/4-1.mp4";
import video5 from "./assets/5-1.mp4";
import video6 from "./assets/5-2.mp4";
import img1 from "./assets/nex.png";

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
      ]

    },

    {
      url: video3,
      title: "Section 3",
      subtitles: [
        {
          start: 0, end: 0.9,
          words: [
            { text: "Noah!", start: 0.0, end: 0.8 },
          ]
        },

        {
          start: 1.0, end: 7.0,
          words: [
            { text: "Play", start: 1.1, end: 1.4 },
            { text: "football", start: 1.4, end: 1.8 },
            { text: "in", start: 1.8, end: 2.0 },
            { text: "the", start: 2.0, end: 2.2 },
            { text: "garden,", start: 2.2, end: 2.6 },
            { text: "I’m", start: 2.6, end: 2.9 },
            { text: "working", start: 2.9, end: 3.3 },
            { text: "in", start: 3.3, end: 3.5 },
            { text: "here.", start: 3.5, end: 3.8 },
            { text: "You", start: 3.8, end: 4.0 },
            { text: "know", start: 4.0, end: 4.3 },
            { text: "you’re", start: 4.3, end: 4.6 },
            { text: "not", start: 4.6, end: 4.8 },
            { text: "allowed", start: 4.8, end: 5.2 },
            { text: "to", start: 5.2, end: 5.4 },
            { text: "play", start: 5.4, end: 5.6 },
            { text: "football", start: 5.6, end: 6.0 },
            { text: "in", start: 6.0, end: 6.2 },
            { text: "the", start: 6.2, end: 6.4 },
            { text: "kitchen.", start: 6.4, end: 6.8 }
          ]
        },

        {
          start: 7.0, end: 10.9,
          words: [
            { text: "It’s", start: 7.1, end: 7.4 },
            { text: "too", start: 7.4, end: 7.6 },
            { text: "cold", start: 7.6, end: 7.9 },
            { text: "in", start: 7.9, end: 8.1 },
            { text: "the", start: 8.1, end: 8.3 },
            { text: "garden,", start: 8.3, end: 8.6 },
            { text: "I’m", start: 9.5, end: 9.9 },
            { text: "staying", start: 9.9, end: 10.4 },
            { text: "here.", start: 10.4, end: 10.7 }
          ]
        },



        {
          start: 24.7, end: 33.0,
          words: [
            { text: " He", start: 25.0, end: 25.3 },
            { text: "wants", start: 25.3, end: 25.6 },
            { text: " to", start: 25.6, end: 25.8 },
            { text: "yell", start: 25.8, end: 26.1 },
            { text: "at", start: 26.1, end: 26.3 },
            { text: "his", start: 26.3, end: 26.5 },
            { text: "brother,", start: 26.5, end: 26.9 },

            { text: "but", start: 27.2, end: 27.4 },
            { text: "he", start: 27.4, end: 27.6 },
            { text: "begins", start: 27.6, end: 28.0 },
            { text: "to", start: 28.0, end: 28.2 },
            { text: "take", start: 28.2, end: 28.5 },
            { text: "deep", start: 28.5, end: 28.8 },
            { text: "breaths", start: 28.8, end: 29.2 },
            { text: "and", start: 29.2, end: 29.4 },
            { text: "gets", start: 29.4, end: 29.6 },
            { text: "himself", start: 29.6, end: 29.9 },
            { text: "a", start: 29.9, end: 30.0 },
            { text: "glass", start: 30.0, end: 30.3 },
            { text: "of", start: 30.3, end: 30.5 },
            { text: "water", start: 30.5, end: 30.8 },
            { text: "to", start: 30.8, end: 31.0 },
            { text: "drink.", start: 31.0, end: 31.3 }
          ]
        },
      ]
    },

    {
      url: video4,
      title: "Section 4",
      subtitles: [

        {
          start: 2.0, end: 6.8,
          words: [
            { text: "It", start: 2.5, end: 2.8 },
            { text: "makes", start: 2.8, end: 3.1 },
            { text: "me", start: 3.1, end: 3.4 },
            { text: "angry", start: 3.4, end: 3.7 },
            { text: "when", start: 3.7, end: 4.0 },
            { text: "I", start: 4.0, end: 4.3 },
            { text: "ask", start: 4.3, end: 4.6 },
            { text: "you", start: 4.6, end: 4.9 },
            { text: "to do", start: 4.9, end: 5.2 },
            { text: "something", start: 5.2, end: 5.5 },
            { text: "and", start: 5.5, end: 5.8 },
            { text: "you", start: 5.8, end: 6.1 },
            { text: "ignore", start: 6.1, end: 6.4 },
            { text: "me", start: 6.4, end: 6.7 }
          ]
        },

        {
          start: 7.0, end: 11.0,
          words: [
            { text: "I", start: 7.0, end: 7.2 },
            { text: "was", start: 7.2, end: 7.5 },
            { text: "asking", start: 7.5, end: 7.8 },
            { text: "you", start: 7.8, end: 8.0 },
            { text: "to", start: 8.0, end: 8.2 },
            { text: "stop", start: 8.2, end: 8.5 },
            { text: "so", start: 8.5, end: 8.7 },
            { text: "that", start: 8.7, end: 9.0 },
            { text: "this", start: 9.0, end: 9.2 },
            { text: "doesn’t", start: 9.2, end: 9.5 },
            { text: "happen.", start: 9.5, end: 9.8 }
          ]
        },

        {
          start: 13.5, end: 15.0,
          words: [
            { text: "I’m", start: 14.0, end: 14.3 },
            { text: "so", start: 14.3, end: 14.6 },
            { text: "sorry!", start: 14.6, end: 14.9 }
          ]
        },

        {
          start: 15.4, end: 18.4,
          words: [
            { text: "I", start: 15.8, end: 16.0 },
            { text: "should", start: 16.0, end: 16.3 },
            { text: "have", start: 16.3, end: 16.5 },
            { text: "listened", start: 16.5, end: 16.9 },
            { text: "to", start: 16.9, end: 17.1 },
            { text: "you", start: 17.1, end: 17.3 },
            { text: "and", start: 17.3, end: 17.5 },
            { text: "played", start: 17.5, end: 17.8 },
            { text: "outside.", start: 17.8, end: 18.1 }
          ]
        },

        {
          start: 18.4, end: 20.5,
          words: [
            { text: "I’m", start: 19.0, end: 19.3 },
            { text: "sorry", start: 19.3, end: 19.6 },
            { text: "about", start: 19.6, end: 19.9 },
            { text: "your", start: 19.9, end: 20.1 },
            { text: "homework", start: 20.1, end: 20.4 }
          ]
        },

        {
          start: 21.8, end: 23.5,
          words: [
            { text: "It’s", start: 22.5, end: 22.8 },
            { text: "Ok.", start: 22.8, end: 23.0 }
          ]
        }

      ]
    },

    {
      url: video5,
      title: "Section 5",
      subtitles: [
      ]
    },

    {
      url: video6,
      title: "Section 6",
      subtitles: [
      ]
    },

  ];
  const cloudPositions = {
    0: [],

    1: [
    ],

    2: [
      { top: '10%', left: '10%' },
      { top: '15%', left: '5%' },
      { top: '10%', left: '10%' },
      { top: '10%', right: '40%' },
    ],

    3: [
      { bottom: '50%', left: '73%', isFlipped: true },
      { top: '30%', left: '70%', isFlipped: true },
      { top: '60%', left: '30%' },
      { top: '50%', left: '60%', isFlipped: true },
      { top: '10%', left: '80%', isFlipped: true },
      { top: '10%', left: '50%', isFlipped: true },
    ],

    4: [

    ],
    5: [
    ],
  };

  const extraBubblesData = [
    {
      videoIndex: 1,
      start: 0, end: 4.0,
      words: [
        { text: "Liam", start: 0.1, end: 0.4 },
        { text: "and", start: 0.4, end: 0.7 },
        { text: "Noah", start: 0.7, end: 1.0 },
        { text: "are", start: 1.0, end: 1.3 },
        { text: "brothers.", start: 1.3, end: 1.6 },
        { text: "They", start: 2.5, end: 2.8 },
        { text: "are", start: 2.8, end: 3.1 },
        { text: "at", start: 3.1, end: 3.4 },
        { text: "home.", start: 3.4, end: 3.7 }
      ]
    },
    {
      videoIndex: 1,
      start: 4.0,
      end: 6.0,
      words: [
        { text: "Liam", start: 4.0, end: 4.3 },
        { text: "is", start: 4.3, end: 4.5 },
        { text: "busy", start: 4.5, end: 4.8 },
        { text: "doing", start: 4.8, end: 5.1 },
        { text: "his", start: 5.1, end: 5.3 },
        { text: "home", start: 5.3, end: 5.6 },
        { text: "work.", start: 5.6, end: 5.9 }
      ]
    },
    {
      videoIndex: 1,
      start: 6.1,
      end: 12.0,
      words: [
        { text: "It", start: 6.2, end: 6.5 },
        { text: "is", start: 6.5, end: 6.8 },
        { text: "difficult", start: 6.8, end: 7.2 },
        { text: "and", start: 7.2, end: 7.5 },
        { text: "is", start: 7.5, end: 7.8 },
        { text: "taking", start: 7.8, end: 8.1 },
        { text: "a", start: 8.1, end: 8.3 },
        { text: "long", start: 8.3, end: 8.6 },
        { text: "time.", start: 8.6, end: 8.9 },
        { text: "His", start: 9.8, end: 10.1 },
        { text: "little", start: 10.1, end: 10.4 },
        { text: "brother,", start: 10.4, end: 10.7 },
        { text: "Noah", start: 10.7, end: 11.0 },
        { text: "is", start: 11.0, end: 11.3 },
        { text: "bored.", start: 11.3, end: 11.6 }
      ]
    },
    {
      videoIndex: 1,
      start: 12.4,
      end: 15.0,
      words: [
        { text: "He", start: 12.5, end: 12.8 },
        { text: "is", start: 12.8, end: 13.1 },
        { text: "kicking", start: 13.1, end: 13.4 },
        { text: "a", start: 13.4, end: 13.7 },
        { text: "ball", start: 13.7, end: 14.0 },
        { text: "around", start: 14.0, end: 14.3 },
        { text: "the", start: 14.3, end: 14.6 },
        { text: "kitchen.", start: 14.6, end: 14.9 }
      ]
    },
    {
      videoIndex: 1,
      start: 15.0,
      end: 17.0,
      words: [
        { text: "Their", start: 15.1, end: 15.4 },
        { text: "mum", start: 15.4, end: 15.7 },
        { text: "is", start: 15.7, end: 16.0 },
        { text: "in", start: 16.0, end: 16.3 },
        { text: "the", start: 16.3, end: 16.6 },
        { text: "garden.", start: 16.6, end: 16.9 }
      ]
    },

    {
      videoIndex: 2,
      start: 10.9, end: 16.9,
      words: [
        { text: "Noah", start: 11.5, end: 11.8 },
        { text: "kicks", start: 11.8, end: 12.1 },
        { text: "the", start: 12.1, end: 12.3 },
        { text: "ball", start: 12.3, end: 12.6 },
        { text: "again", start: 12.6, end: 12.9 },
        { text: "and", start: 13.2, end: 13.4 },
        { text: "it", start: 13.4, end: 13.6 },
        { text: "hits", start: 13.6, end: 13.9 },
        { text: "Liam’s", start: 13.9, end: 14.2 },
        { text: "glass", start: 14.2, end: 14.5 },
        { text: "of", start: 14.5, end: 14.7 },
        { text: "milk", start: 14.7, end: 15.0 },
        { text: "and", start: 15.0, end: 15.2 },
        { text: "it", start: 15.2, end: 15.4 },
        { text: "spills", start: 15.4, end: 15.7 },
        { text: "over", start: 15.7, end: 16.0 },
        { text: "his", start: 16.0, end: 16.2 },
        { text: "homework!", start: 16.2, end: 16.6 }
      ]
    },
    {
      videoIndex: 2,
      start: 23.0, end: 24.5,
      words: [
        { text: "Liam", start: 23.5, end: 23.8 },
        { text: "feels", start: 23.8, end: 24.1 },
        { text: "angry.", start: 24.1, end: 24.4 }
      ]
    },
    {
      videoIndex: 2,
      start: 17.0, end: 20.5,
      words: [
        { text: "Oh", start: 17.0, end: 17.3 },
        { text: "no!", start: 17.3, end: 17.9 },
        { text: "The", start: 19.0, end: 19.2 },
        { text: "homework", start: 19.2, end: 19.5 },
        { text: "is", start: 19.5, end: 19.8 },
        { text: "ruined.", start: 19.8, end: 20.0 }
      ]
    },

    {
      videoIndex: 3,
      start: 0.0, end: 1.0,
      words: [
        { text: "Liam", start: 0.0, end: 0.3 },
        { text: "stays", start: 0.3, end: 0.6 },
        { text: "calm", start: 0.6, end: 0.9 }
      ]
    },


    {
      videoIndex: 4,
      start: 0.0, end: 2.0,
      words: [
        { text: "Mum", start: 0.1, end: 0.4 },
        { text: "comes", start: 0.4, end: 0.7 },
        { text: "in", start: 0.7, end: 1.0 },
        { text: "from", start: 1.0, end: 1.3 },
        { text: "the", start: 1.3, end: 1.5 },
        { text: "garden.", start: 1.5, end: 1.9 }
      ]
    },
    {
      videoIndex: 4,
      start: 2.2, end: 7.0,
      words: [
        { text: "She", start: 2.5, end: 2.8 },
        { text: "is", start: 2.8, end: 3.0 },
        { text: "happy", start: 3.0, end: 3.3 },
        { text: "that", start: 3.3, end: 3.5 },
        { text: "Liam", start: 3.5, end: 3.8 },
        { text: "calmed", start: 3.8, end: 4.2 },
        { text: "himself", start: 4.2, end: 4.6 },
        { text: "down", start: 4.6, end: 4.9 },
        { text: "before", start: 4.9, end: 5.2 },
        { text: "he", start: 5.2, end: 5.4 },
        { text: "spoke", start: 5.4, end: 5.7 },
        { text: "to", start: 5.7, end: 5.9 },
        { text: "his", start: 5.9, end: 6.1 },
        { text: "brother.", start: 6.1, end: 6.5 }
      ]
    },

    {
      videoIndex: 5,
      start: 0.0, end: 3.0,
      words: [
        { text: "Noah", start: 0.1, end: 0.4 },
        { text: "puts", start: 0.4, end: 0.7 },
        { text: "his", start: 0.7, end: 0.9 },
        { text: "coat", start: 0.9, end: 1.2 },
        { text: "on", start: 1.2, end: 1.4 },
        { text: "and", start: 1.4, end: 1.6 },
        { text: "plays", start: 1.6, end: 2.0 },
        { text: "in", start: 2.0, end: 2.2 },
        { text: "the", start: 2.2, end: 2.4 },
        { text: "garden", start: 2.4, end: 2.9 }
      ]
    },
    {
      videoIndex: 5,
      start: 3.5, end: 6.0,
      words: [
        { text: "Mum", start: 3.5, end: 3.8 },
        { text: "helps", start: 3.8, end: 4.1 },
        { text: "Liam", start: 4.1, end: 4.4 },
        { text: "do", start: 4.4, end: 4.6 },
        { text: "his", start: 4.6, end: 4.8 },
        { text: "report", start: 4.8, end: 5.2 },
        { text: "again.", start: 5.2, end: 5.8 }
      ]
    },
    {
      videoIndex: 5,
      start: 6.2, end: 9.0,
      words: [
        { text: "With", start: 6.5, end: 6.8 },
        { text: "Mum’s", start: 6.8, end: 7.1 },
        { text: "help,", start: 7.1, end: 7.4 },
        { text: "it", start: 7.4, end: 7.6 },
        { text: "doesn’t", start: 7.6, end: 7.9 },
        { text: "take", start: 7.9, end: 8.2 },
        { text: "very", start: 8.2, end: 8.5 },
        { text: "long.", start: 8.5, end: 8.8 },
      ]
    },
    {
      videoIndex: 5,
      start: 10.0, end: 12.0,
      words: [
        { text: "Liam", start: 10.0, end: 10.3 },
        { text: "is", start: 10.3, end: 10.5 },
        { text: "happy", start: 10.5, end: 10.8 },
        { text: "he", start: 10.8, end: 11.0 },
        { text: "spoke", start: 11.0, end: 11.3 },
        { text: "calmly.", start: 11.3, end: 11.6 }
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

    const allCorrectWords = ["he", "begins", "take", "deep", "breaths", "and", "gets", "himself", "a", "glass", "of", "water", "to", "drink"];

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
            handleNext(); 
            setShowBanner(false);
          }, 2000);
        }
        // *** نهاية التعديل ***

        return newWords;
      });
    }

    selection.removeAllRanges();
  };
  const togglePlay = () => {
    if (selectedWords.length === 14) {
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



  const handleWordClick = (word) => {
    const cleanWord = word.toLowerCase().replace(/[.,?!]/g, "");
    const allCorrectWords = [
      "he", "begins", "take", "deep", "breaths", "and", "gets", "himself", "a", "glass", "of", "water", "to", "drink"
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
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                Highlight how Liam stays calm after Noah
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                spills his milk.
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