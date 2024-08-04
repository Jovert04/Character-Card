document.addEventListener("DOMContentLoaded", function () {
    const waifuForm = document.getElementById("waifuForm");
    const currentWaifuIndex = localStorage.getItem("currentWaifuIndex");
    const waifus = JSON.parse(localStorage.getItem("waifus")) || [];

    if (currentWaifuIndex !== null) {
        const waifu = waifus[currentWaifuIndex];
        document.getElementById("nickname").value = waifu.nickname;
        document.getElementById("fullname").value = waifu.fullname;
        document.getElementById("birthday").value = waifu.birthday;
        document.getElementById("favoriteFoods").value = waifu.favoriteFoods;
        document.getElementById("hobby").value = waifu.hobby;
    }

    waifuForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const nickname = document.getElementById("nickname").value;
        const fullname = document.getElementById("fullname").value;
        const birthday = document.getElementById("birthday").value;
        const favoriteFoods = document.getElementById("favoriteFoods").value;
        const hobby = document.getElementById("hobby").value;
        const imageInput = document.getElementById("image");
        const reader = new FileReader();

        reader.onload = function (event) {
            const image = event.target.result;
            const updatedWaifu = { nickname, fullname, birthday, favoriteFoods, hobby, image };
            waifus[currentWaifuIndex] = updatedWaifu;
            localStorage.setItem("waifus", JSON.stringify(waifus));
            localStorage.removeItem("currentWaifuIndex");
            window.location.href = "index.html";
        };

        if (imageInput.files.length > 0) {
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            const waifu = waifus[currentWaifuIndex];
            const updatedWaifu = { nickname, fullname, birthday, favoriteFoods, hobby, image: waifu.image };
            waifus[currentWaifuIndex] = updatedWaifu;
            localStorage.setItem("waifus", JSON.stringify(waifus));
            localStorage.removeItem("currentWaifuIndex");
            window.location.href = "index.html";
        }
    });
});