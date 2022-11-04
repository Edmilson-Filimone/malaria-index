(async () => {
    
 //pegando os dados sobre prevalencia em json 
  const url =
    "https://raw.githubusercontent.com/Edmilson-Filimone/datasets/main/malaria_data_mortality.json";

  let json = await fetch(url)
    .then((data) => data.json())
    .then((json) => json);

  
  const array = [];

  //pegando o slider da DOM, adicionando um evento, filtrando o json com base no valor do slider e gurdando no array
  
  const year = document.querySelector("#Year");
  
  year.addEventListener("input", (e) => {

    for (let i = 0; i < json.length; i++) {
      
        if (json[i]?.year == e.target.value) {
            array.push([json[i]?.code, json[i]?.mortality]);
      }
    }
    //The map
    
    mapp(array)

  });
  
  year.addEventListener("click", (e)=>{e.preventDefault()})

  year.dispatchEvent(new Event("input"));

})();
  // Prepare demo data. The data is joined to map using value of 'hc-key'
  // property by default. See API docs for 'joinBy' for more info on linking
// funcao anonima usa este formato: (codigo)(); --> executa de imediato

async function mapp(array){
    
    //layer do map - topojson
    const topology = await fetch(
        "https://code.highcharts.com/mapdata/countries/mz/mz-all.topo.json"
      ).then((response) => response.json());
    
    
    Highcharts.mapChart("container_e", {
        chart: {
          map: topology,
        },
  
        title: {
          text: `Malaria Mortality  \n${year.value}`,
        },
  
        subtitle: {
          text: "Time series data - 2010 up to 2020",
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
            name: "Mortality (%)",
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