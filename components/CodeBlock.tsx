"use client"

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Using VS Code Dark Plus for that premium developer look
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Check, Copy, Terminal } from 'lucide-react';

export const CodeBlock = ({ className, children, ...props }: any) => {
  const [isCopied, setIsCopied] = useState(false);

  // 1. Extract Language
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'text';
  const content = String(children).replace(/\n$/, '');

  // 2. Inline Code Handling (Small badges)
  const isInline = !match && !content.includes('\n');
  if (isInline) {
    return (
      <code className="px-1.5 py-0.5 rounded-md bg-[#2d2d2d] text-[#ce9178] font-mono text-[0.9em] border border-[#3e3e3e]">
        {children}
      </code>
    );
  }

  // 3. Copy Logic
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    // CONTAINER: Deep Dark Background (#1e1e1e) to match VS Code
    <div className="group relative my-8 rounded-xl overflow-hidden bg-[#1e1e1e] border border-[#333333] shadow-2xl">
      
      {/* HEADER: Dark Matte Grey */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-[#333333]">
        
        {/* Mac-style Dots */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" /> 
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" /> 
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" /> 
        </div>

        {/* Language Label */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2 opacity-70">
           <Terminal className="w-3.5 h-3.5 text-gray-400" />
           <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest font-mono select-none">
             {language}
           </span>
        </div>

        {/* Copy Button */}
        <button
          onClick={copyToClipboard}
          className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
            isCopied 
              ? "bg-[#27c93f]/20 text-[#27c93f]" 
              : "hover:bg-white/10 text-gray-400 hover:text-white"
          }`}
          title={isCopied ? "Copied!" : "Copy code"}
        >
          {isCopied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* SYNTAX HIGHLIGHTER */}
      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          PreTag="div"
          showLineNumbers={true} // Optional: Remove if you want it cleaner
          lineNumberStyle={{
            minWidth: "2.5em",
            paddingRight: "1em",
            color: "#858585", // Subtle VS Code grey for numbers
            textAlign: "right",
            fontSize: "0.85em"
          }}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            fontSize: '0.95rem', // ~15.2px (Excellent readability)
            lineHeight: '1.7',    // Relaxed line height
            background: 'transparent', // Important: Let container bg show
            fontFamily: 'var(--font-mono), monospace', 
          }}
          codeTagProps={{
            style: {
              fontFamily: 'inherit',
            }
          }}
          {...props}
        >
          {content}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};