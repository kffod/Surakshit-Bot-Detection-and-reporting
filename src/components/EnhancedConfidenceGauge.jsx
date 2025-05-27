import React, { useState, useEffect } from 'react';
import { Cpu, ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';

export const EnhancedConfidenceGauge = ({ botConfidence, humanConfidence }) => {
    const [animatedProgress, setAnimatedProgress] = useState(0);
    const [loading, setLoading] = useState(true);

    // Determine which is higher
    const isHuman = humanConfidence > botConfidence;
    const confidenceValue = isHuman ? humanConfidence : botConfidence;

    // Animate the gauge
    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 800);

        let progress = 0;

        const interval = setInterval(() => {
            progress += 2;

            if (progress >= confidenceValue) {
                clearInterval(interval);
                setAnimatedProgress(confidenceValue);
                return;
            }

            setAnimatedProgress(progress);
        }, 20);

        return () => clearInterval(interval);
    }, [confidenceValue]);

    // SVG path for gauge arc
    const getArcPath = (value) => {
        const radius = 80;
        const circumference = 2 * Math.PI * radius;
        const strokeDasharray = circumference;
        const strokeDashoffset = circumference - (value / 100) * circumference;

        return {
            strokeDasharray,
            strokeDashoffset
        };
    };

    // Calculate color based on confidence
    const getColor = () => {
        if (isHuman) {
            return {
                text: '#22c55e',
                trail: 'rgba(34, 197, 94, 0.1)',
                path: 'rgba(34, 197, 94, 0.8)',
                glow: 'rgba(34, 197, 94, 0.5)'
            };
        } else {
            return {
                text: '#ef4444',
                trail: 'rgba(239, 68, 68, 0.1)',
                path: 'rgba(239, 68, 68, 0.8)',
                glow: 'rgba(239, 68, 68, 0.5)'
            };
        }
    };

    const color = getColor();
    const arcProps = getArcPath(animatedProgress);
    const label = isHuman ? 'HUMAN' : 'BOT';

    // Get risk text based on confidence
    const getRiskLevel = () => {
        if (isHuman) {
            if (humanConfidence < 60) return { text: "UNCERTAIN", color: "text-yellow-500" };
            if (humanConfidence < 80) return { text: "LIKELY HUMAN", color: "text-green-400" };
            return { text: "VERIFIED HUMAN", color: "text-green-500" };
        } else {
            if (botConfidence < 60) return { text: "UNCERTAIN", color: "text-yellow-500" };
            if (botConfidence < 80) return { text: "LIKELY BOT", color: "text-red-400" };
            return { text: "VERIFIED BOT", color: "text-red-500" };
        }
    };

    const risk = getRiskLevel();

    // Get list of possible indicators based on the confidence range
    const getIndicators = () => {
        if (isHuman) {
            return [
                "Natural typing speed",
                "Varied content posting",
                "Consistent behavior pattern",
                "Normal response times"
            ];
        } else {
            return [
                "Automated responses",
                "Repetitive content",
                "Abnormal posting times",
                "Patterns match known bots"
            ];
        }
    };

    return (
        <div className="card p-4 h-80 relative">
            <div className="flex items-center mb-3">
                <Cpu className="h-5 w-5 text-green-400 mr-2" />
                <h3 className="text-lg font-mono text-green-400">IDENTITY ANALYSIS</h3>
            </div>

            <div className="border-t border-gray-800 pt-3 flex h-[calc(100%-2.5rem)]">
                <div className="w-1/2 flex flex-col items-center justify-center relative">
                    {loading ? (
                        <div className="text-green-400 font-mono text-sm animate-pulse">CALIBRATING...</div>
                    ) : (
                        <>
                            <div className="relative">
                                {/* Track (Background circle) */}
                                <svg width="180" height="180" viewBox="0 0 180 180" className="transform -rotate-90">
                                    <circle
                                        cx="90"
                                        cy="90"
                                        r="80"
                                        fill="none"
                                        stroke={color.trail}
                                        strokeWidth="12"
                                        strokeLinecap="round"
                                    />

                                    {/* Progress Arc */}
                                    <circle
                                        cx="90"
                                        cy="90"
                                        r="80"
                                        fill="none"
                                        stroke={color.path}
                                        strokeWidth="12"
                                        strokeLinecap="round"
                                        strokeDasharray={arcProps.strokeDasharray}
                                        strokeDashoffset={arcProps.strokeDashoffset}
                                        style={{
                                            transition: 'stroke-dashoffset 0.5s ease-in-out',
                                            filter: `drop-shadow(0 0 6px ${color.glow})`
                                        }}
                                    />
                                </svg>

                                {/* Confidence percentage text */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                    <div className="text-3xl font-bold" style={{ color: color.text }}>
                                        {animatedProgress}%
                                    </div>
                                    <div className="text-xs font-mono text-gray-400 mt-1">CONFIDENCE</div>
                                </div>

                                {/* Icon at the bottom of the gauge */}
                                <div
                                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 p-2 rounded-full"
                                    style={{ backgroundColor: isHuman ? '#065f46' : '#7f1d1d' }}
                                >
                                    {isHuman ? (
                                        <ShieldCheck className="h-6 w-6 text-green-400" />
                                    ) : (
                                        <ShieldAlert className="h-6 w-6 text-red-400" />
                                    )}
                                </div>
                            </div>

                            <div className="text-lg font-bold mt-6" style={{ color: color.text }}>
                                {label}
                            </div>
                            <div className={`text-xs font-mono ${risk.color} mt-1 flex items-center`}>
                                {risk.text}
                                {risk.text === "UNCERTAIN" && (
                                    <AlertTriangle className="h-3 w-3 ml-1" />
                                )}
                            </div>
                        </>
                    )}
                </div>

                <div className="w-1/2 pl-4 flex flex-col">
                    <div className="text-xs font-mono text-gray-400 mb-2">KEY INDICATORS:</div>
                    <div className="space-y-1.5">
                        {getIndicators().map((indicator, index) => (
                            <div key={index} className="flex items-start">
                                <div
                                    className="w-1.5 h-1.5 rounded-full mt-1.5 mr-2 flex-shrink-0"
                                    style={{ backgroundColor: color.text }}
                                ></div>
                                <span className="text-xs font-mono text-gray-300">{indicator}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto">
                        <div className="text-xs font-mono text-gray-400 mb-1">CONFIDENCE RATING:</div>
                        <div className="w-full bg-gray-800 h-2 rounded overflow-hidden">
                            <div
                                className="h-full transition-all duration-1000"
                                style={{
                                    width: `${animatedProgress}%`,
                                    backgroundColor: color.text,
                                    boxShadow: `0 0 10px ${color.glow}`
                                }}
                            ></div>
                        </div>
                        <div className="flex justify-between mt-1 text-[10px] font-mono text-gray-500">
                            <span>0%</span>
                            <span>50%</span>
                            <span>100%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 