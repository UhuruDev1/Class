"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Monitor,
  MessageSquare,
  Users,
  Hand,
  Settings,
  Maximize,
  Send,
  Palette,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface LiveClassroomProps {
  session: any
  user: User
}

export default function LiveClassroom({ session, user }: LiveClassroomProps) {
  const [isVideoOn, setIsVideoOn] = useState(false)
  const [isAudioOn, setIsAudioOn] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isHandRaised, setIsHandRaised] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatMessages, setChatMessages] = useState<any[]>([])
  const [participants, setParticipants] = useState<any[]>([])
  const [isDrawing, setIsDrawing] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const supabase = createClient()

  useEffect(() => {
    // Initialize WebRTC and real-time subscriptions
    initializeClassroom()

    return () => {
      // Cleanup
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const initializeClassroom = async () => {
    // Subscribe to real-time chat messages
    const chatChannel = supabase
      .channel(`session-${session.id}-chat`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "session_messages",
          filter: `session_id=eq.${session.id}`,
        },
        (payload) => {
          setChatMessages((prev) => [...prev, payload.new])
        },
      )
      .subscribe()

    // Subscribe to participant updates
    const participantChannel = supabase
      .channel(`session-${session.id}-participants`)
      .on("presence", { event: "sync" }, () => {
        const state = participantChannel.presenceState()
        setParticipants(Object.values(state).flat())
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        console.log("User joined:", newPresences)
      })
      .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
        console.log("User left:", leftPresences)
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await participantChannel.track({
            user_id: user.id,
            user_name: user.user_metadata?.full_name || user.email,
            joined_at: new Date().toISOString(),
          })
        }
      })

    // Load existing chat messages
    const { data: messages } = await supabase
      .from("session_messages")
      .select(`
        *,
        profiles (
          full_name,
          avatar_url
        )
      `)
      .eq("session_id", session.id)
      .order("created_at", { ascending: true })

    if (messages) {
      setChatMessages(messages)
    }
  }

  const toggleVideo = async () => {
    if (!isVideoOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: isAudioOn })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
        setIsVideoOn(true)
      } catch (error) {
        console.error("Error accessing camera:", error)
      }
    } else {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getVideoTracks().forEach((track) => track.stop())
        videoRef.current.srcObject = null
      }
      setIsVideoOn(false)
    }
  }

  const toggleAudio = async () => {
    if (!isAudioOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: isVideoOn })
        if (videoRef.current && isVideoOn) {
          videoRef.current.srcObject = stream
        }
        setIsAudioOn(true)
      } catch (error) {
        console.error("Error accessing microphone:", error)
      }
    } else {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getAudioTracks().forEach((track) => track.stop())
      }
      setIsAudioOn(false)
    }
  }

  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
        setIsScreenSharing(true)
      } catch (error) {
        console.error("Error sharing screen:", error)
      }
    } else {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
        videoRef.current.srcObject = null
      }
      setIsScreenSharing(false)
    }
  }

  const sendChatMessage = async () => {
    if (!chatMessage.trim()) return

    const { error } = await supabase.from("session_messages").insert({
      session_id: session.id,
      user_id: user.id,
      message: chatMessage,
      message_type: "text",
    })

    if (!error) {
      setChatMessage("")
    }
  }

  const toggleHandRaise = () => {
    setIsHandRaised(!isHandRaised)
    // Send hand raise status to other participants
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">{session.title}</h1>
            <p className="text-slate-300">
              {session.courses?.title} • {session.courses?.instructor_name}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={session.status === "live" ? "destructive" : "secondary"}>
              {session.status === "live" ? "LIVE" : "Scheduled"}
            </Badge>
            <div className="flex items-center gap-2 text-slate-300">
              <Users className="h-4 w-4" />
              <span>{participants.length} participants</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Video Area */}
          <div className="lg:col-span-3">
            <Card className="bg-slate-800/50 border-slate-700 mb-6">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden">
                  <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
                  {!isVideoOn && !isScreenSharing && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Video className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-400">Camera is off</p>
                      </div>
                    </div>
                  )}

                  {/* Controls Overlay */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm rounded-lg p-2">
                      <Button size="sm" variant={isVideoOn ? "default" : "secondary"} onClick={toggleVideo}>
                        {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                      </Button>

                      <Button size="sm" variant={isAudioOn ? "default" : "secondary"} onClick={toggleAudio}>
                        {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                      </Button>

                      <Button size="sm" variant={isScreenSharing ? "default" : "secondary"} onClick={toggleScreenShare}>
                        <Monitor className="h-4 w-4" />
                      </Button>

                      <Button size="sm" variant={isHandRaised ? "default" : "secondary"} onClick={toggleHandRaise}>
                        <Hand className="h-4 w-4" />
                      </Button>

                      <Button size="sm" variant="secondary">
                        <Settings className="h-4 w-4" />
                      </Button>

                      <Button size="sm" variant="secondary">
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Whiteboard */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Interactive Whiteboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={400}
                    className="w-full border border-slate-600 rounded-lg bg-white cursor-crosshair"
                    onMouseDown={() => setIsDrawing(true)}
                    onMouseUp={() => setIsDrawing(false)}
                  />
                  <div className="absolute top-2 left-2 flex gap-2">
                    <Button size="sm" variant="secondary">
                      Pen
                    </Button>
                    <Button size="sm" variant="secondary">
                      Eraser
                    </Button>
                    <Button size="sm" variant="secondary">
                      Clear
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-800">
                <TabsTrigger value="chat" className="data-[state=active]:bg-slate-700">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="participants" className="data-[state=active]:bg-slate-700">
                  <Users className="h-4 w-4 mr-2" />
                  People
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="mt-4">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">Live Chat</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4 h-96 overflow-y-auto mb-4">
                      {chatMessages.map((message, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {message.profiles?.full_name?.[0] || "U"}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-white">
                                {message.profiles?.full_name || "User"}
                              </span>
                              <span className="text-xs text-slate-400">
                                {new Date(message.created_at).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <p className="text-sm text-slate-300">{message.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendChatMessage()}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                      <Button size="sm" onClick={sendChatMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="participants" className="mt-4">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">Participants ({participants.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {participants.map((participant, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {participant.user_name?.[0] || "U"}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white">{participant.user_name}</p>
                            <p className="text-xs text-slate-400">
                              {participant.user_id === user.id ? "You" : "Student"}
                            </p>
                          </div>
                          {participant.hand_raised && <Hand className="h-4 w-4 text-yellow-400" />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
