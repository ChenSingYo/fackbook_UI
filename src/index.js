import axios from 'axios'
import './index.css'

const plusBtn = document.getElementById('plus-btn')
const msgBtn = document.getElementById('msg-btn')
const notificationBtn = document.getElementById('notification-btn')
const moreBtn = document.getElementById('more-btn')

const plusPanel = document.getElementById('plus-panel')
const msgPanel = document.getElementById('msg-panel')
const notificationPanel = document.getElementById('notification-panel')
const morePanel = document.getElementById('more-panel')

const panels = [plusPanel, msgPanel, notificationPanel, morePanel]

function openPanel(index) {
  panels.forEach((p, idx) => {
    if (index === idx) {
      p.classList.remove('hidden')
      return
    }

    if (p.classList.contains('hidden')) {
      return
    }

    p.classList.add('hidden')
  })
}

window.addEventListener('click', function () {
  openPanel(-1)
})

plusBtn.addEventListener('click', function (event) {
  event.stopPropagation()
  openPanel(0)
})

msgBtn.addEventListener('click', function (event) {
  event.stopPropagation()
  openPanel(1)
})

notificationBtn.addEventListener('click', function (event) {
  event.stopPropagation()
  openPanel(2)
})

moreBtn.addEventListener('click', function (event) {
  event.stopPropagation()
  openPanel(3)
})

// 取消告訴window被點的情況

plusPanel.addEventListener('click', function (event) {
  event.stopPropagation()
})

msgPanel.addEventListener('click', function (event) {
  event.stopPropagation()
})

notificationPanel.addEventListener('click', function (event) {
  event.stopPropagation()
})

morePanel.addEventListener('click', function (event) {
  event.stopPropagation()
})


// 用字符模板渲染左側資訊欄

const leftBlock = document.getElementById("left-block");

function renderLeftItem(name, imageUrl) {
  const item = `
    <div
      class="
        flex
        items-center
        justify-items-center
        w-full
        p-2
        mb-1
        rounded
        hover:bg-fb-input
        cursor-pointer
      "
    >
      <div class="w-[36px] h-[36px] overflow-hidden rounded-full mr-4">
        <img src="${imageUrl}" alt="" />
      </div>
      <p class="text-white text-[.9rem]">${name}</p>
    </div>
  `;

  return item;
}

function renderLeftBlock() {
  const leftArr = [
    {
      name: "SingYo",
      img: "https://drive.google.com/uc?export=download&id=1SVJqSCbqVfFv8epyIVQn3OnILY8X0BDs",
    },
    {
      name: "活動",
      img: "https://bruce-fe-fb.web.app/image/left/activity.svg",
    },
    {
      name: "天氣",
      img: "https://bruce-fe-fb.web.app/image/left/cloudy.png",
    },
    {
      name: "災害應變中心",
      img: "https://bruce-fe-fb.web.app/image/left/dynamic.svg",
    },
    {
      name: "新冠病毒資訊中心",
      img: "https://bruce-fe-fb.web.app/image/left/facemask.svg",
    },
    {
      name: "社團",
      img: "https://bruce-fe-fb.web.app/image/left/friend.svg",
    },
    {
      name: "企業管理平台",
      img: "https://bruce-fe-fb.web.app/image/left/job.png",
    },
    {
      name: "Messenger",
      img: "https://bruce-fe-fb.web.app/image/left/messenger.svg",
    },
    {
      name: "近期廣告動態",
      img: "https://bruce-fe-fb.web.app/image/left/pay.png",
    },
    {
      name: "朋友名單",
      img: "https://bruce-fe-fb.web.app/image/left/sale.png",
    },
    {
      name: "最愛",
      img: "https://bruce-fe-fb.web.app/image/left/star.svg",
    },
    {
      name: "Marketplace",
      img: "https://bruce-fe-fb.web.app/image/left/store.svg",
    },
    {
      name: "Watch",
      img: "https://bruce-fe-fb.web.app/image/left/watchingTv.svg",
    },
  ]
  let htmStr = ''
  leftArr.forEach(obj => {
    htmStr = htmStr + renderLeftItem(obj.name, obj.img)
  })
  leftBlock.innerHTML = htmStr
}

