import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Subtitles, Maximize2, Minimize2, MessageSquareText } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';
import ValidationAlert from '../../shared/ValidationAlert';

import video1 from "./assets/1.mp4";
import video2 from "./assets/2.mp4";
import video3 from "./assets/3.mp4";
import video4 from "./assets/4-1.mp4";
import video5 from "./assets/4-2.mp4";
import video6 from "./assets/4-3.mp4";


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
          start: 13.0, end: 15.0,
          words: [
            { text: "Which", start: 13.1, end: 13.4 },
            { text: "is", start: 13.4, end: 13.6 },
            { text: "your", start: 13.6, end: 13.9 },
            { text: "favourite", start: 13.9, end: 14.2 },
            { text: "game,", start: 14.2, end: 14.5 },
            { text: "Peter?", start: 14.5, end: 14.8 },
          ]
        },
        {
          start: 23.0, end: 26.5,
          words: [
            { text: "I", start: 23.0, end: 23.3 },
            { text: "don’t", start: 23.3, end: 23.7 },
            { text: "play", start: 23.7, end: 24.0 },
            { text: "video", start: 24.0, end: 24.4 },
            { text: "games,", start: 24.4, end: 24.7 },
            { text: "I", start: 24.7, end: 24.9 },
            { text: "don’t", start: 24.9, end: 25.3 },
            { text: "like", start: 25.3, end: 25.6 },
            { text: "them.", start: 25.6, end: 26.0 },
          ]
        },
      ]
    },
    {
      url: video3,
      title: "Section 3",
      subtitles: [
        {
          start: 0, end: 3.0,
          words: [
            { text: "Wow!", start: 0.0, end: 0.8 },
            { text: "Really?", start: 0.8, end: 1.6 },
            { text: "Why?", start: 1.6, end: 2.4 }
          ]
        },

        {
          start: 5.3, end: 8.5,
          words: [
            { text: "What", start: 5.5, end: 5.9 },
            { text: "do", start: 5.9, end: 6.2 },
            { text: "you", start: 6.2, end: 6.5 },
            { text: "do", start: 6.5, end: 6.8 },
            { text: "for", start: 6.8, end: 7.1 },
            { text: "fun", start: 7.1, end: 7.4 },
            { text: "at", start: 7.4, end: 7.6 },
            { text: "home?", start: 7.6, end: 7.9 },
          ]
        },

        {
          start: 9.0, end: 10.5,
          words: [
            { text: "Lots", start: 9.5, end: 9.7 },
            { text: "of", start: 9.7, end: 9.9 },
            { text: "things,’", start: 9.9, end: 10.2 },
          ]
        },

        {
          start: 11.0, end: 14.5,
          words: [
            { text: "I", start: 11.5, end: 11.8 },
            { text: "enjoy", start: 11.8, end: 12.1 },
            { text: "building", start: 12.1, end: 12.5 },
            { text: "toy", start: 12.5, end: 12.8 },
            { text: "aeroplanes", start: 12.8, end: 13.1 },
            { text: "with", start: 13.1, end: 13.3 },
            { text: "my", start: 13.3, end: 13.5 },
            { text: "grandfather.", start: 13.5, end: 14.3 },
          ]
        },

        {
          start: 15.0, end: 16.5,
          words: [
            { text: "Do", start: 15.5, end: 15.8 },
            { text: "they", start: 15.8, end: 16.1 },
            { text: "fly?", start: 16.1, end: 16.5 }
          ]
        },

        {
          start: 21.0, end: 22.0,
          words: [
            { text: "Sounds", start: 21.0, end: 21.4 },
            { text: "boring", start: 21.4, end: 21.8 }
          ]
        },

        {
          start: 22.3, end: 25.5,
          words: [
            { text: "Hey,", start: 22.5, end: 23.0 },
            { text: "has", start: 23.2, end: 23.5 },
            { text: "anyone", start: 23.5, end: 23.8 },
            { text: "played", start: 23.8, end: 24.1 },
            { text: "that", start: 24.1, end: 24.3 },
            { text: "new", start: 24.3, end: 24.5 },
            { text: "spaceship", start: 24.5, end: 24.9 },
            { text: "game?", start: 24.9, end: 25.1 }
          ]
        },

      ]
    },
    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 0.1, end: 1.9,
          words: [
            { text: "I", start: 0.1, end: 0.4 },
            { text: "can’t", start: 0.4, end: 0.7 },
            { text: "believe", start: 0.7, end: 1.0 },
            { text: "you", start: 1.0, end: 1.3 },
            { text: "build", start: 1.3, end: 1.6 },
            { text: "planes", start: 1.6, end: 1.9 }
          ]
        },

        {
          start: 2.5, end: 3.4,
          words: [
            { text: "Is", start: 2.5, end: 2.8 },
            { text: "it", start: 2.8, end: 3.1 },
            { text: "hard?", start: 3.1, end: 3.4 }
          ]
        },

        {
          start: 4.0, end: 6.5,
          words: [
            { text: "Some", start: 4.0, end: 4.3 },
            { text: "of", start: 4.3, end: 4.6 },
            { text: "the", start: 4.6, end: 4.9 },
            { text: "small", start: 4.9, end: 5.2 },
            { text: "pieces", start: 5.2, end: 5.5 },
            { text: "are", start: 5.5, end: 5.8 },
            { text: "tricky", start: 5.8, end: 6.3 }
          ]
        },

        {
          start: 6.8, end: 11.0,
          words: [
            { text: "I", start: 7.0, end: 7.3 },
            { text: "have", start: 7.3, end: 7.6 },
            { text: "a", start: 7.6, end: 7.8 },
            { text: "steady", start: 7.8, end: 8.3 },
            { text: "hand", start: 8.3, end: 8.5 },
            { text: "and", start: 8.5, end: 8.8 },
            { text: "keep", start: 8.8, end: 9.1 },
            { text: "trying", start: 9.1, end: 9.4 },
            { text: "until", start: 9.4, end: 9.7 },
            { text: "I", start: 9.7, end: 10.0 },
            { text: "finish", start: 10.0, end: 10.4 },
            { text: "them", start: 10.4, end: 10.8 }
          ]
        },

        {
          start: 11.5, end: 14.8,
          words: [
            { text: "My", start: 11.5, end: 11.8 },
            { text: "grandfather", start: 11.8, end: 12.1 },
            { text: "helps", start: 12.1, end: 12.4 },
            { text: "me", start: 12.4, end: 12.7 },
            { text: "with", start: 12.7, end: 13.0 },
            { text: "some", start: 13.0, end: 13.3 },
            { text: "of", start: 13.3, end: 13.6 },
            { text: "the", start: 13.6, end: 13.9 },
            { text: "trickier", start: 13.9, end: 14.2 },
            { text: "kits.", start: 14.2, end: 14.5 }
          ]
        },

        {
          start: 15.5, end: 19.8,
          words: [
            { text: "He", start: 15.5, end: 15.8 },
            { text: "can", start: 15.8, end: 16.1 },
            { text: "even", start: 16.1, end: 16.4 },
            { text: "design", start: 16.4, end: 16.7 },
            { text: "and", start: 16.7, end: 17.0 },
            { text: "make", start: 17.0, end: 17.3 },
            { text: "his", start: 17.3, end: 17.6 },
            { text: "own", start: 17.6, end: 17.9 },
            { text: "planes", start: 17.9, end: 18.3 }
          ]
        },

        {
          start: 20.0, end: 24.2,
          words: [
            { text: "That", start: 20.0, end: 20.3 },
            { text: "sounds", start: 20.3, end: 20.7 },
            { text: "amazing", start: 20.7, end: 21.0 },
            { text: "I’d", start: 21.8, end: 22.1 },
            { text: "love", start: 22.1, end: 22.4 },
            { text: "to", start: 22.4, end: 22.7 },
            { text: "try", start: 22.7, end: 23.0 },
            { text: "something", start: 23.0, end: 23.3 },
            { text: "like", start: 23.3, end: 23.7 },
            { text: "that", start: 23.7, end: 24.4 }
          ]
        },
        {
          start: 24.2, end: 27,
          words: [
            { text: "I", start: 0.1, end: 0.4 },
            { text: "can’t", start: 0.4, end: 0.7 },
            { text: "believe", start: 0.7, end: 1.0 },
            { text: "you", start: 1.0, end: 1.3 },
            { text: "build", start: 1.3, end: 1.6 },
            { text: "planes", start: 1.6, end: 1.9 },
            { text: "Is", start: 2.5, end: 2.8 },
            { text: "it", start: 2.8, end: 3.1 },
            { text: "hard?", start: 3.1, end: 3.4 }
          ]
        },

      ]
    },
    {
      url: video5,
      title: "Section 5",
      subtitles: [

        {
          start: 0, end: 6.0,
          words: [
            { text: "You", start: 0.1, end: 0.4 },
            { text: "could", start: 0.4, end: 0.7 },
            { text: "come", start: 0.7, end: 1.0 },
            { text: "over", start: 1.0, end: 1.3 },
            { text: "to", start: 1.3, end: 1.6 },
            { text: "my", start: 1.6, end: 1.9 },
            { text: "house", start: 1.9, end: 2.2 },

            { text: "one", start: 2.2, end: 2.5 },
            { text: "day", start: 2.5, end: 2.7 },
            { text: "and", start: 2.9, end: 3.1 },
            { text: "build", start: 3.1, end: 3.4 },
            { text: "one", start: 3.4, end: 3.7 },
            { text: "together", start: 3.7, end: 4.0 },
            { text: "with", start: 4.0, end: 4.3 },

            { text: "my", start: 4.3, end: 4.6 },
            { text: "grandfather", start: 4.6, end: 4.9 },
            { text: "and", start: 4.9, end: 5.2 },
            { text: "I", start: 5.2, end: 5.5 },

          ]
        },

        {
          start: 6.0, end: 10.0,
          words: [
            { text: "It", start: 6.5, end: 6.8 },
            { text: "would", start: 6.8, end: 7.1 },
            { text: "be", start: 7.1, end: 7.4 },
            { text: "good", start: 7.4, end: 7.7 },
            { text: "to", start: 7.7, end: 8.0 },
            { text: "have", start: 8.0, end: 8.3 },
            { text: "an", start: 8.3, end: 8.6 },
            { text: "extra", start: 8.6, end: 8.9 },
            { text: "pair", start: 8.9, end: 9.2 },
            { text: "of", start: 9.2, end: 9.5 },
            { text: "hands.", start: 9.5, end: 9.8 },
          ]
        },

        {
          start: 10.0, end: 11.5,
          words: [
            { text: "Really?", start: 10.5, end: 11.0 },
          ]
        },

        {
          start: 11.6, end: 14.0,
          words: [
            { text: "That", start: 11.8, end: 12.1 },
            { text: "would", start: 12.1, end: 12.4 },
            { text: "be", start: 12.4, end: 12.6 },
            { text: "great.", start: 12.6, end: 13.0 },
          ]
        },
      ]
    },
    {
      url: video6,
      title: "Section 6",
      subtitles: [

        {
          start: 0, end: 5.6,
          words: [
            { text: "I", start: 0.1, end: 0.3 },
            { text: "would", start: 0.3, end: 0.7 },
            { text: "like", start: 0.7, end: 1.0 },
            { text: "to", start: 1.0, end: 1.2 },
            { text: "see", start: 1.2, end: 1.5 },
            { text: "if", start: 1.5, end: 1.7 },
            { text: "I", start: 1.7, end: 1.9 },
            { text: "would", start: 1.9, end: 2.1 },
            { text: "be", start: 2.1, end: 2.4 },
            { text: "good", start: 2.4, end: 2.8 },
            { text: "at it", start: 2.8, end: 3.1 },

            { text: "since", start: 3.4, end: 3.7 },
            { text: "I’m", start: 3.7, end: 4.0 },
            { text: "good", start: 4.0, end: 4.3 },
            { text: "at", start: 4.3, end: 4.6 },
            { text: "putting", start: 4.6, end: 4.9 },
            { text: "puzzles", start: 4.9, end: 5.2 },
            { text: "together.", start: 5.2, end: 5.5 },
          ]
        },

        {
          start: 5.7, end: 7.0,
          words: [
            { text: "That", start: 6.0, end: 6.3 },
            { text: "sounds", start: 6.3, end: 6.6 },
            { text: "awesome!", start: 6.6, end: 6.9 },
          ]
        },
      ]
    },
  ];

  const extraBubblesData = [
    {
      videoIndex: 1,
      start: 0,
      end: 4.4,
      words: [
        { text: "It", start: 0.0, end: 0.3 },
        { text: "is", start: 0.3, end: 0.6 },
        { text: "raining", start: 0.6, end: 0.9 },
        { text: "and", start: 0.9, end: 1.2 },
        { text: "a", start: 1.2, end: 1.5 },
        { text: "group", start: 1.5, end: 1.8 },
        { text: "of", start: 1.8, end: 2.1 },
        { text: "boys", start: 2.1, end: 2.4 },
        { text: "sit", start: 2.4, end: 2.7 },
        { text: "inside,", start: 2.7, end: 3.0 },
        { text: "working", start: 3.0, end: 3.3 },
        { text: "on", start: 3.3, end: 3.6 },
        { text: "a", start: 3.6, end: 3.9 },
        { text: "puzzle.", start: 3.9, end: 4.2 },
      ]
    },
    {
      videoIndex: 1,
      start: 5.0,
      end: 11.5,
      words: [
        { text: "They", start: 5.0, end: 5.3 },
        { text: "talk", start: 5.3, end: 5.6 },
        { text: "about", start: 5.6, end: 5.9 },
        { text: "video", start: 5.9, end: 6.2 },
        { text: "games", start: 6.2, end: 6.5 },
        { text: "and", start: 7.0, end: 7.3 },
        { text: "the", start: 7.3, end: 7.6 },
        { text: "boys", start: 7.6, end: 7.9 },
        { text: "tell", start: 7.9, end: 8.2 },
        { text: "about", start: 8.2, end: 8.5 },
        { text: "their", start: 8.5, end: 8.8 },
        { text: "favourite", start: 8.8, end: 9.1 },
        { text: "games", start: 9.1, end: 9.4 },
        { text: "and", start: 10.0, end: 10.3 },
        { text: "their", start: 10.3, end: 10.6 },
        { text: "highest", start: 10.6, end: 10.9 },
        { text: "scores.", start: 10.9, end: 11.2 },
      ]
    },
    {
      videoIndex: 1,
      start: 17.0,
      end: 19.3,
      words: [
        { text: "Noticing", start: 17.5, end: 17.9 },
        { text: "he", start: 17.9, end: 18.1 },
        { text: "has", start: 18.1, end: 18.3 },
        { text: "been", start: 18.3, end: 18.5 },
        { text: "very", start: 18.5, end: 18.8 },
        { text: "quiet.", start: 18.8, end: 19.0 },
      ]
    },

    {
      videoIndex: 2,
      start: 3.5, end: 5.2,
      words: [
        { text: "The", start: 3.5, end: 3.7 },
        { text: "other", start: 3.7, end: 4.0 },
        { text: "boys", start: 4.0, end: 4.2 },
        { text: "asked", start: 4.2, end: 4.5 },
        { text: "in", start: 4.5, end: 4.7 },
        { text: "amazement", start: 4.7, end: 5.0 },
      ]
    },
    {
      videoIndex: 2,
      start: 18.0, end: 20.0,
      words: [
        { text: "but", start: 18.0, end: 18.3 },
        { text: "Peter", start: 18.3, end: 18.6 },
        { text: "shakes", start: 18.6, end: 18.9 },
        { text: "his", start: 18.9, end: 19.2 },
        { text: "head.", start: 19.2, end: 19.5 }
      ]
    },
    {
      videoIndex: 2,
      start: 25.9, end: 30.5,
      words: [
        { text: "The", start: 26.0, end: 26.3 },
        { text: "conversation", start: 26.3, end: 26.8 },
        { text: "goes", start: 26.8, end: 27.1 },
        { text: "back", start: 27.1, end: 27.4 },
        { text: "to", start: 27.4, end: 27.8 },
        { text: "video", start: 27.8, end: 28.2 },
        { text: "games", start: 28.2, end: 28.6 },
        { text: "and", start: 28.6, end: 28.8 },
        { text: "Peter", start: 28.8, end: 29.1 },
        { text: "returns", start: 29.1, end: 29.4 },
        { text: "to", start: 29.4, end: 29.6 },
        { text: "his", start: 29.6, end: 29.9 },
        { text: "puzzle.", start: 29.9, end: 30.2 }
      ]
    },
    {
      videoIndex: 2,
      start: 30.5, end: 34.0,
      words: [
        { text: "Jonah", start: 31.0, end: 31.3 },
        { text: "looks", start: 31.3, end: 31.6 },
        { text: "at", start: 31.6, end: 31.8 },
        { text: "Peter", start: 31.8, end: 32.0 },
        { text: "and", start: 32.0, end: 32.3 },
        { text: "picks", start: 32.3, end: 32.6 },
        { text: "up", start: 32.6, end: 32.8 },
        { text: "a", start: 32.8, end: 33.0 },
        { text: "puzzle", start: 33.0, end: 33.3 },
        { text: "piece.", start: 33.3, end: 33.6 }
      ]
    },

    {
      videoIndex: 5,
      start: 7.0, end: 10.8,
      words: [
        { text: "Jonah", start: 7.5, end: 7.8 },
        { text: "says", start: 7.8, end: 8.1 },
        { text: "and", start: 8.1, end: 8.4 },
        { text: "the", start: 8.4, end: 8.7 },
        { text: "two", start: 8.7, end: 9.0 },
        { text: "boys", start: 9.0, end: 9.3 },
        { text: "smile", start: 9.3, end: 9.6 },
        { text: "at", start: 9.6, end: 9.9 },
        { text: "each", start: 9.9, end: 10.2 },
        { text: "other.", start: 10.2, end: 10.5 },
      ]
    },
    {
      videoIndex: 5,
      start: 11.0, end: 17.5,
      words: [
        { text: "Jonah", start: 11.3, end: 11.6 },
        { text: "feels", start: 11.6, end: 11.9 },
        { text: "good", start: 11.9, end: 12.2 },
        { text: "that", start: 12.2, end: 12.5 },
        { text: "he", start: 12.5, end: 12.8 },
        { text: "talked", start: 12.8, end: 13.1 },
        { text: "to", start: 13.1, end: 13.4 },
        { text: "Peter", start: 13.4, end: 13.7 },
        { text: "and", start: 13.7, end: 14.0 },
        { text: "looks", start: 14.0, end: 14.3 },
        { text: "forward", start: 14.3, end: 14.6 },
        { text: "to", start: 14.6, end: 14.9 },
        { text: "getting", start: 14.9, end: 15.2 },
        { text: "to", start: 15.2, end: 15.5 },
        { text: "know", start: 15.5, end: 15.8 },
        { text: "his", start: 15.8, end: 16.1 },
        { text: "new", start: 16.1, end: 16.4 },
        { text: "friend.", start: 16.4, end: 16.7 }
      ]
    },
  ];

  const cloudPositions = {
    0: [
    ],
    1: [
      { top: '20%', left: '20%' },
      { top: '20%', left: '35%', isFlipped: true },
    ],
    2: [
      { top: '10%', right: '45%', left: 'auto', isFlipped: true },
      { top: '10%', right: '40%', isFlipped: true },
      { top: '10%', right: '50%', left: 'auto' },
      { top: '10%', right: '80%', left: 'auto' },
      { top: '10%', left: '80%', isFlipped: true },
      { top: '10%', right: '80%', left: 'auto' },
      { top: '10%', right: '65%', left: 'auto' },
    ],
    3: [
      { bottom: '75%', left: '50%', transform: 'translateX(-50%)' },
      { top: '20%', left: '40%' },
      { top: '10%', left: '75%', isFlipped: true },
      { top: '10%', left: '75%', isFlipped: true },
      { top: '10%', left: '70%', isFlipped: true },
      { top: '10%', left: '75%', isFlipped: true },
      { top: '10%', left: '20%' },
      { top: '10%', left: '20%' },
    ],
    4: [
      { top: '10%', left: '15%' },
      { top: '20%', left: '20%' },
      { top: '10%', left: '65%', isFlipped: true },
      { bottom: '80%', left: '65%', isFlipped: true },
      { bottom: '80%', left: '40%' }
    ],
    5: [
      { top: '10%', left: '60%', isFlipped: true },
      { top: '20%', left: '20%' },
    ]
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

 
  const handleWordClick = (word) => {
    const cleanWord = word.toLowerCase().replace(/[.,?!]/g, "");
    const allCorrectWords = [
      "i", "can't", "believe", "you", "build",
      "planes", "is", "it", "hard"
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
          handleNext();
          setShowBanner(false);
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


    const allCorrectWords = ["i", "can’t", "believe", "you", "build", "planes", "is", "it", "hard"];

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

        return newWords;
      });
    }

    selection.removeAllRanges();
  };
  const togglePlay = () => {
    if (selectedWords.length === 9) {
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
                Highlight the part where Jonah shows interest
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                in building planes. What does he say to Peter.
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