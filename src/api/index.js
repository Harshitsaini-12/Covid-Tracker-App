import Axios from "axios"

const url = "https://covid19.mathdro.id/api"

//For number of cases
export const fetchData = async (country) => {

    let changeableURL = url

    if(country) {
        changeableURL = `${url}/countries/${country}`
    }

    try {

        const { data: { confirmed, recovered, deaths, lastUpdate } } = await Axios.get(changeableURL)

        const modifiedData = { confirmed, recovered, deaths, lastUpdate }
        return modifiedData

    } catch (error) {
        console.log(error)
    }
}

//For dates of charts
export const fetchDailyDate = async () => {
    try {
        
        const {data} = await Axios.get(`${url}/daily`)
        
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }))

        return modifiedData
    } catch (error) {
        console.log(error)
    }
}

//For list of countries
export const fetchCountries = async () => {
    try {

        const {data: {countries}} = await Axios.get(`${url}/countries`)
        return countries.map((country) => country.name)

    } catch(error) {
        console.log(error)
    }
}