renderLeftBlock()


// 用字符模板渲染右側聯絡人

function renderRightBlock(pics) {
  const rightBlock = document.getElementById('right-block')
  pics.forEach((pic) => {
    rightBlock.innerHTML += `
    <div
      class="
        flex
        w-full
        items-center
        py-2
        pl-8
        rounded
        hover:bg-fb-input
        cursor-pointer
      "
    >
      <div class="w-[45px]">
        <div class="relative w-[32px] cursor-pointer">
          <div class="overflow-hidden rounded-full">
            <img src="${pic.user.profile_image.large}" alt="" />
          </div>
          <div
            class="
              w-[8px]
              h-[8px]
              rounded-full
              bg-green-500
              absolute
              bottom-0
              right-0
              ring-gray-900 ring
            "
          ></div>
        </div>
      </div>
      <p class="text-white text-[0.9rem]">
      ${pic.user.name}
      </p>
    </div>
  `
  })
}

//  ------------- 限時動態相關 -------------

const storyList = document.getElementById('story-list')

function renderStoryItem(randomPics) {
  for (let i = 0; i < 8; i++) {

    const divBox = document.createElement('div')

    divBox.classList.add('flex-1', 'px-[4px]', 'min-w-[160px]', 'z-0')

    divBox.innerHTML = `
      <div class="z-10 relative overflow-hidden w-full h-full rounded-lg" id="story-${i}">

        <div 
          id="story-mask-${i}" 
          class="
            cursor-pointer 
            hidden
            absolute 
            w-full h-full top-0 left-0 
            bg-black/20 
            z-20">
        </div>

        <div class="w-[32px] h-[32px] absolute top-4 left-4 ring-4 ring-fb bg-fb-card rounded-full flex justify-center items-center z-30 pointer-events-none">
          <img class="rounded-full" src="${randomPics[i].user.profile_image.small}">
        </div>

        <img 
          id="story-image-${i}" 
          class="
            relative
            w-full h-full object-cover 
            duration-200
            filter brightness-100
            cursor-pointer
            hover:scale-105
            hover:brightness-75
          " 
          src="${randomPics[i].urls.regular}" 
        />

        <p class="absolute bottom-2 left-2 text-white text-shadow-xl cursor-pointer z-40">
        ${randomPics[i].user.first_name}
        </p>

      </div>
    `
    storyList.appendChild(divBox)
  }
}


// 即時包廂區塊

function renderLiveItem(pics) {

  const swiperLive = document.getElementById('swiper-live')

  pics.forEach((pic) => {
    swiperLive.innerHTML += `
      <div class="w-[55px]">
        <div class="relative w-[40px] cursor-pointer">
          <div class="overflow-hidden rounded-full">
            <img
              src="${pic.user.profile_image.large}"
              alt=""
            />
          </div>
          <div
            class="
              w-[10px]
              h-[10px]
              rounded-full
              bg-green-500
              absolute
              bottom-0
              right-0
              ring-gray-900 ring
            "
          ></div>
        </div>
      </div>
    `
  })

  new Swiper('.fb-live', {
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 'auto'
  })
}

// 透過unsplash api取得隨機照片，收到圖片後執行渲染

const randomPics = []
const API_URL = 'https://api.unsplash.com/search/photos?&query=sports&orientation=portrait&600*400&client_id=Jb3jHPMSvjP7CBjQfbO-qfKTcdf2l6UEHU65RbVpZ4A&per_page=25'
const getAndRenderPics = function (url) {
  axios
    .get(url)
    .then((res) => {
      randomPics.push(...res.data.results)
      // 渲染動態牆
      renderStoryItem(randomPics)
      // 渲染右側聯絡人
      renderRightBlock(randomPics)
      // 渲染包廂輪播
      renderLiveItem(randomPics)
    })
    .catch((err) => { console.error(err) })
}

getAndRenderPics(API_URL)
