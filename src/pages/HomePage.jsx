import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Layout } from '../components/Layout';
import { SearchForm } from '../components/SearchForm';
import { UserProfile } from '../components/UserProfile';
import { ActivityPieChart } from '../components/ActivityPieChart';
import { EnhancedConfidenceGauge } from '../components/EnhancedConfidenceGauge';
import { AccountMetrics } from '../components/AccountMetrics';
import { BehaviorPatterns } from '../components/BehaviorPatterns';
import { ModelMetricsCard } from '../components/ModelMetricsCard';
import { FeedbackForm } from '../components/FeedbackForm';
import { UserBehaviorRadar } from '../components/UserBehaviorRadar';
import { ActivityTimeline } from '../components/ActivityTimeline';
import { BehaviorTimeline } from '../components/BehaviorTimeline';
import { ContentAnalysis } from '../components/ContentAnalysis';
import { AlertTriangle, Download, Shield, Terminal } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import { UserAchievements } from '../components/UserAchievements';

export const HomePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [report, setReport] = useState(null);
    const [error, setError] = useState('');
    const [feedbackSuccess, setFeedbackSuccess] = useState('');
    const [consoleLines, setConsoleLines] = useState([]);
    const [analyticMode, setAnalyticMode] = useState('default');

    useEffect(() => {
        // Initial console effect
        const initialConsole = [
            { text: "INITIALIZING SYSTEM...", delay: 500 },
            { text: "LOADING NEURAL NETWORK MODULES...", delay: 1000 },
            { text: "CALIBRATING BOT DETECTION ALGORITHMS...", delay: 1500 },
            { text: "REDDIT BOT DETECTOR V1.0 READY", delay: 2000 },
            { text: "INPUT USERNAME TO BEGIN ANALYSIS", delay: 2500 },
        ];

        let timer = 0;
        initialConsole.forEach((line, index) => {
            timer += line.delay;
            setTimeout(() => {
                setConsoleLines(prev => [...prev, line.text]);
            }, timer);
        });

        return () => clearTimeout(timer);
    }, []);

    const addConsoleText = (text) => {
        setConsoleLines(prev => [...prev, text]);
    };

    const handleSearch = async (username) => {
        setIsLoading(true);
        setError('');
        setUserData(null);
        setReport(null);
        setFeedbackSuccess('');
        setConsoleLines([]);

        // Add console effect for searching
        addConsoleText(`INITIATING SCAN: ${username}`);

        setTimeout(() => addConsoleText("RETRIEVING USER DATA..."), 500);

        try {
            // Step 1: Get user data
            setTimeout(() => addConsoleText("CONNECTING TO REDDIT API..."), 1000);

            const userData = await api.predict(username);
            setUserData(userData);

            setTimeout(() => addConsoleText("USER DATA RETRIEVED SUCCESSFULLY"), 1500);
            setTimeout(() => addConsoleText("GENERATING BEHAVIOR ANALYSIS..."), 2000);

            // Step 2: Generate report
            const reportResponse = await api.generateReport(userData);
            setReport(reportResponse.report);

            setTimeout(() => addConsoleText("ANALYSIS COMPLETE"), 2500);
            setTimeout(() => addConsoleText(`CONFIDENCE: ${reportResponse.report.humanConfidence > reportResponse.report.botConfidence ? 'HUMAN' : 'BOT'} ACCOUNT DETECTED`), 3000);

        } catch (err) {
            console.error('Error analyzing account:', err);
            setError('ERROR: ANALYSIS FAILED. RETRY OPERATION OR CHECK USERNAME VALIDITY.');
            setTimeout(() => addConsoleText("ERROR IN ANALYSIS SEQUENCE"), 1000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFeedbackSubmit = (response) => {
        setFeedbackSuccess('FEEDBACK RECEIVED // THANK YOU FOR YOUR INPUT');
        setTimeout(() => setFeedbackSuccess(''), 5000);
    };

    const generatePDF = async () => {
        addConsoleText("GENERATING PDF REPORT...");

        const doc = new jsPDF();
        const reportElement = document.getElementById('report-container');

        if (!reportElement) return;

        const canvas = await html2canvas(reportElement);
        const imgData = canvas.toDataURL('image/png');

        // A4 dimensions
        const imgWidth = 210;
        const imgHeight = canvas.height * imgWidth / canvas.width;

        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        doc.save(`${userData.name}-report.pdf`);

        addConsoleText("PDF EXPORT COMPLETE");
    };

    return (
        <Layout>
            <div className="space-y-6">
                {/* Terminal console effect */}
                <div className="card p-4 font-mono text-sm text-green-400 max-h-40 overflow-y-auto">
                    <div className="flex items-center mb-2">
                        <Terminal className="h-5 w-5 mr-2" />
                        <div className="text-xs text-gray-400">SYSTEM CONSOLE</div>
                    </div>
                    <div className="border-t border-gray-800 pt-2">
                        {consoleLines.map((line, index) => (
                            <div key={index} className="py-0.5">
                                <span className="text-gray-500 mr-2">[{new Date().toLocaleTimeString()}]</span>
                                {line}
                            </div>
                        ))}
                        <div className="h-5 w-2 bg-green-500 inline-block animate-pulse"></div>
                    </div>
                </div>

                <SearchForm onSearch={handleSearch} isLoading={isLoading} />

                {error && (
                    <div className="card p-4 flex items-start border border-red-900">
                        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-red-400 font-mono">{error}</p>
                            <p className="text-xs text-gray-500 mt-1 font-mono">ERROR CODE: 0x{Math.floor(Math.random() * 1000).toString(16).padStart(3, '0').toUpperCase()}</p>
                        </div>
                    </div>
                )}

                {userData && report && (
                    <div id="report-container" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <Shield className="h-6 w-6 text-green-400 mr-2" />
                                <h2 className="text-xl font-mono text-green-400">ANALYSIS RESULTS</h2>
                            </div>

                            <div className="flex space-x-3">
                                <div className="flex space-x-2 mr-2">
                                    <button
                                        onClick={() => setAnalyticMode('default')}
                                        className={`px-2 py-1 text-xs font-mono rounded ${analyticMode === 'default' ? 'bg-green-900 text-green-400 border border-green-700' : 'bg-gray-900 text-gray-500 border border-gray-800'}`}
                                    >
                                        DEFAULT
                                    </button>
                                    <button
                                        onClick={() => setAnalyticMode('dark')}
                                        className={`px-2 py-1 text-xs font-mono rounded ${analyticMode === 'dark' ? 'bg-green-900 text-green-400 border border-green-700' : 'bg-gray-900 text-gray-500 border border-gray-800'}`}
                                    >
                                        DARK OPS
                                    </button>
                                </div>

                                <button
                                    onClick={generatePDF}
                                    className="hacker-btn py-1.5 px-3 rounded text-xs flex items-center"
                                >
                                    <Download className="h-3.5 w-3.5 mr-1.5" />
                                    EXPORT REPORT
                                </button>
                            </div>
                        </div>

                        <UserProfile userData={userData} />

                        <div className="grid grid-cols-2 gap-6">
                            {/* First Row */}
                            <EnhancedConfidenceGauge
                                botConfidence={report.botConfidence}
                                humanConfidence={report.humanConfidence}
                            />
                            <ActivityPieChart
                                normalActivity={report?.normalActivity || 60}
                                suspiciousActivity={report?.suspiciousActivity || 20}
                                repeatedActivity={report?.repeatedActivity || 20}
                            />

                            {/* Second Row */}
                            <UserBehaviorRadar accountData={{
                                totalPosts: userData.totalPosts || 0,
                                totalComments: userData.totalComments || 0,
                                avgResponseTime: userData.avgResponseTime || 0,
                                reportCount: userData.reportCount || 0,
                                repeatedPhrases: userData.repeatedPhrases || 0,
                                accountAge: userData.accountAge || 0,
                                similarAccounts: userData.similarAccounts || 0
                            }} />
                            <ActivityTimeline
                                activityScore={report.activityScore || 50}
                                suspiciousActivities={report.suspiciousActivities || 0}
                            />

                            {/* Third Row */}
                            <ModelMetricsCard
                                accuracy={report?.modelMetrics?.accuracy || 92}
                                precision={report?.modelMetrics?.precision || 94}
                                recall={report?.modelMetrics?.recall || 91}
                                activityScore={report?.activityScore || 6.2}
                            />
                            <AccountMetrics
                                accountData={{
                                    accountAge: userData?.account_age || 0,
                                    totalPosts: userData?.total_posts || 0,
                                    totalComments: userData?.total_comments || 0,
                                    avgResponseTime: report?.avgResponseTime || 0,
                                    repeatedPhrases: report?.repeatedPhrases || 0,
                                    reportCount: report?.reportCount || 0,
                                    similarAccounts: report?.similarAccounts || 0,
                                    suspiciousActivities: report?.suspiciousActivities || 0
                                }}
                            />

                            {/* Fourth Row - New Components */}
                            <BehaviorTimeline activityData={report?.hourlyActivity || []} />
                            <ContentAnalysis contentData={report?.contentAnalysis || null} />

                            {/* Fifth Row - Achievements and Additional Info */}
                            <UserAchievements
                                achievements={userData?.achievements || []}
                                trophyCase={userData?.trophy_case || []}
                                accountAge={userData?.cake_day}
                                verified={userData?.verified}
                            />
                            <div className="card p-4 h-100">
                                <div className="flex items-center mb-3">
                                    <Shield className="h-5 w-5 text-green-400 mr-2" />
                                    <h3 className="text-lg font-mono text-green-400">BEHAVIOR PATTERNS</h3>
                                </div>
                                <div className="border-t border-gray-800 pt-3">
                                    <div className="space-y-3">
                                        {report?.behaviorPatterns?.map((pattern, index) => (
                                            <div key={index} className="bg-gray-900 p-3 rounded border border-gray-800">
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="flex items-center">
                                                        <div className={`h-2 w-2 rounded-full ${pattern.isSuspicious ? 'bg-red-500' : 'bg-green-500'} mr-2`}></div>
                                                        <span className="text-xs font-mono text-gray-300">{pattern.name}</span>
                                                    </div>
                                                    {pattern.isSuspicious && (
                                                        <AlertTriangle className="h-4 w-4 text-red-500" />
                                                    )}
                                                </div>
                                                <p className="text-xs font-mono text-gray-500">{pattern.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card p-4">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className={`w-4 h-4 rounded-full ${report.botConfidence > 50 ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                <h3 className="text-lg font-mono text-green-400">
                                    {report.botConfidence > 50 ? 'BOT ACCOUNT DETECTED' : 'HUMAN ACCOUNT VERIFIED'}
                                </h3>
                            </div>
                            <p className="font-mono text-sm text-gray-300">{report.analysisResult}</p>
                            <div className="mt-4 p-4 bg-[rgba(1,22,39,0.8)] border border-green-900 rounded-md">
                                <h4 className="text-sm font-mono text-green-400 mb-1">// KEY INDICATORS</h4>
                                <p className="text-sm font-mono text-gray-300">{report.keyIndicators}</p>
                            </div>

                            <div className="mt-3 flex justify-between text-xs font-mono text-gray-500">
                                <span>SCAN ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
                                <span>CONFIDENCE: {Math.max(report.botConfidence, report.humanConfidence)}%</span>
                            </div>
                        </div>

                        {feedbackSuccess ? (
                            <div className="card p-4 border border-green-900">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                    <p className="text-sm text-green-400 font-mono">{feedbackSuccess}</p>
                                </div>
                            </div>
                        ) : (
                            <FeedbackForm
                                username={userData.screen_name}
                                onSubmitSuccess={handleFeedbackSubmit}
                            />
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}; 