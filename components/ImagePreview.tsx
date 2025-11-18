
import React from 'react';

interface ImagePreviewProps {
    imageSrc: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ imageSrc }) => {
    return (
        <div className="w-full max-w-md mx-auto glass-effect p-4 rounded-2xl shadow-2xl border-2 border-blue-400/60">
            <img
                src={imageSrc}
                alt="Selected"
                className="w-full h-auto object-contain rounded-xl max-h-96"
            />
        </div>
    );
};
