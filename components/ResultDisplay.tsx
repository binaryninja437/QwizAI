
import React from 'react';

interface ResultDisplayProps {
    isLoading: boolean;
    result: string | null;
    error: string | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, result, error }) => {
    if (isLoading) {
        return (
            <div className="mt-8 flex flex-col items-center justify-center text-center p-10 glass-effect rounded-2xl border-2 border-blue-400/50">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-500/30 h-16 w-16 mb-6 animate-spin" style={{ borderTopColor: '#3b82f6' }}></div>
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">Analyzing your image...</p>
                <p className="text-lg text-blue-200 mt-2">This may take a moment</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-8 p-6 glass-effect border-2 border-red-400/50 text-red-200 rounded-xl">
                <h3 className="font-bold text-xl mb-2 text-red-300">⚠️ An Error Occurred</h3>
                <p className="text-red-100">{error}</p>
            </div>
        );
    }

    if (result) {
        return (
            <div className="mt-8 p-8 glass-effect rounded-2xl shadow-2xl border-2 border-blue-400/60">
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 shimmer">✨ AI Analysis</h2>
                <div className="prose prose-invert prose-lg max-w-none text-blue-50 whitespace-pre-wrap leading-relaxed">
                    {result}
                </div>
            </div>
        );
    }

    return null;
};
