import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from 'recharts';
import { MessageSquare, TrendingUp } from 'lucide-react';

export const ContentAnalysis = ({ contentData = null }) => {
    const [data, setData] = useState([]);
    const [stats, setStats] = useState({
        totalWords: 0,
        uniqueWords: 0,
        avgSentiment: 0,
        commonPhrases: []
    });

    useEffect(() => {
        // Generate sample data if not provided
        if (!contentData) {
            const generated = [
                { metric: 'Originality', value: Math.random() * 100 },
                { metric: 'Coherence', value: Math.random() * 100 },
                { metric: 'Sentiment', value: Math.random() * 100 },
                { metric: 'Complexity', value: Math.random() * 100 },
                { metric: 'Engagement', value: Math.random() * 100 },
                { metric: 'Consistency', value: Math.random() * 100 }
            ];
            setData(generated);

            setStats({
                totalWords: Math.floor(Math.random() * 50000) + 10000,
                uniqueWords: Math.floor(Math.random() * 5000) + 1000,
                avgSentiment: (Math.random() * 2 - 1).toFixed(2),
                commonPhrases: [
                    { phrase: "frequently used phrase", count: Math.floor(Math.random() * 100) + 20 },
                    { phrase: "common response", count: Math.floor(Math.random() * 80) + 15 },
                    { phrase: "typical reaction", count: Math.floor(Math.random() * 60) + 10 }
                ]
            });
        } else {
            setData(contentData.metrics);
            setStats(contentData.stats);
        }
    }, [contentData]);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-900 border border-green-500 p-2 font-mono text-xs">
                    <p className="text-green-400">{payload[0].payload.metric}</p>
                    <p className="text-gray-300">Score: {Math.floor(payload[0].value)}%</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="card p-4 h-80">
            <div className="flex items-center mb-3">
                <MessageSquare className="h-5 w-5 text-green-400 mr-2" />
                <h3 className="text-lg font-mono text-green-400">CONTENT ANALYSIS</h3>
            </div>

            <div className="border-t border-gray-800 pt-3">
                <div className="grid grid-cols-2 gap-4">
                    <div className="h-52">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                                <PolarGrid stroke="#374151" />
                                <PolarAngleAxis
                                    dataKey="metric"
                                    tick={{ fill: '#6B7280', fontSize: 10, fontFamily: 'monospace' }}
                                />
                                <Radar
                                    name="Content Metrics"
                                    dataKey="value"
                                    stroke="#22C55E"
                                    fill="#22C55E"
                                    fillOpacity={0.3}
                                />
                                <Tooltip content={<CustomTooltip />} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-gray-900 p-2 rounded border border-gray-800">
                            <div className="text-xs font-mono text-gray-500 mb-1">VOCABULARY STATS</div>
                            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                                <div>
                                    <div className="text-gray-400">Total Words</div>
                                    <div className="text-green-400">{stats.totalWords.toLocaleString()}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400">Unique Words</div>
                                    <div className="text-green-400">{stats.uniqueWords.toLocaleString()}</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 p-2 rounded border border-gray-800">
                            <div className="text-xs font-mono text-gray-500 mb-1">COMMON PHRASES</div>
                            <div className="space-y-1">
                                {stats.commonPhrases.map((item, index) => (
                                    <div key={index} className="flex justify-between text-xs font-mono">
                                        <span className="text-gray-400">"{item.phrase}"</span>
                                        <span className="text-green-400">{item.count}x</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-900 p-2 rounded border border-gray-800">
                            <div className="text-xs font-mono text-gray-500 mb-1">SENTIMENT ANALYSIS</div>
                            <div className="flex items-center">
                                <TrendingUp className="h-4 w-4 text-green-400 mr-2" />
                                <span className="text-xs font-mono text-gray-400">
                                    Score: {stats.avgSentiment}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 