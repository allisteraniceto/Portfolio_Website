const url = '../docs/allister-aniceto_resume.pdf'; //path to resume pdf

let pdfDoc = null, //set to null by default 
    pageNum = 1, //start on the first page
    pageIsRendering = false, //when run renderPage method, set to true, but once PDF is fetched, back to false
    pageNumIsPending = null; //if fetching other pages

const scale = 1.5,
    canvas = document.querySelector('#pdf-render'), //prefixed with # because pdf-render is an id
    ctx = canvas.getContext('2d');

//Render the page
const renderPage = num => { //practice arrow functions
    pageIsRendering = true;

    //Get page
    pdfDoc.getPage(num).then(page=>{
        //set scale
        const viewport = page.getViewport({scale}); //gets property "scale" from viewport object
        canvas.height = viewport.height; //get height and width to create canvas proportions
        canvas.width = viewport.width;

        const renderCtx = {
            canvasContext: ctx,
            viewport
        }

        page.render(renderCtx).promise.then( () => {
            pageIsRendering = false;

            if(pageNumIsPending !== null){
                renderPage(pageNumIsPending);
                pageNumIsPending = null;
            }
        });
    });
}

//Get Document

pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
    pdfDoc = pdfDoc_;

    //document.querySelector('#page-count').textContent = pdfDoc.numPages;

    renderPage(pageNum);
})
.catch( err => { //if you do not get the err
    console.log("ERROR: COULD NOT GET URL");
})