fetch("API_pricing-1657772478846.json")
.then(function(resp) {return resp.json() })
.then(function(data) {
    
    machineTypes = data.data.meta_data.machine_types
    machineServices = data.data.meta_data.services
    machinePlans = data.data.meta_data.plans
    machinePricing = data.data.pricing

    //console.log(machineServices)

    for (i = 0; i < machineTypes.length; i++){

        option = document.createElement('option')
        option.text = machineTypes[i]

        document.getElementById('machine-dropdown').add(option)

    }

    for (i = 0; i < machineServices.length; i++){
        option = document.createElement('option')
        option.text = machineServices[i]

        document.getElementById('renderer-dropdown').add(option)
    } 

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
