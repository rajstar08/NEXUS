const cardsContainer = document.getElementById("cardsContainer");
const buyBtn = document.getElementById("buyBtn");
const sellBtn = document.getElementById("sellBtn");

const images = [
  "tanjiro.png",
  "nezuko.png",
  "giyu.png",
  "zenitsu.png",
  "shinobu.png",
  "akaza.png",
  "luffy.png",
  "nami.png",
  "zoro.png",
  "saitama.png"
];

let cards = [];
for (let i = 0; i < images.length; i++) {
  cards.push({
    id: i,
    img: images[i],
    name: images[i].replace(".png", ""),
    signal: randomSignal(),
    repeat: 1,
    history: [],
  });
}

renderCards();

buyBtn.addEventListener("click", () => evaluate("BUY"));
sellBtn.addEventListener("click", () => evaluate("SELL"));

function randomSignal() {
  return Math.random() > 0.5 ? "BUY" : "SELL";
}

function newSignal(card) {
  let newSig = randomSignal();
  if (newSig === card.signal) card.repeat++;
  else {
    card.signal = newSig;
    card.repeat = 1;
  }
  if (card.repeat > 5) {
    card.signal = card.signal === "BUY" ? "SELL" : "BUY";
    card.repeat = 1;
  }
}

function evaluate(userChoice) {
  cards.forEach(card => {
    const win = userChoice === card.signal;
    card.history.push(win ? "W" : "L");
    while (card.history.length > 10) card.history.shift();
    newSignal(card);
  });

  cards.sort((a, b) => accuracy(b) - accuracy(a));
  renderCards();
}

function accuracy(card) {
  if (!card.history.length) return 0;
  return card.history.filter(h => h === "W").length / card.history.length;
}

function renderCards() {
  cardsContainer.innerHTML = "";
  cards.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${card.img}" class="card-img">
      <h3 class="card-name">${card.name}</h3>
      <div class="signal ${card.signal === "BUY" ? "green" : "red"}">${card.signal}</div>
      <div class="history">
        ${card.history.map(h => `<span class="${h === "W" ? "green" : "red"}">${h}</span>`).join("")}
      </div>
    `;
    cardsContainer.appendChild(div);
  });
}
