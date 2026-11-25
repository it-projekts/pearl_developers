// Scheduled lessons live in this browser only; people are reached through invite links.
const KEY = 'pearl.lessons'
export function loadLessons() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(v) ? v : []
  } catch {
    return []
  }
}
export function saveLessons(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list))
    return true
  } catch {
    return false
  }
}

// Long random part so strangers cannot guess a room
export function newRoom(title) {
  const a = crypto.getRandomValues(new Uint8Array(14))
  const id = [...a].map((n) => (n % 36).toString(36)).join('')
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30).replace(/^-|-$/g, '') || 'lesson'
  return `pearl-${slug}-${id}`
}
export function lessonPath(l) {
  return `/online_study/class/${l.room}#${new URLSearchParams({ t: l.title, d: l.start, m: String(l.mins) })}`
}
export const lessonUrl = (l) => window.location.origin + lessonPath(l)
export const when = (iso) => new Date(iso).toLocaleString([], { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
export const length = (m) => (!m ? 'No limit' : m < 60 ? `${m} min` : `${m / 60} hr`)
export const inviteText = (l) =>
  `You're invited to an online lesson with Pearl Developers.\n\n${l.title}\n${new Date(l.start).toLocaleString([], { dateStyle: 'full', timeStyle: 'short', timeZone: 'Africa/Kampala' })} (East Africa Time)\n${length(l.mins)}\n\nJoin: ${lessonUrl(l)}`

const stamp = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, '')
const ends = (l) => new Date(new Date(l.start).getTime() + (l.mins || 60) * 60000)
export const googleUrl = (l) =>
  `https://calendar.google.com/calendar/render?${new URLSearchParams({ action: 'TEMPLATE', text: l.title, dates: `${stamp(new Date(l.start))}/${stamp(ends(l))}`, details: `Join: ${lessonUrl(l)}` })}`

export function downloadIcs(l) {
  const esc = (s) => s.replace(/([\\;,])/g, '\\$1').replace(/\n/g, '\\n')
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Pearl Developers//Online Study//EN', 'BEGIN:VEVENT',
    `UID:${l.room}`, `DTSTAMP:${stamp(new Date())}`, `DTSTART:${stamp(new Date(l.start))}`, `DTEND:${stamp(ends(l))}`,
    `SUMMARY:${esc(l.title)}`, `DESCRIPTION:${esc('Join: ' + lessonUrl(l))}`, `URL:${lessonUrl(l)}`,
    'BEGIN:VALARM', 'TRIGGER:-PT15M', 'ACTION:DISPLAY', `DESCRIPTION:${esc(l.title)}`, 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
  a.download = 'lesson.ics'
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 1000)
}
