function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    window.location.href = 'index2.html'
}
window.onload = function () {
    google.accounts.id.initialize({
        client_id: "235104593497-fvr2qf1m0hkdraop7ui3daa2vktbqqi8.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }
    );
}
