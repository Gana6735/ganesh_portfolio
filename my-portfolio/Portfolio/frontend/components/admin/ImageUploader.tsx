"use client";

import Image from 'next/image';
import React, { useState, useRef, useEffect } from "react";

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export const ImageUploader = ({ label, value, onChange }: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value && value !== preview) {
      setPreview(value);
    }
  }, [value, preview]);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    
    // Simulate progress bar for better UX
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 90) {
          clearInterval(interval);
          return 90;
        }
        return p + 10;
      });
    }, 100);

    const reader = new FileReader();
    reader.onloadend = () => {
      clearInterval(interval);
      setProgress(100);
      
      setTimeout(() => {
        const base64String = reader.result as string;
        setPreview(base64String);
        localStorage.setItem('temp_upload', base64String);
        onChange(base64String);
        setIsProcessing(false);
      }, 300);
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const pushToFrontend = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (preview) {
      localStorage.setItem('hero_image_base64', preview);
      window.dispatchEvent(new Event("contentUpdated"));
      alert("Image Live on Frontend!");
    }
  };

  return (
    <div className="w-full">
      <label className="text-xs text-white/50 uppercase tracking-widest block mb-2">{label}</label>
      
      <div 
        className={`relative border-2 border-dashed rounded-xl p-10 text-center transition-all bg-[#0A0A0B] cursor-pointer ${
          isDragging ? 'border-industrial-cyan bg-industrial-cyan/5' : 'border-industrial-cyan/30 hover:border-industrial-cyan'
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef}
          onChange={(e) => e.target.files && handleFile(e.target.files[0])}
        />
        
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-full max-w-xs bg-black/50 rounded-full h-2 mb-4 overflow-hidden border border-white/10">
              <div 
                className="bg-industrial-cyan h-2 transition-all duration-300 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm font-mono text-industrial-cyan uppercase tracking-widest animate-pulse">Processing Image...</p>
          </div>
        ) : preview ? (
          <div className="flex flex-col items-center">
            <div className="relative w-full h-48 mb-6">
              <Image 
                src={preview} 
                alt="Preview" 
                fill
                unoptimized
                className="object-contain mx-auto rounded-lg shadow-[0_0_15px_rgba(0,243,255,0.2)]" 
              />
            </div>
            
            <button 
              onClick={pushToFrontend}
              className="px-6 py-3 bg-industrial-cyan text-black font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform"
            >
              Push to Frontend
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setPreview(null);
                onChange("");
              }}
              className="mt-4 text-xs text-red-400 hover:text-red-300 uppercase tracking-widest font-mono"
            >
              Remove Image
            </button>
          </div>
        ) : (
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-industrial-cyan/10 flex items-center justify-center mb-6 text-industrial-cyan border border-industrial-cyan/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-white/80 font-bold mb-2 text-lg">Drag & Drop your Hero Image here</p>
            <p className="text-xs text-white/40 font-mono uppercase tracking-widest">or click to browse</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex items-center gap-3">
        <span className="text-xs text-white/40 font-mono shrink-0 uppercase tracking-widest">OR URL:</span>
        <input
          type="text"
          value={value || ""}
          onChange={(e) => {
            setPreview(e.target.value);
            onChange(e.target.value);
          }}
          placeholder="https://..."
          className="flex-1 bg-black/50 border border-white/10 p-2 text-xs text-white/80 focus:border-industrial-cyan outline-none font-mono rounded"
        />
      </div>
    </div>
  );
};


