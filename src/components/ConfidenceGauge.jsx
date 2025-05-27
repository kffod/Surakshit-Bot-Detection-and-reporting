import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Cpu, Shield } from 'lucide-react';

export const ConfidenceGauge = ({ botConfidence, humanConfidence }) => {
    const [animatedBot, setAnimatedBot] = useState(0);
    const [animatedHuman, setAnimatedHuman] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);

        // Animate values
        let currentBot = 0;
        let currentHuman = 0;

        const interval = setInterval(() => {
            if (currentBot < botConfidence) {
                currentBot = Math.min(currentBot + 2, botConfidence);
                setAnimatedBot(currentBot);
            }

            if (currentHuman < humanConfidence) {
                currentHuman = Math.min(currentHuman + 2, humanConfidence);
                setAnimatedHuman(currentHuman);
            }

            if (currentBot >= botConfidence && currentHuman >= humanConfidence) {
                clearInterval(interval);
            }
        }, 20);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [botConfidence, humanConfidence]);

    const data = [
        { name: 'Bot', value: animatedBot, color: '#ef4444' },
        { name: 'Human', value: animatedHuman, color: '#22c55e' },
    ];

    // Determine which is higher
    const prediction = humanConfidence > botConfidence ? 'HUMAN' : 'BOT';
    const predictionColor = humanConfidence > botConfidence ? 'text-green-500' : 'text-red-500';
    const confidence = Math.max(humanConfidence, botConfidence);

    // ASCII art terminal-style confidence meter
    const meterLength = 20;
    const filledCount = Math.floor((confidence / 100) * meterLength);
    const meterLine = Array(meterLength)
        .fill('░')
        .map((char, index) => index < filledCount ? '█' : char)
        .join('');

    return (
        <div className="card p-4 h-80 relative">
            <div className="flex items-center mb-3">
                <Cpu className="h-5 w-5 text-green-400 mr-2" />
                <h3 className="text-lg font-mono text-green-400">DETECTION CONFIDENCE</h3>
            </div>

            <div className="flex flex-col items-center justify-center h-56 relative">
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="font-mono text-green-400 text-sm animate-pulse">CALIBRATING...</div>
                    </div>
                ) : (
                    <>
                        <ResponsiveContainer width="100%" height="65%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    startAngle={180}
                                    endAngle={0}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="#111827"
                                    strokeWidth={2}
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="font-mono text-sm mt-2 text-center">
                            <div className="mb-1">PREDICTION: <span className={`font-bold ${predictionColor}`}>{prediction}</span></div>
                            <div className="text-xs text-gray-400 flex items-center justify-center">
                                <span className="mr-2">CONFIDENCE LEVEL:</span>
                                <span className={`${predictionColor} font-bold`}>{confidence}%</span>
                            </div>
                            <div className="mt-1 font-mono text-xs">
                                <span className={predictionColor}>{meterLine}</span>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="flex justify-between w-full mt-1 border-t border-gray-800 pt-3">
                <div className="text-center">
                    <div className="text-xs text-red-500 font-mono flex items-center">
                        <Shield className="w-3 h-3 mr-1" />
                        BOT: {animatedBot}%
                    </div>
                </div>
                <div className="text-xs font-mono text-gray-500">SCAN: ${Math.floor(Math.random() * 999)}</div>
                <div className="text-center">
                    <div className="text-xs text-green-500 font-mono flex items-center">
                        HUMAN: {animatedHuman}%
                        <Shield className="w-3 h-3 ml-1" />
                    </div>
                </div>
            </div>
        </div>
    );
}; 