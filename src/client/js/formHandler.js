function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let urlInput = document.querySelector("#name").value;
  /*   Client.checkForName(formText);*/
  let table = document.querySelector("table");

  if (Client.isValidUrl(urlInput)) {
    postData("http://localhost:8081/api", { urlInput })
      .then(function (res) {
        //subjectivity row
        subjectivity.innerHTML = `<div><h2>Subjectivity:  ${res.subjectivity} </h2></div>`;

        //insert table header
        const header = table.createTHead();
        const headerRow = header.insertRow(0);
        const headerRowPolarity = headerRow.insertCell(0);
        headerRowPolarity.innerHTML = "Polarity";
        const headerRowText = headerRow.insertCell(1);
        headerRowText.innerHTML = "Text";

        //fill table row
        const samples = res.sentence_list;
        for (let sample of samples) {
          let row = table.insertRow(-1);

          let polarity = row.insertCell(0);
          polarity.innerHTML = `${sample.score_tag}`;

          let resText = row.insertCell(1);
          resText.innerHTML = `${sample.text}`;
        }
      })
      .catch((e) => console.log("error", e));
  } else {
    table.innerHTML = "";
    subjectivity.innerHTML = "";
    alert("Please check url");
  }
}

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const newData = await response.json();
  //console.log("Data received:", newData);
  return newData;
};

export { handleSubmit };
