const axios = require('axios')
const scanHolders = async (tick = 'fren') => {

    let no_more = false
    let addr_list = []
    let balance_list = []

    console.log('-------------------------GETTING PREDICATES------------------------------')
    let i = 0
    while (!no_more) {

        console.log(`calling: https://api-prod.cybord.org/predicates/${tick}?offset=${i * 100}&limit=100`)
        const response = await axios.get(`https://api-prod.cybord.org/predicates/${tick}?offset=${i * 100}&limit=100`)

        if (response.data.length === 0) {
            no_more = true;
            break;
        }

        const { data } = response

        for (let j = 0; j < data.length; j++) {
            const element = data[j];
            const { acc, xnext } = element
            if(addr_list.indexOf(acc) <= -1)
                addr_list.push(acc)

            if(xnext) {
                const nacc = xnext.acc
                if(addr_list.indexOf(nacc) <= -1)
                    addr_list.push(nacc)
            }

        }

        i ++
    }

    console.log('-------------------------Finished with PREDICATES------------------------------\n')

    console.log('-------------------------Calling Balances------------------------------\n')

    for (let i = 0; i < addr_list.length; i ++) {
        const address = addr_list[i]

        console.log(`calling https://api-prod.cybord.org/balance/${address}`)
        const response = await axios.get(`https://api-prod.cybord.org/balance/${address}`)

        const { data } = response
        console.log(data)

        for(let j = 0; j < data.length; j ++) {
            const rec = data[j]
            if(rec.tick === tick) {
                if (rec.amt && parseInt(rec.amt) > 0)
                    balance_list.push ( {address, amount: rec.amt})
            }
        }
    }

    console.log(`-------------------------Scan finished for ${tick} at ${getDateStr()}}------------------------------\n`)

    balance_list.sort((n1, n2) => n2.amount - n1.amount)

    global.holderMap[tick] = balance_list;
}

const getDateStr = () => {
    const nowDate = new Date()
    return `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-${nowDate.getDate()}  ${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}`
}

module.exports = scanHolders