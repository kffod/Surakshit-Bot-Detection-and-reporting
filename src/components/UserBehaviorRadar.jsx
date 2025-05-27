import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { PieChart as PieIcon, Info } from 'lucide-react';

export const UserBehaviorRadar = ({ accountData }) => {
    const [animatedData, setAnimatedData] = useState([]);
    const [showTooltip, setShowTooltip] = useState(null);

    // Format metrics for radar chart display
    useEffect(() => {
        // Normalize data between 0-100 for radar visualization
        const normalizedMetrics = [
            {
                name: 'Activity',
                value: Math.min(100, (accountData.totalPosts + accountData.totalComments) / 100),
                description: 'Combined post and comment activity',
                fullMark: 100,
                color: '#22d3ee' // cyan
            },
            {
                name: 'Response',
                value: Math.min(100, Math.max(0, 100 - accountData.avgResponseTime * 10)),
                description: 'How fast the account responds to comments',
                fullMark: 100,
                color: '#a78bfa' // purple
            },
            {
                name: 'Reputation',
                value: Math.min(100, Math.max(0, 100 - accountData.reportCount * 20)),
                description: 'User reputation based on report count',
                fullMark: 100,
                color: '#34d399' // emerald
            },
            {
                name: 'Originality',
                value: Math.min(100, Math.max(0, 100 - accountData.repeatedPhrases)),
                description: 'Content originality (inversely related to repetition)',
                fullMark: 100,
                color: '#f472b6' // pink
            },
            {
                name: 'Longevity',
                value: Math.min(100, accountData.accountAge / 10),
                description: 'Account age normalized to scale',
                fullMark: 100,
                color: '#60a5fa' // blue
            },
            {
                name: 'Uniqueness',
                value: Math.min(100, Math.max(0, 100 - accountData.similarAccounts * 30)),
                description: 'Uniqueness compared to known patterns',
                fullMark: 100,
                color: '#fbbf24' // amber
            },
        ];

        // Animate data loading
        let step = 0;
        const totalSteps = 25;

        const interval = setInterval(() => {
            step++;

            if (step > totalSteps) {
                clearInterval(interval);
                setAnimatedData(normalizedMetrics);
                return;
            }

            const animData = normalizedMetrics.map(metric => ({
                ...metric,
                value: (metric.value * step) / totalSteps
            }));

            setAnimatedData(animData);
        }, 40);

        return () => clearInterval(interval);
    }, [accountData]);

    return (
        <div className="card p-4 h-80 relative">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <PieIcon className="h-5 w-5 text-green-400 mr-2" />
                    <h3 className="text-lg font-mono text-green-400">BEHAVIOR HEXAGON</h3>
                </div>
                <div className="text-xs font-mono text-gray-500">
                    METRIC ANALYSIS
                </div>
            </div>

            <div className="border-t border-gray-800 pt-3 h-[calc(100%-2.5rem)]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                        cx="50%"
                        cy="50%"
                        outerRadius="60%"
                        data={animatedData}
                    >
                        <PolarGrid
                            stroke="#333"
                            strokeDasharray="3 3"
                        />
                        <PolarAngleAxis
                            dataKey="name"
                            tick={{ fill: '#9ca3af', fontSize: 10, fontFamily: 'monospace' }}
                        />
                        <PolarRadiusAxis
                            angle={90}
                            domain={[0, 100]}
                            tick={{ fill: '#9ca3af', fontSize: 10, fontFamily: 'monospace' }}
                            tickCount={4}
                            stroke="#444"
                        />
                        <Radar
                            name="Behavior Profile"
                            dataKey="value"
                            strokeWidth={1}
                            stroke="#10b981"
                            fill="#10b981"
                            fillOpacity={0.3}
                        />
                        {/* Tooltip dots */}
                        {animatedData.map((entry, index) => (
                            <g
                                key={`dot-${index}`}
                                onMouseEnter={() => setShowTooltip(index)}
                                onMouseLeave={() => setShowTooltip(null)}
                            >
                                <circle
                                    cx={0}
                                    cy={0}
                                    r={4}
                                    fill={entry.color}
                                    stroke="#000"
                                    strokeWidth={1}
                                    style={{
                                        transform: `
                      translate(
                        ${50 + 40 * Math.sin(Math.PI * 2 * index / animatedData.length)}%,
                        ${50 - 40 * Math.cos(Math.PI * 2 * index / animatedData.length)}%
                      )
                    `
                                    }}
                                />
                            </g>
                        ))}
                    </RadarChart>
                </ResponsiveContainer>

                {/* Floating tooltip */}
                {showTooltip !== null && (
                    <div
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 z-10 bg-gray-900 border border-green-800 p-2 rounded shadow-lg max-w-[200px] text-xs font-mono"
                    >
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">{animatedData[showTooltip].name}</div>
                        <div className="flex justify-between items-center mb-1">
                            <div className="text-green-400">{Math.round(animatedData[showTooltip].value)}/100</div>
                            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: animatedData[showTooltip].color }}></div>
                        </div>
                        <div className="text-gray-400">{animatedData[showTooltip].description}</div>
                    </div>
                )}

                <div className="absolute bottom-2 left-2 text-[10px] font-mono text-gray-500 flex items-center">
                    <Info size={10} className="mr-1" />
                    <span>HOVER OVER POINTS FOR DETAILS</span>
                </div>
            </div>
        </div>
    );
}; 