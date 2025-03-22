import { link } from "./Baselink.js"

console.log(link)

const topics = ['Design', 'Marketing', 'Finance', 'Education', 'Music'];

// Search By User
const searchBtn = document.querySelector(".user-search-btn");
const searchInput = document.querySelector(".search-input");
const resultsContainer = document.getElementById("results");

const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};

const fetchResults = async (query) => {
    if (!query.trim()) {
        resultsContainer.innerHTML = "";
        return;
    }

    try {
        const modifiedValue = query.charAt(0).toUpperCase() + query.slice(1).toLowerCase();
        const { data } = await axios.post(`${link}/api/v1/insight/getinsightbytopic`, { topic: modifiedValue });

        if (data.data.length >= 3) {
            displayResults(data.data);
        } else {
            resultsContainer.innerHTML = `<p class="text-warning">No results found for "${query}"</p>`;
        }
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = `<p class="text-white">Failed to fetch results. Please try again.</p>`;
    }
};

const displayResults = (results) => {
    resultsContainer.innerHTML = results
        .map(item => `
            <div class="col-md-6 mb-4">
                <div class="card h-100 shadow-sm">
                    <img src="${item.Image}" class="card-img-top" alt="${item.title}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">${item.content}</p>
                        <p class="text-muted">By ${item.submittedbyName}</p>
                    </div>
                </div>
            </div>
        `)
        .join('');
};

searchInput.addEventListener("input", debounce((e) => {
    const value = e.target.value;
    fetchResults(value);
}, 500));

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fetchResults(searchInput.value);
});


//for design topics
const headingtext = document.getElementsByClassName("designHeading")
const paratext = document.getElementsByClassName("designPara")
const designimages = document.getElementsByClassName("designimage")
const designlink = document.getElementsByClassName("designlink")
console.log(headingtext, paratext)
axios.post(`${link}/api/v1/insight/getinsightbytopic`, { topic: topics[0] })
    .then((response) => {
        if (response.data.data.length < 3) {
            const maindiv = document.getElementById("designmaindiv")
            maindiv.style.display = "none"
        } else {
            console.log(response.data.data)
            console.log("links ", response.data.data[0]._id)
            headingtext[0].innerText = response.data.data[0].title
            headingtext[1].innerText = response.data.data[1].title
            headingtext[2].innerText = response.data.data[2].title

            paratext[0].innerText = response.data.data[0].content
            paratext[1].innerText = response.data.data[1].content
            paratext[2].innerText = response.data.data[2].content

            designimages[0].src = response.data.data[0].Image
            designimages[1].src = response.data.data[1].Image
            designimages[2].src = response.data.data[2].Image

            designlink[0].href = `/topics-detail.html?id=${response.data.data[0]._id}`
            designlink[1].href = `/topics-detail.html?id=${response.data.data[1]._id}`
            designlink[2].href = `/topics-detail.html?id=${response.data.data[2]._id}`

            document.getElementById("nocontent").style.display = "none"
            // console.log(nocontent)
            // nocontent.style.display = "none"
        }
    })
    .catch((err) => {
        console.log(err)
        const maindiv = document.getElementById("designmaindiv")
        maindiv.style.display = "none"
    })


//for marketing tag
const marketingheadingtext = document.getElementsByClassName("marketingheading")
const marketingParatext = document.getElementsByClassName("marketingpara")
const marketingimages = document.getElementsByClassName("marketingimage")
const marketinglink = document.getElementsByClassName("marketinglink")
axios.post(`${link}/api/v1/insight/getinsightbytopic`, { topic: topics[1] })
    .then((response) => {
        console.log("marketig", response.data)
        if (response.data.data.length < 3) {
            const maindiv = document.getElementById("marketingmaindiv")
            maindiv.style.display = "none"
        } else {
            console.log(response.data.data)
            marketingheadingtext[0].innerText = response.data.data[0].title
            marketingheadingtext[1].innerText = response.data.data[1].title
            marketingheadingtext[2].innerText = response.data.data[2].title

            marketingParatext[0].innerText = truncateText(response.data.data[0].content)
            marketingParatext[1].innerText = truncateText(response.data.data[1].content)
            marketingParatext[2].innerText = truncateText(response.data.data[2].content)

            marketingimages[0].src = response.data.data[0].Image
            marketingimages[1].src = response.data.data[1].Image
            marketingimages[2].src = response.data.data[2].Image


            marketinglink[0].href = `/topics-detail.html?id=${response.data.data[0]._id}`
            marketinglink[1].href = `/topics-detail.html?id=${response.data.data[1]._id}`
            marketinglink[2].href = `/topics-detail.html?id=${response.data.data[2]._id}`

            document.getElementById("marketingnocontent").style.display = "none"
            // console.log(nocontent)
            // nocontent.style.display = "none"
        }
    })
    .catch((err) => {
        console.log(err)
        const maindiv = document.getElementById("marketingmaindiv")
        maindiv.style.display = "none"
        document.getElementById("marketingnocontent").style.display = "inline"

    })



//for finance tag
const financeheadingtext = document.getElementsByClassName("financeheading")
const financeParatext = document.getElementsByClassName("financepara")
const fianceimage = document.getElementsByClassName("financeimage")
const financelink = document.getElementsByClassName("financelink")

