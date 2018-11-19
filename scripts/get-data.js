const axios = require('axios');

const url = 'http://arithmo-rest.toewsweb.net/dc/9/1';

/*
async function getData(url) {
  var data;
  try {
    const response = await axios.get(url);
	data = response.data;
  } catch (e) {
    console.log(e);
  }
  return data;
}
*/
function performGet() {
  return axios.get(url);
}

module.exports = performGet;
