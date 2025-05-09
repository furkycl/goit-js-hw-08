const images = [
  {
    preview:
      "<https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg>",
    original:
      "<https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg>",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "<https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg>",
    original:
      "<https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg>",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "<https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg>",
    original:
      "<https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg>",
    description: "Aerial Beach View",
  },
  {
    preview:
      "<https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg>",
    original:
      "<https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg>",
    description: "Flower Blooms",
  },
  {
    preview:
      "<https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg>",
    original:
      "<https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg>",
    description: "Alpine Mountains",
  },
  {
    preview:
      "<https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg>",
    original:
      "<https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg>",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "<https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg>",
    original:
      "<https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg>",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "<https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg>",
    original:
      "<https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg>",
    description: "Nature Landscape",
  },
  {
    preview:
      "<https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg>",
    original:
      "<https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg>",
    description: "Lighthouse Coast Sea",
  },
];
// Print gallery object with JS into HTML
const gallery = document.querySelector(".gallery");
//Remove < and > from object of images to make links work
const rawImages = images.map((image) => ({
  ...image, //take the rest as default
  preview: image.preview.replace(/^<|>$/g, ""), // Regular Expression RegExp ^< defines remove string has < in the beginning ^ -> defines beginning. | -> for or operation. >$ $ -> defines end of the string. /g g flag means global it keep repeat for the all characters in the process
  original: image.original.replace(/^<|>$/g, ""),
}));
const galleryWriter = rawImages
  .map(({ preview, original, description }) => {
    return `
    <li class="gallery-item">
        <a class="gallery-link" href="${original}">
            <img class="gallery-image" src="${preview}" data-source="${original}" alt="${description}">
        </a>
    </li>`;
  })
  .join("");
gallery.innerHTML = galleryWriter;

gallery.addEventListener("click", (event) => {
  event.preventDefault(); // prevent from default a href action
  const target = event.target;
  if (target.nodeName !== "IMG") {
    // node name only accepts string upperCase !!!! otherwise it doesn't work
    return;
  }
  // not use currentTarget target will give pin point element
  const originalImageURL = target.dataset.source;

  const instance = basicLightbox.create(`
        <img src="${originalImageURL}" alt="${target.alt}">`);
  instance.show();
  const closeOnEsc = (e) => {
    if (e.key === "Escape") {
      instance.close();
      document.removeEventListener("keydown", closeOnEsc);
    }
  };
  document.addEventListener("keydown", closeOnEsc);
});
