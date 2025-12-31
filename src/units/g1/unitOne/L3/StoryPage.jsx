import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Subtitles, Maximize2, Minimize2, MessageSquareText } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';

import video1 from "./assets/1.mp4";
import video2 from "./assets/2.mp4";
import video3 from "./assets/3.mp4";
import video4 from "./assets/4.mp4";
import video5 from "./assets/5.mp4";
import video6 from "./assets/6.mp4";
import video7 from "./assets/7+8.mp4";


export const StoryPage = () => {
  const [showCaption, setShowCaption] = useState(true);
  const [extraBubble, setExtraBubble] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const [selectedWords, setSelectedWords] = useState([]);
  const navigate = useNavigate();
  const { unitId, lessonId } = useParams();
  const [showFeedback, setShowFeedback] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(0.75);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
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
          start: 0, end: 3.5,
          words: [
            { text: "We’re", start: 0.1, end: 0.4 },
            { text: "going", start: 0.4, end: 0.7 },
            { text: "to", start: 0.7, end: 0.9 },
            { text: "walk", start: 0.9, end: 1.2 },
            { text: "over", start: 1.2, end: 1.5 },
            { text: "to", start: 1.5, end: 1.7 },
            { text: "the", start: 1.7, end: 1.8 },
            { text: "auditorium", start: 1.8, end: 2.3 },
            { text: "now", start: 2.3, end: 2.5 },
            { text: "for", start: 2.5, end: 2.7 },
            { text: "the", start: 2.7, end: 2.8 },
            { text: "concert", start: 2.8, end: 3.2 }
          ]
        },
        {
          start: 12.4, end: 15.6,
          words: [
            { text: "I", start: 13.1, end: 13.3 },
            { text: "want", start: 13.3, end: 13.6 },
            { text: "you", start: 13.6, end: 13.8 },
            { text: "all", start: 13.8, end: 14.0 },
            { text: "to", start: 14.0, end: 14.2 },
            { text: "be", start: 14.2, end: 14.4 },
            { text: "on", start: 14.4, end: 14.6 },
            { text: "your", start: 14.6, end: 14.8 },
            { text: "best", start: 14.8, end: 15.1 },
            { text: "behaviour", start: 15.1, end: 15.6 }
          ]
        },
        {
          start: 16.0, end: 18.0,
          words: [
            { text: "There", start: 16.0, end: 16.3 },
            { text: "are", start: 16.3, end: 16.5 },
            { text: "enough", start: 16.5, end: 16.9 },
            { text: "seats", start: 16.9, end: 17.2 },
            { text: "for", start: 17.2, end: 17.4 },
            { text: "everyone", start: 17.4, end: 17.9 }
          ]
        },
        {
          start: 18.2, end: 21.5,
          words: [
            { text: "so", start: 18.5, end: 18.7 },
            { text: "no", start: 18.7, end: 18.9 },
            { text: "pushing", start: 18.9, end: 19.3 },
            { text: "or", start: 19.3, end: 19.5 },
            { text: "running", start: 19.5, end: 19.9 },
            { text: "when", start: 19.9, end: 20.1 },
            { text: "you’re", start: 20.1, end: 20.3 },
            { text: "in", start: 20.3, end: 20.5 },
            { text: "the", start: 20.5, end: 20.7 },
            { text: "auditorium.", start: 20.7, end: 21.2 }
          ]
        },
        {
          start: 21.8, end: 23.5,
          words: [
            { text: "Do", start: 22.0, end: 22.2 },
            { text: "you", start: 22.2, end: 22.4 },
            { text: "all", start: 22.4, end: 22.6 },
            { text: "understand", start: 22.6, end: 23.0 },
            { text: "me?", start: 23.0, end: 23.2 }
          ]
        },
        {
          start: 24.0, end: 26.0,
          words: [
            { text: "Yes", start: 25.0, end: 25.4 },
            { text: "Mrs", start: 25.4, end: 25.8 },
            { text: "Bell", start: 25.8, end: 26.3 }
          ]
        },
      ]
    },

    {
      url: video3,
      title: "Section 3",
      subtitles: [
        {
          start: 10.8, end: 12.9,
          words: [
            { text: "Ow!", start: 11.0, end: 12.3 },
          ]
        },
        {
          start: 18.5, end: 20.5,
          words: [
            { text: "Are", start: 18.8, end: 19.1 },
            { text: "you", start: 19.1, end: 19.4 },
            { text: "okay,", start: 19.4, end: 19.7 },
            { text: "Kylie?", start: 19.7, end: 20.1 }
          ]
        },
        {
          start: 20.8, end: 22.5,
          words: [
            { text: "Someone", start: 21.0, end: 21.4 },
            { text: "bumped", start: 21.4, end: 21.8 },
            { text: "me", start: 21.8, end: 22.1 }
          ]
        },
        {
          start: 22.6, end: 24.0,
          words: [
            { text: "But", start: 22.8, end: 23.1 },
            { text: "let’s", start: 23.1, end: 23.4 },
            { text: "hurry", start: 23.4, end: 23.7 }
          ]
        },
        {
          start: 24.0, end: 26.0,
          words: [
            { text: "we", start: 24.0, end: 24.2 },
            { text: "don’t", start: 24.2, end: 24.5 },
            { text: "want", start: 24.5, end: 24.8 },
            { text: "to be", start: 24.8, end: 25.1 },
            { text: "last", start: 25.1, end: 25.4 },
            { text: "in line.", start: 25.4, end: 25.8 },
          ]
        },
        {
          start: 34.9, end: 35.9,
          words: [
            { text: "Hurry", start: 35.0, end: 35.3 },
            { text: "up,", start: 35.3, end: 35.6 },
            { text: "Kylie", start: 35.6, end: 35.9 }
          ]
        },
      ]
    },

    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 16.0, end: 17.0,
          words: [
            { text: "Hey!’", start: 16.5, end: 17.0 },
          ]
        },
        {
          start: 17.5, end: 19.5,
          words: [
            { text: "You’re", start: 17.5, end: 17.8 },
            { text: "too", start: 17.8, end: 18.1 },
            { text: "slow,", start: 18.1, end: 18.4 },
            { text: "Kylie", start: 18.4, end: 18.7 }
          ]
        },

      ]
    },

    {
      url: video5,
      title: "Section 5",
      subtitles: [
        {
          start: 10.0, end: 17.3,
          words: [
            { text: "I", start: 11.8, end: 12.0 },
            { text: "felt", start: 12.0, end: 12.3 },
            { text: "so", start: 12.3, end: 12.6 },
            { text: "angry", start: 12.6, end: 12.9 },

            { text: "I", start: 13.4, end: 13.7 },
            { text: "almost", start: 13.7, end: 14.0 },
            { text: "pushed", start: 14.0, end: 14.3 },
            { text: "them,", start: 14.3, end: 14.6 },

            { text: "but", start: 15.0, end: 15.3 },
            { text: "I", start: 15.3, end: 15.6 },
            { text: "calmed", start: 15.6, end: 15.9 },
            { text: "myself", start: 15.9, end: 16.2 },
            { text: "before", start: 16.2, end: 16.5 },
            { text: "I", start: 16.5, end: 16.8 },
            { text: "did", start: 16.8, end: 17.1 },
            { text: "anything.", start: 17.1, end: 17.4 }
          ]
        },
        {
          start: 17.3, end: 20.0,
          words: [
            { text: "Kylie", start: 0.1, end: 0.4 },
            { text: "takes", start: 0.4, end: 0.7 },
            { text: "a", start: 0.7, end: 0.9 },
            { text: "few", start: 0.9, end: 1.2 },
            { text: "deep", start: 1.2, end: 1.5 },
            { text: "breaths.", start: 1.5, end: 1.9 }
          ]
        },

      ]
    },

    {
      url: video6,
      title: "Section 6",
      subtitles: [
        {
          start: 0, end: 1.5,
          words: [
            { text: "Good", start: 0.3, end: 0.6 },
            { text: "for", start: 0.6, end: 0.9 },
            { text: "you", start: 0.9, end: 1.2 }
          ]
        },
      ]
    },

    {
      url: video7,
      title: "Section 7",
      subtitles: [
        {
          start: 0.0, end: 3.0,
          words: [
            { text: "Look,", start: 0.3, end: 0.6 },
            { text: "there", start: 0.6, end: 0.9 },
            { text: "are", start: 0.9, end: 1.2 },
            { text: "still", start: 1.2, end: 1.5 },
            { text: "plenty", start: 1.5, end: 1.9 },
            { text: "of", start: 1.9, end: 2.1 },
            { text: "seats", start: 2.1, end: 2.4 },
            { text: "free", start: 2.4, end: 2.7 }

          ]
        },
        {
          start: 3.5, end: 5.9,
          words: [
            { text: "I’m", start: 3.8, end: 4.1 },
            { text: "so", start: 4.1, end: 4.3 },
            { text: "excited", start: 4.3, end: 4.7 },
            { text: "about", start: 4.7, end: 5.0 },
            { text: "the", start: 5.0, end: 5.2 },
            { text: "concert!", start: 5.2, end: 5.6 }
          ]
        },
        {
          start: 7.4, end: 9.0,
          words: [
            { text: "Me", start: 7.5, end: 8.3 },
            { text: "too!", start: 8.3, end: 8.8 }
          ]
        },
        {
          start: 14.3, end: 17.5,
          words: [
            { text: "There’s", start: 14.5, end: 14.8 },
            { text: "Sunita.", start: 14.8, end: 15.2 },
            { text: "Let’s", start: 15.2, end: 15.5 },
            { text: "go", start: 15.5, end: 15.7 },
            { text: "and", start: 15.7, end: 16.0 },
            { text: "sit", start: 16.0, end: 16.3 },
            { text: "with", start: 16.3, end: 16.6 },
            { text: "her", start: 16.6, end: 17.0 }
          ]
        },
      ]
    },




  ];

  const extraBubblesData = [
    {
      videoIndex: 1,
      start: 4.4,
      end: 7.0,
      words: [
        { text: "Mrs", start: 4.5, end: 4.8 },
        { text: "Bell", start: 4.8, end: 5.2 },
        { text: "announces", start: 5.2, end: 5.8 },
        { text: "to", start: 5.8, end: 6.0 },
        { text: "her", start: 6.0, end: 6.4 },
        { text: "class.", start: 6.4, end: 6.8 }
      ]
    },
    {
      videoIndex: 1,
      start: 7.0,
      end: 9.8,
      words: [
        { text: "Kylie", start: 7.1, end: 7.5 },
        { text: "and", start: 7.5, end: 7.8 },
        { text: "her", start: 7.8, end: 8.1 },
        { text: "friends", start: 8.1, end: 8.6 },
        { text: "are", start: 8.6, end: 9.0 },
        { text: "excited.", start: 9.0, end: 9.5 }
      ]
    },
    {
      videoIndex: 1,
      start: 7.0,
      end: 9.8,
      words: [
        { text: "Kylie", start: 7.1, end: 7.5 },
        { text: "and", start: 7.5, end: 7.8 },
        { text: "her", start: 7.8, end: 8.1 },
        { text: "friends", start: 8.1, end: 8.6 },
        { text: "are", start: 8.6, end: 9.0 },
        { text: "excited.", start: 9.0, end: 9.5 }
      ]
    },
    {
      videoIndex: 1,
      start: 10.0,
      end: 12.3,
      words: [
        { text: "They", start: 10.1, end: 10.4 },
        { text: "are", start: 10.4, end: 10.6 },
        { text: "looking", start: 10.6, end: 10.9 },
        { text: "forward", start: 10.9, end: 11.2 },
        { text: "to", start: 11.2, end: 11.4 },
        { text: "the", start: 11.4, end: 11.6 },
        { text: "concert.", start: 11.6, end: 12.0 }
      ]
    },

    {
      videoIndex: 2,
      start: 0.0,
      end: 3.3,
      words: [
        { text: "The", start: 0.1, end: 0.3 },
        { text: "students", start: 0.3, end: 0.7 },
        { text: "get", start: 0.7, end: 0.9 },
        { text: "up", start: 0.9, end: 1.0 },
        { text: "to", start: 1.0, end: 1.3 },
        { text: "leave", start: 1.3, end: 1.6 },
        { text: "the", start: 1.6, end: 1.9 },
        { text: "classroom", start: 1.9, end: 2.2 },
        { text: "and", start: 2.2, end: 2.5 },
        { text: "line", start: 2.5, end: 2.8 },
        { text: "up.", start: 2.8, end: 3.1 }
      ]
    },
    {
      videoIndex: 2,
      start: 3.3,
      end: 8.0,
      words: [
        { text: "Kylie", start: 3.5, end: 3.9 },
        { text: "is", start: 3.9, end: 4.2 },
        { text: "pushed", start: 4.2, end: 4.6 },
        { text: "against", start: 4.6, end: 5.0 },
        { text: "the", start: 5.0, end: 5.3 },
        { text: "bookshelf", start: 5.3, end: 5.8 },
        { text: "as", start: 5.8, end: 6.1 },
        { text: "some", start: 6.1, end: 6.4 },
        { text: "classmates", start: 6.4, end: 6.9 },
        { text: "hurry", start: 6.9, end: 7.3 },
        { text: "past her.", start: 7.3, end: 7.9 },
      ]
    },
    {
      videoIndex: 2,
      start: 13.5,
      end: 18.0,
      words: [
        { text: "She", start: 14.5, end: 14.8 },
        { text: "cries", start: 14.8, end: 15.2 },
        { text: "as", start: 15.2, end: 15.4 },
        { text: "she", start: 15.4, end: 15.7 },
        { text: "bumps", start: 15.7, end: 16.1 },
        { text: "her", start: 16.1, end: 16.4 },
        { text: "elbow", start: 16.4, end: 16.8 },
        { text: "on", start: 16.8, end: 17.1 },
        { text: "the", start: 17.1, end: 17.4 },
        { text: "bookshelf.", start: 17.4, end: 17.9 }
      ]
    },
    {
      videoIndex: 2,
      start: 26.3, end: 32.0,
      words: [
        { text: "Kylie", start: 26.5, end: 26.9 },
        { text: "and", start: 26.9, end: 27.2 },
        { text: "Stacy", start: 27.2, end: 27.6 },
        { text: "line up", start: 27.6, end: 28.0 },
        { text: "outside", start: 28.0, end: 28.4 },
        { text: "the classroom", start: 28.4, end: 28.8 },
        { text: "and when", start: 29.8, end: 30.0 },
        { text: "all", start: 30.0, end: 30.3 },
        { text: "the", start: 30.3, end: 30.6 },
        { text: "students", start: 30.6, end: 31.1 },
        { text: "are out", start: 31.1, end: 31.6 }
      ]
    },
    {
      videoIndex: 2,
      start: 32.0, end: 34.9,
      words: [
        { text: "Mrs.", start: 32.0, end: 32.3 },
        { text: "Bell", start: 32.3, end: 32.7 },
        { text: "leads", start: 32.7, end: 33.1 },
        { text: "them", start: 33.1, end: 33.4 },
        { text: "towards", start: 33.4, end: 33.9 },
        { text: "the", start: 33.9, end: 34.2 },
        { text: "auditorium.", start: 34.2, end: 34.8 }
      ]
    },
    {
      videoIndex: 2,
      start: 36.0, end: 38.5,
      words: [
        { text: "someone", start: 36.2, end: 36.6 },
        { text: "tells", start: 36.6, end: 36.9 },
        { text: "her", start: 36.9, end: 37.1 },
        { text: "as", start: 37.1, end: 37.3 },
        { text: "they", start: 37.3, end: 37.5 },
        { text: "bump", start: 37.5, end: 37.8 },
        { text: "into", start: 37.8, end: 38.1 },
        { text: "her.", start: 38.1, end: 38.4 }
      ]
    },
    {
      videoIndex: 2,
      start: 38.5, end: 43.5,
      words: [
        { text: "Kylie", start: 39.0, end: 39.4 },
        { text: "trips", start: 39.4, end: 39.7 },
        { text: "and", start: 39.7, end: 40.0 },
        { text: "is", start: 40.0, end: 40.2 },
        { text: "still", start: 40.2, end: 40.5 },
        { text: "rubbing", start: 40.5, end: 40.9 },
        { text: "her", start: 40.9, end: 41.1 },
        { text: "elbow", start: 41.1, end: 41.5 },
        { text: "as", start: 41.5, end: 41.7 },
        { text: "she", start: 41.7, end: 41.9 },
        { text: "tries", start: 41.9, end: 42.2 },
        { text: "to", start: 42.2, end: 42.4 },
        { text: "keep", start: 42.4, end: 42.7 },
        { text: "up.", start: 42.7, end: 43.0 }
      ]
    },

    {
      videoIndex: 3,
      start: 0.0, end: 4.5,
      words: [
        { text: "Kylie", start: 0.1, end: 0.5 },
        { text: "balls up", start: 0.5, end: 1.0 },
        { text: "her", start: 1.0, end: 1.3 },
        { text: "fists", start: 1.3, end: 1.7 },
        { text: "and", start: 2.3, end: 2.6 },
        { text: "knows", start: 2.6, end: 2.9 },
        { text: "that", start: 2.9, end: 3.2 },
        { text: "she", start: 3.2, end: 3.5 },
        { text: "is", start: 3.5, end: 3.8 },
        { text: "getting", start: 3.8, end: 4.1 },
        { text: "angry.", start: 4.1, end: 4.4 }
      ]
    },
    {
      videoIndex: 3,
      start: 5.0, end: 13.5,
      words: [
        { text: "The", start: 5.3, end: 5.6 },
        { text: "class", start: 5.6, end: 5.9 },
        { text: "is", start: 5.9, end: 6.2 },
        { text: "almost", start: 6.2, end: 6.5 },
        { text: "at", start: 6.5, end: 6.8 },
        { text: "the", start: 6.8, end: 7.1 },
        { text: "auditorium", start: 7.1, end: 7.4 },
        { text: "when", start: 7.8, end: 8.1 },
        { text: "two", start: 8.1, end: 8.4 },
        { text: "girls", start: 8.4, end: 8.7 },
        { text: "go", start: 8.7, end: 9.0 },
        { text: "around", start: 9.0, end: 9.3 },
        { text: "Kylie", start: 9.3, end: 9.6 },
        { text: "and", start: 9.9, end: 10.2 },
        { text: "get", start: 10.2, end: 10.5 },
        { text: "into", start: 10.5, end: 10.8 },
        { text: "the", start: 10.8, end: 11.1 },
        { text: "line", start: 11.1, end: 11.4 },
        { text: "in", start: 11.4, end: 11.7 },
        { text: "front", start: 11.7, end: 12.0 },
        { text: "of", start: 12.0, end: 12.3 },
        { text: "her", start: 12.3, end: 12.6 },
        { text: "and", start: 12.6, end: 12.9 },
        { text: "Stacy.", start: 12.9, end: 13.2 }
      ]
    },
    {
      videoIndex: 3,
      start: 18.8, end: 23.2,
      words: [
        { text: "they", start: 18.8, end: 19.2 },
        { text: "tell", start: 19.2, end: 19.6 },
        { text: "her", start: 19.6, end: 19.9 },
        { text: "and", start: 21.0, end: 21.3 },
        { text: "turn", start: 21.3, end: 21.6 },
        { text: "back", start: 21.6, end: 21.9 },
        { text: "to", start: 21.9, end: 22.2 },
        { text: "face", start: 22.2, end: 22.5 },
        { text: "the", start: 22.5, end: 22.8 },
        { text: "line.", start: 22.8, end: 23.1 }
      ]
    },
    {
      videoIndex: 3,
      start: 23.3, end: 26.8,
      words: [
        { text: "Kylie", start: 23.5, end: 23.8 },
        { text: "feels", start: 23.8, end: 24.1 },
        { text: "her", start: 24.1, end: 24.4 },
        { text: "face", start: 24.4, end: 24.7 },
        { text: "getting", start: 24.7, end: 25.0 },
        { text: "red", start: 25.0, end: 25.3 },
        { text: "as", start: 25.3, end: 25.6 },
        { text: "she", start: 25.6, end: 25.9 },
        { text: "gets", start: 25.9, end: 26.2 },
        { text: "angrier.", start: 26.2, end: 26.5 }
      ]
    },
    {
      videoIndex: 3,
      start: 26.9, end: 33.0,
      words: [
        { text: "Her", start: 27.0, end: 27.3 },
        { text: "elbow", start: 27.3, end: 27.6 },
        { text: "still", start: 27.6, end: 27.9 },
        { text: "hurts", start: 27.9, end: 28.2 },
        { text: "and", start: 28.2, end: 28.5 },
        { text: "now", start: 28.5, end: 28.8 },
        { text: "she’s", start: 28.8, end: 29.1 },
        { text: "almost", start: 29.1, end: 29.4 },
        { text: "at", start: 30.5, end: 30.8 },
        { text: "the", start: 30.8, end: 31.1 },
        { text: "back", start: 31.1, end: 31.4 },
        { text: "of", start: 31.4, end: 31.7 },
        { text: "the", start: 31.7, end: 32.0 },
        { text: "line.", start: 32.0, end: 32.3 }
      ]
    },

    {
      videoIndex: 4,
      start: 0, end: 2,
      words: [
        { text: "Kylie", start: 0.1, end: 0.4 },
        { text: "takes", start: 0.4, end: 0.7 },
        { text: "a", start: 0.7, end: 0.9 },
        { text: "few", start: 0.9, end: 1.2 },
        { text: "deep", start: 1.2, end: 1.5 },
        { text: "breaths.", start: 1.5, end: 1.9 }
      ]
    },
    {
      videoIndex: 4,
      start: 2.3, end: 6.0,
      words: [
        { text: "She", start: 2.5, end: 2.8 },
        { text: "knows", start: 2.8, end: 3.3 },
        { text: "her", start: 3.5, end: 3.8 },
        { text: "anger", start: 3.8, end: 4.2 },
        { text: "is", start: 4.2, end: 4.4 },
        { text: "almost", start: 4.4, end: 4.8 },
        { text: "at", start: 4.8, end: 5.0 },
        { text: "boiling", start: 5.0, end: 5.4 },
        { text: "point", start: 5.4, end: 5.8 }
      ]
    },
    {
      videoIndex: 4,
      start: 6.6, end: 9.5,
      words: [
        { text: "Kylie", start: 7.5, end: 7.8 },
        { text: "turns", start: 7.8, end: 8.1 },
        { text: "to", start: 8.1, end: 8.4 },
        { text: "Stacy", start: 8.4, end: 8.7 },
        { text: "and", start: 8.7, end: 9.0 },
        { text: "says", start: 9.0, end: 9.3 }
      ]
    },

    {
      videoIndex: 5,
      start: 1.9, end: 5.5,
      words: [
        { text: "Stacy", start: 2.3, end: 2.6 },
        { text: "tells", start: 2.6, end: 2.9 },
        { text: "her", start: 2.9, end: 3.2 },
        { text: "as", start: 3.2, end: 3.5 },
        { text: "they", start: 3.5, end: 3.8 },
        { text: "walk", start: 3.8, end: 4.1 },
        { text: "into", start: 4.1, end: 4.4 },
        { text: "the", start: 4.4, end: 4.7 },
        { text: "auditorium.", start: 4.7, end: 5.2 }
      ]
    },

    {
      videoIndex: 6,
      start: 9.5, end: 14.0,
      words: [
        { text: "Kylie", start: 10.0, end: 10.3 },
        { text: "replies,", start: 10.3, end: 10.7 },
        { text: "for", start: 10.7, end: 11.0 },
        { text: "getting", start: 11.0, end: 11.4 },
        { text: "about", start: 11.4, end: 11.7 },
        { text: "the", start: 11.7, end: 12.0 },
        { text: "girls", start: 12.0, end: 12.3 },
        { text: "who", start: 12.3, end: 12.6 },
        { text: "made", start: 12.6, end: 12.9 },
        { text: "her", start: 12.9, end: 13.2 },
        { text: "angry.", start: 13.2, end: 13.6 }
      ]
    },

    {
      videoIndex: 6,
      start: 17.9, end: 21.0,
      words: [
        { text: "Kylie", start: 18.0, end: 18.3 },
        { text: "is", start: 18.3, end: 18.5 },
        { text: "happy", start: 18.5, end: 18.9 },
        { text: "she", start: 18.9, end: 19.1 },
        { text: "did", start: 19.1, end: 19.3 },
        { text: "not", start: 19.3, end: 19.5 },
        { text: "reach", start: 19.5, end: 19.8 },
        { text: "her", start: 19.8, end: 20.0 },
        { text: "boiling", start: 20.0, end: 20.4 },
        { text: "point.", start: 20.4, end: 20.8 }
      ]
    },
  ];

  const cloudPositions = {

    0: [

    ],

    1: [
      { top: '15%', left: '3%' },
      { top: '15%', left: '15%' },
      { top: '15%', left: '15%' },
      { top: '15%', left: '10%' },
      { top: '15%', left: '15%' },
      { top: '15%', left: '15%' },
    ],

    2: [
      { top: '10%', right: '80%' },
      { top: '10%', left: '35%', isFlipped: true },
      { top: '10%', left: '45%' },
      { top: '10%', right: '50%', isFlipped: true },
      { top: '1%', left: '33%', isFlipped: true },
      { top: '1%', left: '35%' },
    ],

    3: [
      { bottom: '80%', left: '35%' },
      { top: '10%', left: '45%', isFlipped: true },
    ],

    4: [
      { top: '10%', left: '55%', isFlipped: true },
      { top: '10%', left: '55%', isFlipped: true }
    ],
    5: [
      { bottom: '80%', left: '28%', }
    ],
    6: [
      { bottom: '80%', left: '60%', transform: 'translateX(-50%)', isFlipped: true },
      { top: '10%', left: '60%', isFlipped: true },
      { top: '10%', left: '50%', isFlipped: true },
      { top: '10%', left: '60%', isFlipped: true },
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
  const handleWordClick = (word) => {
    const cleanWord = word.toLowerCase().replace(/[.,?!]/g, "");
    const allCorrectWords = [
      "kylie", "takes", "a", "few", "deep", "breaths"
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
  };
  const handleNext = () => {
    if (currentVideo === videos.length - 1) {
      navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
    } else {
      setCurrentVideo(prev => prev + 1);
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const selectedText = selection.toString().trim();
    if (!selectedText) return;

    const allCorrectWords = ["kylie", "takes", "a", "few", "deep", "breaths"];

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
            setShowBanner(false);
            setShowFeedback(false);
            handleNext(); 
          }, 2000);
        }

        return newWords;
      });
    }

    selection.removeAllRanges();
  };

  const togglePlay = () => {
    if (selectedWords.length === 6) {
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
            className="w-full aspect-video object-cover"
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
            <div className="instruction-banner show">
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                Highlight how Kylie manages her anger.
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