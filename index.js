/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
 function createEmployeeRecord(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(function(row){
        return createEmployeeRecord(row)
    })
}

function createTimeInEvent(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

function hoursWorkedOnDate(workedDate) {
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === workedDate
    })

    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === workedDate
    })

    return (outEvent.hour - inEvent.hour) / 100

}

function wagesEarnedOnDate(workedDate) {
    let wage = hoursWorkedOnDate.call(this, workedDate) * this.payPerHour
    return wage
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function(memo, e){
        return memo + allWagesFor.call(e)
    }, 0)
}

function findEmployeeByFirstName(srcArray, firstname) {
    return srcArray.find(function(e){
        return e.firstName === firstname
    })
}