


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

      if (lst[i] != softwareValue) {
        option = document.createElement('option')
        option.text = lst[i]
        document.getElementById('renderer-dropdown').add(option)
    }
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

function success() {
  if(document.getElementById("averageframesInput").value==="") { 
           document.getElementById('btn').disabled = true; 
       } else { 
           document.getElementById('btn').disabled = false;
       }
   }

document.getElementById("btn").addEventListener("click", myFunction);   
function myFunction() {

  machineValue = document.getElementById("machine-dropdown").value
  renderValue = document.getElementById("renderer-dropdown").value

  //cTestFrameInput = document.getElementById("countTestFrame-input").value
  //tRenTimeInput = document.getElementById("totalRenderTime-input").value


  totalframesInput = document.getElementById("totalFrames-input").value
  averageframesInput = document.getElementById("averageframesInput").value

  // averageframesInput = (tRenTimeInput/cTestFrameInput)

  if ((averageframesInput || totalframesInput) < 0 ){
    document.getElementById('btn').disabled = True;
  }

  machineCost = data.data.pricing[machineValue][renderValue]

  oldLst = Object.keys(machineCost);
  sortedPlansList = data.data.meta_data.plans

  oldLst.sort(function(a, b) {
    return sortedPlansList.indexOf(a) - sortedPlansList.indexOf(b)
  })
  
  
  if ($("#cost").length > 0){
      $("#cost").empty()
  }

  if ($("#time").length > 0){
    $("#time").empty()
}
if ($("#machineCost").length > 0){
  $("#machineCost").empty()
}
if ($("#service").length > 0){
  $("#service").empty()
}
  
  
  for (i = 0; i < oldLst.length; i++){
    plan = oldLst[i]
    conc = machineCost[plan].max_machines

    estWall = (totalframesInput > conc) ? (averageframesInput * Math.ceil(totalframesInput/conc)) : averageframesInput
    price = (averageframesInput/60) * (totalframesInput * machineCost[plan].cost)

    if ((estWall % 60).toFixed(0) < 10){
      time = Math.floor(estWall/60) + ":" + "0" + (estWall % 60).toFixed(0)
    } else {
      time = Math.floor(estWall/60) + ":" + (estWall % 60).toFixed(0)
    }
    

    document.getElementById("container3").style.border = "solid #1c4cd3"

    document.getElementById("serviceLevel").innerHTML = "Service Level";
    document.getElementById("display1").innerHTML = "Total Credits";
    document.getElementById("display2").innerHTML = "Elapsed Time (HH:MM)";
    document.getElementById("display3").innerHTML = "Credits/Mach-Hr";
    
    document.getElementById("service").innerHTML += plan + "<br/>"

    document.getElementById("cost").innerHTML += price.toFixed(2) + "<br/>";
    document.getElementById("time").innerHTML += time + "<br/>";

    document.getElementById("machineCost").innerHTML +=  machineCost[plan].cost.toFixed(2) + "<br/>";
    
    console.log(machineCost)
  }
  
}   
  
});

// JavaScript for label effects only
$(window).load(function(){
  $(".col-3 input").val("");
  
  $(".input-effect input").focusout(function(){
    if($(this).val() != ""){
      $(this).addClass("has-content");
    }else{
      $(this).removeClass("has-content");
    }
  })
});

