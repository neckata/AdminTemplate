export const getDateStr = (date: Date | null) => {
    let monthText = ''
    let dayText = ''

    if (date === null || date == undefined) {
        return null
    }

    const _date = new Date(date)

    const day = _date.getDate()
    const month = _date.getMonth() + 1
    const yearText = _date.getFullYear().toString()

    if (day < 10) {
        dayText = '0' + day.toString()
    } else {
        dayText = day.toString()
    }

    if (month < 10) {
        monthText = '0' + month.toString()
    } else {
        monthText = month.toString()
    }

    return yearText + '-' + monthText + '-' + dayText
}

export const getDatetimeStr = (date: Date | null) => {
    let monthText = ''
    let dayText = ''
    let minText = ''
    let result = ''

    if (date === null || date == undefined) {
        return null
    }

    const _date = new Date(date)

    const day = _date.getDate()
    const month = _date.getMonth() + 1
    const yearText = _date.getFullYear().toString()
    const hours = _date.getHours()
    const mins = _date.getMinutes()

    if (day < 10) {
        dayText = '0' + day.toString()
    } else {
        dayText = day.toString()
    }

    if (month < 10) {
        monthText = '0' + month.toString()
    } else {
        monthText = month.toString()
    }

    if (mins < 10) {
        minText = '0' + mins.toString()
    } else {
        minText = mins.toString()
    }

    result = yearText + '-' + monthText + '-' + dayText

    return result + ' ' + hours + ':' + minText
}

/** api desired format for date parameters. Returns date text like: 14.01.2022*/
export const getApiDateStr = (date: Date | null) => {
    if (date === null || date == undefined) {
        return null
    }

    let monthText = ''
    let dayText = ''

    const _date = new Date(date)

    const day = _date.getDate()
    const month = _date.getMonth() + 1
    const yearText = _date.getFullYear().toString()

    if (day < 10) {
        dayText = '0' + day.toString()
    } else {
        dayText = day.toString()
    }

    if (month < 10) {
        monthText = '0' + month.toString()
    } else {
        monthText = month.toString()
    }

    return dayText + '.' + monthText + '.' + yearText
}

export const getCommissionAmount = (num: number) => {
    const commissionAmount = num * 7 / 100;
    const str = (Math.round(commissionAmount * 100) / 100).toFixed(2);

    return +str;
}

export const getPriceText = (price: number) => {
    if (!price) {
      return '0.00'
    }
  
    const number = price.toFixed(2)
  
    return number.replace(',', '.')
  }