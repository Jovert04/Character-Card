document.addEventListener("DOMContentLoaded", function () {
    const waifuForm = document.getElementById("waifuForm");
    const gallery = document.getElementById("gallery");
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    const modalInfo = document.getElementById("modal-info");
    const closeModal = document.getElementsByClassName("close")[0];
    let currentEditIndex = null;

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    const calculateAge = (birthday) => {
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const loadWaifus = () => {
        const waifus = JSON.parse(localStorage.getItem("waifus")) || [];
        gallery.innerHTML = "";
        waifus.forEach((waifu, index) => {
            const waifuCard = document.createElement("div");
            waifuCard.className = "waifu-card";

            const img = document.createElement("img");
            img.src = waifu.image;
            img.alt = waifu.nickname;
            img.addEventListener("click", () => {
                modalImage.src = waifu.image;
                const age = calculateAge(waifu.birthday);
                modalInfo.innerHTML = `
                    <strong>Nick Name:</strong> ${waifu.nickname}<br>
                    <strong>Full Name:</strong> ${waifu.fullname}<br>
                    <strong>Birthday:</strong> ${waifu.birthday}<br>
                    <strong>Age:</strong> ${age}<br>
                    <strong>Favorite Foods:</strong> ${waifu.favoriteFoods}<br>
                    <strong>Hobby:</strong> ${waifu.hobby}
                `;
                modal.style.display = "block";
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete";
            deleteBtn.addEventListener("click", () => {
                deleteWaifu(index);
            });

            const updateBtn = document.createElement("button");
            updateBtn.innerText = "Update";
            updateBtn.addEventListener("click", () => {
                updateWaifu(index);
            });

            waifuCard.appendChild(img);
            waifuCard.appendChild(updateBtn);
            waifuCard.appendChild(deleteBtn);
            gallery.appendChild(waifuCard);
        });
    };

    const saveWaifu = (waifu) => {
        const waifus = JSON.parse(localStorage.getItem("waifus")) || [];
        if (currentEditIndex !== null) {
            waifus[currentEditIndex] = waifu;
            currentEditIndex = null;
        } else {
            waifus.push(waifu);
        }
        localStorage.setItem("waifus", JSON.stringify(waifus));
    };

    const deleteWaifu = (index) => {
        const waifus = JSON.parse(localStorage.getItem("waifus")) || [];
        waifus.splice(index, 1);
        localStorage.setItem("waifus", JSON.stringify(waifus));
        loadWaifus();
    };

    const updateWaifu = (index) => {
        localStorage.setItem("currentWaifuIndex", index);
        window.location.href = "update.html";
    };

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
            const waifu = { nickname, fullname, birthday, favoriteFoods, hobby, image };
            saveWaifu(waifu);
            loadWaifus();
            waifuForm.reset();
            document.getElementById("submitBtn").innerText = "Create";
        };

        if (imageInput.files.length > 0) {
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            const waifus = JSON.parse(localStorage.getItem("waifus")) || [];
            const waifu = waifus[currentEditIndex];
            const updatedWaifu = { nickname, fullname, birthday, favoriteFoods, hobby, image: waifu.image };
            saveWaifu(updatedWaifu);
            loadWaifus();
            waifuForm.reset();
            currentEditIndex = null;
            document.getElementById("submitBtn").innerText = "Create";
        }
    });

    loadWaifus();
});