"use client";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Check, Copy, Code2 } from "lucide-react";

export const CodeBlock = ({ className, children, ...props }: any) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "text";
  const content = String(children).replace(/\n$/, "");

  /* Inline code — refined and minimal */
  const isInline = !match && !content.includes("\n");
  if (isInline) {
    return (
      <code className="rounded-md bg-neutral-800/90 px-2 py-0.5 font-mono text-[0.88em] text-emerald-300 ring-1 ring-neutral-700/50 backdrop-blur-sm">
        {children}
      </code>
    );
  }

  const copy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border border-neutral-800/80 bg-[#0d1117] shadow-2xl shadow-black/40 transition-all duration-300 hover:border-neutral-700/60 hover:shadow-emerald-500/5">
      
      {/* Ambient gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] via-transparent to-blue-500/[0.02]" />
      
      {/* Refined header bar */}
      <div className="relative flex items-center justify-between border-b border-neutral-800/60 bg-gradient-to-r from-[#161b22] to-[#0d1117] px-5 py-2.5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          {/* Professional code icon badge */}
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/20 to-blue-500/20 ring-1 ring-emerald-500/30">
            <Code2 className="h-4 w-4 text-emerald-400" />
          </div>
          <span className="font-mono text-xs font-medium tracking-wide text-neutral-400">
            {language}
          </span>
        </div>
        
        <button
          onClick={copy}
          className="flex h-8 items-center gap-2 rounded-lg bg-neutral-800/50 px-3 text-xs font-medium text-neutral-400 ring-1 ring-neutral-700/50 transition-all hover:bg-neutral-700/60 hover:text-white hover:ring-neutral-600"
          title={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Enhanced code display */}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        PreTag="div"
        showLineNumbers
        lineNumberStyle={{
          color: "#4b5563",
          paddingRight: "1.75em",
          textAlign: "right",
          fontSize: "0.875rem",
          userSelect: "none",
          minWidth: "3em",
          opacity: 0.6,
          fontWeight: 500,
        }}
        customStyle={{
          margin: 0,
          padding: "2rem 1.75rem",
          background: "transparent",
          fontSize: "1rem",
          lineHeight: "1.85",
          fontFamily:
            '"JetBrains Mono", "Fira Code", "Cascadia Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          fontFeatureSettings: '"liga" 1, "calt" 1, "zero" 1',
          letterSpacing: "0.015em",
          fontWeight: 450,
        }}
        codeTagProps={{
          style: {
            fontFamily: "inherit",
            textShadow: "0 0 2px rgba(255,255,255,0.12)",
          },
        }}
        {...props}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  );
};
