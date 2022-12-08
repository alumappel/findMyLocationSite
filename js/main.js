
window.addEventListener("DOMContentLoaded", function () {

    //הוספת לחיצה לכתפתורים
    document.getElementById("find-me").addEventListener("click", geoFindMe);
    document.getElementById("shareBtn").addEventListener("click", share);

    //מציאת מיקום גיפיאס
    function geoFindMe() {
        //משתנים
        const status = document.querySelector('#status');
        const mapLink = document.querySelector('#map-link');
        const iframeLink = document.getElementById("iframe");

        mapLink.href = '';
        mapLink.textContent = '';
        iframeLink.src = '';

        //במידה של הצלחה שומר את המיקום
        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            //מייצר קישור וטקסט של המיקום
            status.textContent = '';
            mapLink.href = `https://maps.google.com/?q=${latitude},${longitude} `;
            mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
            iframeLink.src = `https://maps.google.com/?output=embed&q=${latitude},${longitude}`;
            //הצגה של האיפריים
            document.getElementById("iframe").classList.remove("d-none");


        }
        //במידה והיתה שגיאה
        function error() {
            status.textContent = 'Unable to retrieve your location';
        }
        //במידה והדפדפן לא תומך
        if (!navigator.geolocation) {
            status.textContent = 'Geolocation is not supported by your browser';
        } else {
            status.textContent = 'Locating…';
            navigator.geolocation.getCurrentPosition(success, error);
        }

    }


    //פונקציה לשיתוף
    function share() { 
        //משתנה שלוקח את הקישור מתוך הקישור בעמוד   
        var urlToSand=document.querySelector('#map-link').href;    
        if (navigator.canShare && navigator.canShare({ url: urlToSand })) {
            navigator.share({
                url:urlToSand,
            })
                .then(() => console.log('Share was successful.'))
                .catch((error) => console.log('Sharing failed', error));
        } else {
            console.log(`Your system doesn't support sharing files.`);
        }

    }


})




