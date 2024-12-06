import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export function formatTime(time: number) {
  return dayjs.duration(time).format('HH:mm:ss')
}
