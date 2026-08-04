const fs = require('fs');
const rawData = fs.readFileSync('raw.txt', 'utf-8').trim().split('\n');
const result = []

for(let i =0; i<rawData.length; i+=4){
    if(rawData[i]){
        result.push({
            location: rawData[i].trim(),
            pincode: rawData[i+1].trim(),
            state: rawData[i+2].trim(),
            district: rawData[i+3].trim()
        })
    }
}


fs.writeFileSync('bangalore_pincodes.json', JSON.stringify(result, null, 2), 'utf-8');
console.log('Data has been written to bangalore_pincodes.json');