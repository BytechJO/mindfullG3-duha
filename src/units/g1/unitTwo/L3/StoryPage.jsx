import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';

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
      type: 'video',
      url: video1,
      title: "Section 1",
      subtitles: [
      ]
    },

    {
      type: 'video',
      url: video2,
      title: "Section 2",
      subtitles: [

        {
          start: 11.0, end: 16.4,
          words: [
            { text: "Wow –", start: 13.5, end: 13.8 },
            { text: "thank", start: 14.0, end: 14.3 },
            { text: "you.", start: 14.5, end: 14.8 },
            { text: "I", start: 15.0, end: 15.3 },
            { text: "love", start: 15.5, end: 15.8 },
            { text: "them,", start: 16.0, end: 16.3 }
          ]
        }
      ]
    },

    {
      type: 'video',
      url: video3,
      title: "Section 3",
      subtitles: [
      ]
    },

    {
      type: 'video',
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 11.5, end: 17.0,
          words: [
            { text: "I", start: 9.5, end: 9.8 },
            { text: "am", start: 9.5, end: 9.8 },
            { text: "ready", start: 9.8, end: 10.1 },
            { text: "to", start: 10.1, end: 10.2 },
            { text: "try", start: 10.2, end: 10.7 },
            { text: "again", start: 10.2, end: 10.7 },

            { text: "Jen", start: 0.0, end: 0.5 },
            { text: "knows", start: 0.5, end: 1.0 },
            { text: "it", start: 1.0, end: 1.4 },
            { text: "is", start: 1.0, end: 1.4 },
            { text: "sometimes", start: 1.4, end: 1.8 },
            { text: "difficult", start: 1.8, end: 2.5 },
            { text: "to", start: 2.5, end: 2.8 },
            { text: "learn", start: 2.8, end: 3.1 },
            { text: "new", start: 3.1, end: 3.4 },
            { text: "things", start: 3.4, end: 3.7 },
            { text: "and", start: 4.5, end: 4.7 },
            { text: "it", start: 4.7, end: 4.9 },
            { text: "takes", start: 4.9, end: 5.2 },
            { text: "effort", start: 5.2, end: 5.5 },
            { text: "to", start: 5.5, end: 5.6 },
            { text: "achieve", start: 5.6, end: 6.0 },
            { text: "goals.", start: 6.0, end: 6.4 }

          ]
        },
      ]
    },

    {
      type: 'video',
      url: video5,
      title: "Section 5",
      subtitles: [

        {
          start: 8.7, end: 12.5,
          words: [
            { text: "I", start: 9.2, end: 9.4 },
            { text: "am", start: 9.4, end: 9.6 },
            { text: "just", start: 9.6, end: 9.9 },
            { text: "getting", start: 9.9, end: 10.2 },
            { text: "started!", start: 10.2, end: 10.6 },
            { text: "I’m", start: 11.2, end: 11.5 },
            { text: "going", start: 11.5, end: 11.8 },
            { text: "to", start: 11.8, end: 11.9 },
            { text: "keep", start: 11.9, end: 12.2 },
            { text: "trying", start: 12.2, end: 12.6 }
          ]
        },
      ]
    },
  ];

  const cloudPositions = {
    0: [
    ],
    1: [
      { top: '15%', left: '50%', isFlipped: true },
    ],
    2: [
    ],
    3: [
      { bottom: '60%', left: '3%' },
    ],
    4: [
      { top: '20%', left: '50%', transform: 'translateX(-50%)' },
    ]
  };

  const extraBubblesData = [
    {
      videoIndex: 1,
      start: 0, end: 4.5,
      words: [
        { text: "Jen", start: 0.0, end: 0.4 },
        { text: "gets", start: 0.4, end: 0.7 },
        { text: "a", start: 0.7, end: 0.8 },
        { text: "pair", start: 0.8, end: 1.1 },
        { text: "of", start: 1.1, end: 1.3 },
        { text: "roller", start: 1.3, end: 1.7 },
        { text: "blades", start: 1.7, end: 2.1 },
        { text: "from", start: 2.1, end: 2.4 },
        { text: "her", start: 2.4, end: 2.6 },
        { text: "aunt", start: 2.6, end: 2.9 },
        { text: "and", start: 2.9, end: 3.1 },
        { text: "uncle", start: 3.1, end: 3.5 },
        { text: "for", start: 3.5, end: 3.7 },
        { text: "her", start: 3.7, end: 3.9 },
        { text: "birthday.", start: 3.9, end: 4.3 }
      ]
    },
    {
      videoIndex: 1,
      start: 4.8, end: 8.9,
      words: [
        { text: "She", start: 4.9, end: 5.2 },
        { text: "has", start: 5.2, end: 5.4 },
        { text: "wanted", start: 5.4, end: 5.8 },
        { text: "roller", start: 5.8, end: 6.2 },
        { text: "blades", start: 6.2, end: 6.6 },
        { text: "since", start: 6.6, end: 7.2 },
        { text: "last", start: 7.5, end: 8.2 },
        { text: "year.", start: 8.2, end: 8.8 },
      ]
    },
    {
      videoIndex: 1,
      start: 9.2, end: 10.9,
      words: [
        { text: "Jen", start: 9.5, end: 9.8 },
        { text: "is", start: 9.8, end: 10.1 },
        { text: "very", start: 10.1, end: 10.2 },
        { text: "happy!", start: 10.2, end: 10.7 }
      ]
    },


    {
      videoIndex: 2,
      start: 1.0, end: 7.0,
      words: [
        { text: "Jen", start: 1.5, end: 2.0 },
        { text: "puts", start: 2.0, end: 2.6 },
        { text: "them on", start: 2.6, end: 3.1 },
        { text: "and", start: 3.5, end: 3.7 },
        { text: "goes", start: 3.7, end: 4.0 },
        { text: "outside", start: 4.0, end: 4.4 },
        { text: "to", start: 4.4, end: 4.6 },
        { text: "practise", start: 4.6, end: 5.0 },
        { text: "on", start: 5.0, end: 5.6 },
        { text: "the", start: 5.6, end: 6.2 },
        { text: "sidewalk.", start: 6.2, end: 6.9 }
      ]
    },
    {
      videoIndex: 2,
      start: 7.2, end: 10.9,
      words: [
        { text: "She", start: 7.5, end: 7.8 },
        { text: "has", start: 7.8, end: 8.0 },
        { text: "always", start: 8.0, end: 8.4 },
        { text: "wanted", start: 8.4, end: 8.8 },
        { text: "to", start: 8.8, end: 9.0 },
        { text: "learn", start: 9.0, end: 9.3 },
        { text: "how", start: 9.3, end: 9.5 },
        { text: "to", start: 9.5, end: 9.6 },
        { text: "skate.", start: 9.6, end: 10.5 }
      ]
    },
    {
      videoIndex: 2,
      start: 11.0, end: 14.5,
      words: [
        { text: "It", start: 11.5, end: 11.7 },
        { text: "is", start: 11.7, end: 11.9 },
        { text: "difficult", start: 11.9, end: 12.3 },
        { text: "to", start: 12.3, end: 12.5 },
        { text: "skate", start: 12.5, end: 12.9 },
        { text: "for", start: 12.9, end: 13.1 },
        { text: "the", start: 13.1, end: 13.3 },
        { text: "first", start: 13.3, end: 13.6 },
        { text: "time.", start: 13.6, end: 14.0 }
      ]
    },
    {
      videoIndex: 2,
      start: 14.7, end: 16.5,
      words: [
        { text: "Jen", start: 15.0, end: 15.3 },
        { text: "keeps", start: 15.3, end: 15.6 },
        { text: "falling", start: 15.6, end: 16.0 },
        { text: "over.", start: 16.0, end: 16.3 }
      ]
    },
    {
      videoIndex: 2,
      start: 16.9, end: 19.0,
      words: [
        { text: "She", start: 17.0, end: 17.4 },
        { text: "is", start: 17.4, end: 17.8 },
        { text: "tired.", start: 17.8, end: 18.7 }
      ]
    },
    {
      videoIndex: 2,
      start: 19.5, end: 23.5,
      words: [
        { text: "She", start: 20.0, end: 20.3 },
        { text: "sits", start: 20.3, end: 20.6 },
        { text: "on", start: 20.6, end: 20.8 },
        { text: "the", start: 20.8, end: 21.0 },
        { text: "steps", start: 21.0, end: 21.3 },
        { text: "and", start: 21.3, end: 21.5 },
        { text: "takes", start: 21.5, end: 21.8 },
        { text: "off", start: 21.8, end: 22.0 },
        { text: "her", start: 22.0, end: 22.2 },
        { text: "roller", start: 22.2, end: 22.6 },
        { text: "blades.", start: 22.6, end: 23.0 }
      ]
    },

    {
      videoIndex: 3,
      start: 0, end: 6.8,
      words: [
        { text: "Jen", start: 0.0, end: 0.5 },
        { text: "knows", start: 0.5, end: 1.0 },
        { text: "it", start: 1.0, end: 1.4 },
        { text: "is", start: 1.0, end: 1.4 },
        { text: "sometimes", start: 1.4, end: 1.8 },
        { text: "difficult", start: 1.8, end: 2.5 },
        { text: "to", start: 2.5, end: 2.8 },
        { text: "learn", start: 2.8, end: 3.1 },
        { text: "new", start: 3.1, end: 3.4 },
        { text: "things", start: 3.4, end: 3.7 },
        { text: "and", start: 4.5, end: 4.7 },
        { text: "it", start: 4.7, end: 4.9 },
        { text: "takes", start: 4.9, end: 5.2 },
        { text: "effort", start: 5.2, end: 5.5 },
        { text: "to", start: 5.5, end: 5.6 },
        { text: "achieve", start: 5.6, end: 6.0 },
        { text: "goals.", start: 6.0, end: 6.4 }
      ]
    },
    {
      videoIndex: 3,
      start: 6.9, end: 12.0,
      words: [
        { text: "Jen", start: 7.5, end: 7.8 },
        { text: "sits", start: 7.8, end: 8.1 },
        { text: "for", start: 8.1, end: 8.3 },
        { text: "a", start: 8.3, end: 8.4 },
        { text: "few", start: 8.4, end: 8.6 },
        { text: "minutes", start: 8.6, end: 8.9 },
        { text: "–", start: 8.9, end: 9.0 },
        { text: "she", start: 9.0, end: 9.3 },
        { text: "finishes", start: 9.3, end: 9.7 },
        { text: "her", start: 9.7, end: 9.9 },
        { text: "piece", start: 9.9, end: 10.2 },
        { text: "of", start: 10.2, end: 10.3 },
        { text: "cake", start: 10.3, end: 10.6 },
        { text: "and", start: 10.6, end: 10.8 },
        { text: "lemonade.", start: 10.8, end: 11.3 }
      ]
    },

    {
      videoIndex: 4,
      start: 0.0, end: 4.5,
      words: [
        { text: "Jen’s", start: 0.2, end: 0.5 },
        { text: "aunt", start: 0.5, end: 0.8 },
        { text: "asks", start: 0.8, end: 1.1 },
        { text: "her", start: 1.1, end: 1.3 },
        { text: "if", start: 1.3, end: 1.5 },
        { text: "she", start: 1.5, end: 1.7 },
        { text: "is", start: 1.7, end: 1.9 },
        { text: "done", start: 1.9, end: 2.2 },
        { text: "practising", start: 2.2, end: 2.7 },
        { text: "on", start: 2.7, end: 2.9 },
        { text: "her", start: 2.9, end: 3.1 },
        { text: "rollerblades", start: 3.1, end: 3.7 },
        { text: "for", start: 3.7, end: 3.9 },
        { text: "the", start: 3.9, end: 4.0 },
        { text: "day.", start: 4.0, end: 4.3 }
      ]
    },
    {
      videoIndex: 4,
      start: 0.0, end: 4.5,
      words: [
        { text: "Jen’s", start: 0.2, end: 0.5 },
        { text: "aunt", start: 0.5, end: 0.8 },
        { text: "asks", start: 0.8, end: 1.1 },
        { text: "her", start: 1.1, end: 1.3 },
        { text: "if", start: 1.3, end: 1.5 },
        { text: "she", start: 1.5, end: 1.7 },
        { text: "is", start: 1.7, end: 1.9 },
        { text: "done", start: 1.9, end: 2.2 },
        { text: "practising", start: 2.2, end: 2.7 },
        { text: "on", start: 2.7, end: 2.9 },
        { text: "her", start: 2.9, end: 3.1 },
        { text: "rollerblades", start: 3.1, end: 3.7 },
        { text: "for", start: 3.7, end: 3.9 },
        { text: "the", start: 3.9, end: 4.0 },
        { text: "day.", start: 4.0, end: 4.3 }
      ]
    },
    {
      videoIndex: 4,
      start: 4.8, end: 8.7,
      words: [
        { text: "Jen", start: 5.5, end: 5.8 },
        { text: "looks", start: 5.8, end: 6.1 },
        { text: "at", start: 6.1, end: 6.3 },
        { text: "her", start: 6.3, end: 6.5 },
        { text: "with", start: 6.5, end: 6.7 },
        { text: "a", start: 6.7, end: 6.8 },
        { text: "big", start: 6.8, end: 7.3 },
        { text: "smile,", start: 7.3, end: 7.6 },
        { text: "and", start: 8.0, end: 8.3 },
        { text: "says", start: 8.3, end: 8.6 }
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

    const allCorrectWords = ["it", "is", "sometimes", "difficult", "learn", "new", "things", "and", "takes", "effort", "achieve", "goals", "i", "am", "ready", "to", "try", "again"];

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
    if (selectedWords.length === 18) {
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
      "it", "is", "sometimes", "difficult", "learn", "new", "things", "and", "takes", "effort", "achieve", "goals", "i", "am", "ready", "to", "try", "again"
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
                Highlight how Jen shows determination
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                in the story.
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