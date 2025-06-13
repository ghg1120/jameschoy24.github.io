// pdfviewer.js
document.addEventListener('DOMContentLoaded', function() {
    // Set the path to the PDF.js worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = 
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

    const pdfPath = 'JamesChoyResume.pdf';
    const canvas = document.getElementById('pdf-render');
    const ctx = canvas.getContext('2d');
    const pageNum = document.getElementById('page-num');
    const prevPage = document.getElementById('prev-page');
    const nextPage = document.getElementById('next-page');

    let pdfDoc = null,
        pageNumCurrent = 1,
        pageRendering = false,
        pageNumPending = null,
        scale = 1.5;

    function renderPage(num) {
        pageRendering = true;
        pdfDoc.getPage(num).then(function(page) {
            const viewport = page.getViewport({ scale: scale });
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };

            const renderTask = page.render(renderContext);
            renderTask.promise.then(function() {
                pageRendering = false;
                if (pageNumPending !== null) {
                    renderPage(pageNumPending);
                    pageNumPending = null;
                }
            });
        });

        pageNum.textContent = `Page ${num} of ${pdfDoc.numPages}`;
    }

    function queueRenderPage(num) {
        if (pageRendering) {
            pageNumPending = num;
        } else {
            renderPage(num);
        }
    }

    function onPrevPage() {
        if (pageNumCurrent <= 1) return;
        pageNumCurrent--;
        queueRenderPage(pageNumCurrent);
    }

    function onNextPage() {
        if (pageNumCurrent >= pdfDoc.numPages) return;
        pageNumCurrent++;
        queueRenderPage(pageNumCurrent);
    }

    prevPage.addEventListener('click', onPrevPage);
    nextPage.addEventListener('click', onNextPage);

    pdfjsLib.getDocument(pdfPath).promise.then(function(pdfDoc_) {
        pdfDoc = pdfDoc_;
        renderPage(pageNumCurrent);
    });
});