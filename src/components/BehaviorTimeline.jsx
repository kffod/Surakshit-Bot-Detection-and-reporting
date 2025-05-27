import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import { Clock, AlertTriangle } from 'lucide-react';

export const BehaviorTimeline = ({ activityData = [] }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Generate 24-hour activity data if not provided
        if (activityData.length === 0) {
            const generated = Array.from({ length: 24 }, (_, hour) => {
                const baseActivity = Math.random() * 30 + 10;
                const isSuspicious = Math.random() > 0.8;
                return {
                    hour: hour.toString().padStart(2, '0') + ':00',
                    activity: Math.floor(baseActivity),
                    suspicious: isSuspicious,
                    botProbability: isSuspicious ? Math.random() * 40 + 60 : Math.random() * 30,
                };
            });
            setData(generated);
        } else {
            setData(activityData);
        }
    }, [activityData]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const hourData = payload[0].payload;
            return (
                <div className="bg-gray-900 border border-green-500 p-3 font-mono text-xs">
                    <p className="text-green-400 mb-1">TIME: {label}</p>
                    <p className="text-gray-300">Activity Level: {hourData.activity}</p>
                    <p className={hourData.suspicious ? 'text-red-400' : 'text-green-400'}>
                        Bot Probability: {Math.floor(hourData.botProbability)}%
                    </p>
                    {hourData.suspicious && (
                        <div className="flex items-center mt-1 text-yellow-500">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            <span>Suspicious Activity Detected</span>
                        </div>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="card p-4 h-80">
            <div className="flex items-center mb-3">
                <Clock className="h-5 w-5 text-green-400 mr-2" />
                <h3 className="text-lg font-mono text-green-400">ACTIVITY PATTERNS</h3>
            </div>

            <div className="border-t border-gray-800 pt-3">
                <div className="mb-2 flex justify-between items-center">
                    <div className="text-xs font-mono text-gray-500">24-HOUR ACTIVITY ANALYSIS</div>
                    <div className="flex space-x-4">
                        <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                            <span className="text-xs font-mono text-gray-500">Normal</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                            <span className="text-xs font-mono text-gray-500">Suspicious</span>
                        </div>
                    </div>
                </div>

                <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                            <XAxis
                                dataKey="hour"
                                stroke="#4B5563"
                                tick={{ fill: '#6B7280', fontSize: 10, fontFamily: 'monospace' }}
                                interval={2}
                            />
                            <YAxis
                                stroke="#4B5563"
                                tick={{ fill: '#6B7280', fontSize: 10, fontFamily: 'monospace' }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <ReferenceLine y={30} stroke="#EF4444" strokeDasharray="3 3" />
                            <Line
                                type="monotone"
                                dataKey="activity"
                                stroke="#22C55E"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{
                                    r: 4,
                                    fill: ({ payload }) => payload.suspicious ? '#EF4444' : '#22C55E'
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-2 flex justify-between items-center">
                    <div className="text-xs font-mono text-gray-500">
                        AVG ACTIVITY: {Math.floor(data.reduce((acc, curr) => acc + curr.activity, 0) / data.length)}
                    </div>
                    <div className="text-xs font-mono text-gray-500">
                        SUSPICIOUS PERIODS: {data.filter(d => d.suspicious).length}
                    </div>
                </div>
            </div>
        </div>
    );
}; 