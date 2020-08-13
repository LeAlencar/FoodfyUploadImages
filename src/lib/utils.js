module.exports = {
    date(timestamp) {
        const date = new Date(timestamp)

        // use UTC for precision.
        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2) // jan = 0
        const day = `0${date.getUTCDate()}`.slice(-2) // 1 - 31

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    }
}