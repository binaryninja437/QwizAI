
import React from 'react';

interface ResultDisplayProps {
    isLoading: boolean;
    result: string | null;
    error: string | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, result, error }) => {
    if (isLoading) {
        return (
            <div className="mt-8 flex flex-col items-center justify-center text-center p-8 glass-effect rounded-2xl">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-purple-500/30 h-12 w-12 mb-4 animate-spin" style={{ borderTopColor: '#a855f7' }}></div>
                <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">The AI agent is analyzing the image...</p>
                <p className="text-sm text-gray-300">This may take a moment.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-8 p-6 glass-effect border border-red-400/50 text-red-200 rounded-lg">
                <h3 className="font-bold mb-2 text-red-300">An Error Occurred</h3>
                <p>{error}</p>
            </div>
        );
    }

    if (result) {
        return (
            <div className="mt-8 p-6 glass-effect rounded-lg shadow-xl border-2 border-purple-500/40">
                <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300 shimmer">AI Analysis</h2>
                <div className="prose prose-invert max-w-none text-gray-100 whitespace-pre-wrap leading-relaxed">
                    {result}
                </div>
            </div>
        );
    }

    return null;
};
