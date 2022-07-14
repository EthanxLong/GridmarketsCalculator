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



