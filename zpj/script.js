const works = [
  { title: "Trip.com 内部系统升级", type: "UI/UX", image: "./assets/works/trip-system.png" },
  { title: "XTransfer App 体验设计", type: "UI/UX", image: "./assets/works/xt-app-ui.png" },
  { title: "我爱我家旗下加盟业务管理系统UI界面迭代", type: "UI/UX", image: "./assets/works/wawj-ui.png" },
  { title: "iDev 平台改版", type: "UI/UX", image: "./assets/works/idev-uiux.png" },
  { title: "Trip.com IM 设计", type: "UI/UX", image: "./assets/works/trip-im.png" },
  { title: "商旅焕肤项目", type: "产品设计", image: "./assets/works/shanglv-huanfu.png" },
  { title: "服务罗盘产品设计", type: "产品设计", image: "./assets/works/fwluohen.png" },
  { title: "权益线上化产品设计", type: "产品设计", image: "./assets/works/quanyi-xianshanghua.png" },
  { title: "Trip.com 营销视觉", type: "平面设计", image: "./assets/works/trip-yingxiao.png" },
  { title: "京东平面设计项目", type: "平面设计", image: "./assets/works/jd-graphic.png" },
  { title: "程耀辉品牌视觉", type: "平面设计", image: "./assets/works/chengyaohui-banner.png" },
];

const track = document.getElementById("worksTrack");
const trackWrap = document.getElementById("worksTrackWrap");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
let visibleCount = getVisibleCount();
let desktopGridMode = isDesktopGrid();

function isDesktopGrid() {
  return window.innerWidth >= 1440;
}

function getVisibleCount() {
  if (window.innerWidth <= 767) return 1;
  if (window.innerWidth <= 1439) return 2;
  return 3;
}

function renderWorks() {
  desktopGridMode = isDesktopGrid();
  const list = desktopGridMode ? works.slice(0, 6) : works;

  track.innerHTML = list
    .map(
      (work) => `
      <article class="work-card">
        <img src="${work.image}" alt="${work.title}" loading="lazy" />
        <div class="work-card-body">
          <h3>${work.title}</h3>
          <p>${work.type}</p>
        </div>
      </article>
    `,
    )
    .join("");

  if (desktopGridMode) {
    track.classList.add("is-desktop-grid");
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
  } else {
    track.classList.remove("is-desktop-grid");
    prevBtn.style.display = "";
    nextBtn.style.display = "";
  }

  updatePosition();
}

function clampIndex() {
  if (desktopGridMode) {
    currentIndex = 0;
    return;
  }
  const maxIndex = Math.max(0, works.length - visibleCount);
  if (currentIndex > maxIndex) currentIndex = maxIndex;
  if (currentIndex < 0) currentIndex = 0;
}

function updatePosition() {
  clampIndex();
  if (desktopGridMode) {
    track.style.transform = "none";
    return;
  }

  const cards = track.querySelectorAll(".work-card");
  if (!cards.length) return;

  const cardWidth = cards[0].getBoundingClientRect().width + 12;
  track.style.transform = `translateX(${-currentIndex * cardWidth}px)`;

  const maxIndex = Math.max(0, works.length - visibleCount);
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= maxIndex;
  prevBtn.style.opacity = prevBtn.disabled ? "0.35" : "1";
  nextBtn.style.opacity = nextBtn.disabled ? "0.35" : "1";
}

prevBtn.addEventListener("click", () => {
  if (desktopGridMode) return;
  currentIndex -= 1;
  updatePosition();
});

nextBtn.addEventListener("click", () => {
  if (desktopGridMode) return;
  currentIndex += 1;
  updatePosition();
});

window.addEventListener("resize", () => {
  const modeChanged = desktopGridMode !== isDesktopGrid();
  const latest = getVisibleCount();
  if (latest !== visibleCount) {
    visibleCount = latest;
  }
  if (modeChanged) {
    currentIndex = 0;
    renderWorks();
  } else {
    updatePosition();
  }
});

renderWorks();

let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 32;

trackWrap.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.changedTouches[0].clientX;
  },
  { passive: true },
);

trackWrap.addEventListener(
  "touchend",
  (event) => {
    if (desktopGridMode) return;
    touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (Math.abs(deltaX) < swipeThreshold) return;
    if (deltaX < 0) {
      currentIndex += 1;
    } else {
      currentIndex -= 1;
    }
    updatePosition();
  },
  { passive: true },
);
