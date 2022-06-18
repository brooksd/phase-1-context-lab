/* Your Code Here */
let createEmployeeRecord = (row) => {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: [3],
        timeInEvents:[],
        timeOutEvents: []
    }
}

let createEmployeeRecords = (employeeData) => {
    return employeeData.map(row => {
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = dates => {
    let [date, hour] = dates.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

let createTimeOutEvent = dates => {
    let [date, hour] = dates.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

let hoursWorkedOnDate = expectedDate => {
    let timeIn = this.timeInEvents.find(e => {
        return e.date === expectedDate
    })

    let timeOut = this.timeOutEvents.find(e => {
        return e.date === expectedDate
    })

    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = dateExpected => {
    let baseWages = hoursWorkedOnDate.call(this, dateExpected) * this.payPerHour
    return parseFloat(baseWages.toString())
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = (srcArray, firstName) =>{
  return srcArray.find(rec => {
    return rec.firstName === firstName
  })
}

let calculatePayroll = arrayOfEmployeeRecords => {
    return arrayOfEmployeeRecords.reduce((memo, rec) => {
        return memo + allWagesFor.call(rec)
    }, 0)
}