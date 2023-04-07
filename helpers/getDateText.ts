const getDateText = (date: Date) => {
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

export default getDateText
