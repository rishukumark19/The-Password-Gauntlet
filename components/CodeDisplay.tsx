
import React, { useState, useEffect } from 'react';
import { ClipboardIcon, CheckIcon } from './icons';

interface CodeDisplayProps {
  code: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
  };

  return (
    <div className="relative bg-gray-900 rounded-xl shadow-lg border border-gray-700">
      <div className="absolute top-2 right-2">
        <button
          onClick={handleCopy}
          className="p-2 bg-gray-700/80 rounded-lg hover:bg-gray-600 transition-colors text-gray-300 hover:text-white"
          aria-label="Copy code to clipboard"
        >
          {isCopied ? (
            <CheckIcon className="h-5 w-5 text-green-400" />
          ) : (
            <ClipboardIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="language-python font-mono text-gray-300">
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeDisplay;
