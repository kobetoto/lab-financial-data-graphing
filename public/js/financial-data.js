const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");

const input1 = document.querySelector("#input1");
const input2 = document.querySelector("#input2"); //onChange

let chart;
window.chart = chart;

//http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}

input1.onchange = function () {
  fetchDisplayChart(input1.value, input2.value);
};

input2.onchange = function () {
  console.log(input2.value);
  fetchDisplayChart(input1.value, input2.value);
};

const fetchDisplayChart = function (date1, date2) {
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${date1}&end=${date2}&currency=eur`
    )
    .then(function (responseFromApi) {
      console.log("data BTC::", responseFromApi);

      const date = Object.keys(responseFromApi.data.bpi); //=> array => 0: "2022-01-01"  1:"2022-01-02"....
      console.log("date===", date);
      const price = [];
      date.forEach(function (date) {
        price.push(Number(responseFromApi.data.bpi[date]));
      });

      if (!chart) {
        chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: date,
            datasets: [
              {
                label: "BTC PRICE INDEX",
                data: price,
                borderWidth: 1,
                backgroundColor: "bisque",
                borderColor: "orange",
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      } else {
        //maj
        chart.data.datasets[0].data = price;
        chart.data.labels = date;
        chart.update();
      }
    })
    .catch((error) => console.log("errrrrr=", error));
};
