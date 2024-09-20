import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Import axios for API requests
import "./CountUpSection.css";

const CountUpSection = () => {
    const [counts, setCounts] = useState({
        beachesMonitored: 0,
        livesSaved: 0, // Now linked to the number of unique senders
        menuItems: 0,  // Reports received
    });
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const interval = 4000;

        // Function to animate the count-up effect
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

        // Intersection Observer to trigger animation when the section comes into view
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && !hasAnimated) {
                setHasAnimated(true);

                // Fetch the real data for beaches monitored
                axios.get('http://localhost:8000/beaches')
                    .then((res) => {
                        const numberOfBeaches = res.data.length; // Count the number of beaches
                        animateValue(0, numberOfBeaches, interval, "beachesMonitored");
                    })
                    .catch((err) => {
                        console.error("Error fetching the beaches data!", err);
                        animateValue(0, 50, interval, "beachesMonitored"); // Fallback value
                    });

                // Fetch the real data for reports received
                axios.get('http://localhost:8000/reports')
                    .then((res) => {
                        const numberOfReports = res.data.length; // Count the number of reports
                        animateValue(0, numberOfReports, interval, "menuItems");
                    })
                    .catch((err) => {
                        console.error("Error fetching the reports data!", err);
                        animateValue(0, 225, interval, "menuItems"); // Fallback value
                    });

                // Fetch unique senders and link to "Lives Saved"
                axios.get('http://localhost:8000/beachSpecific-chat/')
                    .then((res) => {
                        const messages = res.data.flatMap(beach => beach.messages);
                        const uniqueSenders = [...new Set(messages.map(msg => msg.sender))]; // Get unique senders
                        const livesSaved = uniqueSenders.length; // Use unique sender count for "Lives Saved"
                        animateValue(0, livesSaved, interval, "livesSaved");
                    })
                    .catch((err) => {
                        console.error("Error fetching the chat data!", err);
                        animateValue(0, 100, interval, "livesSaved"); // Fallback value
                    });
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
                <span className="num">{counts.livesSaved}+</span>
                <span className="c-text">Lives Saved</span>
            </div>

            <div className="c-container">
                <i className="fa-solid fa-list"></i>
                <span className="num">{counts.menuItems}+</span>
                <span className="c-text">Reports Received</span>
            </div>
        </div>
    );
};

export default CountUpSection;
