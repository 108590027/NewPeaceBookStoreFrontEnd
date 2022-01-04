export function toDateString(date: Date) {
  if (date.getTime() === 0) {
    return '-'
  }
  return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
    .getDate()
    .toString()
    .padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
}
export function toSlimDateString(date: Date) {
  if (date.getTime() === 0) {
    return '-'
  }
  return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
    .getDate()
    .toString()
    .padStart(2, '0')}`
}

export function toChartDateString(date: Date) {
  if (date.getTime() === 0) {
    return '-'
  }
  return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
    .getDate()
    .toString()
    .padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`
}

export function inputDateToTimestamp(dateStr: string): number {
  return new Date(dateStr).getTime()
}

export function toInputDate(timestamp: number): string {
  const date = new Date(timestamp)
  //return date.toLocaleString().slice(0, 19)
  return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(
    2,
    '0'
  )}-${`${date.getDate()}`.padStart(2, '0')}T${`${date.getHours()}`.padStart(
    2,
    '0'
  )}:${`${date.getMinutes()}`.padStart(2, '0')}:${`${date.getSeconds()}`.padStart(
    2,
    '0'
  )}.000Z`.slice(0, 19)
}

export function getDateOffset(offsetDate: number = 0) {
  return new Date(Date.now() + offsetDate * 24 * 60 * 60 * 1000)
}

export function toTimeString(date: Date): string {
  if (date.getTime() === 0) {
    return '-'
  }
  return `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`
}
