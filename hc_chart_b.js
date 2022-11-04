(async () => {
    
 //pegando os dados sobre prevalencia em json 
  const url =
    "https://raw.githubusercontent.com/Edmilson-Filimone/datasets/main/malaria_data_incidence.json";

  let json = await fetch(url)
    .then((data) => data.json())
    .then((json) => json);

    let array_value = []
    let array_year = []

    let data = []
    let i = 0
    let counter = 0
    for(i; i < json.length; i++){
      
      array_value.push(parseFloat(json[i].incidence.toFixed(2)))
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

    chart_b(data)

})()


function chart_b(data){

Highcharts.chart('container_d', {

  title: {
    text: 'Malaria Incidence'
  },

  subtitle: {
    text: 'Source: <a href="https://data.malariaatlas.org/trends" target="_blank">Malaria Atlas</a>'
  },

  yAxis: {
    title: {
      text: 'Incidence per 1000 person'
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
