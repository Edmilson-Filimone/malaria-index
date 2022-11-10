async function getData(url, name) {

  /*The function return a object with the avareges of each province for each metric*/
  /*console.log(json) --> log the data to understand the structure of the json that justify the code bellow*/

  let json = await fetch(url)
    .then((data) => data.json())
    .then((json) => json);

  let array_value = []
  let data = []
  let i = 0
  let counter = 0
  for (i; i < json.length; i++) {

    array_value.push(json[i].value)

    counter++
    if (counter == 11) {
      counter = 0
      data.push({ name: json[i].name, data: array_value })
      array_value = []
    }
  }
  /* data format: {name:[array of names], values:[array of valuews]}*/
  let values = []
  let labelSet = []
  let k = data.forEach((item) => {
    labelSet.push(item.name)
    const average = item.data.reduce((a, b) => a + b, 0) / item.data.length;
    values.push(parseFloat(average.toFixed(2)))
  })

  let data_Average = { label: labelSet, data: values, name: name }

  return data_Average
}


async function buildBarChart(container, title) {

  //console.log(getData)
  let data_avg = []
  data_avg.push(await getData("https://raw.githubusercontent.com/Edmilson-Filimone/datasets/main/malaria_data_prevalence_b.json", "Prevalence"))
  data_avg.push(await getData("https://raw.githubusercontent.com/Edmilson-Filimone/datasets/main/malaria_data_incidence_b.json", "Incidence"))
  data_avg.push(await getData("https://raw.githubusercontent.com/Edmilson-Filimone/datasets/main/malaria_data_mortality_b.json", "Mortality"))

  console.log(data_avg)
  const labels = data_avg[0].label //data_avg[0].label -> the label are the same for the 3  

  barChart(data_avg, container, title, "Average", labels)
}

function barChart(data, container, title, ylabel, xlabel) {

  Highcharts.chart(`${container}`, {

    chart: {
      type: 'column'
    },

    title: {
      text: `${title}`
    },

    subtitle: {
      text: 'Source: <a href="https://data.malariaatlas.org/trends" target="_blank">Malaria Atlas</a>'
    },

    xAxis: {
      categories: xlabel
    },

    yAxis: {
      title: {
        text: ylabel
      }
    }
    ,

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        label: false,
      }
    },

    series: data,
    responsive: {
      rules: [{
        condition: {
          maxWidth: 400
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  });
}

buildBarChart("container_avg", "Metrics Averages")
