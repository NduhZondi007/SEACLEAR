import React, { useState, useEffect, useRef } from "react";
import "./CountUpSection.css";

const CountUpSection = () => {
    const [counts, setCounts] = useState({
        beachesMonitored: 0,
        livesSaved: 0,
        menuItems: 0,
    });
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const interval = 4000;

        const animateValue = (start, end, duration, key) => {
            let startValue = start;
            const increment = end / (duration / 100);
            const counter = setInterval(() => {
                startValue += increment;
                if (startValue >= end) {
                    startValue = end;
                    clearInterval(counter);
                }
                setCounts(prevCounts => ({
                    ...prevCounts,
                    [key]: Math.floor(startValue),
                }));
            }, 100);
        };

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && !hasAnimated) {
                setHasAnimated(true);
                animateValue(0, 50, interval, "beachesMonitored");
                animateValue(0, 100, interval, "livesSaved");
                animateValue(0, 225, interval, "menuItems");
            }
        }, { threshold: 0.1 });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [hasAnimated]);

    return (
        <div className="c-wrapper" ref={sectionRef}>
            <div className="c-container">
                <i className="fas fa-umbrella-beach aybo"></i>
                <span className="num">{counts.beachesMonitored}+</span>
                <span className="c-text">Beaches Monitored</span>
            </div>

            <div className="c-container">
                <i className="fa-solid fa-heart-pulse"></i>
                <span className="num">{counts.livesSaved}</span>
                <span className="c-text">Lives Saved</span>
            </div>

            <div className="c-container">
                <i className="fa-solid fa-list"></i>
                <span className="num">{counts.menuItems}</span>
                <span className="c-text">Reports Received</span>
            </div>
        </div>
    );
};

export default CountUpSection;
