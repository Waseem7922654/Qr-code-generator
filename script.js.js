// Generate QR Code
function generateQR() {
    const text = document.getElementById("qr-text").value.trim();
    if (!text) {
        alert("Please enter some text or URL!");
        return;
    }

    const canvas = document.getElementById("qr-canvas");
    
    // Clear previous QR
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    
    // Generate new QR
    QRCode.toCanvas(canvas, text, { 
        width: 250,
        margin: 2,
        color: {
            dark: '#000000',
            light: '#ffffff'
        }
    }, (error) => {
        if (error) {
            console.error(error);
            alert("Failed to generate QR code. Try again!");
        }
    });
}

// Download QR as PNG
function downloadQR() {
    const canvas = document.getElementById("qr-canvas");
    if (!canvas || canvas.width === 0) {
        alert("Generate a QR code first!");
        return;
    }

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Auto-generate QR if URL has parameter
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const autoText = urlParams.get('text');
    if (autoText) {
        document.getElementById("qr-text").value = autoText;
        generateQR();
    }
};