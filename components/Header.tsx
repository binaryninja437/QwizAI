
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center fade-in">
            <div className="mb-8">
                <div className="inline-block bg-white p-4 rounded-3xl shadow-2xl">
                    <img
                        src="/newlogo.png"
                        alt="QwizAI"
                        className="h-28 w-auto mx-auto"
                    />
                </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300 shimmer">
                    QwizAI
                </span>
            </h1>
            <p className="text-lg md:text-xl text-purple-100 font-light">
                Your Smart AI Quiz Assistant
            </p>
        </header>
    );
};
