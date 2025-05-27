import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { BarChart2 } from 'lucide-react';

export const ActivityPieChart = ({ normalActivity = 0, suspiciousActivity = 0, repeatedActivity = 0 }) => {
    const [animatedData, setAnimatedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Convert props to data array
    const data = [
        { name: 'Normal', value: normalActivity, color: '#22c55e' },     // green-500
        { name: 'Repeated', value: repeatedActivity, color: '#eab308' }, // yellow-500
        { name: 'Suspicious', value: suspiciousActivity, color: '#ef4444' }  // red-500
    ];

    // Animation effect
    useEffect(() => {
        setIsLoading(true);

        // Start with zero values
        const initialData = data.map(item => ({
            ...item,
            value: 0
        }));

        setAnimatedData(initialData);

        // Gradually update to actual values
        let step = 0;
        const totalSteps = 20;

        const interval = setInterval(() => {
            step++;

            if (step > totalSteps) {
                clearInterval(interval);
                setAnimatedData(data);
                setIsLoading(false);
                return;
            }

            const newData = data.map((item, i) => ({
                ...item,
                value: Math.floor((item.value * step) / totalSteps)
            }));

            setAnimatedData(newData);
        }, 50);

        return () => clearInterval(interval);
    }, [normalActivity, suspiciousActivity, repeatedActivity]);

    // Custom label with hacker theme
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="#00FF41"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                className="font-mono text-xs"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    // Custom tooltip with hacker theme
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-900 border border-green-500 p-2 text-xs font-mono">
                    <p className="text-green-400">{`${payload[0].name}: ${payload[0].value}%`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="card p-4 h-80 relative">
            <div className="flex items-center mb-2">
                <BarChart2 className="h-5 w-5 text-green-400 mr-2" />
                <h3 className="text-lg font-mono text-green-400">ACTIVITY DISTRIBUTION</h3>
            </div>

            <div className="absolute top-4 right-4 font-mono text-xs text-gray-500">
                <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1"></div>
                    <span>[NORMAL]</span>
                </div>
                <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1"></div>
                    <span>[REPEATED]</span>
                </div>
                <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-1"></div>
                    <span>[SUSPICIOUS]</span>
                </div>
            </div>

            <div className="border-t border-gray-800 pt-2 h-[calc(100%-2rem)]">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="text-green-400 font-mono text-xs animate-pulse">
                            LOADING DATA...
                        </div>
                    </div>
                )}

                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={animatedData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            innerRadius={30}
                            fill="#8884d8"
                            dataKey="value"
                            stroke="#111827"
                            strokeWidth={2}
                        >
                            {animatedData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>

                <div className="font-mono text-xs text-gray-500 absolute bottom-2 left-2">
                    $ analyze --activity-pattern
                </div>
            </div>
        </div>
    );
}; 