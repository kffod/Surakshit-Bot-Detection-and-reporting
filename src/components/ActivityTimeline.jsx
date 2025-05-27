import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Activity, AlertTriangle, Clock } from 'lucide-react';

export const ActivityTimeline = ({ activityScore, suspiciousActivities }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Generate synthetic timeline data based on the activity score
    useEffect(() => {
        setIsLoading(true);

        // Generate a 7-day timeline with synthetic data based on activityScore and suspiciousActivities
        const days = 7;
        const baselineActivity = Math.max(1, activityScore / 2);
        const randomFactor = suspiciousActivities / 100;

        // Generate synthetic timeline data
        const timelineData = Array.from({ length: days }).map((_, i) => {
            // Add some variance to make it look realistic
            const normalActivity = baselineActivity * (0.8 + Math.random() * 0.4);

            // Create spikes on certain days if suspicious activities is high
            const isSpikeDay = i === 2 || i === 5;
            const spikeValue = isSpikeDay ? randomFactor * 4 : 0;

            const activityValue = normalActivity + (isSpikeDay ? spikeValue : 0);
            const suspiciousnessValue = Math.min(
                10,
                (suspiciousActivities / 100) * (isSpikeDay ? 8 + Math.random() * 2 : 1 + Math.random() * 2)
            );

            return {
                day: `Day ${i + 1}`,
                activity: parseFloat(activityValue.toFixed(1)),
                suspicious: parseFloat(suspiciousnessValue.toFixed(1)),
                date: new Date(Date.now() - (days - i - 1) * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            };
        });

        // Animate the data loading
        let step = 0;
        const totalSteps = 15;

        const interval = setInterval(() => {
            step++;
            if (step > totalSteps) {
                clearInterval(interval);
                setData(timelineData);
                setIsLoading(false);
                return;
            }

            // Gradually build up the chart
            const animatedData = timelineData.map((item, idx) => {
                const animProgress = Math.min(1, step / ((idx + 1) * 2));
                return {
                    ...item,
                    activity: parseFloat((item.activity * animProgress).toFixed(1)),
                    suspicious: parseFloat((item.suspicious * animProgress).toFixed(1))
                };
            });

            setData(animatedData);
        }, 100);

        return () => clearInterval(interval);
    }, [activityScore, suspiciousActivities]);

    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const suspiciousLevel = payload[1].value;
            let riskText = "LOW RISK";
            let riskColor = "text-green-400";

            if (suspiciousLevel > 7) {
                riskText = "HIGH RISK";
                riskColor = "text-red-400";
            } else if (suspiciousLevel > 3) {
                riskText = "MEDIUM RISK";
                riskColor = "text-yellow-400";
            }

            return (
                <div className="bg-gray-900 border border-gray-800 p-3 text-xs font-mono">
                    <p className="text-gray-400 mb-1">{payload[0].payload.date}</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        <div className="text-blue-400">Activity:</div>
                        <div className="text-blue-400">{payload[0].value}</div>
                        <div className="text-red-400">Suspicious:</div>
                        <div className="text-red-400">{payload[1].value}</div>
                        <div className="text-gray-400">Status:</div>
                        <div className={riskColor}>{riskText}</div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="card p-4 h-80 relative">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <Clock className="h-5 w-5 text-green-400 mr-2" />
                    <h3 className="text-lg font-mono text-green-400">ACTIVITY TIMELINE</h3>
                </div>

                <div className="flex items-center">
                    {suspiciousActivities > 50 && (
                        <div className="flex items-center mr-4 text-xs">
                            <AlertTriangle className="h-3 w-3 text-red-500 mr-1" />
                            <span className="text-red-400 font-mono">ANOMALIES DETECTED</span>
                        </div>
                    )}
                    <div className="text-xs font-mono text-gray-500">7-DAY PATTERN</div>
                </div>
            </div>

            <div className="border-t border-gray-800 pt-3 h-[calc(100%-2.5rem)] relative">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-900 bg-opacity-60">
                        <div className="text-green-400 font-mono text-xs animate-pulse flex items-center">
                            <Activity className="h-4 w-4 mr-2 animate-pulse" />
                            ANALYZING PATTERNS...
                        </div>
                    </div>
                )}

                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{ top: 15, right: 10, bottom: 15, left: -20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis
                            dataKey="date"
                            tick={{ fill: '#9ca3af', fontSize: 10, fontFamily: 'monospace' }}
                            axisLine={{ stroke: '#444' }}
                            tickLine={{ stroke: '#444' }}
                        />
                        <YAxis
                            yAxisId="left"
                            tick={{ fill: '#9ca3af', fontSize: 10, fontFamily: 'monospace' }}
                            axisLine={{ stroke: '#444' }}
                            tickLine={{ stroke: '#444' }}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            domain={[0, 10]}
                            tick={{ fill: '#9ca3af', fontSize: 10, fontFamily: 'monospace' }}
                            axisLine={{ stroke: '#444' }}
                            tickLine={{ stroke: '#444' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <ReferenceLine y={5} yAxisId="right" stroke="#yellow" strokeDasharray="3 3" />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="activity"
                            stroke="#38bdf8"
                            strokeWidth={2}
                            dot={{ stroke: '#0284c7', strokeWidth: 1, r: 4, fill: '#38bdf8' }}
                            activeDot={{ r: 6, stroke: '#0284c7', strokeWidth: 1, fill: '#38bdf8' }}
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="suspicious"
                            stroke="#f87171"
                            strokeWidth={2}
                            dot={{ stroke: '#b91c1c', strokeWidth: 1, r: 4, fill: '#f87171' }}
                            activeDot={{ r: 6, stroke: '#b91c1c', strokeWidth: 1, fill: '#f87171' }}
                        />
                    </LineChart>
                </ResponsiveContainer>

                <div className="absolute bottom-0 right-0 p-1 bg-gray-800 border-t border-l border-gray-700 text-[9px] font-mono text-gray-400 rounded-tl">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                            <div className="h-2 w-2 bg-blue-400 rounded-full mr-1"></div>
                            <span>ACTIVITY</span>
                        </div>
                        <div className="flex items-center">
                            <div className="h-2 w-2 bg-red-400 rounded-full mr-1"></div>
                            <span>SUSPICIOUS</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 