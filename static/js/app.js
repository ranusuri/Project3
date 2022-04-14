var myMap = L.map("map", {
        center: [40.7, -73.95],
        zoom: 11
      });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

var queryUrl = "http://127.0.0.1:5000/test"

// Fetch the JSON data and console log it

d3.json(queryUrl).then(function (data) {
    console.log(data);


    const city = [];
    let state = [];
    let date = [];
    let shape = [];
    let city_latitude = [];
    let city_longitude = [];
    var theMarker = {};

    for (let i = 0; i < data.length; i++) {
        city.push(data[i].city);
        state.push(data[i].state);
        date.push(data[i].date);
        shape.push(data[i].shape);
        city_latitude.push(data[i].city_latitude);
        city_longitude.push(data[i].city_longitude);
    };
    theMarker = new L.marker([data[0].city_latitude, data[0].city_longitude]).addTo(myMap);
    theMarker.bindPopup(`<h1>${data[0].state}</h1><h2>${data[0].city}</h2> <hr> <h3>UFO Shape: ${data[0].shape}</h3>`)
    console.log(state);
    var trace1 = {
        type: "bar",
        x: state,
        y: shape,
        orientation: "v",
        transforms: {
                type: 'filter',
                target: shape,
                operation: "=",
                value: "other"
        }
                
 };
        
    var data1 = [trace1];
    var title = "UFO shape sightings by State";

    // Apply a title to the layout
    var layout1 = {
        title: {
            text: 'UFO shape sightings by State'
        },
        xaxis: {
            title: {text:'states'}
        }
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", data1, layout1);

//     let trace2 = {
//         x:ex['otu_ids'],
//         y:ex['sample_values'],
//         mode:'markers',
//         test:ex['otu_labels'],
//         marker: {
//             size:ex['sample_values'],
//             color:ex['otu_ids']
//         }
//     };
//     var layout2 = {
//         title: {
//             text: 'OTU Bubble Chart'
//         },
//         xaxis: {
//             title: {text:'OTU Number'}
//         },
//         yaxis: {
//             title: {text:'Value'}
//         }
//     };
//     var data2 = [trace2];
//     Plotly.newPlot("bubble",data2,layout2)

    // Demographics Info
    let meta = data[0];
    let demographics = "";
    for (const [key, value] of Object.entries(meta)) {
        demographics += key+" : "+value+"<br>";
    }
    document.getElementById("sample-metadata").innerHTML = demographics

    // Gauge Plot
//     let data3 = [{
//         domain: {x:[0,1],y:[0,1]},
//         value:data['metadata'][0].wfreq,
//         title: {text:"Weekly Belly Button Wash Frequency"},
//         type:"indicator",
//         mode:"gauge+number",
//         gauge: {
//             axis: {range: [0,9],
//                 tickvals:[0,1,2,3,4,5,6,7,8,9]
//             },
//             steps: {range:[0,9]}
//         }
//     }]
//     let layout3 = {
//         width:600,
//         height:450,
//         margin: {t:0, b:0}
//     };
//     Plotly.newPlot("gauge",data3,layout3);


    for (var j = 0; j < city.length; j++) {
        var dropdown = document.getElementById("selDataset");
        var opt = document.createElement("option"); 
        opt.text = `${city[j]}, ${state[j]}`;
        opt.value = city[j].toString();
        dropdown.options.add(opt);
    };

    var options = '';
    
    for (var j = 0; j < city.length; j++) {
       options += ('<option value="' + city[j]+ '">' + city[j] + '</option>');
    };
    console.log(options);

    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("#selDataset").on("change", updatePlotly);

//     // This function is called when a dropdown menu item is selected
    function updatePlotly() {
        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.property("value");
        
        console.log("dataset: "+dataset)

        const city = [];
        let state = [];
        let date = [];
        let shape = [];
        let city_latitude = [];
        let city_longitude = [];     


        for (let f=0; f < data.length; f++) {
               
            if (data[f].city == dataset) {
                city.push(data[f].city);
                state.push(data[f].state);
                date.push(data[f].date);
                shape.push(data[f].shape);
                city_latitude.push(data[f].city_latitude);
                city_longitude.push(data[f].city_longitude);               
                if (theMarker != undefined) {
                        myMap.removeLayer(theMarker);
                  }    
        theMarker = new L.marker([data[f].city_latitude, data[f].city_longitude]).addTo(myMap);
        theMarker.bindPopup(`<h1>${data[f].state}</h1><h2>${data[f].city}</h2> <hr> <h3>UFO Shape: ${data[f].shape}</h3>`)    
                console.log(theMarker)          
                
                // // Bubble Chart
                // let trace2 = {
                //     x:data['samples'][f]['otu_ids'],
                //     y:data['samples'][f]['sample_values'],
                //     mode:'markers',
                //     test:data['samples'][f]['otu_labels'],
                //     marker: {
                //         size:ex['sample_values'],
                //         color:ex['otu_ids']
                //     }
                // };
                // let layout2 = {
                //     title: {
                //         text: 'OTU Bubble Chart'
                //     },
                //     xaxis: {
                //         title: {text:'OTU Number'}
                //     },
                //     yaxis: {
                //         title: {text:'Value'}
                //     }
                // };
                // var data2 = [trace2];
                // Plotly.newPlot("bubble",data2,layout2)

                // Demographics Info
                let meta = data[f];
                let demographics = "";
                for (const [key, value] of Object.entries(meta)) {
                        demographics += key+" : "+value+"<br>";
                }
                document.getElementById("sample-metadata").innerHTML = demographics

                    // Gauge Plot
                // let data3 = [{
                //     domain: {x:[0,1],y:[0,1]},
                //     value:data['metadata'][f].wfreq,
                //     title: {text:"Weekly Belly Button Wash Frequency"},
                //     type:"indicator",
                //     mode:"gauge+number",
                //     gauge: {
                //         axis: {range: [0,9],
                //             tickvals:[0,1,2,3,4,5,6,7,8,9]
                //         },
                //         steps: {range:[0,9]}
                //     }
                // }]
                // let layout3 = {
                //     width:600,
                //     height:450,
                //     margin: {t:0, b:0}
                // };
                // Plotly.newPlot("gauge",data3,layout3);
                // break
            };
        };


        // // Bar Chart
        // var trace1 = {
        //     y: ids,
        //     x: vals,
        //     text: labels,
        //     type: "bar",
        //     orientation: "h"
        // };
        // var data1 = [trace1];
        // var title = `Top 10 OTUs`;
        // var layout1 = {
        //     title: {
        //         text: 'Top 10 OTUs'
        //     },
        //     xaxis: {
        //         title: {text:'Frequency'}
        //     }
        // };
        // Plotly.newPlot("bar", data1, layout1);
          
    };
;
  

});
