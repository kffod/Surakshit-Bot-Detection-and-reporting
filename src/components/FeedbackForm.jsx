import React, { useState } from 'react';
import { api } from '../services/api';
import { MessageSquare, Send, AlertCircle, CheckCircle, Terminal } from 'lucide-react';

export const FeedbackForm = ({ username, onSubmitSuccess }) => {
    const [feedback, setFeedback] = useState('');
    const [comment, setComment] = useState('');
    const [prediction, setPrediction] = useState('Positive');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await api.submitFeedback({
                username,
                feedback,
                comment,
                prediction
            });

            setFeedback('');
            setComment('');
            setPrediction('Positive');

            if (onSubmitSuccess) {
                onSubmitSuccess(response);
            }
        } catch (err) {
            setError('ERROR: Feedback transmission failed. Retry sequence initiated.');
            console.error('Error submitting feedback:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="card p-4">
            <div className="flex items-center mb-3">
                <Terminal className="h-5 w-5 text-green-400 mr-2" />
                <h3 className="text-lg font-mono text-green-400">SYSTEM FEEDBACK</h3>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-900/40 text-red-400 rounded-md text-sm font-mono border border-red-900 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-gray-900 border border-gray-800 rounded-md p-3">
                    <label htmlFor="prediction" className="block text-sm font-mono text-gray-400 mb-2">
                        // ANALYSIS ACCURACY CHECK
                    </label>
                    <select
                        id="prediction"
                        className="w-full bg-[#010c15] border border-gray-800 rounded p-2 font-mono text-sm text-green-400 focus:border-green-500 focus:ring-green-500"
                        value={prediction}
                        onChange={(e) => setPrediction(e.target.value)}
                    >
                        <option value="Positive">ACCURATE [System detected correctly]</option>
                        <option value="Negative">INACCURATE [System detected incorrectly]</option>
                        <option value="Unsure">UNCERTAIN [Unable to determine]</option>
                    </select>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-md p-3">
                    <label htmlFor="feedback" className="block text-sm font-mono text-gray-400 mb-2">
                        // FEEDBACK DATA
                    </label>
                    <div className="relative">
                        <div className="absolute top-3 left-3 text-green-500">
                            <MessageSquare className="h-4 w-4" />
                        </div>
                        <textarea
                            id="feedback"
                            rows={3}
                            className="w-full bg-[#010c15] border border-gray-800 rounded p-2 pl-9 font-mono text-sm text-green-400 focus:border-green-500 focus:ring-green-500"
                            placeholder="Enter your analysis feedback here..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-md p-3">
                    <label htmlFor="comment" className="block text-sm font-mono text-gray-400 mb-2">
                        // ADDITIONAL COMMENTS [OPTIONAL]
                    </label>
                    <textarea
                        id="comment"
                        rows={2}
                        className="w-full bg-[#010c15] border border-gray-800 rounded p-2 font-mono text-sm text-green-400 focus:border-green-500 focus:ring-green-500"
                        placeholder="Any additional information to report..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-xs font-mono text-gray-500">
                        SUBJECT: {username}
                    </div>

                    <button
                        type="submit"
                        className="hacker-btn py-2 px-4 rounded flex items-center"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center">
                                <div className="animate-spin mr-2 h-4 w-4 border-2 border-green-500 border-t-transparent rounded-full"></div>
                                <span className="font-mono text-sm">TRANSMITTING...</span>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <Send className="h-4 w-4 mr-2" />
                                <span className="font-mono text-sm">SUBMIT FEEDBACK</span>
                            </div>
                        )}
                    </button>
                </div>
            </form>

            <div className="mt-4 border-t border-gray-800 pt-3 text-xs font-mono text-gray-500 flex justify-between">
                <span>ENCRYPTION: ENABLED</span>
                <span>FEEDBACK ID: FBID-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
            </div>
        </div>
    );
}; 