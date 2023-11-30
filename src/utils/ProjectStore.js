import axios from "axios";

//In case of using another port, change the 8080 to the custom port.
const baseUrl = "http://localhost:8080/api/v1/projects";

export const getAllProjects = async () => {
  const response = await axios.get(baseUrl);
  const data = await response.data;
  return data;
};

export const postProject = async (payload) => {
  const response = await axios.post(baseUrl, payload);
  const data = await response.data;
  return data;
};

export const deleteProject = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  const data = await response.data;
  return data;
};

function convertToCSV(objArray) {
  let array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  let str = "";

  for (let i = 0; i < array.length; i++) {
    let line = "";
    for (let index in array[i]) {
      if (line != "") line += ",";

      line += array[i][index];
    }

    str += line + "\r\n";
  }

  return str;
}

export function exportCSVFile(headers, items, fileTitle) {
  if (headers) {
    items.unshift(headers);
  }

  let parsedItems = [];
  items.forEach((element) => {
    if (element.id !== "ID") {
      let partners = "";
      element.partners.forEach((partner, i) => {
        if (i === element.partners.length - 1) {
          partners += partner.name;
        } else {
          partners += partner.name + "/";
        }
      });
      parsedItems.push({ ...element, partners: partners });
    } else {
      parsedItems.push(element);
    }
  });
  // Convert Object to JSON
  let jsonObject = JSON.stringify(parsedItems);

  let csv = convertToCSV(jsonObject);

  let exportedFilenmae = fileTitle + ".csv" || "export.csv";

  let blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
    let link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      let url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilenmae);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
