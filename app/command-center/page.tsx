"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DateTimeLabel from "@/components/ui/date-time-label";
import CursorTraceText from "@/components/ui/hover-text-effect";

// Types for the LeetCode API response
interface LeetCodeStats {
  status: string;
  message: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
  submissionCalendar: Record<string, number>;
}

function SystemStatusPanel() {
  const [time, setTime] = useState(new Date());
  const [uptime, setUptime] = useState(0); // seconds since page load
  const [cpu, setCpu] = useState(12);
  const [mem, setMem] = useState(34);

  useEffect(() => {
    const start = Date.now();
    const tick = setInterval(() => {
      setTime(new Date());
      setUptime(Math.floor((Date.now() - start) / 1000));
      // gently drift the fake readings so they feel alive
      setCpu((prev) =>
        Math.min(99, Math.max(5, prev + (Math.random() - 0.48) * 4)),
      );
      setMem((prev) =>
        Math.min(99, Math.max(20, prev + (Math.random() - 0.5) * 2)),
      );
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const uptimeStr = `${pad(Math.floor(uptime / 3600))}:${pad(Math.floor((uptime % 3600) / 60))}:${pad(uptime % 60)}`;

  const Bar = ({ value }: { value: number }) => {
    const filled = Math.round(value / 10);
    return (
      <span className="font-mono text-xs">
        <span className="text-orange-500">{"█".repeat(filled)}</span>
        <span className="text-neutral-700">{"█".repeat(10 - filled)}</span>
        <span className="text-neutral-400 ml-2">{Math.round(value)}%</span>
      </span>
    );
  };

  return (
    <div className="font-mono text-xs space-y-3">
      {/* Clock */}
      <div className="text-center py-2 border border-neutral-700 rounded">
        <div className="text-2xl text-white tracking-widest">
          {pad(time.getHours())}:{pad(time.getMinutes())}:
          {pad(time.getSeconds())}
        </div>
        <div className="text-neutral-500 text-xs mt-1">
          {time.toLocaleDateString("en-AU", {
            weekday: "long",
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Uptime */}
      <div className="flex justify-between items-center px-1">
        <span className="text-neutral-500">UPTIME</span>
        <span className="text-green-400">{uptimeStr}</span>
      </div>

      {/* CPU */}
      <div className="space-y-1 px-1">
        <div className="flex justify-between">
          <span className="text-neutral-500">CPU</span>
        </div>
        <Bar value={cpu} />
      </div>

      {/* MEM */}
      <div className="space-y-1 px-1">
        <div className="flex justify-between">
          <span className="text-neutral-500">MEM</span>
        </div>
        <Bar value={mem} />
      </div>

      {/* Static info */}
      <div className="border-t border-neutral-800 pt-2 space-y-1 px-1 text-neutral-600">
        <div className="flex justify-between">
          <span>HOST</span>
          <span className="text-neutral-400">glebdubs.dev</span>
        </div>
        <div className="flex justify-between">
          <span>ENV</span>
          <span className="text-neutral-400">Next.js / Vercel</span>
        </div>
        <div className="flex justify-between">
          <span>LOCATION</span>
          <span className="text-neutral-400">Adelaide, AU</span>
        </div>
      </div>
    </div>
  );
}

export default function CommandCenterPage() {
  // Helper function to format numbers with hacker-style padding
  const formatHackerNumber = (num: number): string => {
    return num.toString().padStart(3, "0");
  };

  return (
    <div
      className="p-6 space-y-6 bg-neutral-950"
      // style={{
      //   transform: "scale(1)",
      //   transformOrigin: "top left",
      //   width: "83.33%",
      // }}
    >
      {/* Main Dashboard Grid */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Mission Activity Chart */}
        {/* Capability Overview */}
        <Card className="lg:col-span-8 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-l font-large text-neutral-200 tracking-wider">
              GLEB DUBININ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Bio blurb */}
            <p className="text-xs text-neutral-400 leading-relaxed border-l-2 border-orange-500 pl-3">
              Software engineer focused on{" "}
              <span className="text-white font-mono">
                high-performance systems
              </span>{" "}
              and writing code that is fast, lean, and close to the metal.
              Particular interest in{" "}
              <span className="text-orange-500 font-mono">
                graphics programming
              </span>{" "}
              and <span className="text-orange-500 font-mono">OS design</span> —
              areas where every byte and every cycle counts.
            </p>

            {/* Skills grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-neutral-800 rounded p-3 hover:bg-neutral-700 transition-colors">
                <div className="text-xs text-orange-500 font-mono font-bold mb-1">
                  C++
                </div>
                <div className="text-xs text-neutral-500 mb-1">
                  Primary Language
                </div>
                <div className="text-xs text-neutral-400">
                  Memory management, template metaprogramming, SIMD, zero-cost
                  abstractions
                </div>
              </div>

              <div className="bg-neutral-800 rounded p-3 hover:bg-neutral-700 transition-colors">
                <div className="text-xs text-orange-500 font-mono font-bold mb-1">
                  GRAPHICS PROGRAMMING
                </div>
                <div className="text-xs text-neutral-500 mb-1">
                  Rendering Systems
                </div>
                <div className="text-xs text-neutral-400">
                  3D renderers, rasterisation pipelines, real-time rendering,
                  shader logic
                </div>
              </div>

              <div className="bg-neutral-800 rounded p-3 hover:bg-neutral-700 transition-colors">
                <div className="text-xs text-orange-500 font-mono font-bold mb-1">
                  OS & SYSTEMS
                </div>
                <div className="text-xs text-neutral-500 mb-1">
                  Low-Level Design
                </div>
                <div className="text-xs text-neutral-400">
                  Kernel concepts, memory models, process scheduling, bare-metal
                  environments
                </div>
              </div>

              <div className="bg-neutral-800 rounded p-3 hover:bg-neutral-700 transition-colors">
                <div className="text-xs text-orange-500 font-mono font-bold mb-1">
                  PERFORMANCE ENGINEERING
                </div>
                <div className="text-xs text-neutral-500 mb-1">
                  Optimisation
                </div>
                <div className="text-xs text-neutral-400">
                  Cache efficiency, low memory footprints, profiling,
                  algorithmic complexity
                </div>
              </div>

              <div className="bg-neutral-800 rounded p-3 hover:bg-neutral-700 transition-colors">
                <div className="text-xs text-orange-500 font-mono font-bold mb-1">
                  PYTHON
                </div>
                <div className="text-xs text-neutral-500 mb-1">
                  Scripting & Prototyping
                </div>
                <div className="text-xs text-neutral-400">
                  Data analysis, financial modelling, automation, rapid
                  experimentation
                </div>
              </div>

              <div className="bg-neutral-800 rounded p-3 hover:bg-neutral-700 transition-colors">
                <div className="text-xs text-orange-500 font-mono font-bold mb-1">
                  TYPESCRIPT / WEB
                </div>
                <div className="text-xs text-neutral-500 mb-1">Frontend</div>
                <div className="text-xs text-neutral-400">
                  React, Next.js, Tailwind — building interfaces when the
                  situation calls for it
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* LeetCode Stats Overview */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700 max-h-[500px]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
                LEETCODE STATS
              </CardTitle>
              {<div className="w-2 h-2 bg-green-500 rounded-full"></div>}
            </div>
            <CardTitle className="text-sm font-small text-neutral-500 tracking-wider">
              AS OF 20-02-26
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-mono">
                  {"241"}
                </div>
                <div className="text-xs text-neutral-500">Problems Solved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-mono">
                  {"59.4%"}
                </div>
                <div className="text-xs text-neutral-500">Acceptance Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-mono">
                  {"727"}
                </div>
                <div className="text-xs text-neutral-500">Contribution Pts</div>
              </div>
            </div>

            {/* Global Rank - Separate Row */}
            <div className="border-l-2 border-orange-500 pl-3 bg-neutral-800 p-3 rounded mb-4">
              <div className="text-xs text-neutral-300 font-mono mb-1">
                GLOBAL RANKING
              </div>
              <div className="text-xl text-white font-mono">{"583,146"}</div>
              <div className="text-xs text-neutral-500">
                {"Top 22.92%, or something like that"}
              </div>
            </div>

            {/* Difficulty Breakdown */}
            <div className="space-y-2 mb-4">
              <div className="text-xs text-neutral-300 font-medium tracking-wider mb-2">
                DIFFICULTY BREAKDOWN
              </div>

              {/* Easy Problems */}
              <div className="flex items-center justify-between p-2 bg-neutral-800 rounded hover:bg-neutral-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div>
                    <div className="text-xs text-white font-mono">EASY</div>
                    <div className="text-xs text-neutral-500">{"84 / 927"}</div>
                  </div>
                </div>
                <div className="text-sm font-mono text-white">
                  {`${((84 / 927) * 100).toFixed(0)}%`}
                </div>
              </div>

              {/* Medium Problems */}
              <div className="flex items-center justify-between p-2 bg-neutral-800 rounded hover:bg-neutral-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <div>
                    <div className="text-xs text-white font-mono">MEDIUM</div>
                    <div className="text-xs text-neutral-500">
                      {"114 / 2010"}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-mono text-white">
                  {`${((114 / 2010) * 100).toFixed(0)}%`}
                </div>
              </div>

              {/* Hard Problems */}
              <div className="flex items-center justify-between p-2 bg-neutral-800 rounded hover:bg-neutral-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div>
                    <div className="text-xs text-white font-mono">HARD</div>
                    <div className="text-xs text-neutral-500">{"43 / 909"}</div>
                  </div>
                </div>
                <div className="text-sm font-mono text-white">
                  {`${((43 / 909) * 100).toFixed(0)}%`}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Activity Log */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700 max-h-[500px] overflow-y-auto">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
              ACTIVITY LOG
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 overflow-y-auto">
              {/* 3d renderer */}
              <div className="text-xs border-l-2 border-orange-500 pl-3 hover:bg-neutral-800 p-2 rounded transition-colors">
                <div className="text-neutral-500 font-mono">
                  25/12/2025 09:29
                </div>
                <div className="text-white">
                  <a
                    href="https://github.com/ShashwatSingh67/oop-project/tree/TradingSysController"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Used Apple's{" "}
                    <span className="text-orange-500 font-mono">Metal API</span>{" "}
                    for a 3D rendered{" "}
                    <span className="text-orange-500 font-mono">
                      Boid Simulation
                    </span>
                    .
                  </a>
                </div>
              </div>

              {/* secure shell */}
              <div className="text-xs border-l-2 border-orange-500 pl-3 hover:bg-neutral-800 p-2 rounded transition-colors">
                <div className="text-neutral-500 font-mono">
                  25/12/2025 09:29
                </div>
                <div className="text-white">
                  <a
                    href="https://github.com/ShashwatSingh67/oop-project/tree/TradingSysController"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Created an asymetrically encrypted{" "}
                    <span className="text-orange-500 font-mono">
                      Custom Secure Shell
                    </span>{" "}
                    using C++ and OpenSSL.
                  </a>
                </div>
              </div>

              {/* stock exch */}
              <div className="text-xs border-l-2 border-orange-500 pl-3 hover:bg-neutral-800 p-2 rounded transition-colors">
                <div className="text-neutral-500 font-mono">
                  27/11/2025 09:29
                </div>
                <div className="text-white">
                  <a
                    href="https://github.com/ShashwatSingh67/oop-project/tree/TradingSysController"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Developed a{" "}
                    <span className="text-orange-500 font-mono">
                      Paper Stock Exchange
                    </span>{" "}
                    in a group project using C++ and Qt.
                  </a>
                </div>
              </div>

              {/* Hand-crafted this website */}
              <div className="text-xs border-l-2 border-orange-500 pl-3 hover:bg-neutral-800 p-2 rounded transition-colors">
                <div className="text-neutral-500 font-mono">
                  25/06/2025 09:29
                </div>
                <div className="text-white">
                  <a
                    href="https://github.com/glebdubs/portfolio-site"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-orange-500 font-mono">
                      Hand-crafted this website
                    </span>{" "}
                    with Vercel, typescript and git.
                  </a>
                </div>
              </div>

              {/* Black-Scholes Option Pricer */}
              <div className="text-xs border-l-2 border-orange-500 pl-3 hover:bg-neutral-800 p-2 rounded transition-colors">
                <div className="text-neutral-500 font-mono">
                  24/06/2025 22:55
                </div>
                <div className="text-white">
                  Developed a{" "}
                  <a
                    href="https://gdu-blackscholes.streamlit.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 font-mono hover:underline"
                  >
                    Black-Scholes model Option Pricer
                  </a>{" "}
                  with StreamLit and yFinance.
                </div>
              </div>

              {/* Uni of Adelaide */}
              <div className="text-xs border-l-2 border-orange-500 pl-3 hover:bg-neutral-800 p-2 rounded transition-colors">
                <div className="text-neutral-500 font-mono">
                  01/02/2025 08:12
                </div>
                <div className="text-white">
                  Started attending the{" "}
                  <span className="text-orange-500 font-mono">
                    Uni of Adelaide
                  </span>{" "}
                  doing Software Engineering
                </div>
              </div>

              {/* Tutor */}
              <div className="text-xs border-l-2 border-orange-500 pl-3 hover:bg-neutral-800 p-2 rounded transition-colors">
                <div className="text-neutral-500 font-mono">
                  08/01/2025 21:33
                </div>
                <div className="text-white">
                  Working as a{" "}
                  <span className="text-orange-500 font-mono">tutor</span> in
                  Adelaide.
                </div>
              </div>

              {/* ATAR */}
              <div className="text-xs border-l-2 border-orange-500 pl-3 hover:bg-neutral-800 p-2 rounded transition-colors">
                <div className="text-neutral-500 font-mono">
                  11/07/2024 19:45
                </div>
                <div className="text-white">
                  <span className="text-orange-500 font-mono">97.10</span> ATAR
                  graduating from high school.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Encrypted Chat Activity */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700 max-h-[500px]">
          <CardHeader className="pb-3">
            <div className="inline-flex gap-2">
              <CardTitle className="text-sm font-medium text-neutral-700 tracking-wider">
                UN
              </CardTitle>
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
                ENCRYPTED SOCIALS
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {/* Wireframe Sphere */}
            {/* Concentric Circles Banner */}
            <div className="relative w-full h-20 mb-4 overflow-hidden flex items-center justify-center">
              {[265, 240, 215, 190, 165, 140, 115, 90, 65, 40, 20, 7].map(
                (size, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border border-neutral-400"
                    style={{
                      width: `${size * 2}px`,
                      height: `${size * 2}px`,
                      opacity: 0.15 + i * 0.1,
                    }}
                  />
                ),
              )}
              {/* centre dot */}
              {/*<div className="absolute w-2 h-2 rounded-full bg-neutral-300 opacity-80" />*/}
            </div>

            <div className="text-base text-neutral-500 space-y-1 w-full font-mono">
              <div className="flex justify-between">
                <span>
                  <DateTimeLabel />
                </span>
              </div>
              <CursorTraceText className="block" text="-------------------" />
              <br />
              <a
                href="RESUME.PDF"
                download="GLEB_DUBININ_RESUME.PDF"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CursorTraceText
                  className="block"
                  text="RESUME   : click here"
                />
              </a>
              <br />
              <CursorTraceText className="block" text="-------------------" />
              <br />
              <a
                href="https://github.com/glebdubs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CursorTraceText
                  className="block"
                  text="GITHUB   : @glebdubs"
                />
              </a>
              <br />
              <CursorTraceText className="block" text="-------------------" />
              <br />
              <a
                href="https://leetcode.com/u/glebdubs/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CursorTraceText
                  className="block text-white"
                  text="LEETCODE : @glebdubs"
                />
              </a>
              <br />
              <CursorTraceText className="block" text="-------------------" />
              <br />
              <a
                href="https://www.linkedin.com/in/gleb-dubinin/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CursorTraceText
                  className="block text-orange-500"
                  text="LINKEDIN : /gleb-dubinin/"
                />
              </a>
              <br />
              <CursorTraceText className="block" text="-------------------" />
              <br />
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:glebadubinin@gmail.com"
              >
                <CursorTraceText
                  className="block text-neutral-500"
                  text="EMAIL  : glebadubinin@gmail.com"
                />
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Mission Information - Updated with LeetCode Data */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700 max-h-[500px] overflow-y-auto">
          <CardHeader className="pb-3 max-h-[500px]">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
                SYSTEM STATUS
              </CardTitle>
              <div className="flex gap-1 items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-500 font-mono">ONLINE</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <SystemStatusPanel />
          </CardContent>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
              OFFLINE PROFILE
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* add your interests here as log-style entries */}
            <div className="text-xs border-l-2 border-orange-500 pl-3 py-1">
              <div className="text-orange-500 font-mono mb-0.5">
                CURRENTLY READING
              </div>
              <div className="text-neutral-300">Red Rising - Pierce Brown</div>
            </div>
            <div className="text-xs border-l-2 border-neutral-600 pl-3 py-1">
              <div className="text-orange-500 font-mono mb-0.5">GYM</div>
              <div className="text-neutral-300">
                — 110 Bench, 130 Squat, what is a deadlift?
              </div>
            </div>
            <div className="text-xs border-l-2 border-neutral-600 pl-3 py-1">
              <div className="text-orange-500 font-mono mb-0.5">
                LISTENING TO
              </div>
              <div className="text-neutral-300">
                — KANYE, SLEEP TOKEN, MICHAEL JACKSON
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