axios.post(`${link}/api/v1/insight/getinsightbytopic`, { topic: topics[2] })
    .then((response) => {
        console.log(response.data)
        if (response.data.data.length < 3) {
            const maindiv = document.getElementById("financemaindiv")
            maindiv.style.display = "none"
        } else {
            console.log(response.data.data)
            financeheadingtext[0].innerText = response.data.data[0].title


            financeParatext[0].innerText = truncateText(response.data.data[0].content)

            fianceimage[0].src = response.data.data[0].Image

            financelink[0].href = `/topics-detail.html?id=${response.data.data[0]._id}`
            document.getElementById("financenocontent").style.display = "none"
            // console.log(nocontent)
            // nocontent.style.display = "none"
        }
    })
    .catch((err) => {
        console.log(err)
        const maindiv = document.getElementById("financemaindiv")
        maindiv.style.display = "none"
        document.getElementById("financenocontent").style.display = "inline"

    })

// for education tag
const educationhaedingtext = document.getElementsByClassName("educationheading")
const educationpara = document.getElementsByClassName("educationpara")
const educationimages = document.getElementsByClassName("educationimage")
const educationlink = document.getElementsByClassName("educationlink")
console.log("education images", educationimages)
axios.post(`${link}/api/v1/insight/getinsightbytopic`, { topic: topics[3] })
    .then((response) => {
        console.log(response.data)
        if (response.data.data.length < 2) {
            const maindiv = document.getElementById("educationmaindiv")
            maindiv.style.display = "none"
        } else {
            console.log(response.data.data)
            educationhaedingtext[0].innerText = response.data.data[0].title
            educationhaedingtext[1].innerText = response.data.data[1].title
            // musicheadingtext[2].innerText = response.data.data[2].title

            educationpara[0].innerText = truncateText(response.data.data[0].content)
            educationpara[1].innerText = truncateText(response.data.data[1].content)
            // musicParatext[2].innerText = response.data.data[2].content

            educationimages[0].src = response.data.data[0].Image
            educationimages[1].src = response.data.data[1].Image


            educationlink[0].href = `/topics-detail.html?id=${response.data.data[0]._id}`
            educationlink[1].href = `/topics-detail.html?id=${response.data.data[1]._id}`

            document.getElementById("educationnocontent").style.display = "none"
            // console.log(nocontent)
            // nocontent.style.display = "none"
        }
    })
    .catch((err) => {
        console.log(err)
        const maindiv = document.getElementById("educationmaindiv")
        maindiv.style.display = "none"
        document.getElementById("educationnocontent").style.display = "inline"
    })


//for music tag
const musicheadingtext = document.getElementsByClassName("musicheading")
console.log("music heading", musicheadingtext)
const musicParatext = document.getElementsByClassName("musicpara")
const musicimage = document.getElementsByClassName("musicimage")
const musiclinks = document.getElementsByClassName("musiclink")
axios.post(`${link}/api/v1/insight/getinsightbytopic`, { topic: topics[4] })
    .then((response) => {
        console.log("music", response.data)
        if (response.data.data.length < 3) {
            const maindiv = document.getElementById("musicmaindiv")
            maindiv.style.display = "none"
        } else {
            console.log(response.data.data)
            musicheadingtext[0].innerText = response.data.data[0].title
            musicheadingtext[1].innerText = response.data.data[1].title
            musicheadingtext[2].innerText = response.data.data[2].title

            musicParatext[0].innerText = truncateText(response.data.data[0].content)
            musicParatext[1].innerText = truncateText(response.data.data[1].content)
            musicParatext[2].innerText = truncateText(response.data.data[2].content)

            musicimage[0].src = response.data.data[0].Image
            musicimage[1].src = response.data.data[1].Image
            musicimage[2].src = response.data.data[2].Image

            musiclinks[0].href = `/topics-detail.html?id=${response.data.data[0]._id}`
            musiclinks[1].href = `/topics-detail.html?id=${response.data.data[1]._id}`
            musiclinks[2].href = `/topics-detail.html?id=${response.data.data[2]._id}`

            document.getElementById("musicnocontent").style.display = "none"
            // console.log(nocontent)
            // nocontent.style.display = "none"
        }
    })
    .catch((err) => {
        console.log(err)
        const maindiv = document.getElementById("musicmaindiv")
        maindiv.style.display = "none"
        document.getElementById("musicnocontent").style.display = "inline"

    })


// Function to truncate text
const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const firstheadingtext = document.getElementsByClassName("firstheading");
const firstpara = document.getElementsByClassName("firstpara");
const firstimages = document.getElementsByClassName("firstimage");
const firsta = document.getElementsByClassName("firsta")
axios.get(`${link}/api/v1/insight/getallinsight`)
    .then((resp) => {
        console.log("all topics", resp.data.data);

        let randTopc1 = resp.data.data[Math.floor(Math.random() * resp.data.data.length)];
        let randTopc2 = resp.data.data[Math.floor(Math.random() * resp.data.data.length)];

        console.log("from var ", randTopc1);

        firstheadingtext[0].innerText = randTopc1.title;
        firstheadingtext[1].innerText = randTopc2.title;

        firstpara[0].innerText = truncateText(randTopc1.content, 100); // Limit to 100 characters
        firstpara[1].innerText = truncateText(randTopc2.content, 100);

        firstimages[0].src = randTopc1.Image;
        firstimages[1].src = randTopc2.Image;

        firsta[0].href = `/topics-detail.html?id=${randTopc1._id}`
        firsta[1].href = `/topics-detail.html?id=${randTopc2._id}`
    })
    .catch((err) => {
        console.log(err);
    });
