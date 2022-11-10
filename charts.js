async function buildChart (url, container, title, ylabel) {
    
 //pegando os dados sobre prevalencia em json    

  let json = await fetch(url)
    .then((data) => data.json())
    .then((json) => json);

    let array_value = []
    let array_year = []

    let data = []
    let i = 0
    let counter = 0
    for(i; i < json.length; i++){
      
      array_value.push(parseFloat(json[i].value.toFixed(2)))
      array_year.push(json[i].year)

      counter++      
      if(counter == 11){
        counter = 0
        data.push({name:json[i].name, data:array_value})
        array_value = [] 
        array_year = []
      }
    }

    console.log(data)

    chart(data, container, title, ylabel)

}

function chart(data, container, title, ylabel){

Highcharts.chart(`${container}`, {

  chart:{
    type:'line'
  },

  title: {
    text: `${title}`
  },

  subtitle: {
    text: 'Source: <a href="https://data.malariaatlas.org/trends" target="_blank">Malaria Atlas</a>'
  },

  yAxis: {
    title: {
      text: `${ylabel}`
    }
  },

  xAxis: {
    accessibility: {
      rangeDescription: 'Range: 2010 to 2020'
    }
  },

  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
  },

  plotOptions: {
    series: {
      label:false,
      pointStart: 2010
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

buildChart("https://raw.githubusercontent.com/Edmilson-Filimone/datasets/main/malaria_data_prevalence_b.json", "container_b", "Prevalence Among Children", "Prevalence per 500 children" )
buildChart("https://raw.githubusercontent.com/Edmilson-Filimone/datasets/main/malaria_data_incidence_b.json", "container_d", "Incidence of Malaria", "Incidence" )
buildChart("https://raw.githubusercontent.com/Edmilson-Filimone/datasets/main/malaria_data_mortality_b.json", "container_f", "Mortality of Malaria", "Mortality" )