import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Subtitles,
  Maximize2,
  Minimize2,
  MessageSquareText,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import "../../shared/StoryPage.css";
import ValidationAlert from "../../shared/ValidationAlert";

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
      subtitles: [{}],
    },
    {
      url: video2,
      title: "Section 2",
      subtitles: [
        {
          start: 0,
          end: 1,
          words: [{ text: "Congratulations!", start: 0.0, end: 0.4 }],
        },
        {},
        {},
        {},
        {},
      ],
    },
    {
      url: video3,
      title: "Section 3",
      subtitles: [
        {},
        {
          start: 2.5,
          end: 3.1,
          words: [{ text: "‘Hello’.", start: 2.5, end: 3.0 }],
        },
        {
          start: 3.1,
          end: 4.0,
          words: [{ text: "‘Hello’", start: 3.2, end: 3.9 }],
        },
        {
          start: 4.2,
          end: 6.7,
          words: [
            { text: "and", start: 5.4, end: 5.7 },
            { text: "Congratulations!’", start: 5.7, end: 6.7 },
          ],
        },
        {
          start: 8,
          end: 9.2,
          words: [
            { text: "Are", start: 8.0, end: 8.3 },
            { text: "we", start: 8.3, end: 8.6 },
            { text: "too", start: 8.6, end: 8.9 },
            { text: "noisy?", start: 8.9, end: 9.2 },
          ],
        },
        {
          start: 11.0,
          end: 12.1,
          words: [
            { text: "I", start: 10.6, end: 10.8 },
            { text: "don’t", start: 10.8, end: 11.0 },
            { text: "want", start: 11.0, end: 11.2 },
            { text: "to", start: 11.2, end: 11.4 },
            { text: "be", start: 11.4, end: 11.6 },
            { text: "too", start: 11.6, end: 11.8 },
            { text: "loud.", start: 11.8, end: 12.0 },
          ],
        },
        {
          start: 13.8,
          end: 14.8,
          words: [
            { text: "‘It’s ", start: 13.8, end: 14.2 },
            { text: "fine,’", start: 14.2, end: 14.6 },
          ],
        },
        {
          start: 14.8,
          end: 17.5,
          words: [
            { text: "It’s ", start: 14.6, end: 14.9 },
            { text: "fun", start: 14.9, end: 15.2 },
            { text: "to", start: 15.2, end: 15.5 },
            { text: "celebrate", start: 15.5, end: 15.8 },
            { text: "with", start: 15.8, end: 16.1 },
            { text: "family", start: 16.1, end: 16.4 },
            { text: "and", start: 16.4, end: 16.7 },
            { text: "friends.", start: 16.7, end: 17.0 },
          ],
        },
        {
          start: 17.5,
          end: 20,
          words: [
            { text: "Are ", start: 8.3, end: 8.6 },
            { text: "we", start: 8.3, end: 8.6 },
            { text: "too", start: 8.6, end: 8.9 },
            { text: "noisy?", start: 8.9, end: 9.2 },
            { text: "I ", start: 10.6, end: 10.8 },
            { text: "don’t", start: 10.8, end: 11.0 },
            { text: "want", start: 11.0, end: 11.2 },
            { text: "to", start: 11.2, end: 11.4 },
            { text: "be", start: 11.4, end: 11.6 },
            { text: "too", start: 11.6, end: 11.8 },
            { text: "loud.", start: 11.8, end: 12.0 },
          ],
        },
      ],
    },
    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {},
        {},
        {},
        {
          start: 8.0,
          end: 9.2,
          words: [
            { text: "‘Thank", start: 8.0, end: 8.4 },
            { text: "‘You", start: 8.4, end: 8.8 },
          ],
        },
        {
          start: 11.6,
          end: 12.3,
          words: [
            { text: "‘It’s", start: 11.6, end: 11.9 },
            { text: "delicious.", start: 11.9, end: 12.3 },
          ],
        },
        {},
        {},
      ],
    },
    {
      url: video5,
      title: "Section 5",
      subtitles: [
        {
          start: 0,
          end: 3,
          words: [
            { text: "Why", start: 0.2, end: 0.4 },
            { text: "did", start: 0.4, end: 0.6 },
            { text: "you", start: 0.6, end: 0.8 },
            { text: "give", start: 0.8, end: 1.0 },
            { text: "your", start: 1.0, end: 1.2 },
            { text: "cake", start: 1.2, end: 1.4 },
            { text: "to", start: 1.4, end: 1.6 },
            { text: "him?", start: 1.6, end: 1.8 },
          ],
        },
        {},
        {
          start: 4.5,
          end: 9.8,
          words: [
            { text: "Because", start: 5.5, end: 5.7 },
            { text: "he’s", start: 5.7, end: 5.9 },
            { text: "our", start: 5.9, end: 6.1 },
            { text: "neighbour", start: 6.1, end: 6.3 },
            { text: "and", start: 7.5, end: 7.7 },
            { text: "he", start: 7.7, end: 7.9 },
            { text: "was", start: 7.9, end: 8.1 },
            { text: "kind", start: 8.1, end: 8.3 },
            { text: "about", start: 8.3, end: 8.5 },
            { text: "the", start: 8.5, end: 8.7 },
            { text: "noise", start: 8.7, end: 8.9 },
            { text: "we", start: 8.9, end: 9.1 },
            { text: "are", start: 9.1, end: 9.3 },
            { text: "making.", start: 9.3, end: 9.5 },
          ],
        },
        {
          start: 11.0,
          end: 15.1,
          words: [
            { text: "We", start: 11.3, end: 11.6 },
            { text: "should", start: 11.6, end: 11.9 },
            { text: "always", start: 11.9, end: 12.2 },
            { text: "think", start: 12.2, end: 12.5 },
            { text: "about", start: 12.5, end: 12.8 },
            { text: "the", start: 12.8, end: 13.1 },
            { text: "people", start: 13.1, end: 13.4 },
            { text: "around", start: 13.4, end: 13.7 },
            { text: "us", start: 13.7, end: 14.0 },
            { text: "and", start: 14.0, end: 14.3 },
            { text: "their", start: 14.3, end: 14.6 },
            { text: "feelings.", start: 14.6, end: 14.9 },
          ],
        },
        {
          start: 20.2,
          end: 14,
          words: [
            { text: "Thank you,", start: 10.4, end: 11.7 },
            { text: "Jane.", start: 11.7, end: 12.3 },
            { text: "That’s", start: 12.3, end: 12.6 },
            { text: "a good", start: 12.6, end: 12.9 },
            { text: "idea!", start: 12.9, end: 13.8 },
          ],
        },
      ],
    },
  ];

  const cloudPositions = {
    0: [],

    1: [
      { top: "50%", left: "50%" },
      { top: "10%", left: "15%" },
      { top: "10%", left: "25%" },
      { top: "10%", left: "5%" },
      { top: "20%", left: "40%" },
      { top: "10%", left: "5%" },
    ],

    2: [
      { top: "10%", right: "20%", isFlipped: true },
      { top: "5%", left: "30%" },
      { top: "5%", left: "60%", isFlipped: true },
      { top: "5%", left: "60%", isFlipped: true },
      { top: "20%", left: "30%" },
      { top: "20%", left: "40%" },
      { top: "5%", left: "40%", isFlipped: true },
      { top: "5%", left: "40%", isFlipped: true },
      { top: "5%", left: "40%", isFlipped: true },
    ],

    3: [
      { bottom: "85%", left: "60%", isFlipped: true },
      { top: "30%", left: "23%", isFlipped: true },
      { top: "15%", left: "55%" },
      { top: "5%", left: "55%", isFlipped: true },
      { top: "5%", left: "35%", isFlipped: true },
      { top: "5%", left: "35%", isFlipped: true },
      { top: "5%", left: "35%", isFlipped: true },
    ],

    4: [
      { top: "7%", left: "38%", isFlipped: true },
      { top: "5%", left: "35%", isFlipped: true },
      { top: "5%", left: "20%" },
      { top: "5%", left: "20%" },
      { top: "5%", left: "20%" },
      { top: "5%", left: "20%" },
    ],
  };
  const extraBubblesData = [
    {
      videoIndex: 1,
      start: 2,
      end: 5.2,
      words: [
        { text: "sing", start: 2.2, end: 2.5 },
        { text: "Brian’s", start: 2.5, end: 2.8 },
        { text: "friends", start: 2.8, end: 3.1 },
        { text: "and", start: 3.1, end: 3.4 },
        { text: "family", start: 3.4, end: 3.7 },
        { text: "as", start: 3.7, end: 4.0 },
        { text: "Brian", start: 4.0, end: 4.3 },
        { text: "cuts", start: 4.3, end: 4.6 },
        { text: "the", start: 4.6, end: 4.9 },
        { text: "cake.", start: 4.9, end: 5.2 },
      ],
    },
    {
      videoIndex: 1,
      start: 5.3,
      end: 9.1,
      words: [
        { text: "Brian", start: 5.5, end: 5.9 },
        { text: "has", start: 5.9, end: 6.3 },
        { text: "earned", start: 6.3, end: 6.7 },
        { text: "his", start: 6.7, end: 7.1 },
        { text: "yellow", start: 7.1, end: 7.5 },
        { text: "belt", start: 7.5, end: 7.9 },
        { text: "in", start: 7.9, end: 8.3 },
        { text: "Taekwondo", start: 8.3, end: 8.7 },
        { text: "class.", start: 8.7, end: 9.1 },
      ],
    },
    {
      videoIndex: 1,
      start: 9.1,
      end: 12.9,
      words: [
        { text: "They", start: 9.1, end: 9.5 },
        { text: "are", start: 9.5, end: 9.9 },
        { text: "singing,", start: 9.9, end: 10.5 },
        { text: "laughing,", start: 10.5, end: 11.0 },
        { text: "and", start: 11.0, end: 11.5 },
        { text: "playing", start: 11.5, end: 12.0 },
        { text: "games.", start: 12.0, end: 12.6 },
      ],
    },

    {
      videoIndex: 1,
      start: 12.9,
      end: 22.4,
      words: [
        { text: "Brian", start: 13.8, end: 14.1 },
        { text: "sees", start: 14.1, end: 14.4 },
        { text: "over", start: 14.4, end: 14.7 },
        { text: "the", start: 14.7, end: 15.0 },
        { text: "fence", start: 15.0, end: 15.3 },
        { text: "that", start: 15.3, end: 15.6 },
        { text: "his", start: 15.6, end: 15.9 },
        { text: "neighbour,", start: 15.9, end: 16.2 },
        { text: "Mr", start: 16.2, end: 16.5 },
        { text: "Percy", start: 16.5, end: 16.8 },
        { text: "is", start: 16.8, end: 17.1 },
        { text: "sitting", start: 17.1, end: 17.4 },
        { text: "alone", start: 17.4, end: 17.7 },
        { text: "in", start: 17.7, end: 18.0 },
        { text: "his", start: 18.0, end: 18.3 },
        { text: "garden", start: 18.3, end: 18.6 },
        { text: "drinking", start: 18.6, end: 18.9 },
        { text: "a", start: 18.9, end: 19.2 },
        { text: "cup", start: 19.2, end: 19.5 },
        { text: "of", start: 19.5, end: 19.8 },
        { text: "tea.", start: 19.8, end: 20.1 },
      ],
    },
    {
      videoIndex: 2,
      start: 0,
      end: 1.8,
      words: [
        { text: "Brian", start: 0.2, end: 0.3 },
        { text: "walks", start: 0.3, end: 0.5 },
        { text: "over", start: 0.5, end: 0.8 },
        { text: "to", start: 0.8, end: 1 },
        { text: "the", start: 1, end: 1.2 },
        { text: "and", start: 1.2, end: 1.4 },
        { text: "fence", start: 1.2, end: 1.4 },
        { text: "and", start: 1.4, end: 1.6 },
        { text: "says", start: 1.6, end: 1.8 },
      ],
    },
    {
      videoIndex: 3,
      start: 0,
      end: 2,
      words: [
        { text: "Brian", start: 0.2, end: 0.5 },
        { text: "thinks", start: 0.5, end: 0.8 },
        { text: "for", start: 0.8, end: 1.1 },
        { text: "a", start: 1.1, end: 1.4 },
        { text: "moment,", start: 1.4, end: 1.7 },
      ],
    },

    {
      videoIndex: 3,
      start: 2.0,
      end: 4.4,
      words: [
        { text: "he", start: 2.6, end: 2.8 },
        { text: "cuts", start: 2.8, end: 3.0 },
        { text: "a", start: 3.0, end: 3.2 },
        { text: "piece", start: 3.2, end: 3.4 },
        { text: "of", start: 3.4, end: 3.6 },
        { text: "his", start: 3.8, end: 4.0 },
        { text: "cake,", start: 4.0, end: 4.2 },
      ],
    },
    {
      videoIndex: 3,
      start: 4.4,
      end: 7,
      words: [
        { text: "and", start: 4.2, end: 4.4 },
        { text: "passes", start: 4.4, end: 4.6 },
        { text: "it", start: 4.6, end: 4.8 },
        { text: "to", start: 4.8, end: 5.0 },
        { text: "his", start: 5.0, end: 5.2 },
        { text: "neighbour", start: 5.2, end: 5.8 },
        { text: "over", start: 5.8, end: 6.2 },
        { text: "the", start: 6.2, end: 6.6 },
        { text: "fence.", start: 6.6, end: 6.8 },
      ],
    },
    {
      videoIndex: 3,
      start: 11.5,
      end: 16.2,
      words: [
        { text: "Brian", start: 12.3, end: 12.6 },
        { text: "goes", start: 12.6, end: 12.9 },
        { text: "back", start: 12.9, end: 13.2 },
        { text: "to", start: 13.2, end: 13.5 },
        { text: "the", start: 13.5, end: 13.8 },
        { text: "party", start: 13.8, end: 14.1 },
        { text: "and", start: 14.1, end: 14.4 },
        { text: "plays", start: 14.4, end: 14.7 },
        { text: "more", start: 14.7, end: 15.0 },
        { text: "games", start: 15.0, end: 15.3 },
        { text: "with", start: 15.3, end: 15.6 },
        { text: "his", start: 15.6, end: 15.9 },
        { text: "friends.", start: 15.9, end: 16.2 },
      ],
    },
    {
      videoIndex: 3,
      start: 17.1,
      end: 20,
      words: [
        { text: "He", start: 17.1, end: 17.4 },
        { text: "is", start: 17.4, end: 17.7 },
        { text: "happy", start: 17.7, end: 18.0 },
        { text: "that", start: 18.0, end: 18.3 },
        { text: "he", start: 18.3, end: 18.6 },
        { text: "considered", start: 18.6, end: 18.9 },
        { text: "his", start: 18.9, end: 19.2 },
        { text: "neighbour’s", start: 19.2, end: 19.5 },
        { text: "feelings.", start: 19.5, end: 19.8 },
      ],
    },
    {
      videoIndex: 4,
      start: 3,
      end: 5.4,
      words: [
        { text: "asks", start: 3.6, end: 3.8 },
        { text: "Leo,", start: 3.8, end: 4.0 },
        { text: "Brian’s", start: 4.0, end: 4.2 },
        { text: "cousin.", start: 4.2, end: 4.6 },
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

    const allCorrectWords = ["are","we","too", "noisy", "i","don’t","want","to","be","too","loud"];

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
    if (selectedWords.length === 2) {
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
      "are ","we","too", "noisy", "I","don’t","want","to","be","too","loud"
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
                Highlight the sentence that shows Brian
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                considering Mr. Percy’s feelings.
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