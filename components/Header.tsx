
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center">
            <div className="flex justify-center mb-6">
                <div className="glass-effect p-4 rounded-2xl">
                    <img src="/newlogo.png" alt="QwizAI Logo" className="h-20 sm:h-24 w-auto drop-shadow-2xl" />
                </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 mb-2">
                QwizAI
            </h1>
            <p className="mt-2 text-lg text-cyan-100">
                Your visual assistant for MCQs and complex reasoning.
            </p>
        </header>
    );
};
