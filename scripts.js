fetch("API_pricing-1657772478846.json")
.then(function(resp) {return resp.json() })
.then(function(data) {
    
    machineTypes = Object.keys(data.data.pricing)
    machineServices = data.data.pricing
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

    document
    .getElementById("machine-dropdown")
    .addEventListener("change", (e) => {
      console.log(Object.keys(data.data.pricing[e.target.value]));
      
    });



    for (item in machineServices) {
        optionTwo = document.createElement("option");
        for (j = 0; i < Object.keys(machineServices[item]).length; i++) {
          console.log(Object.keys(machineServices[item])[j]);
          optionTwo.text = Object.keys(machineServices[item])[j];
          document.getElementById("renderer-dropdown").add(optionTwo);
        }
      }

    //for (i = 0; i < machineServices.length; i++){
    //    option = document.createElement('option')
    //    option.text = machineServices[i]
    //    document.getElementById('renderer-dropdown').add(option)
//
    //    //const rendererItems = document.createElement("option")
    //    //rendererItems.text= machineServices[i];
    //    //document.getElementById("renderer-dropdown").add(rendererItems);
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
        machine: document.getElementById('machine-dropdown').value,
        renderer: document.getElementById('renderer-dropdown').value,
        plans: document.getElementById('plans-dropdown').value,
        totalframes: document.getElementById('totalFrames-input').value,
        averageframes: document.getElementById('AVGframes-input').value
    }
    inputs.push(input);
    document.forms[0].reset();
    
    console.warn('added', {inputs} );
    let pre = document.querySelector('#msg pre')
    pre.textContent = '\n' + JSON.stringify(inputs, '\t', 2)
}

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('btn').addEventListener('click', calculate)
})
