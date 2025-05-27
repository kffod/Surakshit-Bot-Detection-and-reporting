import React, { useState, useEffect } from 'react';
import { Badge, ShieldCheck, Calendar, MessageSquare, FileText, User, Check, ChevronUp, ChevronDown } from 'lucide-react';

export const UserProfile = ({ userData }) => {
    const [expanded, setExpanded] = useState(false);
    const [loadingAnimation, setLoadingAnimation] = useState(true);

    // Format date in a more "terminal" style
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Simulate loading of user data
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingAnimation(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // ASCII art avatar (fallback if image fails)
    const asciiAvatar = `
   ▄▄▄▄▄▄▄
  █       █
  █   ▄   █
  █ ▄█▀█▄ █
  █       █
   ▀▀▀▀▀▀▀
  `;

    return (
        <div className="card p-6 relative overflow-hidden">
            {loadingAnimation && (
                <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex flex-col items-center justify-center z-50">
                    <div className="text-green-500 font-mono text-sm animate-pulse mb-2">LOADING USER DATA</div>
                    <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 animate-[loading_1s_ease-in-out]" style={{ width: '100%' }}></div>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-start">
                <div className="flex items-start">
                    <div className="relative">
                        <div className="w-20 h-20 rounded border-2 border-green-500 overflow-hidden bg-gray-900 flex items-center justify-center">
                            {userData.profile_image ? (
                                <img
                                    src={userData.profile_image}
                                    alt={`${userData.name} profile`}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentNode.classList.add('font-mono', 'text-[6px]', 'text-green-500', 'whitespace-pre');
                                        e.target.parentNode.textContent = asciiAvatar;
                                    }}
                                />
                            ) : (
                                <div className="font-mono text-[6px] text-green-500 whitespace-pre">
                                    {asciiAvatar}
                                </div>
                            )}
                        </div>
                        <div className="absolute -top-1 -left-1 bg-gray-900 border border-green-500 rounded-full p-1">
                            <User className="h-3 w-3 text-green-400" />
                        </div>
                    </div>

                    <div className="ml-4">
                        <div className="flex items-center">
                            <h2 className="text-xl font-mono font-bold text-green-400">{userData.name}</h2>
                            {userData.verified && (
                                <div className="ml-2 bg-blue-900 border border-blue-500 rounded-full p-1">
                                    <ShieldCheck className="h-3 w-3 text-blue-400" />
                                </div>
                            )}
                        </div>
                        <p className="text-gray-400 font-mono text-sm">/u/{userData.screen_name}</p>

                        <div className="mt-2 flex flex-wrap gap-2">
                            {userData.achievements.map((achievement, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-1 rounded text-xs font-mono bg-gray-800 text-green-400 border border-green-800"
                                >
                                    <Badge className="w-3 h-3 mr-1 text-green-500" />
                                    {achievement}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setExpanded(!expanded)}
                    className="bg-gray-800 text-green-400 p-1 rounded hover:bg-gray-700 transition-colors"
                >
                    {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
            </div>

            {expanded && (
                <div className="mt-6 pt-4 border-t border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <div className="p-2 bg-gray-800 rounded">
                                <Calendar className="w-4 h-4 text-green-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-xs text-gray-400 font-mono">ACCOUNT CREATED</p>
                                <p className="font-mono text-green-400">{formatDate(userData.cake_day)}</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="p-2 bg-gray-800 rounded">
                                <MessageSquare className="w-4 h-4 text-green-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-xs text-gray-400 font-mono">COMMENT KARMA</p>
                                <p className="font-mono text-green-400">{userData.comment_karma.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="p-2 bg-gray-800 rounded">
                                <FileText className="w-4 h-4 text-green-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-xs text-gray-400 font-mono">POST KARMA</p>
                                <p className="font-mono text-green-400">{userData.post_karma.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="p-2 bg-gray-800 rounded">
                                <Check className="w-4 h-4 text-green-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-xs text-gray-400 font-mono">ACHIEVEMENTS</p>
                                <p className="font-mono text-green-400">{userData.trophy_case.join(', ')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Terminal-style log at the bottom */}
            <div className="mt-4 font-mono text-xs text-gray-500 border-t border-gray-800 pt-3">
                <div>$ user_data --fetch --id={userData.screen_name}</div>
                <div className="text-green-500">SUCCESS: User profile accessed</div>
            </div>
        </div>
    );
}; 