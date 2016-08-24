
require(['Chart.bundle.min'], function(Chart){
    var ctx = document.getElementById("myChart");
    var theUrl = "https://148c22bc-9bfc-4aa0-aa3e-319d2874d333-bluemix:77b83f0fe3c5f00d8d7c7b9f3809017d83a7e1ebaf929223f0ef380e1cd8490c@148c22bc-9bfc-4aa0-aa3e-319d2874d333-bluemix.cloudant.com/devconnect2016/_all_docs?include_docs=true&descending=true";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    var registros = xmlHttp.responseText;
    alert(registros);
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});})
