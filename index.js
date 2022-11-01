async function retrieveInfo() {
  const prom = fetch(
    "https://cdn.contentful.com/spaces/c7mvxwqo377u/environments/master/entries?access_token=E-RDKeYnP6fPL12njEjE-P2mHwG0f1DQLfP2Ey7cgyY"
  );

  prom
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // crearExperiencia(undefined, res)
      // console.log(data);
      for (let e of data.items) {
        const title = e.fields.titulo;
        const desc = e.fields.descripcion;
        const imgId = e.fields.imagen.sys.id;

        fetch(
          "https://cdn.contentful.com/spaces/c7mvxwqo377u/environments/master/assets?access_token=E-RDKeYnP6fPL12njEjE-P2mHwG0f1DQLfP2Ey7cgyY"
        )
          .then((res) => {
            return res.json();
          })
          .then((assetData) => {
            console.log(assetData);

            for (let r of assetData.items) {
              if (r.sys.id == imgId) {
                const imgUrl = r.fields.file.url;

                crearExperiencia(imgUrl, title, desc);
              }
            }
          });
      }
    });
}

function crearExperiencia(imgUrl, title, description) {
  const sectionExperienciesEl = document.querySelector(".section-experiencies");
  const templateEl = document.querySelector("#template-el");
  const clonEl = templateEl.content.cloneNode(true);

  const imgEl = clonEl.querySelector(".experiencia-img");
  imgEl.setAttribute("src", imgUrl);

  const titleEl = clonEl.querySelector(".experiencia-title");
  titleEl.textContent = title;

  const descriptionEl = clonEl.querySelector(".experiencia-desc");
  descriptionEl.textContent = description;

  sectionExperienciesEl.appendChild(clonEl);
}

async function main() {
  retrieveInfo();

  // console.log(data.items)
}

main();
