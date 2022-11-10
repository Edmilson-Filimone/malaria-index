//we should modularize this function later, it appear more than one time
async function getData(url) {
    let json = await fetch(url)
        .then((data) => data.json())
        .then((json) => json);

    let array_value = []
    let data = []
    let i = 0
    let counter = 0
    for (i; i < json.length; i++) {

        array_value.push(parseFloat(json[i].value.toFixed(2)))

        counter++
        if (counter == 11) {
            counter = 0
            data.push({ name: json[i].name, data: array_value })
            array_value = []
        }
    }

    let values = []
    let k = data.forEach((item) => {
        values.push(item.data.reduce((a, b) => a + b, 0) / item.data.length)
    })

    let data_Average = {data: values, name: name }

    return data_Average
}


async function calculateAverages() {

    /*The func getData() return the average of each province, */
    /*The function calculate the total average by summing the provinces averages*/

    let province_avg = []
    province_avg.push(await getData("https://raw.githubusercontent.com/Edmilson-Filimone/datasets/main/malaria_data_prevalence_b.json")) //"Prevalence"
    province_avg.push(await getData("https://raw.githubusercontent.com/Edmilson-Filimone/datasets/main/malaria_data_incidence_b.json")) //"Incidence"
    province_avg.push(await getData("https://raw.githubusercontent.com/Edmilson-Filimone/datasets/main/malaria_data_mortality_b.json")) //"Mortality"

    const country_average = []

    province_avg.forEach((item) => {
        country_average.push(parseFloat((item.data.reduce((a, b) => a + b, 0) / item.data.length).toFixed(2)))

    })

    return country_average
}

async function displayCardValue() {

    //Selecting the cards elements from the DOM
    const prevalence_card = document.querySelector("#card-value-1")
    const incidence_card = document.querySelector("#card-value-2")
    const mortality_card = document.querySelector("#card-value-3")
    //Changing the value with the calculeted data

    const value = await calculateAverages()

    prevalence_card.textContent = value[0]
    incidence_card.textContent = value[1]
    mortality_card.textContent = value[2]
}


displayCardValue()