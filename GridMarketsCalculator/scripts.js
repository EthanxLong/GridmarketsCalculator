function getAPI(){
    fetch('API_pricing-1657772478846.json')
    .then(function(resp) {return resp.json() })
    .then(function(data){
        console.log(data)
    })
}