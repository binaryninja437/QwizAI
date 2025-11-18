
import React from 'react';

interface ImagePreviewProps {
    imageSrc: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ imageSrc }) => {
    return (
        <div className="w-full max-w-md mx-auto glass-effect p-3 rounded-lg shadow-xl border-2 border-cyan-500/30">
            <img
                src={imageSrc}
                alt="Selected"
                className="w-full h-auto object-contain rounded-md max-h-96"
            />
        </div>
    );
};
