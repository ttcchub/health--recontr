const { format } = require('date-fns')
const subDays = require('date-fns/subDays')

const setUpdate = (days) => {
    return format(subDays(new Date(), -days), 'dd/MM/yyyy')
}
const createListOfTime = () => {
    let list = {

    }
    let time = format(new Date(), 'ddMMyyyy')
    let item = {
        time: 730,
        userConfirm: false,
        hospitalConfirm: false,
        userVisitConfirm: false,
        customerId: null
    }
    for (let i = 0; i < 30; i++) {
        list[`${setUpdate(i)}`] = []
        let time = 700
        for (let j = 0; j <= 21; j++) {

            if (j % 2 === 0) {
                time += 30

            } else {
                time += 70

            }
            let item = {
                time,
                customerId: null,
                userConfirm: false,
                hospitalConfirm: false,
                userVisitConfirm: false,
                customerNote: '',
                hospitalNote: '',
            }
            list[`${setUpdate(i)}`]?.push(item)

        }
    }
    return list

}
module.exports = createListOfTime