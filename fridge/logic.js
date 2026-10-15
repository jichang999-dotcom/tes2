// 오늘 날짜 'YYYY-MM-DD' (기기 시간대 기준)
export const today = () => new Date().toLocaleDateString('sv-SE');

// 'YYYY-MM-DD' 하루 전 (UTC로 계산해 시간대·서머타임 영향 없음)
export function dayBefore(ymd) {
  const d = new Date(ymd + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

// 사용기한 하루 전(D-1) time(HH:MM)에 알림이 울리는 캘린더 일정(.ics)
// 같은 UID + 더 큰 SEQUENCE 로 다시 보내면 기존 일정을 갱신한다
export function ics(id, exp, inDate, time = '09:00', seq = 0) {
  const start = dayBefore(exp).replaceAll('-', '') + 'T' + time.replace(':', '') + '00';
  const stamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//fridge//KO',
    'BEGIN:VEVENT', `UID:${id}@fridge`, `SEQUENCE:${seq}`, `DTSTAMP:${stamp}`,
    `DTSTART:${start}`, 'DURATION:PT30M',
    'SUMMARY:🧊 내일 사용기한', `DESCRIPTION:사용기한 ${exp} (입고 ${inDate})`,
    'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:내일 사용기한', 'TRIGGER:PT0M', 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
}
