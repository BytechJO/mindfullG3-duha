import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Subtitles, Maximize2, Minimize2, MessageSquareText } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';
import ValidationAlert from '../../shared/ValidationAlert';

import video1 from "./assets/1.mp4";
import video2 from "./assets/2.mp4";
import video3 from "./assets/3.mp4";
import video4 from "./assets/4.mp4";
import video5 from "./assets/5.mp4";



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
      ],
    },
    {
      url: video2,
      title: "Section 2",
      subtitles: [
        {
          start: 18.5,
          end: 19.5,
          words: [
            { text: "‘Hello", start: 18.5, end: 18.7 },
            { text: "kids", start: 18.7, end: 18.9 },
          ],
        },
      ],
    },
    {
      url: video3,
      title: "Section 3",
      subtitles: [
        {
          start: 3.0,
          end: 6.0,
          words: [
            { text: "Our", start: 4.0, end: 4.3 },
            { text: "parents", start: 4.3, end: 4.6 },
            { text: "seem", start: 4.6, end: 4.9 },
            { text: "tired", start: 4.9, end: 5.2 },
            { text: "today.", start: 5.2, end: 5.8 },
          ],
        },
        {
          start: 6.0,
          end: 9.0,
          words: [
            { text: "I", start: 6.7, end: 6.9 },
            { text: "think", start: 6.9, end: 7.1 },
            { text: "we", start: 7.1, end: 7.3 },
            { text: "should", start: 7.3, end: 7.5 },
            { text: "be", start: 7.5, end: 7.7 },
            { text: "helping", start: 7.7, end: 7.9 },
            { text: "more", start: 7.9, end: 8.1 },
            { text: "around", start: 8.1, end: 8.3 },
            { text: "the", start: 8.3, end: 8.5 },
            { text: "house,’", start: 8.5, end: 8.7 },
          ],
        },
        {
          start: 9.0,
          end: 12.6,
          words: [
            { text: "‘They", start: 8.7, end: 8.9 },
            { text: "do", start: 8.9, end: 9.1 },
            { text: "so", start: 9.1, end: 9.3 },
            { text: "much", start: 9.3, end: 9.5 },
            { text: "for", start: 9.5, end: 9.7 },
            { text: "us,", start: 9.7, end: 9.9 },
            { text: "we", start: 9.9, end: 10.1 },
            { text: "need", start: 10.1, end: 10.3 },
            { text: "to", start: 10.3, end: 10.5 },
            { text: "use", start: 10.5, end: 10.7 },
            { text: "some", start: 10.7, end: 10.9 },
            { text: "of", start: 10.9, end: 11.1 },
            { text: "our", start: 11.1, end: 11.3 },
            { text: "free", start: 11.3, end: 11.5 },
            { text: "time", start: 11.5, end: 11.7 },
            { text: "too.’", start: 11.7, end: 11.9 },
          ],
        },
      ],
    },
    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 0,
          end: 2.3,
          words: [
            { text: "‘There", start: 0.6, end: 0.9 },
            { text: "are", start: 0.9, end: 1.2 },
            { text: "six", start: 1.2, end: 1.5 },
            { text: "chores", start: 1.5, end: 1.8 },
            { text: "here", start: 1.8, end: 2.1 }
          ],
        },

        {
          start: 3.0,
          end: 4.8,
          words: [
            { text: "‘That’s", start: 3.2, end: 3.4 },
            { text: "three", start: 3.4, end: 3.6 },
            { text: "each", start: 3.6, end: 3.8 },
            { text: "if", start: 3.8, end: 4.0 },
            { text: "we", start: 4.0, end: 4.2 },
            { text: "share", start: 4.2, end: 4.4 },
            { text: "them.’", start: 4.4, end: 4.6 }
          ],
        },
      ],
    },
    {
      url: video5,
      title: "Section 5",
      subtitles: [
        {
          start: 9.0,
          end: 10.6,
          words: [
            { text: "‘Wow!", start: 9.6, end: 10.0 },
            { text: "Thank", start: 10.0, end: 10.2 },
            { text: "you,’", start: 10.2, end: 10.6 },
          ],
        },
        {
          start: 20.0,
          end: 25.5,
          words: [
            { text: "They", start: 15.6, end: 15.9 },
            { text: "start", start: 15.9, end: 16.2 },
            { text: "to", start: 16.2, end: 16.5 },
            { text: "do", start: 16.5, end: 16.8 },
            { text: "their", start: 16.8, end: 17.1 },
            { text: "chores", start: 17.1, end: 17.4 },
            { text: "while", start: 17.4, end: 17.7 },
            { text: "Mum", start: 17.7, end: 18.0 },
            { text: "and", start: 18.0, end: 18.3 },
            { text: "Dad", start: 18.3, end: 18.6 },
            { text: "cook", start: 18.6, end: 18.9 },
            { text: "dinner.", start: 18.9, end: 19.2 },
          ],
        },
      ],
    },
  ];

  const cloudPositions = {
    0: [
    ],

    1: [
      { top: "15%", left: "70%", isFlipped: true },
    ],

    2: [
      { top: "20%", right: "20%", isFlipped: true },
      { top: "25%", left: "35%", isFlipped: true },
      { top: "25%", left: "35%", isFlipped: true },
    ],

    3: [
      { bottom: "75%", left: "15%" },
      { top: "20%", left: "15%" },
    ],

    4: [
      { top: "5%", left: "23%" },
      { top: "5%", left: "25%", isFlipped: true },
    ],
  };

  const extraBubblesData = [
    {
      videoIndex: 1,
      start: 0,
      end: 4.2,
      words: [
        { text: "Liz", start: 0.2, end: 0.4 },
        { text: "and", start: 0.4, end: 0.6 },
        { text: "Ryan", start: 0.6, end: 0.8 },
        { text: "are", start: 0.8, end: 1.0 },
        { text: "watching", start: 1.0, end: 1.2 },
        { text: "TV", start: 1.2, end: 1.4 },
        { text: "in", start: 1.4, end: 1.6 },
        { text: "the", start: 1.6, end: 1.8 },
        { text: "living", start: 1.8, end: 2.0 },
        { text: "room", start: 2.0, end: 2.2 },
        { text: "at", start: 2.2, end: 2.4 },
        { text: "home", start: 2.4, end: 2.6 },
        { text: "while", start: 2.6, end: 2.8 },
        { text: "their", start: 2.8, end: 3.0 },
        { text: "mum", start: 3.0, end: 3.2 },
        { text: "cooks", start: 3.2, end: 3.4 },
        { text: "their", start: 3.4, end: 3.7 },
        { text: "meal", start: 3.7, end: 4.0 },
      ],
    },
    {
      videoIndex: 1,
      start: 4.6,
      end: 12.8,
      words: [
        { text: "Mum", start: 7.5, end: 7.8 },
        { text: "is", start: 7.8, end: 8.1 },
        { text: "tired,", start: 8.1, end: 8.4 },
        { text: "she", start: 8.4, end: 8.7 },
        { text: "yawns", start: 8.7, end: 9.0 },
        { text: "as", start: 9.0, end: 9.3 },
        { text: "she", start: 9.3, end: 9.6 },
        { text: "chops", start: 9.6, end: 9.9 },
        { text: "the", start: 9.9, end: 10.2 },
        { text: "vegetables.", start: 10.2, end: 10.5 },
        { text: "Soon,", start: 11.0, end: 11.3 },
        { text: "Dad", start: 11.3, end: 11.5 },
        { text: "comes", start: 11.5, end: 11.8 },
        { text: "home", start: 11.8, end: 12.2 },
        { text: "from", start: 12.2, end: 12.4 },
        { text: "work.", start: 12.4, end: 12.6 },
      ],
    },
    {
      videoIndex: 1,
      start: 13.5,
      end: 16.2,
      words: [
        { text: "He", start: 14.2, end: 14.5 },
        { text: "seems", start: 14.8, end: 15.1 },
        { text: "tired", start: 15.1, end: 15.4 },
        { text: "too.", start: 15.7, end: 16.0 },
      ],
    },
    {
      videoIndex: 1,
      start: 18.5,
      end: 24.0,
      words: [
        { text: "He", start: 19.6, end: 19.9 },
        { text: "hangs", start: 19.9, end: 20.2 },
        { text: "up", start: 20.2, end: 20.5 },
        { text: "his", start: 20.5, end: 20.8 },
        { text: "coat", start: 20.8, end: 21.1 },
        { text: "and", start: 21.1, end: 21.4 },
        { text: "goes", start: 21.4, end: 21.7 },
        { text: "in", start: 21.7, end: 22.0 },
        { text: "to", start: 22.0, end: 22.3 },
        { text: "help", start: 22.3, end: 22.6 },
        { text: "Mum", start: 22.6, end: 22.9 },
        { text: "in", start: 22.9, end: 23.2 },
        { text: "the", start: 23.2, end: 23.5 },
        { text: "kitchen.", start: 23.5, end: 23.8 },
      ],
    },
    {
      videoIndex: 2,
      start: 0,
      end: 2.8,
      words: [
        { text: "Liz", start: 0.2, end: 0.4 },
        { text: "notices", start: 0.4, end: 0.6 },
        { text: "that", start: 0.6, end: 0.8 },
        { text: "this", start: 0.8, end: 1.0 },
        { text: "is", start: 1.0, end: 1.2 },
        { text: "not", start: 1.2, end: 1.4 },
        { text: "fair", start: 1.4, end: 1.6 },
        { text: "and", start: 1.6, end: 1.8 },
        { text: "has", start: 1.8, end: 2.0 },
        { text: "an", start: 2.0, end: 2.2 },
        { text: "idea.", start: 2.2, end: 2.6 },
      ],
    },
    {
      videoIndex: 2,
      start: 13.0,
      end: 17.6,
      words: [
        { text: "Liz", start: 13.4, end: 13.9 },
        { text: "and", start: 13.9, end: 14.4 },
        { text: "Ryan", start: 14.4, end: 14.9 },
        { text: "talk", start: 14.9, end: 15.4 },
        { text: "and", start: 15.4, end: 15.9 },
        { text: "write", start: 15.9, end: 16.4 },
        { text: "a", start: 16.4, end: 16.6 },
        { text: "list", start: 16.6, end: 16.8 },
        { text: "of", start: 16.8, end: 17.0 },
        { text: "chores.", start: 17.0, end: 17.4 },
      ],
    },
    {
      videoIndex: 3,
      start: 4.8,
      end: 10.0,
      words: [
        { text: "They", start: 4.8, end: 5.1 },
        { text: "choose", start: 5.1, end: 5.4 },
        { text: "the", start: 5.4, end: 5.7 },
        { text: "chores", start: 5.7, end: 6.0 },
        { text: "they", start: 6.0, end: 6.3 },
        { text: "would", start: 6.3, end: 6.6 },
        { text: "most", start: 6.6, end: 6.9 },
        { text: "like", start: 6.9, end: 7.2 },
        { text: "to", start: 7.2, end: 7.5 },
        { text: "do", start: 7.5, end: 7.8 },
        { text: "and", start: 7.8, end: 8.1 },
        { text: "write", start: 8.1, end: 8.4 },
        { text: "their", start: 8.4, end: 8.7 },
        { text: "names", start: 8.7, end: 9.0 },
        { text: "next", start: 9.0, end: 9.3 },
        { text: "to", start: 9.3, end: 9.6 },
        { text: "them.", start: 9.6, end: 9.9 }
      ],
    },
    {
      videoIndex: 3,
      start: 10.0,
      end: 13.8,
      words: [
        { text: "They", start: 11.1, end: 11.4 },
        { text: "then", start: 11.4, end: 11.7 },
        { text: "plan", start: 11.7, end: 12.0 },
        { text: "a", start: 12.0, end: 12.3 },
        { text: "surprise", start: 12.3, end: 12.6 },
        { text: "for", start: 12.6, end: 12.9 },
        { text: "their", start: 12.9, end: 13.2 },
        { text: "tired", start: 13.2, end: 13.5 },
        { text: "parents.", start: 13.5, end: 13.8 }
      ],
    },
    {
      videoIndex: 3,
      start: 13.0,
      end: 20.0,
      words: [
        { text: "They", start: 15.6, end: 15.9 },
        { text: "start", start: 15.9, end: 16.2 },
        { text: "to", start: 16.2, end: 16.5 },
        { text: "do", start: 16.5, end: 16.8 },
        { text: "their", start: 16.8, end: 17.1 },
        { text: "chores", start: 17.1, end: 17.4 },
        { text: "while", start: 17.4, end: 17.7 },
        { text: "Mum", start: 17.7, end: 18.0 },
        { text: "and", start: 18.0, end: 18.3 },
        { text: "Dad", start: 18.3, end: 18.6 },
        { text: "cook", start: 18.6, end: 18.9 },
        { text: "dinner.", start: 18.9, end: 19.2 },
      ],
    },
    {
      videoIndex: 4,
      start: 0,
      end: 2.6,
      words: [
        { text: "Mum", start: 0.2, end: 0.4 },
        { text: "and", start: 0.4, end: 0.6 },
        { text: "Dad", start: 0.6, end: 0.8 },
        { text: "come", start: 0.8, end: 1.0 },
        { text: "out", start: 1.0, end: 1.2 },
        { text: "of", start: 1.2, end: 1.4 },
        { text: "the", start: 1.4, end: 1.6 },
        { text: "kitchen", start: 1.6, end: 1.8 },
        { text: "with", start: 1.8, end: 2.0 },
        { text: "the", start: 2.0, end: 2.2 },
        { text: "food", start: 2.2, end: 2.4 },
      ],
    },
    {
      videoIndex: 4,
      start: 2.6,
      end: 4.3,
      words: [
        { text: "and", start: 2.6, end: 2.8 },
        { text: "find", start: 2.8, end: 3.0 },
        { text: "the", start: 3.0, end: 3.2 },
        { text: "children", start: 3.2, end: 3.4 },
        { text: "working", start: 3.4, end: 3.6 },
        { text: "hard.", start: 3.6, end: 4.2 },
      ],
    },
    {
      videoIndex: 4,
      start: 6.0,
      end: 7.4,
      words: [
        { text: "They", start: 6.0, end: 6.2 },
        { text: "are", start: 6.2, end: 6.4 },
        { text: "very", start: 6.4, end: 6.6 },
        { text: "happy", start: 6.6, end: 6.8 },
        { text: "with", start: 6.8, end: 7.0 },
        { text: "their", start: 7.0, end: 7.2 },
        { text: "children.", start: 7.2, end: 7.4 },
      ],
    },
    {
      videoIndex: 4,
      start: 10.6,
      end: 15.5,
      words: [
        { text: "They", start: 10.8, end: 11.1 },
        { text: "eat", start: 11.1, end: 11.4 },
        { text: "dinner", start: 11.4, end: 11.7 },
        { text: "together", start: 11.7, end: 12.0 },
        { text: "and", start: 12.0, end: 12.3 },
        { text: "Mum", start: 12.3, end: 12.6 },
        { text: "and", start: 12.6, end: 12.9 },
        { text: "Dad", start: 12.9, end: 13.2 },
        { text: "relax", start: 13.2, end: 13.5 },
        { text: "while", start: 13.5, end: 13.8 },
        { text: "the", start: 13.8, end: 14.1 },
        { text: "children", start: 14.1, end: 14.4 },
        { text: "finish", start: 14.4, end: 14.7 },
        { text: "their", start: 14.7, end: 15.0 },
        { text: "chores", start: 15.0, end: 15.3 },
      ],
    },
    {
      videoIndex: 4,
      start: 15.4,
      end: 19.6,
      words: [
        { text: "Well", start: 15.4, end: 15.7 },
        { text: "done", start: 15.7, end: 16.0 },
        { text: "Liz", start: 16.0, end: 16.3 },
        { text: "and", start: 16.3, end: 16.6 },
        { text: "Ryan,", start: 16.6, end: 17.2 },
        { text: "you", start: 17.9, end: 18.1 },
        { text: "have", start: 18.1, end: 18.3 },
        { text: "helped", start: 18.3, end: 18.8 },
        { text: "your", start: 18.8, end: 19.0 },
        { text: "parents!", start: 19.0, end: 19.2 },
      ],
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

    if (currentVideo === 4 && isPlaying) {
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

    const allCorrectWords = ["they", "start", "to", "do", "their", "chores", "while", "mum", "and", "dad", "cook", "dinner"];

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

        return newWords;
      });
    }

    selection.removeAllRanges();
  };

  const togglePlay = () => {
    if (selectedWords.length === 12) {
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
    if (currentVideo === 4) {
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
      "they", "start", "to", "do", "their", "chores", "while", "mum", "and", "dad", "cook", "dinner"
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
          setShowFeedback(false);
          setShowBanner(false);
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

          {showWrongFeedback && currentVideo === 4 && showBanner && (
            <div className="wrong-feedback">
              Try Again! ❌
            </div>
          )}

          {showFeedback && (
            <div className="feedback-popup">
              Good Job! 👍
            </div>
          )}

          {currentVideo === 4 && showBanner && (
            <div className={`instruction-banner show ${isFullscreen ? 'fullscreen-banner' : ''}`}>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                Highlight what Liz and Ryan did to help
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                when they noticed their parents were tired.
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