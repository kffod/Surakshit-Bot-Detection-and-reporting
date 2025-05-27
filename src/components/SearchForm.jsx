import React, { useState, useEffect } from 'react';
import { Search, AlertCircle, Shield, Loader } from 'lucide-react';

export const SearchForm = ({ onSearch, isLoading }) => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [typingEffect, setTypingEffect] = useState('');
    const [typingIndex, setTypingIndex] = useState(0);

    const placeholderText = "Enter Reddit username for analysis...";

    // Typing effect for the placeholder
    useEffect(() => {
        if (typingIndex < placeholderText.length) {
            const timeout = setTimeout(() => {
                setTypingEffect(prevText => prevText + placeholderText[typingIndex]);
                setTypingIndex(prevIndex => prevIndex + 1);
            }, 100);

            return () => clearTimeout(timeout);
        }
    }, [typingIndex]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!username.trim()) {
            setError('ERROR: No username detected. Please provide a valid input.');
            return;
        }

        onSearch(username.trim());
    };

    return (
        <div className="card p-6 relative">
            <div className="mb-4 flex items-center">
                <Shield className="h-5 w-5 text-green-400 mr-2" />
                <h2 className="text-xl font-mono font-bold text-green-400">REDDIT BOT ANALYZER</h2>
            </div>

            <div className="mb-6 terminal-text text-sm border-l-2 border-green-500 pl-3">
                <p className="mb-1">// System initialized. Ready to detect bot patterns.</p>
                <p className="opacity-80">// Enter a Reddit username to begin analysis...</p>
            </div>

            {/* Command prompt style form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-green-500 font-mono">$&gt;</span>
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-10 py-3 bg-gray-900 border border-green-900 focus:border-green-500
                                   rounded font-mono text-green-400 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-green-500"
                        placeholder={typingEffect}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={isLoading}
                        autoComplete="off"
                        spellCheck="false"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <Search className="h-5 w-5 text-green-500" />
                    </div>
                </div>

                <button
                    type="submit"
                    className="hacker-btn py-3 px-6 rounded flex justify-center items-center"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader className="h-4 w-4 mr-2 animate-spin" />
                            <span className="font-mono">ANALYZING SUBJECT...</span>
                        </>
                    ) : (
                        <>
                            <span className="font-mono">EXECUTE ANALYSIS</span>
                            <span className="ml-2 inline-block transform -rotate-6">&#47;&gt;</span>
                        </>
                    )}
                </button>
            </form>

            {error && (
                <div className="mt-4 flex items-start text-red-400 bg-gray-900 border border-red-900 p-3 rounded font-mono text-sm">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <p>{error}</p>
                </div>
            )}

            <div className="mt-6 flex justify-between text-xs text-gray-500 font-mono">
                <span>CONNECTION: SECURE</span>
                <span>ENCRYPTION: ENABLED</span>
                <span className="hidden md:block">LATENCY: {Math.floor(Math.random() * 50) + 10}ms</span>
            </div>
        </div>
    );
}; 