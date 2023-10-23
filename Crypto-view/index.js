const trendingcoinSlideshow = document.getElementById(
  "trending_coins_slideshow"
);
const searchInput = document.getElementById("search_input");
const coinsContainer = document.getElementById("coins_container");
const searchbtn = document.getElementById("search_input_button");
const coin_container = document.getElementById("coin_container");
const coinid = new URLSearchParams(window.location.search).get("id");
console.log(coinid);
const fn = (data) => {
  console.log(data);
};

// console.log(searchbtn);
searchbtn && searchbtn.addEventListener("click", getcoins);
// getcoins()
// function scrollAnimation() {
//   // const padding = Number(
//   //   getComputedStyle(trendingcoinSlideshow).padding.replace("px", "")
//   // );
//   // let endpoint =
//   //   trendingcoinSlideshow.scrollWidth - trendingcoinSlideshow.offsetWidth;
//   // console.log(endpoint);
//   let flag = true;
//   let count = 0;
//   setInterval(() => {
//     if (flag) {
//       count += 1;
//       trendingcoinSlideshow && trendingcoinSlideshow.scrollTo(count, 0);
//       // console.log(endpoint, count);
//       if (count === 272) {
//         flag = false;
//       }
//     } else if (flag === false) {
//       count -= 1;
//       trendingcoinSlideshow && trendingcoinSlideshow.scrollTo(count, 0);
//       if (count === 0) {
//         flag = true;
//       }
//     }
//   }, 1);
// }

// scrollAnimation();

async function getTrendingCoins() {
  const res = await fetch("https://api.coingecko.com/api/v3/search/trending");
  const response = await res.json();
  const bitcoinvalue = await getBitcoinValue();

  const coins = response.coins;
  let html = "";
  for (let i = 0; i < coins.length; i++) {
    const coinName = coins[i].item.name;
    const coinPrice = coins[i].item.price_btc * bitcoinvalue.bitcoin.inr;
    const coinSymbol = coins[i].item.symbol;
    const coinIconUrl = coins[i].item.small;
    html += `<div class="trending_coins_container">
          <img
            src=${coinIconUrl}
            id="trending_coin_image"
            alt="trending coin image"
          />
          <div id="coin_info_container">
            <h3 class="coin_name">${coinName} ${coinSymbol}</h3>
            <h4 id="coin_price">Rs ${coinPrice.toFixed(4)}</h4>
          </div>
        </div>`;
    trendingcoinSlideshow.innerHTML = html;
    // console.log(coinName, coinPrice, coinSymbol, coinIconUrl, response);
  }
}

getTrendingCoins();

async function getBitcoinValue() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr"
  );
  const response = await res.json();
  return response;
}
// const viewmr = (coin) => {
//   console.log(coin);
//   alert('btn is clicked')
// };
async function getcoins() {
  // alert("hi");
  const res = await fetch(
    `https://api.coingecko.com/api/v3/search?query=${searchInput.value}`
  );
  const response = await res.json();
  console.log(response);
  let html = "";
  for (let i = 0; i < response.coins.length; i++) {
    const coins = response.coins[i];
    // console.log(coins.name);
    // allCoins.push(coins.name);
    console.log(coins.id);
    //console.log(`test ${coins.name}`, coins);
    html += `<div class="main_info">
        <div id="coins_container_info">
          <h5 id="serial_number">${i + 1}</h5>
          <img
            class="coin_name"
            src="${coins.large}"
            alt="Coin image"
            id="trending_coin_image"
          />
          <h2 id="coins_container_name">${coins.name}</h2>
          <h2 id="coins_container_code">${coins.symbol}</h2>

        </div>
        <div>
     <a href='./viewmore.html?id=${
       coins.id
     }
     ' <button id="Moreinfo">More Info</button></a>
        </div>
      </div>`;
    coinsContainer.innerHTML = html;
  }
}

// const viewbtn = document.getElementById("Moreinfo");
// console.log(viewbtn);
async function getMoredata(coinid) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinid}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  );
  let html = "";
  const response = await res.json();
  const coin_name = response.id;
  const inr_rupee = response.market_data.ath.inr;
  const dollar_rupee = response.market_data.ath.usd;
  const euro_rupee = response.market_data.ath.eur;
  const pound_rupee = response.market_data.ath.gbp;
  const description = response.description;
  console.log(response);
  html = `<div id="coin_heading">
        <h2>${coin_name}</h2>
      </div>
      <div id="coin_price">
        <div id="coin_rupess"> <h4> Rs ${inr_rupee}<h4/></div>
        <div id="coin_dollar"> <h4> $ ${dollar_rupee} <h4/></div>
        <div id="coin_euro"> <h4> €${euro_rupee} <h4/></div>
        <div id="coin_pound"> <h4>£${pound_rupee} <h4/></div>
      </div>
       <div id="coin_description">
        <img src=${response.image.large} alt="">
        <h1>description</h1>
        <br/>
         <h1>
       ${response.id} - ${response.symbol.toUpperCase()}
       </h1>
       <br>
       ${description.en}
      </div>
      `;
  if (coin_container != null) {
    coin_container.innerHTML = html;
  }
}
getMoredata(coinid);

// async function chatdata(coinid) {
//   console.log(coinid);
//   const res = await fetch(
//     `https://api.coingecko.com/api/v3/coins/${coinid}/market_chart?vs_currency=inr&days=1&interval=hourly`
//   );
//   const jsondata = await res.json();
//   console.log(jsondata);
//   const xvalues = [];
//   const yvalues = [];
//   for (const price of jsondata.prices) {
//     const d = new Date(0);
//     d.setUTCMilliseconds(price[0]);
//     xvalues.push(`${d.getHours()}: ${d.getMinutes()}`);
//     yvalues.push(price[1]);
//   }
//   new Chart("myChart", {
//     type: "line",
//     data: {
//       labels: xvalues,
//       datasets: [
//         {
//           data: yvalues,
//           label: "prices",
//           // data: yvalues,
//         },
//       ],
//     },
//   });
// }
// chatdata(coinid);
