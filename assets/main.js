const zipCode = document.getElementById('zip');
const stateName = document.getElementById('state');
const municipality = document.getElementById('municipality');
const suburbs = document.getElementById('suburb');
const address = document.getElementById('address');

const endpointUrl = 'https://api-sepomex.hckdrk.mx/query/';
const cpMethod = 'info_cp/';
const suburbMethod = 'get_colonia_por_municipio/';

address.hidden = true;

const sendAddress = () => {
  address.innerHTML = (`${suburbs.value} ${municipality.value} ${stateName.value}, ${zipCode.value}`);
  address.hidden = false;
  document.getElementById("form").reset();
  suburbs.options.length = 0;
}

const getSuburbsByMunicipality = async (suburb) => {
  try {
    let result = await fetch(`${endpointUrl}${suburbMethod}${suburb}`).then((resp) => {
      return resp.json();
    });
    let data = result.response.colonia;
    if(data){
      data.map((sub) => {
        let option = new Option(sub, sub);
        suburbs.add(option);
      });
    }

  } catch (error) {
    alert('Verifica que el nombre del municipio este escrito correctamente.');
  }
};

zipCode.addEventListener('focusout', async () => {
  try {
    let result = await fetch(`${endpointUrl}${cpMethod}${zipCode.value}`).then(
      (resp) => {
        return resp.json();
      },
    );
    if (result[0].response) {
      let data = result[0]?.response;
      await getSuburbsByMunicipality(data?.municipio);
      stateName.value = data?.estado;
      municipality.value = data?.municipio;
    }
  } catch (error) {
    alert('ZIP code not found!');
  }
});
