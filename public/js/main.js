
require(['Chart.bundle.min'], function(Chart){
    var ctx = document.getElementById("myChart");
    var theUrl = "/resultados";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    var registros = JSON.parse(xmlHttp.responseText);
    console.log(registros[0], registros.length);
    var arregloEquipos = [];
    var arregloPaso = [];
    //registros.forEach(function(dato){
    //    arregloEquipos.push(dato.equipo);
    //    arregloPaso.push(dato.paso);
    //});
    for(i=0; i < registros.length; i++){
        arregloEquipos.push(registros[i].equipo);
        arregloPaso.push(registros[i].paso);
    }
    console.log(arregloEquipos);
    console.log(arregloPaso);
    var myChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
        labels: arregloEquipos,
        datasets: [{
            label: 'Paso del reto',
            data: arregloPaso,
            backgroundColor: [
                "#FF6384",
                "#4BC0C0",
                "#FFCE56",
                "#E7E9ED",
                "#36A2EB",
                "#8d0808",
                "#ff4d4d",
                "#b3ff66"
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive : true,
        scale: {
                lineArc : true,
                angleLines : {
                    display : true
                },
              ticks: {
                display : true,
                beginAtZero: true,
                  maxTickLimit : 6,
                  stepSize : 1
              },
              reverse: false
            },
            animation: {
                animateRotate: false,
                animateScale: true
            }
    }
        
});})
