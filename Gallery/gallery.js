const galleryImg = document.getElementById("selectedImg");

galleryImg.addEventListener("click", function () {
  clickImage();
});

const clickImage = (smallImg) => {
  galleryImg.src = smallImg.src;
  console.log("img clicked");
};
