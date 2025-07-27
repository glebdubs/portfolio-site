"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DateTimeLabel from "@/components/ui/date-time-label"
import CursorTraceText from "@/components/ui/hover-text-effect"

// Types for the LeetCode API response
interface LeetCodeStats {
  status: string
  message: string
  totalSolved: number
  totalQuestions: number
  easySolved: number
  totalEasy: number
  mediumSolved: number
  totalMedium: number
  hardSolved: number
  totalHard: number
  acceptanceRate: number
  ranking: number
  contributionPoints: number
  reputation: number
  submissionCalendar: Record<string, number>
}

export default function CommandCenterPage() {
  // State for LeetCode stats
  const [leetcodeStats, setLeetcodeStats] = useState<LeetCodeStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Your LeetCode username - change this to your actual username
  const LEETCODE_USERNAME = "glebdubs" // Change this to your LeetCode username

  // Function to fetch LeetCode stats
  const fetchLeetCodeStats = async (username: string) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`)
      const data = await response.json()
      
      if (data.status === 'success') {
        setLeetcodeStats(data)
      } else {
        setError(data.message || 'Failed to fetch LeetCode stats')
      }
    } catch (err) {
      setError('Network error: Unable to fetch LeetCode stats')
      console.error('LeetCode API Error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch stats on component mount
  useEffect(() => {
    fetchLeetCodeStats(LEETCODE_USERNAME)
  }, [])

  // Helper function to format numbers with hacker-style padding
  const formatHackerNumber = (num: number): string => {
    return num.toString().padStart(3, '0')
  }

  return (
    <div className="p-6 space-y-6">
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LeetCode Stats Overview */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
                LEETCODE STATS
              </CardTitle>
              {isLoading && (
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              )}
              {error && (
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              )}
              {!isLoading && !error && leetcodeStats && (
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-mono">
                  {isLoading ? "---" : error ? "ERR" : formatHackerNumber(leetcodeStats?.totalSolved || 0)}
                </div>
                <div className="text-xs text-neutral-500">Problems Solved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-mono">
                  {isLoading ? "---" : error ? "ERR" : `${leetcodeStats?.acceptanceRate?.toFixed(1) || "0.0"}%`}
                </div>
                <div className="text-xs text-neutral-500">Acceptance Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-mono">
                  {isLoading ? "---" : error ? "ERR" : leetcodeStats?.contributionPoints?.toLocaleString() || "0"}
                </div>
                <div className="text-xs text-neutral-500">Contribution Pts</div>
              </div>
            </div>

            {/* Global Rank - Separate Row */}
            <div className="border-l-2 border-orange-500 pl-3 bg-neutral-800 p-3 rounded mb-4">
              <div className="text-xs text-neutral-300 font-mono mb-1">GLOBAL RANKING</div>
              <div className="text-xl text-white font-mono">
                {isLoading ? "Loading..." : error ? "Connection Failed" : `#${leetcodeStats?.ranking?.toLocaleString() || "0"}`}
              </div>
              <div className="text-xs text-neutral-500">
                {!isLoading && !error && leetcodeStats && leetcodeStats.ranking > 0 ? 
                  `Top ${((leetcodeStats.ranking / 4000000) * 100).toFixed(2)}% worldwide` : 
                  "Rank unavailable"
                }
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
                    <div className="text-xs text-neutral-500">
                      {isLoading ? "Loading..." : error ? "Error" : `${leetcodeStats?.easySolved || 0}/${leetcodeStats?.totalEasy || 0}`}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-mono text-white">
                  {!isLoading && !error && leetcodeStats ? 
                    `${((leetcodeStats.easySolved / leetcodeStats.totalEasy) * 100).toFixed(0)}%` : 
                    "-%"
                  }
                </div>
              </div>

              {/* Medium Problems */}
              <div className="flex items-center justify-between p-2 bg-neutral-800 rounded hover:bg-neutral-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <div>
                    <div className="text-xs text-white font-mono">MEDIUM</div>
                    <div className="text-xs text-neutral-500">
                      {isLoading ? "Loading..." : error ? "Error" : `${leetcodeStats?.mediumSolved || 0}/${leetcodeStats?.totalMedium || 0}`}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-mono text-white">
                  {!isLoading && !error && leetcodeStats ? 
                    `${((leetcodeStats.mediumSolved / leetcodeStats.totalMedium) * 100).toFixed(0)}%` : 
                    "-%"
                  }
                </div>
              </div>

              {/* Hard Problems */}
              <div className="flex items-center justify-between p-2 bg-neutral-800 rounded hover:bg-neutral-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div>
                    <div className="text-xs text-white font-mono">HARD</div>
                    <div className="text-xs text-neutral-500">
                      {isLoading ? "Loading..." : error ? "Error" : `${leetcodeStats?.hardSolved || 0}/${leetcodeStats?.totalHard || 0}`}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-mono text-white">
                  {!isLoading && !error && leetcodeStats ? 
                    `${((leetcodeStats.hardSolved / leetcodeStats.totalHard) * 100).toFixed(0)}%` : 
                    "-%"
                  }
                </div>
              </div>
            </div>



            {/* Error Display */}
            {error && (
              <div className="border-l-2 border-red-500 pl-3 bg-red-900/20 p-2 rounded">
                <div className="text-xs text-red-400 font-mono">SYSTEM ERROR</div>
                <div className="text-xs text-red-300">{error}</div>
                <button 
                  onClick={() => fetchLeetCodeStats(LEETCODE_USERNAME)}
                  className="text-xs text-orange-500 hover:text-orange-400 mt-1 font-mono"
                >
                  [RETRY_CONNECTION]
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">ACTIVITY LOG</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {[
                {
                  time: "25/06/2025 09:29",
                  agent: "Hand-crafted",
                  action: "this website",
                  target: "with",
                  location: "Vercel, typescript and git.",
                  url:"https://github.com/glebdubs/portfolio-site",
                },
                {
                  time: "24/06/2025 22:55",
                  agent: "",
                  action: "Developed a ",
                  target: "Black-Scholes model Option Pricer",
                  url: "https://gdu-blackscholes.streamlit.app",
                  location: "with StreamLit and yFinance.",
                },
                {
                  time: "01/02/2025 08:12",
                  agent: "",
                  action: "Started attending the",
                  target: "Uni of Adelaide",
                  location: "doing Software Engineering",
                  url:"",
                },
                {
                  time: "08/01/2025 21:33",
                  agent: "Working",
                  action: "as a ",
                  target: "tutor",
                  location: "in Adelaide.",
                  url:"",
                },
                {
                  time: "11/07/2024 19:45",
                  agent: "97.10",
                  action: "ATAR graduating from high school.",
                  target: "",
                  location: "",
                  url:"",
                },
              ].map((log, index) => (
                <div
                  key={index}
                  className="text-xs border-l-2 border-orange-500 pl-3 hover:bg-neutral-800 p-2 rounded transition-colors"
                >
                  <div className="text-neutral-500 font-mono">{log.time}</div>
                  <div className="text-white">
                    <a href={log.url} target="_blank" rel="noopener noreferrer">
                    <span className="text-orange-500 font-mono">{log.agent}</span> {log.action}{" "} 
                      <span className="text-orange-500 font-mono">{log.target}</span> {log.location}{" "}</a>
                    {/* <span className="text-white font-mono">{log.location}</span> */}
                    {/* {log.target && (
                      <span>
                        {" "}
                        <span className="text-orange-500 font-mono">{log.target}</span>
                      </span>
                    )} */}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Encrypted Chat Activity */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
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
            <div className="relative w-32 h-32 mb-4">
              <div className="absolute inset-0 border-2 border-white rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute inset-2 border border-white rounded-full opacity-40"></div>
              <div className="absolute inset-4 border border-white rounded-full opacity-20"></div>
              {/* Grid lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-px bg-white opacity-30"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-px h-full bg-white opacity-30"></div>
              </div>
            </div>

            <div className="text-base text-neutral-500 space-y-1 w-full font-mono">
              <div className="flex justify-between">
                <span>
                <DateTimeLabel/>
                </span>
              </div>
              <a href="https://github.com/glebdubs" target="_blank" rel="noopener noreferrer">
                <CursorTraceText className="block" text="GITHUB   : >> @glebdubs <<"/>
              </a>
              <br/>
              <a href="https://leetcode.com/u/glebdubs/" target="_blank" rel="noopener noreferrer">
                <CursorTraceText className="block text-white" text="LEETCODE : // @glebdubs"/>
              </a>
              <br/>
              <a href="https://www.instagram.com/gleb.dubs/" target="_blank" rel="noopener noreferrer">
                <CursorTraceText className="block text-orange-500" text="INSTA     : $$ @gleb.dubs"/>
              </a>
              
              <a target="_blank" rel="noopener noreferrer">
                <CursorTraceText className="block text-neutral-500" text="DISCORD  : ### @g.du"/>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Mission Activity Chart */}
        <Card className="lg:col-span-8 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">
              MISSION ACTIVITY OVERVIEW
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 relative">
              {/* Chart Grid */}
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-20">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border border-neutral-700"></div>
                ))}
              </div>

              {/* Chart Line */}
              <svg className="absolute inset-0 w-full h-full">
                <polyline
                  points="0,120 50,100 100,110 150,90 200,95 250,85 300,100 350,80"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2"
                />
                <polyline
                  points="0,140 50,135 100,130 150,125 200,130 250,135 300,125 350,120"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              </svg>

              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-neutral-500 -ml-5 font-mono">
                <span>500</span>
                <span>400</span>
                <span>300</span>
                <span>200</span>
              </div>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-neutral-500 -mb-6 font-mono">
                <span>Jan 28, 2025</span>
                <span>Feb 28, 2025</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mission Information - Updated with LeetCode Data */}
        <Card className="lg:col-span-4 bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">MISSION INFORMATION</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-xs text-white font-medium">Successful Missions</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">High Risk Mission</span>
                    <span className="text-white font-bold font-mono">
                      {!isLoading && !error && leetcodeStats ? formatHackerNumber(leetcodeStats.hardSolved) : "---"}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Medium Risk Mission</span>
                    <span className="text-white font-bold font-mono">
                      {!isLoading && !error && leetcodeStats ? formatHackerNumber(leetcodeStats.mediumSolved) : "---"}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Low Risk Mission</span>
                    <span className="text-white font-bold font-mono">
                      {!isLoading && !error && leetcodeStats ? formatHackerNumber(leetcodeStats.easySolved) : "---"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-red-500 font-medium">Remaining Missions</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">High Risk Mission</span>
                    <span className="text-white font-bold font-mono">
                      {!isLoading && !error && leetcodeStats ? formatHackerNumber(leetcodeStats.totalHard - leetcodeStats.hardSolved) : "---"}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Medium Risk Mission</span>
                    <span className="text-white font-bold font-mono">
                      {!isLoading && !error && leetcodeStats ? formatHackerNumber(leetcodeStats.totalMedium - leetcodeStats.mediumSolved) : "---"}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Low Risk Mission</span>
                    <span className="text-white font-bold font-mono">
                      {!isLoading && !error && leetcodeStats ? formatHackerNumber(leetcodeStats.totalEasy - leetcodeStats.easySolved) : "---"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}