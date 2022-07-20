fetch("API_pricing-1657772478846.json")
.then(function(resp) {return resp.json() })
.then(function(data) {

    
    
    machineTypes = Object.keys(data.data.pricing)
    machineServices = data.data.meta_data.services

    //console.log(data.data.pricing)
    
    for (i = 0; i < machineServices.length; i++){
        option = document.createElement('option')
        option.text = machineServices[i]
        document.getElementById('renderer-dropdown').add(option)
    }

    document
          .getElementById("machine-dropdown")
          .addEventListener("change", (ev) => {
            speed = ev.target.value
            machineValue = document.getElementById('machine-dropdown').value
            renderValue = document.getElementById('renderer-dropdown').value
            planValue = document.getElementById('plans-dropdown').value

            selectedSpeed = Object.keys(data.data.pricing[machineValue][renderValue])
  
            if (!(selectedSpeed.includes(planValue))){
              $('#plans-dropdown').empty();
              $('#plans-dropdown').append('<option value="" disabled selected>Select Plan </option>')
              for (i = 0; i < selectedSpeed.length; i++){
                  option = document.createElement('option')
                  option.text = selectedSpeed[i]
                  document.getElementById("plans-dropdown").add(option)
                }
            }
  
  
});

    document
        .getElementById("renderer-dropdown")
        .addEventListener("change", (e) => {
          machineValue = document.getElementById('machine-dropdown').value
          renderValue = document.getElementById('renderer-dropdown').value
          renderer = e.target.value
          machineArray = data.data.pricing

          //console.log(Object.entries(machineArray))
          lst = [];

          if (!(lst.includes(machineValue))){
            $("#machine-dropdown").empty();
            $('#machine-dropdown').append('<option value="" disabled selected>Select Service </option>')
            for (const [key, value] of Object.entries(data.data.pricing)) {
              if (renderValue in value){
                lst.push(value)
                option = document.createElement('option')
                option.text = key
                document.getElementById('machine-dropdown').add(option)
              }
              }
            }

          //if (!(machineArray.includes(renderValue))){
          //  $("#renderer-dropdown").empty();
          //  $('#renderer-dropdown').append('<option value="" disabled selected>Select Service </option>')
          //  for (i = 0; i < machineArray.length; i++){
          //      option = document.createElement('option')
          //      option.text = machineArray[i]
          //      document.getElementById('renderer-dropdown').add(option)
          //    } 
          //   console.log(machineArray) 
          //}
//

    
        });


        

    document.getElementById("btn").addEventListener("click", myFunction);   
    function myFunction() {
    
        machineValue = document.getElementById("machine-dropdown").value
        renderValue = document.getElementById("renderer-dropdown").value
        plansValue = document.getElementById("plans-dropdown").value
    
        averageframesInput = document.getElementById("AVGframes-input").value
        totalframesInput = document.getElementById("totalFrames-input").value
    
        machineCost = data.data.pricing[machineValue][renderValue][plansValue].cost
    
    
        
        price = (averageframesInput/60) * (totalframesInput * machineCost)
        
        if ($("#output").length > 0){
            $("#output").empty()
        }
        document.getElementById("output").innerHTML += "Cost: " + price.toFixed(2);
      
        console.log(averageframesInput, totalframesInput, machineCost)
    }   
        
});


