const body = document.querySelector('body')
body.style.backgroundColor = 'black'
body.style.color = 'white'
body.style.textAlign = 'center'


const inputForm = document.querySelector('#input-form')
const driverTable = document.querySelector('#driver-table')


inputForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const {season, round} = getUserInput()
    console.log(season, round)
    const data = await getDriverData(season, round)
    addToTable(data)
})

function getUserInput() {
    const season = document.querySelector('#szn-field').value
    const round =  document.querySelector('#round-field').value    
    return{season, round}
    
}

async function getDriverData(season, round){
    const res = await fetch(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json?authuser=0`,{
    method: "GET",
    })
    if(res.ok){
        const data = await res.json() 
        return data.MRData.StandingsTable.StandingsLists[0].DriverStandings.slice(0,8)
        console.log(driverData[0].Driver)  
        // return {
        //     position: driverData.position,
        //     name: `${driverData.Driver.givenName} ${driverData.Driver.familyName}`,
        //     sponsor:driverData.Constructors[0].constructorId,
        //     points:driverData.points
        // }
    } else window.alert('Bad Request')
    
}

function addToTable(data){
    console.log(data)
    for(let i = 0; i < data.length; i++){
        const row = document.createElement('tr')        
        const driverPosition = document.createElement('td')
        driverPosition.innerText = data[i].position
        const driverName = document.createElement('td')   
        driverName.innerText = `${data[i].Driver.givenName} ${data[i].Driver.familyName}`
        const driverSponsor = document.createElement('td')
        driverSponsor.innerText = data[i].Constructors[0].constructorId
        let driverPoints = document.createElement('td')
        driverPoints = data[i].points
    row.append(driverPosition,driverName,driverSponsor,driverPoints)
    console.log(driverTable)
    driverTable.append(row)
}}
