import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { classroom } from '../data/courses.js'
import { length, when } from '../lib/lessons.js'

const problems = {
  NotAllowedError: 'Your browser blocked the camera and microphone. Allow them from the icon beside the web address, then try again.',
  NotFoundError: 'No camera or microphone was found on this device.',
  NotReadableError: 'Another app is using your camera or microphone. Close it and try again.',
}
const audio = { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
const hd = { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 }, facingMode: 'user' }

// Camera + microphone, or whichever of the two works
async function openDevices() {
  if (!navigator.mediaDevices) throw Object.assign(new Error(), { name: 'Unsupported' })
  const get = (c) => navigator.mediaDevices.getUserMedia(c)
  try {
    return [await get({ audio, video: hd }), '']
  } catch (e) {
    if (e.name === 'NotAllowedError') throw e
    try {
      return [await get({ audio }), 'Camera unavailable. You can join with sound only.']
    } catch {
      try {
        return [await get({ video: hd }), 'Microphone unavailable. Others will not hear you.']
      } catch {
        throw e
      }
    }
  }
}

export default function Classroom() {
  const { room } = useParams()
  const { hash } = useLocation()
  const info = new URLSearchParams(hash.slice(1))
  const testOnly = room === 'check'
  const valid = testOnly || /^pearl-[a-z0-9-]{10,60}$/.test(room)
  const title = testOnly ? 'Test your camera and sound' : (info.get('t') || 'Online lesson').slice(0, 90)
  const start = info.get('d') && !Number.isNaN(Date.parse(info.get('d'))) ? info.get('d') : null
  const mins = Number(info.get('m')) || 0

  const video = useRef(null)
  const bar = useRef(null)
  const stream = useRef(null)
  const stopMeter = useRef(() => {})
  const alive = useRef(true)
  const [state, setState] = useState('idle') // idle | asking | on | error
  const [msg, setMsg] = useState('')
  const [has, setHas] = useState({ cam: false, mic: false })
  const [cam, setCam] = useState(true)
  const [mic, setMic] = useState(true)
  const [name, setName] = useState('')
  const [joined, setJoined] = useState(false)
  const [quality, setQuality] = useState('')

  const stop = useCallback(() => {
    stopMeter.current()
    stream.current?.getTracks().forEach((t) => t.stop())
    stream.current = null
  }, [])
  useEffect(() => {
    alive.current = true
    return () => { alive.current = false; stop() }
  }, [stop])

  const turnOn = async () => {
    stop()
    setState('asking')
    setMsg('')
    let s, note
    try {
      [s, note] = await openDevices()
    } catch (e) {
      if (!alive.current) return
      setState('error')
      setMsg(problems[e.name] || 'This browser could not open your camera and microphone. Try Chrome or Edge.')
      return
    }
    if (!alive.current) {
      s.getTracks().forEach((t) => t.stop())
      return
    }
    stream.current = s
    const v = s.getVideoTracks()[0]
    const a = s.getAudioTracks()[0]
    const set = v?.getSettings()
    setHas({ cam: !!v, mic: !!a })
    setCam(!!v)
    setMic(!!a)
    setMsg(note)
    setQuality(set?.width ? `${set.width} × ${set.height}` : '')
    setState('on')
    if (video.current) {
      video.current.srcObject = s
      video.current.play().catch(() => {})
    }
    if (!a) return
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const an = ctx.createAnalyser()
    an.fftSize = 512
    ctx.createMediaStreamSource(s).connect(an)
    const buf = new Uint8Array(an.fftSize)
    let raf
    const tick = () => {
      an.getByteTimeDomainData(buf)
      let sum = 0
      for (const x of buf) sum += ((x - 128) / 128) ** 2
      if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, Math.sqrt(sum / buf.length) * 5)})`
      raf = requestAnimationFrame(tick)
    }
    tick()
    stopMeter.current = () => {
      cancelAnimationFrame(raf)
      ctx.close().catch(() => {})
      stopMeter.current = () => {}
    }
  }

  const flipCam = () => {
    stream.current?.getVideoTracks().forEach((t) => { t.enabled = !cam })
    setCam(!cam)
  }
  const flipMic = () => {
    stream.current?.getAudioTracks().forEach((t) => { t.enabled = !mic })
    setMic(!mic)
  }
  const chime = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    ;[523, 659, 784].forEach((f, i) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      const t = ctx.currentTime + i * 0.22
      o.frequency.value = f
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(0.25, t + 0.03)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35)
      o.connect(g).connect(ctx.destination)
      o.start(t)
      o.stop(t + 0.4)
    })
    setTimeout(() => ctx.close().catch(() => {}), 1500)
  }

  // Jitsi reads its options from the part after #, which is never sent to a server by the link itself
  const opts = {
    'config.subject': JSON.stringify(title),
    'config.startWithAudioMuted': !mic,
    'config.startWithVideoMuted': !cam,
    'config.resolution': 720,
    'config.constraints.video.height.ideal': 720,
    'userInfo.displayName': JSON.stringify(name.trim() || 'Guest'),
    ...(classroom.embed ? { 'config.prejoinConfig.enabled': false } : {}),
  }
  const roomUrl = `https://${classroom.domain}/${room}#${Object.entries(opts).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&')}`
  // runs after the link has opened, so the camera is free for the lesson tab
  const join = () => {
    stop()
    setState('idle')
    setJoined(true)
  }

  if (!valid) {
    return (
      <section className="os-page">
        <div className="container">
          <h1>This lesson link is not valid</h1>
          <p>Ask the person who invited you to send it again.</p>
          <Link to="/online_study" className="os-btn os-btn--brand">See the courses</Link>
        </div>
      </section>
    )
  }
  return (
    <section className="os-page">
      <div className="container">
        <Link to="/online_study" className="os-back">Back to courses</Link>
        <h1>{title}</h1>
        {start && <p className="os-when">{when(start)}, {length(mins)}</p>}
        {joined && classroom.embed ? (
          <iframe className="os-live" title={title} src={roomUrl} allow="camera; microphone; display-capture; fullscreen; autoplay" />
        ) : (
          <div className="os-lobby">
            <div className="os-screen">
              <video ref={video} muted playsInline className={state === 'on' && cam ? '' : 'is-off'} />
              {state !== 'on' && (
                <div className="os-screen__msg">
                  <p role="status">{state === 'error' ? msg : state === 'asking' ? 'Choose Allow when your browser asks.' : joined ? 'Your lesson opened in a new tab.' : 'See and hear yourself before you join.'}</p>
                  {state !== 'asking' && <button type="button" className="os-btn os-btn--white" onClick={turnOn}>{state === 'error' ? 'Try again' : 'Turn on camera and microphone'}</button>}
                </div>
              )}
              {state === 'on' && !cam && <div className="os-screen__msg"><p>Your camera is off.</p></div>}
              {state === 'on' && cam && quality && <span className="os-quality">{quality}</span>}
            </div>
            <div className="os-card os-checks">
              <h2>Check your setup</h2>
              {state === 'on' && (
                <>
                  {msg && <p className="os-err" role="status">{msg}</p>}
                  <div className="os-row">
                    <button type="button" className="os-btn os-btn--soft" disabled={!has.cam} onClick={flipCam}>{cam ? 'Turn camera off' : 'Turn camera on'}</button>
                    <button type="button" className="os-btn os-btn--soft" disabled={!has.mic} onClick={flipMic}>{mic ? 'Mute microphone' : 'Unmute microphone'}</button>
                  </div>
                  <div className="os-meter"><span>Speak to test your microphone</span><div><i ref={bar} /></div></div>
                </>
              )}
              <button type="button" className="os-btn os-btn--soft" onClick={chime}>Play test sound</button>
              {!testOnly && (
                <>
                  <label>Your name<input value={name} maxLength={50} autoComplete="name" onChange={(e) => setName(e.target.value)} /></label>
                  {classroom.embed
                    ? <button type="button" className="os-btn os-btn--brand" onClick={join}>Join lesson</button>
                    : <a className="os-btn os-btn--brand" href={roomUrl} target="_blank" rel="noreferrer" onClick={() => setTimeout(join, 0)}>Join lesson</a>}
                  {!classroom.embed && <p className="os-hint">The lesson opens on Jitsi Meet in a new tab. Tutors sign in there to open the room.</p>}
                </>
              )}
              <details className="os-tips">
                <summary>For a clear picture and sound</summary>
                <ul>
                  <li>Use headphones to stop echo.</li>
                  <li>Face a window or lamp.</li>
                  <li>Sit near your router and close other downloads.</li>
                  <li>If the connection is weak, turn your camera off first.</li>
                </ul>
              </details>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
