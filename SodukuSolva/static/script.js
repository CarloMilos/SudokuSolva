document.addEventListener('DOMContentLoaded', () => {
    const uploadButton = document.getElementById('upload-button');
    const runButton = document.getElementById('run-button');
    const outputDiv = document.getElementById('output');
    const imageUpload = document.getElementById('image-upload');

    uploadButton.addEventListener('click', () => {
        const uploadedImage = imageUpload.files[0];

        if (!uploadedImage) {
            alert('Please upload an image.');
            return;
        }

        const formData = new FormData();
        formData.append('image', uploadedImage);

        // Send the uploaded image to the server
        fetch('/upload_image', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            // Display a message to indicate that the image has been uploaded
            outputDiv.textContent = data.result;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    runButton.addEventListener('click', () => {
        // Send a request to execute the code in main.py
        fetch('/run_code')
        .then(response => response.json())
        .then(data => {
            // Display the code execution result in the HTML page
            outputDiv.textContent = data.result;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
