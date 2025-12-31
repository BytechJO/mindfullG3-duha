import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
} from "lucide-react";
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
          start: 14.0, end: 18.0,
          words: [
            { text: "‘Jasmine!", start: 14.0, end: 16.3 },
            { text: "Congratulations", start: 16.3, end: 16.6 },
            { text: "Jasmine!’", start: 16.6, end: 17.5 },
          ]
        },
      ]
    },
    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 21.0, end: 23.5,
          words: [

            { text: "‘Congratulations", start: 21.5, end: 21.8 },
            { text: "on", start: 21.8, end: 22.1 },
            { text: "winning", start: 22.1, end: 22.4 },
            { text: "class", start: 22.4, end: 22.7 },
            { text: "president,’", start: 22.7, end: 23.0 },
          ]
        },
        {
          start: 24.0, end: 25.0,
          words: [
            { text: "‘Thank", start: 24.2, end: 24.5 },
            { text: "you,’", start: 24.5, end: 24.8 },
          ]
        },
        {
          start: 25.0, end: 26.8,
          words: [
            { text: "I", start: 25.0, end: 25.3 },
            { text: "am", start: 25.3, end: 25.6 },
            { text: "surprised", start: 25.6, end: 25.9 },
            { text: "I", start: 25.9, end: 26.2 },
            { text: "won.", start: 26.2, end: 26.5 },
          ]
        },
        {
          start: 26.8, end: 29.2,
          words: [
            { text: "Your", start: 26.8, end: 27.1 },
            { text: "presentation", start: 27.1, end: 27.4 },
            { text: "was", start: 27.4, end: 27.7 },
            { text: "much", start: 27.7, end: 28.0 },
            { text: "better", start: 28.0, end: 28.3 },
            { text: "than", start: 28.3, end: 28.6 },
            { text: "mine.", start: 28.6, end: 29.2 },
          ]
        },
        {
          start: 29.8, end: 31.9,
          words: [
            { text: "I", start: 30.1, end: 30.4 },
            { text: "find", start: 30.4, end: 30.7 },
            { text: "making", start: 30.7, end: 31.0 },
            { text: "presentations", start: 31.0, end: 31.3 },
            { text: "hard.’", start: 31.3, end: 31.6 },
          ]
        },
        {
          start: 32.0, end: 40.0,
          words: [

            { text: "Congratulations", start: 21.5, end: 21.8 },
            { text: "on", start: 21.8, end: 22.1 },
            { text: "winning", start: 22.1, end: 22.4 },
            { text: "class", start: 22.4, end: 22.7 },
            { text: "president", start: 22.7, end: 23.0 },
          ]
        },
      ]
    },
    {
      url: video5,
      title: "Section 5",
      subtitles: [
        {
          start: 2.4, end: 10.8,
          words: [
            { text: "‘If", start: 2.4, end: 2.7 },
            { text: "you", start: 2.7, end: 3.0 },
            { text: "want,", start: 3.0, end: 3.3 },
            { text: "I", start: 3.3, end: 3.6 },
            { text: "can", start: 3.6, end: 3.9 },
            { text: "help", start: 3.9, end: 4.2 },
            { text: "you", start: 4.2, end: 4.5 },
            { text: "make", start: 4.5, end: 4.8 },
            { text: "your", start: 4.8, end: 5.1 },
            { text: "presentations,", start: 5.1, end: 5.4 },
            { text: "it’s", start: 7.0, end: 7.3 },
            { text: "something", start: 7.3, end: 7.6 },
            { text: "I", start: 7.6, end: 7.9 },
            { text: "find", start: 7.9, end: 8.2 },
            { text: "easy", start: 8.2, end: 8.5 },
            { text: "and", start: 8.5, end: 8.8 },
            { text: "I", start: 8.8, end: 9.1 },
            { text: "would", start: 9.1, end: 9.4 },
            { text: "like", start: 9.4, end: 9.7 },
            { text: "to", start: 9.7, end: 10.0 },
            { text: "help", start: 10.0, end: 10.3 },
            { text: "you.’", start: 10.3, end: 10.6 },



          ]
        },
        {
          start: 10.8, end: 13.8,
          words: [
            { text: "That’s", start: 10.8, end: 11.1 },
            { text: "so", start: 11.1, end: 11.4 },
            { text: "kind", start: 11.4, end: 11.7 },
            { text: "Derrick,", start: 11.7, end: 12.0 },
            { text: "I", start: 12.0, end: 12.3 },
            { text: "would", start: 12.3, end: 12.6 },
            { text: "really", start: 12.6, end: 12.9 },
            { text: "like", start: 12.9, end: 13.2 },
            { text: "that,’", start: 13.2, end: 13.5 },


          ]
        },
      ]
    },
  ];


  const cloudPositions = {

    0: [
    ],

    1: [
    ],

    2: [
      { top: '10%', right: '10%', isFlipped: true },

    ],

    3: [
      { bottom: '70%', left: '60%', isFlipped: true },
      { top: '10%', left: '30%', isFlipped: true },
      { top: '10%', left: '35%', isFlipped: true },
      { top: '10%', left: '32%', isFlipped: true },
      { top: '10%', left: '30%', isFlipped: true },
      { top: '30%', left: '30%' },
    ],

    4: [
      { bottom: '30%', left: '50%' },
      { bottom: '30%', left: '60%', isFlipped: true },
    ],
  };

  const extraBubblesData = [
    {
      videoIndex: 1,
      start: 0, end: 7.8,
      words: [
        { text: "Jasmine", start: 0.2, end: 0.5 },
        { text: "and", start: 0.5, end: 0.8 },
        { text: "Derrick", start: 0.8, end: 1.1 },
        { text: "are", start: 1.1, end: 1.4 },
        { text: "making", start: 1.4, end: 1.7 },
        { text: "posters", start: 1.7, end: 2.0 },
        { text: "and", start: 2.0, end: 2.3 },
        { text: "getting", start: 2.3, end: 2.6 },
        { text: "their", start: 2.6, end: 2.9 },
        { text: "presentations", start: 2.9, end: 3.2 },
        { text: "ready.", start: 3.2, end: 4.0 },
        { text: "They", start: 5.0, end: 5.3 },
        { text: "are", start: 5.3, end: 5.6 },
        { text: "both", start: 5.6, end: 5.9 },
        { text: "hoping", start: 5.9, end: 6.2 },
        { text: "to", start: 6.2, end: 6.5 },
        { text: "become", start: 6.5, end: 6.8 },
        { text: "class", start: 6.8, end: 7.1 },
        { text: "president.", start: 7.1, end: 7.4 },



      ]
    },
    {
      videoIndex: 1,
      start: 8.0, end: 11.8,
      words: [
        { text: "The", start: 8.0, end: 8.3 },
        { text: "other", start: 8.3, end: 8.6 },
        { text: "children", start: 8.6, end: 8.9 },
        { text: "and", start: 8.9, end: 9.2 },
        { text: "teachers", start: 9.2, end: 9.5 },
        { text: "will", start: 9.5, end: 9.8 },
        { text: "vote", start: 9.8, end: 10.1 },
        { text: "for", start: 10.1, end: 10.4 },
        { text: "the", start: 10.4, end: 10.7 },
        { text: "person", start: 10.7, end: 11.0 },
        { text: "they", start: 11.0, end: 11.3 },
        { text: "want.", start: 11.3, end: 11.6 },





      ]
    },
    {
      videoIndex: 1,
      start: 11.8, end: 20.0,
      words: [

        { text: "Derrick", start: 13.2, end: 13.5 },
        { text: "and", start: 13.5, end: 13.8 },
        { text: "Jasmine", start: 13.8, end: 14.1 },
        { text: "are", start: 14.1, end: 14.4 },
        { text: "both", start: 14.4, end: 14.7 },
        { text: "working", start: 14.7, end: 15.0 },
        { text: "very", start: 15.0, end: 15.3 },
        { text: "hard", start: 15.3, end: 15.6 },
        { text: "and", start: 15.6, end: 15.9 },
        { text: "they", start: 15.9, end: 16.2 },
        { text: "both", start: 16.2, end: 16.5 },
        { text: "want", start: 16.5, end: 16.8 },
        { text: "to", start: 16.8, end: 17.1 },
        { text: "win,", start: 17.1, end: 17.4 },
        { text: "but", start: 17.8, end: 18.2 },
        { text: "only", start: 18.2, end: 18.5 },
        { text: "one", start: 18.5, end: 18.8 },
        { text: "can", start: 18.8, end: 19.1 },
        { text: "win.", start: 19.1, end: 19.4 },




      ]
    },

    {
      videoIndex: 2,
      start: 0, end: 4.5,
      words: [
        { text: "Derrick", start: 0.2, end: 0.5 },
        { text: "is", start: 0.5, end: 0.8 },
        { text: "looking", start: 0.8, end: 1.1 },
        { text: "at", start: 1.1, end: 1.4 },
        { text: "the", start: 1.4, end: 1.7 },
        { text: "teacher", start: 1.7, end: 2.0 },
        { text: "and", start: 2.0, end: 2.3 },
        { text: "he", start: 2.3, end: 2.6 },
        { text: "is", start: 2.6, end: 2.9 },
        { text: "worried", start: 2.9, end: 3.2 },
        { text: "he", start: 3.2, end: 3.5 },
        { text: "won’t", start: 3.5, end: 3.8 },
        { text: "win.", start: 3.8, end: 4.1 },



      ]
    },
    {
      videoIndex: 2,
      start: 4.5, end: 14.0,
      words: [
        { text: "It", start: 4.7, end: 5.0 },
        { text: "was", start: 5.0, end: 5.3 },
        { text: "very", start: 5.3, end: 5.6 },
        { text: "close,", start: 5.6, end: 5.9 },
        { text: "but", start: 6.5, end: 6.8 },
        { text: "the", start: 6.8, end: 7.1 },
        { text: "person", start: 7.1, end: 7.4 },
        { text: "with", start: 7.4, end: 7.7 },
        { text: "the", start: 7.7, end: 8.0 },
        { text: "most", start: 8.0, end: 8.3 },
        { text: "votes", start: 8.3, end: 8.6 },
        { text: "is…’", start: 8.6, end: 9.9 },


        { text: "Derrick", start: 11.0, end: 11.3 },
        { text: "holds", start: 11.3, end: 11.6 },
        { text: "his", start: 11.6, end: 11.9 },
        { text: "breath.", start: 11.9, end: 12.2 },
        { text: "He", start: 12.2, end: 12.5 },
        { text: "really", start: 12.5, end: 12.8 },
        { text: "wants", start: 12.8, end: 13.1 },
        { text: "to", start: 13.1, end: 13.4 },
        { text: "win.", start: 13.4, end: 13.7 },



      ]
    },
    {
      videoIndex: 2,
      start: 18.0, end: 24.1,
      words: [

        { text: "Jasmine", start: 18.9, end: 19.2 },
        { text: "walks", start: 19.2, end: 19.5 },
        { text: "to", start: 19.5, end: 19.8 },
        { text: "the", start: 19.8, end: 20.1 },
        { text: "front", start: 20.1, end: 20.4 },
        { text: "of", start: 20.4, end: 20.7 },
        { text: "the", start: 20.7, end: 21.0 },
        { text: "class", start: 21.0, end: 21.3 },
        { text: "and", start: 21.3, end: 21.6 },
        { text: "shakes", start: 21.6, end: 21.9 },
        { text: "the", start: 21.9, end: 22.2 },
        { text: "teacher’s", start: 22.2, end: 22.5 },
        { text: "hand.", start: 22.5, end: 22.8 },
        { text: "She", start: 22.8, end: 23.1 },
        { text: "looks", start: 23.1, end: 23.4 },
        { text: "very", start: 23.4, end: 23.7 },
        { text: "happy.", start: 23.7, end: 24.0 },







      ]
    },

    {
      videoIndex: 3,
      start: 0, end: 10.3,
      words: [
        { text: "Derrick", start: 0.2, end: 0.5 },
        { text: "feels", start: 0.5, end: 0.8 },
        { text: "very", start: 0.8, end: 1.1 },
        { text: "upset.", start: 1.1, end: 1.4 },
        { text: "He", start: 2.9, end: 3.2 },
        { text: "feels", start: 3.2, end: 3.5 },
        { text: "his", start: 3.5, end: 3.8 },
        { text: "face", start: 3.8, end: 4.1 },
        { text: "turns", start: 4.1, end: 4.4 },
        { text: "red.", start: 4.4, end: 4.7 },
        { text: "But", start: 4.7, end: 5.0 },
        { text: "he", start: 5.0, end: 5.3 },
        { text: "doesn’t", start: 5.3, end: 5.6 },
        { text: "want", start: 5.6, end: 5.9 },
        { text: "to", start: 5.9, end: 6.2 },
        { text: "be", start: 6.2, end: 6.5 },
        { text: "a", start: 6.5, end: 6.8 },
        { text: "sore", start: 6.8, end: 7.1 },
        { text: "loser", start: 7.1, end: 7.4 },
        { text: "and", start: 7.4, end: 7.7 },
        { text: "throw", start: 7.7, end: 8.0 },
        { text: "a", start: 8.0, end: 8.3 },
        { text: "tantrum", start: 8.3, end: 8.6 },
        { text: "Derrick", start: 8.6, end: 8.9 },
        { text: "takes", start: 8.9, end: 9.2 },
        { text: "a", start: 9.2, end: 9.5 },
        { text: "deep", start: 9.5, end: 9.8 },
        { text: "breath.", start: 9.8, end: 10.1 },



      ]
    },
    {
      videoIndex: 3,
      start: 12.0, end: 16.3,
      words: [
        { text: "He", start: 12.8, end: 13.1 },
        { text: "knows", start: 13.1, end: 13.4 },
        { text: "he", start: 13.4, end: 13.7 },
        { text: "should", start: 13.7, end: 14.0 },
        { text: "show", start: 14.0, end: 14.3 },
        { text: "good", start: 14.3, end: 14.6 },
        { text: "sportsmanship", start: 14.6, end: 14.9 },
        { text: "and", start: 14.9, end: 15.2 },
        { text: "congratulate", start: 15.2, end: 15.5 },
        { text: "Jasmine.", start: 15.5, end: 15.8 },



      ]
    },
    {
      videoIndex: 3,
      start: 16.3, end: 20.5,
      words: [

        { text: "At", start: 18.2, end: 18.5 },
        { text: "playtime", start: 18.5, end: 18.8 },
        { text: "he", start: 18.8, end: 19.1 },
        { text: "found", start: 19.1, end: 19.4 },
        { text: "her", start: 19.4, end: 19.7 },
        { text: "on", start: 19.7, end: 20.0 },
        { text: "the", start: 20.0, end: 20.3 },
        { text: "playground,", start: 20.3, end: 20.6 },



      ]
    },
    {
      videoIndex: 4,
      start: 0, end: 2.4,
      words: [
        { text: "At", start: 0.2, end: 0.5 },
        { text: "the", start: 0.5, end: 0.8 },
        { text: "end", start: 0.8, end: 1.1 },
        { text: "of", start: 1.1, end: 1.4 },
        { text: "school,", start: 1.4, end: 1.7 },
        { text: "he", start: 1.7, end: 1.9 },
        { text: "says", start: 1.9, end: 2.1 },
        { text: "to", start: 2.1, end: 2.3 },
        { text: "her,", start: 2.3, end: 2.4 },



      ]


    },
    {
      videoIndex: 4,

      start: 15.0, end: 21.0,
      words: [
        { text: "Derrick", start: 15.7, end: 16.0 },
        { text: "feels", start: 16.0, end: 16.3 },
        { text: "good,", start: 16.3, end: 16.6 },
        { text: "and", start: 16.6, end: 16.9 },
        { text: "he", start: 16.9, end: 17.2 },
        { text: "enjoys", start: 17.2, end: 17.5 },
        { text: "helping", start: 17.5, end: 17.8 },
        { text: "Jasmine.", start: 17.8, end: 18.1 },
        { text: "Derrick", start: 19.0, end: 19.3 },
        { text: "is", start: 19.3, end: 19.6 },
        { text: "happy", start: 19.6, end: 19.9 },
        { text: "he", start: 19.9, end: 20.2 },
        { text: "helped", start: 20.2, end: 20.5 },
        { text: "Jasmine.", start: 20.5, end: 20.8 },



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

    const allCorrectWords = ["congratulations", "on", "winning", "class", "president"];

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
    if (selectedWords.length === 5) {
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
      "congratulations", "on", "winning", "class", "president"
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
                Highlight the sentence that shows Derrick demonstrating
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                good sportsmanship despite feeling upset.
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