/*
 *   Copyright (c) 2024 
 *   All rights reserved.
 */

// Preview Files (PDFs, Videos, URLs, MP3s)
function previewFiles() {
    const previewContainer = document.getElementById('previewContainer');
    previewContainer.innerHTML = ''; // Clear previous previews

    const pdfFiles = document.getElementById('pdfUpload').files;
    const videoFiles = document.getElementById('mp4Upload').files;

    // Preview PDFs
    Array.from(pdfFiles).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const pdfPreview = document.createElement('div');
            pdfPreview.classList.add('preview-item');

            const pdfContainer = document.createElement('div');
            pdfPreview.appendChild(pdfContainer);
            previewContainer.appendChild(pdfPreview);

            // Render PDF
            pdfjsLib.getDocument({ data: e.target.result }).promise.then(pdf => {
                const numPages = pdf.numPages;
                for (let pageNum = 1; pageNum <= numPages; pageNum++) {
                    pdf.getPage(pageNum).then(page => {
                        const viewport = page.getViewport({ scale: 1 });
                        const canvas = document.createElement('canvas');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;

                        const renderContext = {
                            canvasContext: canvas.getContext('2d'),
                            viewport: viewport,
                        };
                        page.render(renderContext);

                        pdfContainer.appendChild(canvas);
                    });
                }
            });
        };
        reader.readAsArrayBuffer(file);
    });

    // Preview Videos
    Array.from(videoFiles).forEach(file => {
        const videoPreview = document.createElement('div');
        videoPreview.classList.add('preview-item');

        const videoElement = document.createElement('video');
        videoElement.controls = true;
        videoElement.src = URL.createObjectURL(file);
        videoElement.style.height = '300px'; // Set height for video previews

        videoPreview.appendChild(videoElement);
        previewContainer.appendChild(videoPreview);
    });
}

// Search Files (AI Description)
function searchFiles() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();

    if (searchInput === 'describe topographical mapping') {
        document.getElementById('aiDescription').value = `Computerized tomography (CT) and magnetic resonance imaging (MRI) have shown the power of spatial displays in enhancing data interpretation and analysis. Similarly, electrophysiologic data from multielectrode recordings have been visualized using mapping techniques to depict spatial information.`;
    }
}

// Generate Citations
function generateCitations() {
    const videoFiles = document.getElementById('mp4Upload').files;
    const pdfFiles = document.getElementById('pdfUpload').files;

    if (pdfFiles.length > 0) {
        document.getElementById('citations').style.display = 'block';
        document.getElementById('citations').innerHTML = `Refer to page 10 for detailed information.`;
    } else if (videoFiles.length > 0) {
        document.getElementById('citations').style.display = 'block';
        document.getElementById('citations').innerHTML = `Generated timestamp: 00:01:00 <br> Click to play video at timestamp.`;
    }
}

// Go back to results
function goBack() {
    document.getElementById('results').innerHTML = ''; // Clear results
    document.getElementById('backButton').style.display = 'none'; // Hide back button
}