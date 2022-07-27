if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        var head = document.getElementsByTagName('HEAD')[0];
        // Create new link Element
        var link = document.createElement('link');
        // set the attributes for link element
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'mobileStyle.css';
        // Append link element to HTML head
        head.appendChild(link);
} else {

}


//fetch("https://api.gridmarkets.com:8003/api/render/1.0/pricing", {
//  method: 'GET',
//  headers: {
//    'GridMarkets-Pricing-APIKey':  '',
//  },
//})
//.then(function(resp) {return resp.json() })
fetch("API_pricing-1657772478846.json", {
  headers: {
    'GridMarkets-Pricing-APIKey': ''
}
})
.then(function(resp) {return resp.json() })
.then(function(data) {
    sortedMachineList = data.data.meta_data.machine_types
    machineTypes = Object.keys(data.data.pricing)
    machineServices = data.data.meta_data.services
    sortedPlansList = data.data.meta_data.plans
    
    console.log(data)
    softwareList = [];

    for (i = 0; i < machineServices.length; i++){
      option = document.createElement('option')
      word = machineServices[i]
        if (!(word.includes('-'))){
          option.text = word
          document.getElementById('software-dropdown').add(option)
          softwareList.push(word)
        } 
  }

  document
      .getElementById("software-dropdown")
      .addEventListener("change", (e) => {
        softwareValue = document.getElementById('software-dropdown').value
        software = e.target.value
        machineServices = data.data.meta_data.services

        lst = []
        newlst = []

        if (!(lst.includes(software))){
          $("#renderer-dropdown").empty();
          $('#renderer-dropdown').append('<option value="" disabled selected>Select Renderer </option>') 
          for(i = 0; i < machineServices.length; i++){
            if (machineServices[i].includes(software)){
              lst.push(machineServices[i])
            }
          }
          for (i = 0; i < lst.length; i++){
            option = document.createElement('option')
            option.text = lst[i]
            document.getElementById('renderer-dropdown').add(option)
          }
        }
        
})

    

    document
        .getElementById("renderer-dropdown")
        .addEventListener("change", (e) => {
          machineValue = document.getElementById('machine-dropdown').value
          renderValue = document.getElementById('renderer-dropdown').value
          renderer = e.target.value
          machineArray = data.data.pricing

          lst = [];
          newlst = [];

          if (!(lst.includes(machineValue))){
            $("#machine-dropdown").empty();
            $('#machine-dropdown').append('<option value="" disabled selected>Select Machine </option>')
            for (const [key, value] of Object.entries(data.data.pricing)) {
              if (renderValue in value){
                lst.push(key)
              }
              }
            
            lst.sort(function(a, b) {
              return sortedMachineList.indexOf(a) - sortedMachineList.indexOf(b)
            })

          for (i = 0; i < lst.length; i++){
            option = document.createElement('option')
            option.text = lst[i]
            document.getElementById('machine-dropdown').add(option)
          }
        }
          
        });
        
        document
        .getElementById("machine-dropdown")
        .addEventListener("change", (ev) => {
          speed = ev.target.value
          machineValue = document.getElementById('machine-dropdown').value
          renderValue = document.getElementById('renderer-dropdown').value

          selectedSpeed = Object.keys(data.data.pricing[machineValue][renderValue])

          lst1 = [];

});

    document.getElementById("btn").addEventListener("click", myFunction);   
    function myFunction() {
    
        machineValue = document.getElementById("machine-dropdown").value
        renderValue = document.getElementById("renderer-dropdown").value
    
        averageframesInput = document.getElementById("AVGframes-input").value
        totalframesInput = document.getElementById("totalFrames-input").value
    
        machineCost = data.data.pricing[machineValue][renderValue]

        oldLst = Object.keys(machineCost);
        sortedPlansList = data.data.meta_data.plans

        oldLst.sort(function(a, b) {
          return sortedPlansList.indexOf(a) - sortedPlansList.indexOf(b)
        })
        
        console.log(oldLst)
        
        if ($("#cost").length > 0){
            $("#cost").empty()
        }

        if ($("#time").length > 0){
          $("#time").empty()
      }
        console.log(machineCost)

        
        
        for (i = 0; i < oldLst.length; i++){
          plan = oldLst[i]
          conc = machineCost[plan].max_machines

          estWall = (totalframesInput > conc) ? (averageframesInput * Math.ceil(totalframesInput/conc)) : averageframesInput
          price = (averageframesInput/60) * (totalframesInput * machineCost[plan].cost)

          time = Math.floor(estWall/60) + "h " + (estWall % 60).toFixed(0) + "m"

          if (Math.floor(estWall/60) == 0){
            time = (estWall % 60).toFixed(0) + "m"
          }

          document.getElementById("display1").innerHTML = "Cost in Credits";
          document.getElementById("display2").innerHTML = "Time (hour/mins)";          

          document.getElementById("cost").innerHTML += plan + ": " + price.toFixed(2) + "<br/>";
          document.getElementById("time").innerHTML += time + "<br/>";
          
        }
        
    }   
        
});

