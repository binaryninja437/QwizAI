
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center fade-in">
            <div className="mb-8">
                <div className="inline-block glass-effect p-6 rounded-3xl shadow-2xl border-2 border-blue-400/60 hover:border-blue-300/80 transition-all duration-300">
                    <img
                        src="/newlogo.png"
                        alt="QwizAI"
                        className="h-32 w-auto mx-auto drop-shadow-2xl"
                    />
                </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 shimmer">
                    QwizAI
                </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 font-light">
                Your Smart AI Quiz Assistant
            </p>
        </header>
    );
};
