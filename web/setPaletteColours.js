const palette = document.querySelectorAll(".colour");
const imageLink= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNXGPWN_f5kpV2NUyXZLwkJ7o1fzht-F0dWg&s";
const number = palette.length;

export default async function setColours(){
    const colours = await api.getColoursOpenAI(number,imageLink);
    const hexColours = colours.colors;

    for (let i = 0; i < palette.length; i++){
        palette[i].style.backgroundColor = hexColours[i];
    }
}
