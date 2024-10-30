tailwind.config = {
    theme: {
        extend: {
        fontFamily: {
            poppins: ['Poppins'],
            montserat: ['Montserrat']
        },
        },
    },
    plugins: [],
}

var typingEffect = new Typed(".typedText",{
    strings : ["Saving Earth"],
    loop : true,
    typeSpeed : 80, 
    backSpeed : 80,
    backDelay : 2000
 })

 const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true     
})

sr.reveal('.headline-1',{delay: 100})
sr.reveal('.headline-2',{delay: 100})
sr.reveal('.head-fitur',{delay: 100})
sr.reveal('.head-real',{delay: 100})
sr.reveal('.about',{delay: 100})
sr.reveal('.circle-button',{delay: 100})
sr.reveal('.project-box',{delay: 100})
sr.reveal('.banner',{delay: 170})
sr.reveal('.text-1',{delay: 100})

const srRight = ScrollReveal({
    origin: 'right',
    distance: '100px',
    duration: 2000,
    reset: true
})

srRight.reveal('.container-1',{interval: 200})

const srLeft = ScrollReveal({
    origin: 'left',
    distance: '100px',
    duration: 2000,
    reset: true
})

srLeft.reveal('.container-2',{interval: 200})

const descriptions = [
    "Suhu Ideal (Baik): 18 – 24°C dan Suhu Tinggi (Buruk): Di atas 30°C",
    "Baik (350 - 450 ppm) dan Berbahaya (> 5,000 ppm)",
    "Kadar Ozon 0-50 AQI untuk Baik dan Buruk untuk kadar ozon 151-200 AQI",
    "Kualitas Udara Baik (0-12 µg/m³) dan Tidak Sehat (55.5-150.4 µg/m³)"
];

const headline = [
    "Temperature",
    "CO₂ (karbon dioksida)",
    "Ozon (Air Quality Index)",
    "Particulate Matter 2.5"
];

const description2 = [
    "Suhu Ideal (Baik): untuk kenyamanan dalam ruangan. Dianggap sehat bagi kebanyakan orang. Suhu Tinggi (Buruk): polusi udara meningkat dan Memperparah efek polusi pada kesehatan.",
    "Baik (350 - 450 ppm) CO₂ dalam konsentrasi ini dianggap aman dan Berbahaya (> 5,000 ppm) sangat berbahaya dan dapat menyebabkan ancaman bagi keselamatan jiwa.",
    " 0-50 AQI aman untuk pernapasan bagi semua kelompok umur dan 151-200 AQI dapat berdampak buruk pada kesehatan umum, terutama bagi kelompok rentan.",
    "0-12 µg/m³: Tidak ada risiko kesehatan signifikan bagi manusia. 150.5-250.4 µg/m³: Dampak kesehatan lebih serius dan memengaruhi seluruh populasi, termasuk kelompok sehat."
]

function showDescription2(index) {
    const desc2 = document.getElementById("description-text2");
    desc2.textContent = description2[index];
    desc2.classList.add("text-xl", "p-3", "text-balance");
}

function showHeadline(index) {
    const headDescription = document.getElementById("head-description");
    headDescription.textContent = headline[index];
    headDescription.classList.add("text-2xl", "p-1");  // Menambahkan ukuran teks
}

function showDescription(index) {
    const descriptionText = document.getElementById("description-text");
    descriptionText.textContent = descriptions[index];
    descriptionText.classList.add("text-lg");  // Menambahkan ukuran teks
}


$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 64,
        // nav: true,
        dots: false,
        items: 1,
        autoplay: true,
        autoplayTimeout: 3000,
        smartSpeed: 1500,
        autoplayHoverPause: true
    });
});

const toggleButton = document.getElementById("toggle-button");
    const mobileMenu = document.getElementById("mobile-menu");

    toggleButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");  // Toggle visibility
    });

    // Close menu when clicking on a link in mobile menu
    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
        });
    });


function fetchWeatherData() {
    const apiKey = process.env.WHEATER_KEY;
    const cityInput = document.getElementById("cityInput").value; // Ambil input kota

    const loadingDiv = document.getElementById('loading');
    const weatherDataDiv = document.getElementById('weather-data');

    loadingDiv.style.display = 'block'; // Tampilkan loading
    weatherDataDiv.style.display = 'none'; // Sembunyikan data cuaca sebelumnya

    if (cityInput) {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityInput}&aqi=yes`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const locationElem = document.getElementById('location');
                const temperatureElem = document.getElementById('temperature');
                const coElem = document.getElementById('co');
                const o3Elem = document.getElementById('o3');
                const epaIndexElem = document.getElementById('epa-index');

                // Tampilkan lokasi lengkap
                locationElem.textContent = `${data.location.name}, ${data.location.country}`;
                temperatureElem.textContent = data.current.temp_c;
                coElem.textContent = data.current.air_quality.co.toFixed(2);
                o3Elem.textContent = data.current.air_quality.o3.toFixed(2);
                epaIndexElem.textContent = data.current.air_quality['us-epa-index'];

                loadingDiv.style.display = 'none'; // Sembunyikan loading
                weatherDataDiv.style.display = 'block'; // Tampilkan data cuaca
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Gagal memuat data cuaca. Silakan coba lagi.');
                loadingDiv.style.display = 'none'; // Sembunyikan loading
            });
    } else {
        alert("Silakan masukkan nama kota.");
        loadingDiv.style.display = 'none'; // Sembunyikan loading jika tidak ada input
    }
}


        // Fetch weather data function
        // function fetchWeatherData() {
        //     const apiKey = 'f8c320633d6543ccb8a161745242410';
        //     // const city = 'Surabaya';
        //     const city = document.getElementById("cityInput").value;
        //     const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;
    
        //     fetch(url)
        //         .then(response => response.json())
        //         .then(data => {
        //             const locationElem = document.getElementById('location');
        //             const temperatureElem = document.getElementById('temperature');
        //             const coElem = document.getElementById('co');
        //             const o3Elem = document.getElementById('o3');
        //             const epaIndexElem = document.getElementById('epa-index');
        //             const weatherDataDiv = document.getElementById('weather-data');
        //             const loadingDiv = document.getElementById('loading');
    
        //             locationElem.textContent = data.location.name + ', ' + data.location.country;
        //             temperatureElem.textContent = data.current.temp_c;
    
        //             coElem.textContent = data.current.air_quality.co.toFixed(2);
        //             o3Elem.textContent = data.current.air_quality.o3.toFixed(2);
        //             epaIndexElem.textContent = data.current.air_quality['us-epa-index'];
    
        //             loadingDiv.style.display = 'none';
        //             weatherDataDiv.style.display = 'block';
        //         })
        //         .catch(error => {
        //             console.error('Error:', error);
        //             document.getElementById('loading').textContent = 'Failed to load weather and air quality data.';
        //         });
        // }
    
        // Typewriter effect function
    
        window.onload = function () {
            fetchWeatherData();
            typeWriter();
        };
        
        window.addEventListener('scroll', function () {
            const navbar = document.querySelector('.sticky-nav');
            const navLinks = document.getElementById('nav-links');
        
            if (window.scrollY > 50) {
                navbar.classList.add('bg-opacity-80', 'backdrop-blur-md', 'shadow-lg');
                navLinks.classList.add('text-black');
                logo.classList.add('text-black');
            } else {
                navbar.classList.remove('bg-opacity-80', 'backdrop-blur-sm', 'shadow-lg');
                navLinks.classList.remove('text-black');
                logo.classList.remove('text-black');
            }
        });

