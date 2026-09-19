export { cn } from "cn"

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
]

/**
 * Duration from a "Mon YYYY" start date to now, LinkedIn-style ("2 yrs 3 mos",
 * "7 mos", "Present" spans only). Returns null for unparsable input.
 */
export function durationFromNow(start: string): string | null {
  const match = /^([A-Za-z]{3,})\s+(\d{4})$/.exec(start.trim())
  if (!match) return null

  const monthIndex = MONTHS.indexOf(match[1].slice(0, 3).toLowerCase())
  if (monthIndex === -1) return null

  const year = Number(match[2])
  const now = new Date()
  let months =
    (now.getFullYear() - year) * 12 + (now.getMonth() - monthIndex) + 1
  if (months < 1) months = 1

  const years = Math.floor(months / 12)
  const remMonths = months % 12

  const parts: string[] = []
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`)
  if (remMonths > 0 || years === 0)
    parts.push(`${remMonths} mo${remMonths > 1 ? "s" : ""}`)

  return parts.join(" ")
}
