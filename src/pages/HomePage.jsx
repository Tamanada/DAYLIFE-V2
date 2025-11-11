// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { Star, RefreshCcw } from "lucide-react";
import "../pages/styles.css";

export function HomePage() {
  const [daysLived, setDaysLived] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);
  const [stars, setStars] = useState(0);
  const [quote, setQuote] = useState("Loading inspiration...");
  const totalDays = 30000;

  useEffect(() => {
    // Récupération du profil sauvegardé
    const profile = JSON.parse(localStorage.getItem("daylifeProfile") || "{}");
    const dob = profile.dob ? new Date(profile.dob) : new Date(1990, 0, 1);
    const birthMs = dob.getTime();
    const todayMs = Date.now();
    const lived = Math.floor((todayMs - birthMs) / (1000 * 60 * 60 * 24));
    const left = Math.max(0, totalDays - lived);
    setDaysLived(lived);
    setDaysLeft(left);

    // Récupération des étoiles
    const storedStars = parseInt(localStorage.getItem("daylifeStars") || "0", 10);
    setStars(storedStars);

    // Citation du jour
    const inspirations = [
      "Every full moon reminds me that cycles are part of growth.",
      "Today I realized that peace begins with presence.",
      "Sometimes resting is the most productive thing you can do.",
      "Every day is a chance to make a dream real.",
      "Your light matters, even on quiet days.",
      "The moon doesn’t rush — and yet, it always shines.",
    ];
    const todayIndex = new Date().getDate() % inspirations.length;
    setQuote(inspirations[todayIndex]);
  }, []);

  const addStar = () => {
    const newStars = stars + 1;
    setStars(newStars);
    localStorage.setItem("daylifeStars", newStars);
  };

  const percentage = Math.min(100, (daysLived / totalDays) * 100);

  return (
    <div className="page home-page">
      <h1 className="page-title" data-i18n="home.title">
        🌕 How many days did you arrive on Earth?
      </h1>

      <div className="life-card">
        <div className="life-stats">
          <div>
            <span className="label" data-i18n="home.lived">Days lived</span>
            <div className="value">{daysLived.toLocaleString()}</div>
          </div>
          <div>
            <span className="label" data-i18n="home.remaining">Days remaining</span>
            <div className="value">{daysLeft.toLocaleString()}</div>
          </div>
        </div>

        <div className="progress-wrapper">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${percentage}%` }}
            ></div>
            <div className="progress-halo"></div>
          </div>
        </div>

        <p className="caption" data-i18n="home.estimatedEnd">
          Estimated end of your 30,000 days:{" "}
          <b>{new Date(Date.now() + daysLeft * 86400000).toLocaleDateString()}</b>
        </p>
      </div>

      <div className="stars-display">
        <Star size={20} color="#facc15" />
        <span>{stars}</span>
      </div>

      <blockquote className="quote-box">
        <p>{quote}</p>
        <button className="btn-refresh" onClick={addStar}>
          <RefreshCcw size={16} />
          <span data-i18n="home.newInspiration">New inspiration</span>
        </button>
      </blockquote>
    </div>
  );
}
