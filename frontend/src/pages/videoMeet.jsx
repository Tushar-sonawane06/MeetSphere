import React, { useEffect, useRef, useState, useContext } from 'react';
import { AuthContext } from '../contexts/authContext.jsx';
import io from "socket.io-client";
import { Badge } from '@mui/material';
import { Video, VideoOff, Mic, MicOff, Monitor, MonitorOff, MessageSquare, PhoneOff, Send, Users, X } from 'lucide-react';
import styles from "../styles/videoComponent.module.css";

const server_url = "https://meetsphere-backend.tushar-sonawane.xyz";
var connections = {};
const peerConfigConnections = { "iceServers": [{ "urls": "stun:stun.l.google.com:19302" }] };

export default function VideoMeetComponent() {
  const { addToUserHistory } = useContext(AuthContext);
  var socketRef = useRef();
  let socketIdRef = useRef();
  let localVideoref = useRef();
  let [videoAvailable, setVideoAvailable] = useState(true);
  let [audioAvailable, setAudioAvailable] = useState(true);
  let [video, setVideo] = useState(false);
  let [audio, setAudio] = useState();
  let [screen, setScreen] = useState();
  let [showModal, setModal] = useState(true);
  let [screenAvailable, setScreenAvailable] = useState();
  let [messages, setMessages] = useState([]);
  let [message, setMessage] = useState("");
  let [newMessages, setNewMessages] = useState(0);
  let [askForUsername, setAskForUsername] = useState(true);
  let [username, setUsername] = useState("");
  const videoRef = useRef([]);
  let [videos, setVideos] = useState([]);

  useEffect(() => { getPermissions(); }, []);

  let getDislayMedia = () => {
    if (screen) {
      if (navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
          .then(getDislayMediaSuccess).then(() => {}).catch(e => console.log(e));
      }
    }
  };

  const getPermissions = async () => {
    try {
      const vp = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoAvailable(!!vp);
      const ap = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioAvailable(!!ap);
      setScreenAvailable(!!navigator.mediaDevices.getDisplayMedia);
      if (videoAvailable || audioAvailable) {
        const s = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });
        if (s) { window.localStream = s; if (localVideoref.current) localVideoref.current.srcObject = s; }
      }
    } catch (error) { console.log(error); }
  };

  useEffect(() => {
    if (video !== undefined && audio !== undefined) { getUserMedia(); }
  }, [video, audio]);

  let getMedia = () => { setVideo(videoAvailable); setAudio(audioAvailable); connectToSocketServer(); };

  let getUserMediaSuccess = (stream) => {
    try { window.localStream.getTracks().forEach(t => t.stop()); } catch (e) {}
    window.localStream = stream;
    localVideoref.current.srcObject = stream;
    for (let id in connections) {
      if (id === socketIdRef.current) continue;
      connections[id].addStream(window.localStream);
      connections[id].createOffer().then(d => {
        connections[id].setLocalDescription(d).then(() => {
          socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }));
        }).catch(e => console.log(e));
      });
    }
    stream.getTracks().forEach(track => track.onended = () => {
      setVideo(false); setAudio(false);
      try { localVideoref.current.srcObject.getTracks().forEach(t => t.stop()); } catch (e) {}
      let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
      window.localStream = blackSilence();
      localVideoref.current.srcObject = window.localStream;
      for (let id in connections) {
        connections[id].addStream(window.localStream);
        connections[id].createOffer().then(d => {
          connections[id].setLocalDescription(d).then(() => {
            socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }));
          }).catch(e => console.log(e));
        });
      }
    });
  };

  let getUserMedia = () => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices.getUserMedia({ video, audio }).then(getUserMediaSuccess).catch(e => console.log(e));
    } else {
      try { localVideoref.current.srcObject.getTracks().forEach(t => t.stop()); } catch (e) {}
    }
  };

  let getDislayMediaSuccess = (stream) => {
    try { window.localStream.getTracks().forEach(t => t.stop()); } catch (e) {}
    window.localStream = stream;
    localVideoref.current.srcObject = stream;
    for (let id in connections) {
      if (id === socketIdRef.current) continue;
      connections[id].addStream(window.localStream);
      connections[id].createOffer().then(d => {
        connections[id].setLocalDescription(d).then(() => {
          socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }));
        }).catch(e => console.log(e));
      });
    }
    stream.getTracks().forEach(track => track.onended = () => {
      setScreen(false);
      try { localVideoref.current.srcObject.getTracks().forEach(t => t.stop()); } catch (e) {}
      let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
      window.localStream = blackSilence();
      localVideoref.current.srcObject = window.localStream;
      getUserMedia();
    });
  };

  let gotMessageFromServer = (fromId, message) => {
    var signal = JSON.parse(message);
    if (fromId !== socketIdRef.current) {
      if (signal.sdp) {
        connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
          if (signal.sdp.type === 'offer') {
            connections[fromId].createAnswer().then(d => {
              connections[fromId].setLocalDescription(d).then(() => {
                socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }));
              }).catch(e => console.log(e));
            }).catch(e => console.log(e));
          }
        }).catch(e => console.log(e));
      }
      if (signal.ice) { connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e)); }
    }
  };

  let connectToSocketServer = () => {
    socketRef.current = io.connect(server_url, { secure: false });
    socketRef.current.on('signal', gotMessageFromServer);
    socketRef.current.on('connect', () => {
      socketRef.current.emit('join-call', window.location.pathname.slice(1));
      socketIdRef.current = socketRef.current.id;
      socketRef.current.on('chat-message', addMessage);
      socketRef.current.on('user-left', (id) => { setVideos(v => v.filter(v => v.socketId !== id)); });
      socketRef.current.on('user-joined', (id, clients) => {
        clients.forEach(socketListId => {
          connections[socketListId] = new RTCPeerConnection(peerConfigConnections);
          connections[socketListId].onicecandidate = (event) => {
            if (event.candidate != null) {
              socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }));
            }
          };
          connections[socketListId].onaddstream = (event) => {
            let videoExists = videoRef.current.find(v => v.socketId === socketListId);
            if (videoExists) {
              setVideos(videos => {
                const u = videos.map(v => v.socketId === socketListId ? { ...v, stream: event.stream } : v);
                videoRef.current = u; return u;
              });
            } else {
              let nv = { socketId: socketListId, stream: event.stream, autoplay: true, playsinline: true };
              setVideos(videos => { const u = [...videos, nv]; videoRef.current = u; return u; });
            }
          };
          if (window.localStream !== undefined && window.localStream !== null) {
            connections[socketListId].addStream(window.localStream);
          } else {
            let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
            window.localStream = blackSilence();
            connections[socketListId].addStream(window.localStream);
          }
        });
        if (id === socketIdRef.current) {
          for (let id2 in connections) {
            if (id2 === socketIdRef.current) continue;
            try { connections[id2].addStream(window.localStream); } catch (e) {}
            connections[id2].createOffer().then(d => {
              connections[id2].setLocalDescription(d).then(() => {
                socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }));
              }).catch(e => console.log(e));
            });
          }
        }
      });
    });
  };

  let silence = () => {
    let ctx = new AudioContext(); let osc = ctx.createOscillator();
    let dst = osc.connect(ctx.createMediaStreamDestination()); osc.start(); ctx.resume();
    return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
  };
  let black = ({ width = 640, height = 480 } = {}) => {
    let canvas = Object.assign(document.createElement("canvas"), { width, height });
    canvas.getContext('2d').fillRect(0, 0, width, height);
    let stream = canvas.captureStream();
    return Object.assign(stream.getVideoTracks()[0], { enabled: false });
  };

  let handleVideo = () => setVideo(!video);
  let handleAudio = () => setAudio(!audio);

  useEffect(() => { if (screen !== undefined) getDislayMedia(); }, [screen]);
  let handleScreen = () => setScreen(!screen);

  let handleEndCall = () => {
    try { localVideoref.current.srcObject.getTracks().forEach(t => t.stop()); } catch (e) {}
    window.location.href = "/";
  };

  const addMessage = (data, sender, socketIdSender) => {
    setMessages(prev => [...prev, { sender, data }]);
    if (socketIdSender !== socketIdRef.current) setNewMessages(n => n + 1);
  };

  let sendMessage = () => {
    socketRef.current.emit('chat-message', message, username);
    setMessage("");
  };

  let connect = () => {
    setAskForUsername(false);
    getMedia();
    const code = window.location.pathname.slice(1);
    if (code) {
      addToUserHistory(code).catch(e => console.error("Error saving meeting to history:", e));
    }
  };

  const getInitials = (name) => name ? name.slice(0, 2).toUpperCase() : '?';

  // ── Lobby ──────────────────────────────────────────────
  if (askForUsername) {
    return (
      <div className="video-lobby-inner" style={{
        minHeight: '100vh', background: '#0d1117',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 32, padding: 'clamp(16px, 4vw, 24px)',
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ width: 52, height: 52, background: '#3b82f6', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', }}>
            <Video size={26} strokeWidth={2.5} />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 8 }}>Ready to join?</h1>
          <p style={{ fontSize: '14px', color: '#8b949e' }}>Enter your display name to enter the meeting room.</p>
        </div>

        {/* Preview video */}
        <div style={{ position: 'relative', width: '100%', maxWidth: 480, aspectRatio: '16/9', background: '#161b22', borderRadius: 16, overflow: 'hidden', border: '1px solid #30363d' }}>
          <video ref={localVideoref} autoPlay muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(0,0,0,0.6)', borderRadius: 6, padding: '4px 10px', fontSize: 12, color: 'white' }}>
            Preview
          </div>
        </div>

        {/* Username input */}
        <div style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            style={{
              width: '100%', height: 46, padding: '0 16px',
              background: '#161b22', border: '1px solid #30363d', borderRadius: 10,
              color: 'white', fontSize: 14, outline: 'none', fontFamily: 'inherit',
            }}
            placeholder="Your display name"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && username.trim() && connect()}
            id="lobby-username"
          />
          <button
            onClick={connect}
            disabled={!username.trim()}
            style={{
              height: 46, background: username.trim() ? '#3b82f6' : '#21262d',
              color: username.trim() ? 'white' : '#484f58',
              border: 'none', borderRadius: 10, fontFamily: 'inherit',
              fontSize: 15, fontWeight: 600, cursor: username.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 150ms ease',
            }}
          >
            Join Meeting
          </button>
        </div>
      </div>
    );
  }

  // ── Meeting Room ───────────────────────────────────────
  return (
    <div style={{ height: '100vh', background: '#0d1117', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>

      {/* Top bar */}
      <div style={{ height: 52, background: '#161b22', borderBottom: '1px solid #30363d', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 26, height: 26, background: '#3b82f6', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Video size={14} strokeWidth={2.5} color="white" />
          </div>
          <span style={{ color: 'white', fontWeight: 700, fontSize: 15, letterSpacing: '-0.02em' }}>MeetSphere</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#3fb950' }} />
          <span style={{ fontSize: 12, color: '#8b949e' }}>
            {videos.length + 1} participant{videos.length !== 0 ? 's' : ''}
          </span>
        </div>
        <div style={{ fontSize: 12, color: '#484f58', fontFamily: 'monospace' }}>
          {window.location.pathname.slice(1)}
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>

        {/* Video area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 8, gap: 8 }}>
          {/* Remote videos */}
          <div style={{
            flex: 1, display: 'grid', overflow: 'auto',
            gridTemplateColumns: videos.length <= 1 ? '1fr' : videos.length === 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: 8, alignContent: videos.length === 1 ? 'stretch' : 'start',
          }}>
            {videos.length === 0 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#484f58', flexDirection: 'column', gap: 12 }}>
                <Users size={36} strokeWidth={1.5} />
                <p style={{ fontSize: 14 }}>Waiting for others to join…</p>
              </div>
            )}
            {videos.map((v) => (
              <div key={v.socketId} style={{
                position: 'relative',
                background: '#161b22',
                borderRadius: 12,
                overflow: 'hidden',
                aspectRatio: videos.length === 1 ? 'auto' : '16/9',
                height: videos.length === 1 ? '100%' : 'auto',
              }}>
                <video
                  data-socket={v.socketId}
                  ref={ref => { if (ref && v.stream) ref.srcObject = v.stream; }}
                  autoPlay
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', bottom: 8, left: 8, background: 'rgba(0,0,0,0.65)', borderRadius: 6, padding: '3px 8px', fontSize: 11, color: 'white' }}>
                  Participant
                </div>
              </div>
            ))}
          </div>

          {/* Local video (self) */}
          <div style={{ position: 'absolute', bottom: 80, left: 12, width: 'clamp(120px, 22vw, 180px)', borderRadius: 12, overflow: 'hidden', border: '2px solid #3b82f6', boxShadow: '0 8px 24px rgba(0,0,0,0.5)', zIndex: 10 }}>
            <div style={{ position: 'relative', aspectRatio: '16/9', background: '#161b22' }}>
              <video ref={localVideoref} autoPlay muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {!video && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#161b22' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 15 }}>
                    {getInitials(username)}
                  </div>
                </div>
              )}
              <div style={{ position: 'absolute', bottom: 4, left: 6, fontSize: 10, color: 'white', background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: 4 }}>
                {username || 'You'} (you)
              </div>
            </div>
          </div>
        </div>

        {/* Chat panel */}
        {showModal && (
          <div style={{
            width: 300, background: '#161b22', borderLeft: '1px solid #30363d',
            display: 'flex', flexDirection: 'column', flexShrink: 0,
          }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #30363d', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: 'white', fontWeight: 600, fontSize: 14 }}>Chat</span>
              <button onClick={() => setModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8b949e', display: 'flex', alignItems: 'center' }}>
                <X size={16} />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {messages.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#484f58', fontSize: 13, marginTop: 24 }}>No messages yet</div>
              ) : messages.map((item, idx) => (
                <div key={idx}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#3b82f6', marginBottom: 2 }}>{item.sender}</p>
                  <p style={{ fontSize: 13, color: '#f0f6fc', background: '#21262d', borderRadius: 8, padding: '8px 12px', wordBreak: 'break-word' }}>{item.data}</p>
                </div>
              ))}
            </div>
            <div style={{ padding: '8px 12px', borderTop: '1px solid #30363d', display: 'flex', gap: 8 }}>
              <input
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && message.trim() && sendMessage()}
                placeholder="Type a message…"
                style={{
                  flex: 1, height: 38, padding: '0 12px', background: '#21262d',
                  border: '1px solid #30363d', borderRadius: 8, color: 'white',
                  fontFamily: 'inherit', fontSize: 13, outline: 'none',
                }}
              />
              <button onClick={sendMessage} disabled={!message.trim()}
                style={{ width: 38, height: 38, background: message.trim() ? '#3b82f6' : '#21262d', border: 'none', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'background 150ms ease' }}
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Controls bar */}
      <div style={{
        height: 72, background: '#161b22', borderTop: '1px solid #30363d',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexShrink: 0,
      }}>
        {/* Control button helper */}
        {[
          {
            label: video ? 'Camera On' : 'Camera Off', onClick: handleVideo,
            icon: video ? <Video size={20} /> : <VideoOff size={20} />,
            active: video, show: true,
          },
          {
            label: audio ? 'Mic On' : 'Mic Off', onClick: handleAudio,
            icon: audio ? <Mic size={20} /> : <MicOff size={20} />,
            active: audio, show: true,
          },
          {
            label: screen ? 'Stop Share' : 'Share Screen', onClick: handleScreen,
            icon: screen ? <MonitorOff size={20} /> : <Monitor size={20} />,
            active: screen, show: screenAvailable,
          },
        ].filter(c => c.show).map((ctrl) => (
          <button
            key={ctrl.label}
            onClick={ctrl.onClick}
            title={ctrl.label}
            style={{
              width: 50, height: 50, borderRadius: 12, border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: ctrl.active ? 'rgba(59,130,246,0.2)' : '#21262d',
              color: ctrl.active ? '#60a5fa' : '#8b949e',
              transition: 'all 150ms ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = ctrl.active ? 'rgba(59,130,246,0.3)' : '#30363d'}
            onMouseLeave={e => e.currentTarget.style.background = ctrl.active ? 'rgba(59,130,246,0.2)' : '#21262d'}
          >
            {ctrl.icon}
          </button>
        ))}

        {/* Chat toggle with badge */}
        <button
          onClick={() => { setModal(m => !m); setNewMessages(0); }}
          title="Chat"
          style={{ position: 'relative', width: 50, height: 50, borderRadius: 12, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: showModal ? 'rgba(59,130,246,0.2)' : '#21262d', color: showModal ? '#60a5fa' : '#8b949e', transition: 'all 150ms ease' }}
          onMouseEnter={e => e.currentTarget.style.background = showModal ? 'rgba(59,130,246,0.3)' : '#30363d'}
          onMouseLeave={e => e.currentTarget.style.background = showModal ? 'rgba(59,130,246,0.2)' : '#21262d'}
        >
          <MessageSquare size={20} />
          {newMessages > 0 && (
            <span style={{ position: 'absolute', top: 8, right: 8, width: 16, height: 16, background: '#f85149', borderRadius: '50%', fontSize: 9, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
              {newMessages > 9 ? '9+' : newMessages}
            </span>
          )}
        </button>

        {/* Leave call */}
        <button
          onClick={handleEndCall}
          title="Leave meeting"
          style={{ width: 50, height: 50, borderRadius: 12, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f85149', color: 'white', marginLeft: 8, transition: 'all 150ms ease' }}
          onMouseEnter={e => e.currentTarget.style.background = '#b91c1c'}
          onMouseLeave={e => e.currentTarget.style.background = '#f85149'}
        >
          <PhoneOff size={20} />
        </button>
      </div>
    </div>
  );
}