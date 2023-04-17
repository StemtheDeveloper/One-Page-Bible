
// const addStuffToContents = () => {

//   const rect = document.createElement('input');
//     rect.type = 'text';
//     rect.style.width = `${blockSize}px`;
//     rect.style.height = `${blockSize}px`;
//     rect.style.position = 'absolute';
//     rect.style.backgroundColor = 'transparent';
//     rect.style.border = 'none';
//     rect.style.textAlign = 'center';

//   const origSize = document.createElement('div');
//   origSize.style.position = 'absolute';
//   origSize.style.width = `${gridSize.width}px`;
//   origSize.style.height = `${gridSize.height}px`;
//   origSize.style.border = `10px solid red`;
//   origSize.style.boxSizing = 'border-box';
      
//   contents.append(origSize);
// };

// const grid = document.querySelector('.grid');
// const contents = document.querySelector('.contents');
// const gridSize = grid.getBoundingClientRect();

// let panningAllowed = false;
// let zoomFactor = 1;
// let spaceKeyDown = false;

// const translate = { scale: zoomFactor, translateX:0, translateY:0 };
// const initialContentsPos = { x:0, y:0 };
// const initialZoomPos = { x:0, y:0 };
// const pinnedMousePosition = { x:0, y:0 };
// const mousePosition = { x:0, y:0 };

// const mousedown = (event) => {
//   initialContentsPos.x = translate.translateX;
//   initialContentsPos.y = translate.translateY;
//   pinnedMousePosition.x = event.clientX;
//   pinnedMousePosition.y = event.clientY;
//   panningAllowed = true;
// };

// const mousemove = (event) => {
//   mousePosition.x = event.clientX;
//   mousePosition.y = event.clientY;
//   if (panningAllowed) {
//     const diffX = (mousePosition.x - pinnedMousePosition.x);
//     const diffY = (mousePosition.y - pinnedMousePosition.y);
//     translate.translateX = initialContentsPos.x + diffX;
//     translate.translateY = initialContentsPos.y + diffY;
//   }
//   update();
// };

// const mouseup = (event) => {
//   panningAllowed = false;
// };

// const zoom = (event) => {
//     // Determine before anything else. Otherwise weird jumping.
//     if (zoomFactor + (event.deltaY / 5000) > 3 || 
//         zoomFactor + (event.deltaY / 5000) < .4
//        ) {
//       return;
//     }

//     const oldZoomFactor = zoomFactor; 
//     zoomFactor += (event.deltaY / 5000);

//     mousePosition.x = event.clientX - gridSize.x;
//     mousePosition.y = event.clientY - gridSize.y;

//     // Calculations
//     translate.scale = zoomFactor;

//     const contentMousePosX = (mousePosition.x - translate.translateX);
//     const contentMousePosY = (mousePosition.y - translate.translateY);  
//     const x = mousePosition.x - (contentMousePosX * (zoomFactor / oldZoomFactor));
//     const y = mousePosition.y - (contentMousePosY * (zoomFactor / oldZoomFactor));

//     translate.translateX = x;
//     translate.translateY = y;

//     update();
// };

// const update = () => {
//   contents.style.transform = `translate(${translate.translateX}px, ${translate.translateY}px) scale(${translate.scale})`;
// };

// document.getElementById("jumpButton").addEventListener("click", function() {
//   window.scrollTo(0, document.body.scrollHeight);
// });

// // Initialize
// addStuffToContents();

// // Add event listeners
// grid.addEventListener('mousedown', mousedown);
// grid.addEventListener('mousemove', mousemove);
// grid.addEventListener('mouseup', mouseup);
// grid.addEventListener('wheel', zoom);

const addStuffToContents = () => {
      
  // const origSize = document.createElement('div');
	// origSize.style.position = 'absolute';
	// origSize.style.width = `${gridSize.width}px`;
	// origSize.style.height = `${gridSize.height}px`;
	// origSize.style.border = `10px solid red`;
	// origSize.style.boxSizing = 'border-box';
      
  // contents.append(origSize);
};

const grid = document.querySelector('.grid');
const contents = document.querySelector('.contents');
const gridSize = grid.getBoundingClientRect();

let panningAllowed = false;
let zoomFactor = 1;

const translate = { scale: zoomFactor, translateX:0, translateY:0 };
const initialContentsPos = { x:0, y:0 };
const initialZoomPos = { x:0, y:0 };
const pinnedMousePosition = { x:0, y:0 };
const mousePosition = { x:0, y:0 };

const mousedown = (event) => {
	initialContentsPos.x = translate.translateX;
	initialContentsPos.y = translate.translateY;
	pinnedMousePosition.x = event.clientX;
	pinnedMousePosition.y = event.clientY;
	panningAllowed = true;
};

const mousemove = (event) => {
	mousePosition.x = event.clientX;
	mousePosition.y = event.clientY;
	if (panningAllowed) {
		  const diffX = (mousePosition.x - pinnedMousePosition.x);
      const diffY = (mousePosition.y - pinnedMousePosition.y);
      translate.translateX = initialContentsPos.x + diffX;
      translate.translateY = initialContentsPos.y + diffY;
	}
	update();
};

const mouseup = (event) => {
	panningAllowed = false;
};

const zoom = (event) => {
    // Determine before anything else. Otherwise weird jumping.
    if (zoomFactor + (event.deltaY / 5000) > 6 || 
        zoomFactor + (event.deltaY / 5000) < .01
       ) {
      return;
    }

    const oldZoomFactor = zoomFactor; 
	  zoomFactor += (event.deltaY / 5000);

    mousePosition.x = event.clientX - gridSize.x;
	  mousePosition.y = event.clientY - gridSize.y;

    // Calculations
  	translate.scale = zoomFactor;

    const contentMousePosX = (mousePosition.x - translate.translateX);
    const contentMousePosY = (mousePosition.y - translate.translateY);  
    const x = mousePosition.x - (contentMousePosX * (zoomFactor / oldZoomFactor));
    const y = mousePosition.y - (contentMousePosY * (zoomFactor / oldZoomFactor));
  
	  translate.translateX = x;
   	translate.translateY = y;

    update();
};

const update = () => {
  const matrix = `matrix(${translate.scale},0,0,${translate.scale},${translate.translateX},${translate.translateY})`;
  contents.style.transform = matrix;
};

addStuffToContents();
grid.addEventListener('wheel', zoom);
grid.addEventListener('mousedown', mousedown);
grid.addEventListener('mousemove', mousemove);
grid.addEventListener('mouseup', mouseup);


