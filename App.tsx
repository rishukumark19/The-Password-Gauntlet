
import React, { useState, useCallback } from 'react';
import { generatePythonScript } from './services/geminiService';
import CodeDisplay from './components/CodeDisplay';
import Loader from './components/Loader';
import { PythonIcon } from './components/icons';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>(
    'Generate a Python script for a text-based Hangman game that allows the user to guess letters until the word is completed or the attempts are over.'
  );
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateScript = useCallback(async () => {
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedCode('');

    try {
      const script = await generatePythonScript(prompt);
      setGeneratedCode(script);
    } catch (err) {
      setError('Failed to generate script. Please ensure your API key is configured correctly.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
            AI Python Script Generator
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Describe the Python script you need, and let AI bring it to life.
          </p>
        </header>

        <main className="bg-gray-800/50 p-6 rounded-2xl shadow-2xl shadow-blue-500/10 border border-gray-700">
          <div className="flex flex-col space-y-4">
            <label htmlFor="prompt-input" className="text-lg font-semibold text-gray-300">
              Script Description
            </label>
            <textarea
              id="prompt-input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-32 p-4 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow duration-300 resize-none placeholder-gray-500"
              placeholder="e.g., A script to scrape headlines from a news website"
            />
            <button
              onClick={handleGenerateScript}
              disabled={isLoading || !prompt}
              className="w-full sm:w-auto self-end px-8 py-3 bg-blue-600 font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105"
            >
              {isLoading ? (
                <>
                  <Loader />
                  <span>Generating...</span>
                </>
              ) : (
                <span>Generate Script</span>
              )}
            </button>
          </div>
          
          <div className="mt-8">
            {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}
            
            {generatedCode && (
              <div className="mt-6">
                <div className="flex items-center space-x-2 mb-2">
                   <PythonIcon className="h-6 w-6 text-green-400" />
                   <h2 className="text-2xl font-bold text-gray-200">Generated Hangman Script</h2>
                </div>
                <CodeDisplay code={generatedCode} />
              </div>
            )}
             {!isLoading && !generatedCode && !error && (
                <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-700 rounded-lg">
                    <p className="text-xl">Your generated Python script will appear here.</p>
                </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
