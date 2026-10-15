// 오늘 날짜 'YYYY-MM-DD' (기기 시간대 기준)
export const today = () => new Date().toLocaleDateString('sv-SE');

// 유통 마지막일 오전 9시에 알림이 울리는 캘린더 일정(.ics)
export function ics(id, exp, inDate) {
  const d = exp.replaceAll('-', '');
  const stamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//fridge//KO',
    'BEGIN:VEVENT', `UID:${id}@fridge`, `DTSTAMP:${stamp}`,
    `DTSTART:${d}T090000`, `DTEND:${d}T093000`,
    'SUMMARY:🧊 유통기한 마지막 날', `DESCRIPTION:${inDate} 입고한 음식`,
    'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:유통기한 마지막 날', 'TRIGGER:PT0M', 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
}
