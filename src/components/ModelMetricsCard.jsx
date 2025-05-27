import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Activity, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

export const ModelMetricsCard = ({
    accuracy = 92,
    precision = 94,
    recall = 91,
    activityScore = 6.2
}) => {
    const [values, setValues] = useState({
        accuracy: 0,
        precision: 0,
        recall: 0,
        activityScore: 0
    });

    // Animate metrics on load
    useEffect(() => {
        let frame = 0;
        const totalFrames = 30;

        const animate = () => {
            frame++;
            const progress = frame / totalFrames;

            setValues({
                accuracy: Math.floor(accuracy * progress),
                precision: Math.floor(precision * progress),
                recall: Math.floor(recall * progress),
                activityScore: parseFloat((activityScore * progress).toFixed(1))
            });

            if (frame < totalFrames) {
                requestAnimationFrame(animate);
            }
        };

        animate();

        return () => {
            frame = totalFrames; // Stop animation on unmount
        };
    }, [accuracy, precision, recall, activityScore]);

    const getScoreColor = (score) => {
        if (score >= 90) return '#22c55e';
        if (score >= 70) return '#eab308';
        return '#ef4444';
    };

    const getActivityScoreColor = (score) => {
        if (score <= 3) return '#22c55e';
        if (score <= 7) return '#eab308';
        return '#ef4444';
    };

    const getScoreIcon = (score) => {
        if (score >= 90) return <CheckCircle className="h-4 w-4 text-green-500" />;
        if (score >= 70) return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    };

    const getActivityScoreIcon = (score) => {
        if (score <= 3) return <CheckCircle className="h-4 w-4 text-green-500" />;
        if (score <= 7) return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    };

    // Format data for bar chart
    const chartData = [
        { name: 'Accuracy', value: values.accuracy, color: getScoreColor(values.accuracy) },
        { name: 'Precision', value: values.precision, color: getScoreColor(values.precision) },
        { name: 'Recall', value: values.recall, color: getScoreColor(values.recall) }
    ];

    return (
        <div className="card p-4 h-100">
            <div className="flex items-center mb-2">
                <Activity className="h-5 w-5 text-green-400 mr-2" />
                <h3 className="text-lg font-mono text-green-400">MODEL METRICS</h3>
            </div>

            <div className="h-32 mb-3 border-t border-gray-800 pt-2">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barGap={8}>
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 10, fontFamily: 'monospace' }}
                        />
                        <YAxis
                            domain={[0, 100]}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 10, fontFamily: 'monospace' }}
                            tickCount={5}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-900 p-3 rounded border border-gray-800 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500 font-mono">ACCURACY</p>
                        <div className="flex items-center">
                            <p className="font-mono text-lg" style={{ color: getScoreColor(values.accuracy) }}>
                                {values.accuracy}%
                            </p>
                            <div className="ml-2">{getScoreIcon(values.accuracy)}</div>
                        </div>
                    </div>
                    <div className="text-lg font-mono opacity-30">α</div>
                </div>

                <div className="bg-gray-900 p-3 rounded border border-gray-800 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500 font-mono">PRECISION</p>
                        <div className="flex items-center">
                            <p className="font-mono text-lg" style={{ color: getScoreColor(values.precision) }}>
                                {values.precision}%
                            </p>
                            <div className="ml-2">{getScoreIcon(values.precision)}</div>
                        </div>
                    </div>
                    <div className="text-lg font-mono opacity-30">π</div>
                </div>

                <div className="bg-gray-900 p-3 rounded border border-gray-800 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500 font-mono">RECALL</p>
                        <div className="flex items-center">
                            <p className="font-mono text-lg" style={{ color: getScoreColor(values.recall) }}>
                                {values.recall}%
                            </p>
                            <div className="ml-2">{getScoreIcon(values.recall)}</div>
                        </div>
                    </div>
                    <div className="text-lg font-mono opacity-30">ρ</div>
                </div>

                <div className="bg-gray-900 p-3 rounded border border-gray-800 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500 font-mono">ACTIVITY</p>
                        <div className="flex items-center">
                            <p className="font-mono text-lg" style={{ color: getActivityScoreColor(values.activityScore) }}>
                                {values.activityScore}
                            </p>
                            <div className="ml-2">{getActivityScoreIcon(values.activityScore)}</div>
                        </div>
                        <p className="text-[8px] text-gray-500 font-mono">LOWER IS BETTER</p>
                    </div>
                    <div className="text-lg font-mono opacity-30">
                        <Zap size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
}; 