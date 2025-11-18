
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 shimmer">
                    QwizAI
                </span>
            </h1>
            <p className="text-lg md:text-xl text-cyan-100 font-light">
                Your Smart AI Quiz Assistant
            </p>
        </header>
    );
};
