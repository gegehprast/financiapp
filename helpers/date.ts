import { endOfWeek, startOfWeek, sub } from "date-fns"

export const getDateText = (date: Date) => {
    const d = new Date(date)
    const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    const yesterday = new Date(Date.now() - new Date().getTimezoneOffset() * 60000 - 86400000)
    const tomorrow = new Date(Date.now() - new Date().getTimezoneOffset() * 60000 + 86400000)

    if (d.toDateString() === today.toDateString()) {
        return 'Hari ini'
    } else if (d.toDateString() === yesterday.toDateString()) {
        return 'Kemarin'
    } else if (d.toDateString() === tomorrow.toDateString()) {
        return 'Besok'
    } else {
        return d.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
    }
}

export const isLastWeek = (date: Date) => {
    const day = sub(new Date(), { weeks: 1 })
    const start = startOfWeek(day, { weekStartsOn: 1 })
    const end = endOfWeek(day, { weekStartsOn: 1 })

    return date >= startOfWeek(start, { weekStartsOn: 1 }) && date <= endOfWeek(end, { weekStartsOn: 1 })
}
