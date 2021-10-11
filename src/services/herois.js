function getHerois() {
  return fetch("http://homologacao3.azapfy.com.br/api/ps/metahumans").then(
    (data) => data.json()
  );
}

export default getHerois;
