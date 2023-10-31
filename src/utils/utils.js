export const getDate = (str) => {
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }
    let date = new Date(str)
    date = date.toDateString()
    str = str.replace('T', ' ')
    str = str.split('.')[0]
    const time = str.split(' ')[1]
    const datetime = date.concat(" ", time)

    return datetime
}