import getProps from "components/funciones/getprops";
import handleEvento from "components/funciones/handle";
import React, { Fragment } from "react";

export default function AvisosP({ datos }) {
  const data = datos;
  const datoss = data.sort(function (a, b) {
    if (a.fecha > b.fecha) {
      return 1;
    }
    if (a.fecha < b.fecha) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

  return <div>{datoss.map((dat) => handleEvento(dat, "otro"))}</div>;
}

export async function getServerSideProps() {
  return await getProps();
}
