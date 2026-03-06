import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='mt-2 mb-2 relative group/code'>
      <div className='bg-[#111111] border border-[#333333] rounded p-4 relative'>
        {language && (
          <div className='text-xs text-[#999999] font-mono mb-2 pb-2 border-b border-[#333333]'>
            {language}
          </div>
        )}
        <pre className='overflow-x-auto'>
          <code className='text-[#FFFFFF] font-mono text-sm leading-relaxed'>
            {code.split('\n').map((line, lineIdx) => {
              // Simple syntax highlighting (matches original logic)
              const highlighted = line
                .replace(/(const|let|var|function|if|else|return|class|import|export|from|default)/g, '<span class="text-[#00FF99]">$1</span>')
                .replace(/(["'`])((?:(?=(\\?))\3.)*?)\1/g, '<span class="text-[#FFFFFF]">$1$2$1</span>')
                .replace(/(\/\/.*$)/gm, '<span class="text-[#666666]">$1</span>');
              return (
                <div key={lineIdx} dangerouslySetInnerHTML={{ __html: highlighted || ' ' }} />
              );
            })}
          </code>
        </pre>
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
