import React from 'react';
import '../styles/AboutScreen.css';
import { FaUniversity, FaUsers, FaCalendarAlt, FaBell, FaClipboardList } from 'react-icons/fa';

const AboutScreen = () => {
    return (
        <div className="about-page">
            <div className="about-container">
                <div className="about-header">
                    <h1>Welcome to Society Connect</h1>
                    <p>Connecting university students to societies and events!</p>
                </div>

                <div className="about-content">
                    <p>
                        <FaUniversity className="icon" /> <strong>Society Connect</strong> is the ultimate app designed to bring university students closer to their campus societies.
                    </p>

                    <ul>
                        <li><FaUsers className="icon" /> Join your favorite societies with just a click.</li>
                        <li><FaCalendarAlt className="icon" /> Stay updated with all the live events happening around the campus.</li>
                        <li><FaBell className="icon" /> Receive timely notifications for society announcements.</li>
                        <li><FaClipboardList className="icon" /> No more checking multiple groups or emails for open registrations!</li>
                    </ul>

                    <p>
                        Society Connect is your one-stop platform to manage your university society activities effortlessly.
                        All the information you need is in one place, making your university life simpler and more connected.
                    </p>
                </div>

                <div className="about-footer">
                    <p>🎉 Join the Society Connect community today and make your university experience better! 🎉</p>
                </div>
            </div>
        </div>
    );
};

export default AboutScreen;
