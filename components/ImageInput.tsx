
import React, { useRef } from 'react';
import { UploadIcon, CameraIcon } from './icons/Icons';

interface ImageInputProps {
    onImageSelect: (imageData: string, mimeType: string) => void;
    onOpenCamera: () => void;
}

const fileToDataUrl = (file: File): Promise<{ data: string, mimeType: string }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ data: reader.result as string, mimeType: file.type });
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const ImageInput: React.FC<ImageInputProps> = ({ onImageSelect, onOpenCamera }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const { data, mimeType } = await fileToDataUrl(file);
                onImageSelect(data, mimeType);
            } catch (error) {
                console.error("Error reading file:", error);
                alert("Failed to read the image file. Please try again.");
            }
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="w-full p-8 border-2 border-dashed rounded-2xl glass-effect flex flex-col items-center justify-center text-center">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
            <div className="space-y-6">
                 <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500">Provide an Image</h2>
                 <p className="text-blue-100 text-lg">Upload a file or use your camera to get started.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={handleUploadClick}
                        className="glow-button flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all transform hover:scale-105"
                    >
                        <UploadIcon />
                        Upload Image
                    </button>
                    <button
                        onClick={onOpenCamera}
                        className="glow-button flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all transform hover:scale-105"
                    >
                        <CameraIcon />
                        Use Camera
                    </button>
                </div>
            </div>
        </div>
    );
};
