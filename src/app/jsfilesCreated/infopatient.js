function continueButton() {
    window.location.href = "http://localhost:3000/consentform"
}

window.addEventListener('scroll', function() {
    var totalHeight = document.body.scrollHeight - window.innerHeight;
    var progress = (window.pageYOffset / totalHeight) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
});