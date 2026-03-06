import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='mt-2 mb-2 relative group/code'>
      <div className='bg-[#111111] border border-[#333333] rounded overflow-hidden relative'>
        {language && (
          <div className='text-xs text-[#999999] font-mono px-4 py-2 bg-[#1A1A1A] border-b border-[#333333] flex justify-between items-center'>
            <span>{language}</span>
          </div>
        )}
        <div className='p-1'>
          <SyntaxHighlighter
            language={language?.toLowerCase() || 'javascript'}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '1rem',
              background: 'transparent',
              fontSize: '0.875rem',
              lineHeight: '1.5',
            }}
            codeTagProps={{
              style: {
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              }
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={handleCopy}
          className='absolute top-2 right-2 p-1.5 text-[#999999] hover:text-[#00FF99] hover:bg-[#2A2A2A] border border-transparent hover:border-[#333333] rounded transition-colors opacity-0 group-hover/code:opacity-100'
          title='Copy code'
        >
          <FaCopy className='w-3.5 h-3.5' />
        </button>
        {copied && (
          <div className='absolute top-2 right-10 text-xs text-[#00FF99] font-mono bg-[#111111] px-2 py-1 border border-[#00FF99] rounded'>
            Copied!
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeBlock;
