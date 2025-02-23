'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [text, setText] = useState('');
  const [length, setLength] = useState('short');
  const [style, setStyle] = useState('concise');
  const [summary, setSummary] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/Summarize', { text, length, style });
      setSummary(response.data);
    } catch (error) {
      console.error('Error summarizing text:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Text Summarization Application</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Text:</label>
          <textarea
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Length:</label>
          <select value={length} onChange={(e) => setLength(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Style:</label>
          <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="concise">Concise</option>
            <option value="detailed">Detailed</option>
            <option value="formal">Formal</option>
            <option value="informal">Informal</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">Summarize</button>
      </form>
      {summary && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">Summary:</h2>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}
    </div>
  );
}
