import React, { useState } from "react";
import {
  X,
  Copy,
  Check,
  Download,
  FileCode,
  Layers,
  Sparkles,
  ExternalLink,
  Sliders,
} from "lucide-react";
import {
  LOVABLE_MASTER_PROMPT,
  EXTERNAL_ASSETS_CHECKLIST,
  IMPLEMENTATION_SEQUENCE,
  CREATIVE_DIRECTION_SUMMARY,
} from "../data/lovablePrompt.ts";

interface PromptExportDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromptExportDrawer: React.FC<PromptExportDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"prompt" | "assets" | "sequence" | "direction">(
    "prompt"
  );
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(LOVABLE_MASTER_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownload = () => {
    const blob = new Blob([LOVABLE_MASTER_PROMPT], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hi-tables-lovable-master-prompt.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      {/* Backdrop click */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer Container */}
      <div className="w-full max-w-2xl bg-[#0C120E] text-white border-l border-white/10 flex flex-col h-full shadow-2xl overflow-hidden animate-slide-left">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-base text-white flex items-center gap-2">
                Lovable Master Prompt Studio
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-700/40">
                  Ready to Export
                </span>
              </h2>
              <p className="text-xs text-white/60">
                Complete, implementation-ready prompt specification for Hi Tables!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-white/10 bg-[#080D0A] text-xs font-medium">
          <button
            onClick={() => setActiveTab("prompt")}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === "prompt"
                ? "bg-emerald-800/50 text-white border border-emerald-600/40"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            Master Prompt
          </button>
          <button
            onClick={() => setActiveTab("direction")}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === "direction"
                ? "bg-emerald-800/50 text-white border border-emerald-600/40"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            Creative Direction
          </button>
          <button
            onClick={() => setActiveTab("assets")}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === "assets"
                ? "bg-emerald-800/50 text-white border border-emerald-600/40"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            Asset Inventory
          </button>
          <button
            onClick={() => setActiveTab("sequence")}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === "sequence"
                ? "bg-emerald-800/50 text-white border border-emerald-600/40"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            Rollout Sequence
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {activeTab === "prompt" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-3 text-xs text-emerald-200">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Contains complete architectural directives, tokens, and DOM boundaries.
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Prompt
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    title="Download Markdown"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="relative">
                <pre className="p-4 bg-black/60 border border-white/10 rounded-xl text-xs font-mono text-white/90 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-[580px]">
                  {LOVABLE_MASTER_PROMPT}
                </pre>
              </div>
            </div>
          )}

          {activeTab === "direction" && (
            <div className="space-y-4 bg-black/40 border border-white/10 rounded-xl p-5">
              <div className="prose prose-invert prose-sm">
                <pre className="p-4 bg-black/60 border border-white/10 rounded-xl text-xs font-mono text-white/90 whitespace-pre-wrap leading-relaxed">
                  {CREATIVE_DIRECTION_SUMMARY}
                </pre>
              </div>
            </div>
          )}

          {activeTab === "assets" && (
            <div className="space-y-4">
              <p className="text-xs text-white/70">
                Inventory of external assets required for the Hi Tables! digital experience:
              </p>
              <div className="space-y-3">
                {EXTERNAL_ASSETS_CHECKLIST.map((asset, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white text-sm">
                        {asset.name}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                        {asset.status}
                      </span>
                    </div>
                    <p className="text-xs text-white/60">{asset.description}</p>
                    <div className="pt-1 text-[11px] font-mono text-white/40 truncate">
                      {asset.url}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "sequence" && (
            <div className="space-y-4">
              <p className="text-xs text-white/70">
                Prioritized execution roadmap from full-screen hero to core touchpoints:
              </p>
              <div className="space-y-4">
                {IMPLEMENTATION_SEQUENCE.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2"
                  >
                    <h3 className="font-semibold text-emerald-400 text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-900/60 border border-emerald-700/60 flex items-center justify-center text-[10px] text-white">
                        {idx + 1}
                      </span>
                      {item.phase}
                    </h3>
                    <ul className="space-y-1 pl-7 list-disc text-xs text-white/75">
                      {item.tasks.map((task, tIdx) => (
                        <li key={tIdx}>{task}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-black/60 flex items-center justify-between text-xs text-white/60">
          <span>Target Platform: Lovable & Vite/React</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied Prompt to Clipboard
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Full Master Prompt
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
