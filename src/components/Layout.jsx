import React from 'react';
import { Github, Terminal, Shield, Activity } from 'lucide-react';

export const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#0d1117] relative overflow-hidden">
            {/* Animated scan line effect */}
            <div className="scan-line"></div>

            {/* Matrix-style background pattern - pure CSS */}
            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                <div className="h-full w-full absolute top-0 left-0 z-0">
                    <div className="matrix-code absolute top-0 left-0 w-full h-full font-mono text-[10px] leading-3 text-green-500 select-none">
                        {Array.from({ length: 50 }).map((_, i) => (
                            <div key={i} className="flex flex-wrap" style={{ animationDelay: `${i * 0.1}s` }}>
                                {Array.from({ length: 100 }).map((_, j) => (
                                    <span key={j} className="inline-block w-3 opacity-80" style={{ animationDelay: `${j * 0.05}s` }}>
                                        {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <header className="bg-[#010409] border-b border-green-900 shadow-lg relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="bg-black p-2 rounded-full mr-3 border border-green-500">
                                <Terminal className="h-6 w-6 text-green-400" />
                            </div>
                            <div>
                                <h1 className="text-xl font-mono font-bold neon-text">
                                    <span className="mr-2 inline-block transform -rotate-6">&#60;</span>
                                    REDDIT BOT DETECTOR
                                    <span className="ml-2 inline-block transform rotate-6">&#62;</span>
                                </h1>
                                <div className="text-xs text-green-500 font-mono">v1.0.0 // CYBERSECURITY ANALYSIS TOOL</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex items-center space-x-1 text-green-400 bg-gray-900 rounded-md px-3 py-1 text-xs font-mono border border-green-800">
                                <Shield className="h-3 w-3 mr-1" />
                                <span>SECURE</span>
                                <span className="ml-2 h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                            </div>
                            <a
                                href="https://github.com/yourusername/reddit-bot-detector"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-gray-400 hover:text-green-400 transition-colors duration-200"
                            >
                                <Github className="h-5 w-5 mr-1" />
                                <span className="hidden sm:inline font-mono text-sm">GITHUB</span>
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                {children}
            </main>

            <footer className="bg-[#010409] border-t border-green-900 mt-12 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <p className="text-center text-green-500 text-xs font-mono mb-2 md:mb-0">
                            <span className="inline-block animate-pulse mr-1">▶</span>
                            SYSTEM ONLINE // {new Date().getFullYear()} // ALL RIGHTS RESERVED
                        </p>
                        <div className="flex items-center">
                            <Activity className="h-4 w-4 text-green-500 mr-2 animate-pulse" />
                            <div className="text-xs font-mono text-green-400">
                                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                                MONITORING ACTIVE
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}; 