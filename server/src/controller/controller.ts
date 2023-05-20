import axios from 'axios';
const getCryptoData = async ()=>{
  try{
    let response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&locale=en');
    let data = response.data;
    return data;
  }
  catch(error){
    console.log(error);
  }
}

export default getCryptoData
