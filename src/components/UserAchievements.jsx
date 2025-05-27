import React from 'react';
import { Trophy, Award, Star, Shield, Calendar, Medal } from 'lucide-react';

export const UserAchievements = ({ achievements = [], trophyCase = [], accountAge, verified }) => {
    const getYearsActive = (timestamp) => {
        if (!timestamp) return 0;
        const date = new Date(timestamp * 1000);
        const years = ((new Date() - date) / (1000 * 60 * 60 * 24 * 365)).toFixed(1);
        return years;
    };

    const getAchievementIcon = (achievement) => {
        if (achievement.includes('Post')) return <Star className="h-4 w-4 text-yellow-400" />;
        if (achievement.includes('Club')) return <Calendar className="h-4 w-4 text-blue-400" />;
        if (achievement.includes('Verified')) return <Shield className="h-4 w-4 text-green-400" />;
        return <Medal className="h-4 w-4 text-purple-400" />;
    };

    return (
        <div className="card p-4 h-100">
            <div className="flex items-center mb-3">
                <Trophy className="h-5 w-5 text-green-400 mr-2" />
                <h3 className="text-lg font-mono text-green-400">USER ACHIEVEMENTS</h3>
            </div>

            <div className="border-t border-gray-800 pt-3">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-900 p-3 rounded border border-gray-800">
                        <div className="text-xs font-mono text-gray-500 mb-2">ACHIEVEMENTS</div>
                        <div className="space-y-2">
                            {achievements.map((achievement, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        {getAchievementIcon(achievement)}
                                        <span className="text-xs font-mono text-gray-300 ml-2">
                                            {achievement}
                                        </span>
                                    </div>
                                    <div className="h-1.5 w-1.5 rounded-full bg-yellow-500"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-900 p-3 rounded border border-gray-800">
                        <div className="text-xs font-mono text-gray-500 mb-2">TROPHY CASE</div>
                        <div className="space-y-2">
                            {trophyCase.map((trophy, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Trophy className="h-4 w-4 text-yellow-400" />
                                        <span className="text-xs font-mono text-gray-300 ml-2">
                                            {trophy}
                                        </span>
                                    </div>
                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-gray-900 p-3 rounded border border-gray-800">
                        <div className="text-xs font-mono text-gray-500 mb-1">ACCOUNT AGE</div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-blue-400" />
                                <span className="text-sm font-mono text-gray-300 ml-2">
                                    {getYearsActive(accountAge)} Years
                                </span>
                            </div>
                            <div className="text-xs font-mono text-gray-500">
                                {new Date(accountAge * 1000).toLocaleDateString()}
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 p-3 rounded border border-gray-800">
                        <div className="text-xs font-mono text-gray-500 mb-1">VERIFICATION</div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Shield className={`h-4 w-4 ${verified ? 'text-green-400' : 'text-gray-500'}`} />
                                <span className="text-sm font-mono text-gray-300 ml-2">
                                    {verified ? 'Verified Account' : 'Unverified'}
                                </span>
                            </div>
                            {verified && (
                                <Award className="h-4 w-4 text-green-400 animate-pulse" />
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-4 p-2 bg-gray-900 rounded border border-gray-800">
                    <div className="flex justify-between items-center text-xs font-mono">
                        <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 mr-1" />
                            <span className="text-gray-500">Achievement Score</span>
                        </div>
                        <div className="text-green-400">
                            {achievements.length + trophyCase.length * 2} pts
                        </div>
                    </div>
                    <div className="mt-1 w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-green-500 to-yellow-500"
                            style={{ width: `${Math.min(((achievements.length + trophyCase.length * 2) / 20) * 100, 100)}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 