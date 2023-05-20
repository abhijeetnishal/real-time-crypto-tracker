import cheerio from 'cheerio';

const getCryptodata = async ()=>{
  try{
      const response  = await fetch('https://www.coingecko.com/');

      const dom = await response.text();
      
      const $ = cheerio.load(dom);
      const bitcoinVal = $('.no-wrap').text().split(/\$/);
      const firstTenValues = bitcoinVal.slice(1, 8);
      
      return firstTenValues;
  }
  catch(error){
      console.log(error);
  }
}

export default {
   getCryptodata
};