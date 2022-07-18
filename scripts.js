fetch("API_pricing-1657772478846.json")
.then(function(resp) {return resp.json() })
.then(function(data) {

    
    
    machineTypes = Object.keys(data.data.pricing)
    
    for (i = 0; i < machineTypes.length; i++){
        option = document.createElement('option')
        option.text = machineTypes[i]
        document.getElementById('machine-dropdown').add(option)
    }

    document
        .getElementById("machine-dropdown")
        .addEventListener("change", (e) => {
          machineValue = document.getElementById('machine-dropdown').value
          renderValue = document.getElementById('renderer-dropdown').value
          machine = e.target.value
          rendererArray = Object.keys(data.data.pricing[machine])

          // if user selected render is not in the array of possible renderers.
          // then empty, and repopulate dropdown

          if (!(rendererArray.includes(renderValue))){
            $("#renderer-dropdown").empty();
            $('#renderer-dropdown').append('<option value="" disabled selected>Select Service </option>')
            for (i = 0; i < rendererArray.length; i++){
                option = document.createElement('option')
                option.text = rendererArray[i]
                document.getElementById('renderer-dropdown').add(option)
              } 
             console.log(rendererArray) 
          }
    
        });

        document
        .getElementById("renderer-dropdown")
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

        
    }

        
});


