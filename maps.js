async function buildMap(url, container, title, label, slideID){
    
 //pegando os dados sobre prevalencia em json 
  let json = await fetch(url)
    .then((data) => data.json())
    .then((json) => json);

  
  const array = [];

  //pegando o slider da DOM, adicionando um evento, filtrando o json com base no valor do slider e gurdando no array
  
  const slideInput = document.querySelector(`${slideID}`);
  
  slideInput.addEventListener("input", (e) => {

    for (let i = 0; i < json.length; i++) {
      
        if (json[i]?.year == e.target.value) {
            array.push([json[i]?.code, parseFloat((json[i]?.value).toFixed(2))]);
      }
    }
    //The map
    
    mapp(array, container, title, label, slideInput)

  });
  
  slideInput.addEventListener("click", (e)=>{e.preventDefault()})

  slideInput.dispatchEvent(new Event("input"));

}

async function mapp(array, container, title, label, year){
    
    //layer do map - topojson
    const topology = await fetch(
        "https://code.highcharts.com/mapdata/countries/mz/mz-all.topo.json"
      ).then((response) => response.json());
    
    
    Highcharts.mapChart(`${container}`, {
        chart: {
          map: topology,
        },
  
        title: {
          text: `${title} \n${year?.value}`,
        },
  
        subtitle: {
          text: 'Source: <a href="https://data.malariaatlas.org/trends" target="_blank">Malaria Atlas</a>',
        },
  
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            verticalAlign: "bottom",
          },
        },
  
        colorAxis: {
          min: 0,
        },
  
        series: [
          {
            data: array,
            joinBy: "hc-key",
            name: `${label}`,
            states: {
              hover: {
                color: "#3772FF",
              },
            },
            dataLabels: {
              enabled: true,
              format: `{point.name}`,

                style: {
                    color: 'white'

                }
            },
          },
        ],
      });
}

buildMap("https://raw.githubusercontent.com/Edmilson-Filimone/datasets/main/malaria_data_prevalence_b.json", "container_a", "Prevalence Among Children","Prevalence (%)", "#Year_a" )
buildMap("https://raw.githubusercontent.com/Edmilson-Filimone/datasets/main/malaria_data_incidence_b.json", "container_c", "Incidence of Malaria","Incidence", "#Year_c" )
buildMap("https://raw.githubusercontent.com/Edmilson-Filimone/datasets/main/malaria_data_incidence_b.json", "container_e", "Mortality of Malaria","Mortality", "#Year_e" )