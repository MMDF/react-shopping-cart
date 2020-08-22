import axios from 'axios';
import csv from 'neat-csv';
import fs from 'fs';

const prodUrl =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRSB7ho2Qql0OX9yVUikuqqWXtrIaZIuMvM3boNvA8Yryji3tbdzeex1u7M2OJmHY3nsfte2gUpiIrq/pub?gid=0&single=true&output=csv';
const cameraUrl =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRSB7ho2Qql0OX9yVUikuqqWXtrIaZIuMvM3boNvA8Yryji3tbdzeex1u7M2OJmHY3nsfte2gUpiIrq/pub?gid=1164444334&single=true&output=csv';
const discountUrl =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRSB7ho2Qql0OX9yVUikuqqWXtrIaZIuMvM3boNvA8Yryji3tbdzeex1u7M2OJmHY3nsfte2gUpiIrq/pub?gid=769749541&single=true&output=csv';

async function main() {
  const prodCsv = (
    await csv((await axios.get(prodUrl)).data, {
      headers: [
        'title',
        'description',
        'price',
        'Paket',
        'Uç Birim',
        'Kamera',
        'Kablolu',
        'Kablosuz',
        'Paradox',
        'Satel',
      ],
      skipLines: 1,
    })
  )
    .filter((prod) => !!prod.title)
    .map((prod, index) => {
      const labels = [];
      Object.keys(prod)
        .filter(
          (key) => key !== 'description' && key !== 'price' && key !== 'title'
        )
        .forEach((label) =>
          prod[label] === '1' ? labels.push(label) : undefined
        );
      return {
        id: index,
        title: prod.title,
        description: prod.description,
        labels,
        price: parseFloat(prod.price.replace(',', '.')),
        currencyId: 'TRY',
        currencyFormat: '₺',
        installments: 1,
        style: 'Marka ismi',
      };
    });
  const cameraCsv = await csv((await axios.get(cameraUrl)).data, {
    headers: false,
  });
  const discountCsv = await csv((await axios.get(discountUrl)).data, {
    headers: false,
  });
  // console.log(prodCsv);
  fs.writeFileSync(
    './public/products.json',
    JSON.stringify({
      products: prodCsv,
      camera: cameraCsv,
      discount: discountCsv,
    })
  );
}

main();
