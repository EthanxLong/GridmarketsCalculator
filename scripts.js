fetch("API_pricing-1657772478846.json")
.then(function(resp) {return resp.json() })
.then(function(data) {

    console.log(data.data.pricing)
    
    
    machineTypes = Object.keys(data.data.pricing)
    machineServices = Object.keys(data.data.pricing)
    machinePlans = data.data.meta_data.plans
    machinePricing = data.data.pricing

    //machineServices.forEach((element)=>{console.log(element)});

    //for (item in machineServices) {console.log(machineServices[item])}
    //for (item in machineServices) {
    //    for (inner in machineServices[item]) {
    //        //console.log(machineServices[item][inner]);
    //    }
    //} 

    //console.log(data.data.pricing)

   
    for (i = 0; i < machineTypes.length; i++){
        option = document.createElement('option')
        option.text = machineTypes[i]
        document.getElementById('machine-dropdown').add(option)
    }

    //function removeOptions(selectElement) {
    //    var i, L = selectElement.options.length - 1;
    //    for(i = L; i >= 0; i--) {
    //       selectElement.remove(i);
    //    }
    // }
     
     // using the function:
     

    document
        .getElementById("machine-dropdown")
        .addEventListener("change", (e) => {
          
          selectedRenderer = Object.keys(data.data.pricing[e.target.value])

          if ($('#renderer-dropdown option').length) 

          for (i = 0; i < selectedRenderer.length; i++){
            option = document.createElement('option')
            option.text = selectedRenderer[i]
            document.getElementById('renderer-dropdown').add(option)
          }
          console.log($('#renderer-dropdown option').length);
        });

    //for (i = 0; i < machineServices.length; i++){
    //    option = document.createElement('option')
    //    option.text = machineServices[i]
    //    document.getElementById('renderer-dropdown').add(option)
    //} 

    for (i = 0; i < machinePlans.length; i++){
        option = document.createElement('option')
        option.text = machinePlans[i]
        document.getElementById('plans-dropdown').add(option)
    }

});

inputs = [];
const calculate = (event) =>{
    event.preventDefault();
    let input = {
        machineInput: document.getElementById('machine-dropdown').value,
        rendererInput: document.getElementById('renderer-dropdown').value,
        plansInput: document.getElementById('plans-dropdown').value,
        totalframesInput: document.getElementById('totalFrames-input').value,
        averageframesInput: document.getElementById('AVGframes-input').value
    }
    inputs.push(input);

    let machineInput = inputs[0].machineInput
    let rendererInput = inputs[0].rendererInput
    let plansInput = inputs[0].plansInput
    let totalframesInput = inputs[0].totalframesInput
    let averageframesInput = inputs[0].averageframesInput
    
    // console.log(machineInput)
    // document.forms[0].reset();
    
    
    fetch("API_pricing-1657772478846.json")
    .then(function(resp) {return resp.json() })
    .then(function(data) {
        machinePrice = data.data.pricing[machineInput][rendererInput][plansInput].cost
        
        
        let price = (averageframesInput/60) * (totalframesInput * machinePrice)
        document.getElementById('output').innerHTML = price

    })
}

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('btn').addEventListener('click', calculate)
})
