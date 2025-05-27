import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Code, Eye } from 'lucide-react';

export const BehaviorPatterns = ({ patterns }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [showTypingEffect, setShowTypingEffect] = useState(-1);
    const [typedText, setTypedText] = useState('');

    // Typing effect animation
    useEffect(() => {
        if (showTypingEffect >= 0 && patterns[showTypingEffect]) {
            const text = patterns[showTypingEffect].description;
            let currentIndex = 0;
            setTypedText('');

            const timer = setInterval(() => {
                if (currentIndex < text.length) {
                    setTypedText(prev => prev + text[currentIndex]);
                    currentIndex++;
                } else {
                    clearInterval(timer);
                }
            }, 20);

            return () => clearInterval(timer);
        }
    }, [showTypingEffect, patterns]);

    const handlePatternClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
        setShowTypingEffect(index);
    };

    return (
        <div className="card p-4">
            <div className="flex items-center mb-3">
                <Code className="h-5 w-5 text-green-400 mr-2" />
                <h3 className="text-lg font-mono text-green-400">BEHAVIOR ANALYSIS</h3>
            </div>

            <div className="space-y-2 border border-gray-800 rounded-md p-2 bg-[rgba(1,22,39,0.7)]">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-2">
                    <div className="text-xs font-mono text-gray-400">PATTERN SCANNER v1.2</div>
                    <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                </div>

                {patterns.map((pattern, index) => (
                    <div
                        key={index}
                        className={`border border-gray-800 rounded-md overflow-hidden transition-all duration-200 ${activeIndex === index ? 'bg-gray-900' : 'bg-gray-800 hover:bg-gray-900'
                            }`}
                    >
                        <div
                            className="p-3 cursor-pointer flex items-center justify-between"
                            onClick={() => handlePatternClick(index)}
                        >
                            <div className="flex items-center">
                                {pattern.isSuspicious ? (
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-900 border border-red-700 flex items-center justify-center">
                                        <XCircle className="h-5 w-5 text-red-500" />
                                    </div>
                                ) : (
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-900 border border-green-700 flex items-center justify-center">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                    </div>
                                )}
                                <div className="ml-3">
                                    <h4 className="text-sm font-mono font-medium text-gray-300">{pattern.name}</h4>
                                    <div className="mt-1 flex items-center">
                                        <div className={`h-1.5 w-1.5 rounded-full ${pattern.isSuspicious ? 'bg-red-500' : 'bg-green-500'} mr-1.5`}></div>
                                        <span className="text-xs font-mono text-gray-500">
                                            {pattern.isSuspicious ? 'SUSPICIOUS' : 'NORMAL'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Eye className="h-4 w-4 text-gray-500" />
                            </div>
                        </div>

                        {activeIndex === index && (
                            <div className="px-3 pb-3 pt-1 border-t border-gray-800">
                                <div className="font-mono text-xs text-gray-400 bg-gray-900 p-2 rounded border border-gray-800">
                                    <div className="flex items-start">
                                        <AlertTriangle className="h-3.5 w-3.5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <div className="terminal-text">
                                            {index === showTypingEffect ? typedText : pattern.description}
                                            {index === showTypingEffect && typedText.length < pattern.description.length && (
                                                <span className="inline-block w-1.5 h-3.5 bg-green-500 animate-pulse ml-0.5"></span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-2 text-xs text-right">
                                        <span className="text-gray-500 font-mono">// Confidence:</span>
                                        <span className={`ml-1 ${pattern.isSuspicious ? 'text-red-400' : 'text-green-400'}`}>
                                            {pattern.isSuspicious ? 'HIGH' : 'VERIFIED'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex justify-between mt-2 text-xs text-gray-500 font-mono">
                <span>STATUS: ANALYSIS COMPLETE</span>
                <span>{patterns.filter(p => p.isSuspicious).length} ISSUES FOUND</span>
            </div>
        </div>
    );
}; 