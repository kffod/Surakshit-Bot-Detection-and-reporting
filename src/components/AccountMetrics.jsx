import React, { useState, useEffect } from 'react';
import { Database, AlertCircle, Clock, MessageCircle, Repeat, Flag, Users, AlertTriangle } from 'lucide-react';

export const AccountMetrics = ({ accountData }) => {
    const [expandedRow, setExpandedRow] = useState(null);
    const [typingRows, setTypingRows] = useState({});

    const metrics = [
        {
            name: 'Account Age',
            value: accountData.accountAge,
            unit: 'days',
            icon: <Clock className="h-4 w-4 text-blue-400" />,
            description: 'Time since account creation',
            risk: accountData.accountAge < 30 ? 'high' : (accountData.accountAge < 90 ? 'medium' : 'low')
        },
        {
            name: 'Total Posts',
            value: accountData.totalPosts,
            unit: '',
            icon: <MessageCircle className="h-4 w-4 text-violet-400" />,
            description: 'Number of submissions created',
            risk: accountData.totalPosts > 1000 ? 'medium' : 'low'
        },
        {
            name: 'Total Comments',
            value: accountData.totalComments,
            unit: '',
            icon: <MessageCircle className="h-4 w-4 text-indigo-400" />,
            description: 'Number of comments posted',
            risk: accountData.totalComments > 5000 ? 'medium' : 'low'
        },
        {
            name: 'Avg Response Time',
            value: accountData.avgResponseTime,
            unit: 'min',
            icon: <Clock className="h-4 w-4 text-purple-400" />,
            description: 'Average time to respond to comments',
            risk: accountData.avgResponseTime < 2 ? 'high' : (accountData.avgResponseTime < 5 ? 'medium' : 'low')
        },
        {
            name: 'Repeated Phrases',
            value: accountData.repeatedPhrases,
            unit: '',
            icon: <Repeat className="h-4 w-4 text-orange-400" />,
            description: 'Frequency of repeated content',
            risk: accountData.repeatedPhrases > 30 ? 'high' : (accountData.repeatedPhrases > 10 ? 'medium' : 'low')
        },
        {
            name: 'Report Count',
            value: accountData.reportCount,
            unit: '',
            icon: <Flag className="h-4 w-4 text-red-400" />,
            description: 'Number of times reported by users',
            risk: accountData.reportCount > 5 ? 'high' : (accountData.reportCount > 0 ? 'medium' : 'low')
        },
        {
            name: 'Similar Accounts',
            value: accountData.similarAccounts,
            unit: '',
            icon: <Users className="h-4 w-4 text-yellow-400" />,
            description: 'Accounts with similar behavior patterns',
            risk: accountData.similarAccounts > 2 ? 'high' : (accountData.similarAccounts > 0 ? 'medium' : 'low')
        },
        {
            name: 'Suspicious Activities',
            value: accountData.suspiciousActivities,
            unit: '',
            icon: <AlertTriangle className="h-4 w-4 text-red-400" />,
            description: 'Detected unusual behavior patterns',
            risk: accountData.suspiciousActivities > 50 ? 'high' : (accountData.suspiciousActivities > 20 ? 'medium' : 'low')
        },
    ];

    // Typing animation for row details
    useEffect(() => {
        if (expandedRow !== null) {
            const description = metrics[expandedRow].description;
            let current = '';
            let index = 0;

            const timer = setInterval(() => {
                if (index < description.length) {
                    current += description[index];
                    setTypingRows(prev => ({
                        ...prev,
                        [expandedRow]: current
                    }));
                    index++;
                } else {
                    clearInterval(timer);
                }
            }, 20);

            return () => clearInterval(timer);
        }
    }, [expandedRow, metrics]);

    const getRiskColor = (risk) => {
        switch (risk) {
            case 'high': return 'text-red-500';
            case 'medium': return 'text-yellow-500';
            case 'low': return 'text-green-500';
            default: return 'text-gray-500';
        }
    };

    const getRiskBadge = (risk) => {
        switch (risk) {
            case 'high':
                return <span className="px-1.5 py-0.5 bg-red-900 text-red-400 rounded text-[10px] font-mono">HIGH</span>;
            case 'medium':
                return <span className="px-1.5 py-0.5 bg-yellow-900 text-yellow-400 rounded text-[10px] font-mono">MED</span>;
            case 'low':
                return <span className="px-1.5 py-0.5 bg-green-900 text-green-400 rounded text-[10px] font-mono">LOW</span>;
            default:
                return null;
        }
    };

    return (
        <div className="card p-4">
            <div className="flex items-center mb-3">
                <Database className="h-5 w-5 text-green-400 mr-2" />
                <h3 className="text-lg font-mono text-green-400">ACCOUNT METRICS</h3>
            </div>

            <div className="border rounded border-gray-800 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-800 text-xs">
                    <thead className="bg-gray-900">
                        <tr>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-mono text-gray-400 uppercase tracking-wider">
                                Metric
                            </th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-mono text-gray-400 uppercase tracking-wider">
                                Value
                            </th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-mono text-gray-400 uppercase tracking-wider">
                                Risk
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-800">
                        {metrics.map((metric, index) => (
                            <React.Fragment key={index}>
                                <tr
                                    className={`cursor-pointer hover:bg-gray-700 transition-colors ${expandedRow === index ? 'bg-gray-900' : ''}`}
                                    onClick={() => setExpandedRow(expandedRow === index ? null : index)}
                                >
                                    <td className="px-4 py-2 whitespace-nowrap font-mono text-gray-300 flex items-center">
                                        <span className="mr-2">{metric.icon}</span>
                                        {metric.name}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap font-mono text-gray-300">
                                        {metric.value}{metric.unit && <span className="text-gray-500 ml-1">{metric.unit}</span>}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        {getRiskBadge(metric.risk)}
                                    </td>
                                </tr>
                                {expandedRow === index && (
                                    <tr className="bg-gray-900">
                                        <td colSpan={3} className="px-4 py-2 font-mono text-xs text-gray-400 animate-in">
                                            <div className="flex">
                                                <AlertCircle className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <div className="terminal-text">{typingRows[index] || ''}</div>
                                                    <div className="mt-1 flex items-center">
                                                        <span className={`font-bold ${getRiskColor(metric.risk)}`}>Risk level: {metric.risk.toUpperCase()}</span>
                                                        <span className="ml-2 h-2 w-2 rounded-full bg-gray-600 animate-pulse"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between mt-2 text-xs text-gray-500 font-mono">
                <span>ENTRIES: {metrics.length}</span>
                <span>ANALYSIS: COMPLETE</span>
            </div>
        </div>
    );
}; 