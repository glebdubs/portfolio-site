"use client";

import { useState } from "react";
import { Monitor, FileText, Bell, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommandCenterPage from "./command-center/page";

export default function TacticalDashboard() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    // Added 'overflow-hidden' here to kill the outer scrollbar
    <div
      className="flex flex-col h-screen bg-neutral-950 text-neutral-200 overflow-hidden"
      style={{ zoom: "130%" }}
    >
      {/* Header - Stays fixed because of flex-col + h-screen */}
      <header className="h-20 bg-neutral-900 border-b border-neutral-700 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-12">
          <div>
            <h1 className="text-orange-500 font-bold text-lg tracking-tighter">
              TACTICAL OPS{" "}
              <span className="text-neutral-500 font-mono ml-2 text-xs">
                v2.1.7
              </span>
            </h1>
          </div>

          <nav className="flex items-center gap-4">
            <button
              onClick={() => setActiveSection("overview")}
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-bold transition-all ${
                activeSection === "overview"
                  ? "bg-orange-500/10 text-orange-500 border border-orange-500/50"
                  : "text-neutral-500 hover:text-neutral-200"
              }`}
            >
              <Monitor className="w-4 h-4" />
              COMMAND
            </button>

            <a
              href="/RESUME.pdf"
              download="GLEB_DUBININ_RESUME.PDF"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded text-sm font-bold text-neutral-500 hover:text-white transition-all hover:bg-neutral-800"
            >
              <FileText className="w-4 h-4" />
              RESUME
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          {/* Live Status Indicator */}
          <div className="hidden md:flex items-center gap-4 text-[11px] font-mono text-neutral-500 border-r border-neutral-700 pr-6">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              SYSTEM ONLINE
            </span>
            <span>
              UTC: {new Date().getUTCHours()}:{new Date().getUTCMinutes()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-neutral-400 hover:text-orange-500"
            >
              <Bell className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-neutral-400 hover:text-orange-500"
            >
              <RefreshCw className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-neutral-950 custom-scrollbar">
        {activeSection === "overview" && <CommandCenterPage />}
      </main>
    </div>
  );
}
