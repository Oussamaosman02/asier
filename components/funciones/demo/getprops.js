export default async function getProps() {
  const ruta = process.env.DATA_URL;
  const res = await fetch(`${ruta}/api/fake`);
  const datos = await res.json();
  return {
    props: {
      datos,
    },
  };
}
