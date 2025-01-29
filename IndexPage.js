import { link } from "./Baselink.js"

console.log(link)

const topics = ['Design', 'Marketing', 'Finance', 'Education', 'Music'];

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
        console.log("marketig",response.data)
        if (response.data.data.length < 3) {
            const maindiv = document.getElementById("marketingmaindiv")
            maindiv.style.display = "none"
        } else {
            console.log(response.data.data)
            marketingheadingtext[0].innerText = response.data.data[0].title
            marketingheadingtext[1].innerText = response.data.data[1].title
            marketingheadingtext[2].innerText = response.data.data[2].title

            marketingParatext[0].innerText = response.data.data[0].content
            marketingParatext[1].innerText = response.data.data[1].content
            marketingParatext[2].innerText = response.data.data[2].content

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


            financeParatext[0].innerText = response.data.data[0].content

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
const educationlink  = document.getElementsByClassName("educationlink")
console.log("education images", educationimages)
axios.post(`${link}/api/v1/insight/getinsightbytopic`, { topic: topics[3] })
    .then((response)=>{
        console.log(response.data)
        if (response.data.data.length < 2) {
            const maindiv = document.getElementById("educationmaindiv")
            maindiv.style.display = "none"
        } else {
            console.log(response.data.data)
            educationhaedingtext[0].innerText = response.data.data[0].title
            educationhaedingtext[1].innerText = response.data.data[1].title
            // musicheadingtext[2].innerText = response.data.data[2].title

            educationpara[0].innerText = response.data.data[0].content
            educationpara[1].innerText = response.data.data[1].content
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
    .catch((err)=>{
        console.log(err)
        const maindiv = document.getElementById("educationmaindiv")
        maindiv.style.display = "none"
        document.getElementById("educationnocontent").style.display = "inline"
    })


//for music tag
const musicheadingtext = document.getElementsByClassName("musicheading")
console.log("music heading",musicheadingtext)
const musicParatext = document.getElementsByClassName("musicpara")
const musicimage = document.getElementsByClassName("musicimage")
const musiclinks = document.getElementsByClassName("musiclink")
axios.post(`${link}/api/v1/insight/getinsightbytopic`, { topic: topics[4] })
    .then((response) => {
        console.log("music",response.data)
        if (response.data.data.length < 3) {
            const maindiv = document.getElementById("musicmaindiv")
            maindiv.style.display = "none"
        } else {
            console.log(response.data.data)
            musicheadingtext[0].innerText = response.data.data[0].title
            musicheadingtext[1].innerText = response.data.data[1].title
            musicheadingtext[2].innerText = response.data.data[2].title

            musicParatext[0].innerText = response.data.data[0].content
            musicParatext[1].innerText = response.data.data[1].content
            musicParatext[2].innerText = response.data.data[2].content

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