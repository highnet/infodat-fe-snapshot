/* @copyright Stadt Wien - Wiener Melange 200 */
let zoomed = false;
let zoomLevel = 1;
let zoomLevelLast = 1;
const zoomLevelMax = 5;
const zoomLevelDblTap = 2;
const pinchDefaultSettings = {
  active: false,
  x: 0,
  targetX: 0,
  y: 0,
  startDist: 0,
  dist: 0,
  lastDist: 1,
  offset: 32
};
let pinch = Object.assign({}, pinchDefaultSettings);
const touchDefaultsettings = {
  lastX: 0,
  lastY: 0,
  moving: false,
  moved: false
};
let touch = Object.assign({}, touchDefaultsettings);
let sliding = false;
let swipeStart;

let resetCallback = () => {};
const resetEvent = new Event('reset');
let resetEventHandler;
let resizeEvent;
let touchStartEvent;
let touchMoveEvent;
let touchEndEvent;
let tappedTwice = false;

const WmImageZoom = function (options) {
  console.info('🌈 Image zoom initialisieren.');

  this.image = {
    elem: options.img
  };

  this.ready = false;

  setTimeout(() => {
    this.image.zoomedClass = options.zoomedClass;
    this.image.container = options.container;
    this.image.zoomEvent = options.zoomEvent;

    this.getImageData();

    if (options.onReset) {
      resetCallback = options.onReset;
    }

    this.container = typeof options.container === 'string' ? document.querySelector(options.container) : options.container;
    this.addEvents();

    console.info('✅ Image zoomt bereit.');
    console.info(' ');
    this.ready = true;

    if (this.image.zoomEvent) {
      if (options.zoomEventType === 'dblclick') {
        this.zoomOnDoubleTap(this.image.zoomEvent);
      } else {
        this.zoomOnPinch(this.image.zoomEvent);
      }
    }
  }, 150);

  return this
};

WmImageZoom.prototype.getImageData = function () {
  this.image.originalHeight = this.image.elem.height;
  this.image.originalRect = this.image.elem.getBoundingClientRect();

  this.setXandY();
};

WmImageZoom.prototype.setXandY = function () {
  if (this.image.container) {
    const elem = this.image.elem;
    const parentContainer = this.image.container.getBoundingClientRect();

    this.image.x = Math.round(elem.getBoundingClientRect().left - parentContainer.left);
    this.image.y = Math.round(elem.getBoundingClientRect().top - parentContainer.top);
  }
};

WmImageZoom.prototype.isDoubleTap = function () {
  if (!tappedTwice) {
    tappedTwice = true;

    window.setTimeout(function () {
      tappedTwice = false;
    }, 300);
    return false
  }
  return true
};

WmImageZoom.prototype.pinchGetDist = function (e) {
  return Math.hypot(
    e.touches[0].clientX - e.touches[1].clientX,
    e.touches[0].clientY - e.touches[1].clientY
  )
};

WmImageZoom.prototype.resizeImage = function () {
  this.resetZoom();
  this.getImageData();
};

WmImageZoom.prototype.addEvents = function () {
  resizeEvent = this.resizeImage.bind(this);
  touchStartEvent = this.startHandler.bind(this);
  touchMoveEvent = this.moveHandler.bind(this);
  touchEndEvent = this.endHandler.bind(this);
  resetEventHandler = resetCallback();

  this.container.addEventListener('touchstart', touchStartEvent);
  this.container.addEventListener('touchmove', touchMoveEvent);
  this.container.addEventListener('touchend', touchEndEvent);
  this.container.addEventListener('reset', resetEventHandler);
  this.container.addEventListener('resize', resizeEvent);

  console.info('👉 Events attachen.');
};

WmImageZoom.prototype.destroyEvents = function () {
  if (this.container) {
    this.container.removeEventListener('touchstart', touchStartEvent);
    this.container.removeEventListener('touchmove', touchMoveEvent);
    this.container.removeEventListener('touchend', touchEndEvent);
    this.container.removeEventListener('resize', resizeEvent);
    this.container.removeEventListener('reset', resetEventHandler);

    console.info('👉 Events destroyen.');
  }
};

WmImageZoom.prototype.zoomOnPinch = function (e) {
  pinch.active = true;
  pinch.x = (e.touches[0].clientX + e.touches[1].clientX) / 2;
  pinch.y = (e.touches[0].clientY + e.touches[1].clientY) / 2;

  pinch.startDist = this.pinchGetDist(e);

  console.info('👉 Zoom: pinch.');
};

WmImageZoom.prototype.zoomOnDoubleTap = function (e) {
  touch.moving = false;

  zoomLevelLast = zoomLevel;
  if (zoomed) {
    this.resetZoom();
  } else {
    zoomLevel = zoomLevelDblTap;
    this.zoom(e.touches[0].clientX, e.touches[0].clientY);
  }

  console.info('👉 Zoom: double tap.');
};

WmImageZoom.prototype.resetZoom = function () {
  zoomLevel = 1;
  zoomLevelLast = 1;
  this.image.elem.removeAttribute('style');
  this.image.elem.classList.remove(this.image.zoomedClass);
  zoomed = false;

  this.setXandY();

  pinch = pinchDefaultSettings;
  touch = touchDefaultsettings;

  document.body.classList.remove('wm-is-zoomed');
  if (this.container) {
    this.container.classList.remove('wm-zoom-active');

    // resetCallback = () => {}

    this.container.dispatchEvent(resetEvent);
  }
  console.info('👉 Zoom: reset.');
};

WmImageZoom.prototype.moveImage = function (x, y) {
  clearInterval(sliding);
  sliding = false;

  const parentContainer = this.image.container.getBoundingClientRect();

  // Keep image in its parent's bounds
  if (x > parentContainer.width / 2) {
    x = parentContainer.width / 2;
  }

  if (y > parentContainer.height / 2) {
    y = parentContainer.height / 2;
  }

  if (this.image.elem.getBoundingClientRect().height + y <= parentContainer.height / 2) {
    y =
      (this.image.elem.getBoundingClientRect().height - parentContainer.height / 2) * -1;
  }

  if (this.image.elem.getBoundingClientRect().width + x <= parentContainer.width / 2) {
    x =
      (this.image.elem.getBoundingClientRect().width - parentContainer.width / 2) * -1;
  }

  this.image.elem.style.transform = `translateX(${x}px) translateY(${y}px)`;

  this.image.x = x;
  this.image.y = y;
};

WmImageZoom.prototype.zoom = function (touchX, touchY) {
  // Scale the image according to the zoomLevel
  this.image.elem.removeAttribute('width');
  this.image.elem.style.height = this.image.originalRect.height * zoomLevel + 'px';

  // get the parent container bounding client rect
  const parentContainer = this.image.container.getBoundingClientRect();

  // if the container is larger than the image, get half of the remaining space
  const relativeRemaningSpaceX = (parentContainer.width - this.image.originalRect.width) / 2;
  const relativeRemaningSpaceY = (parentContainer.height - this.image.originalRect.height) / 2;

  // take the touch point which is relative to the viewport
  // and subtract the position of the image and the remaining space within the container, if present
  // this will give you x and y of the image relative to the container
  const relativeX = touchX - this.image.originalRect.left + relativeRemaningSpaceX;
  const relativeY = touchY - this.image.originalRect.top + relativeRemaningSpaceY;

  // Take the relative touch point
  // and subtract it by the last position of the image + the relative touch point
  // relative to the scaled image
  const x = relativeX - (-1 * this.image.x + relativeX) / zoomLevelLast * zoomLevel;
  const y = relativeY - (-1 * this.image.y + relativeY) / zoomLevelLast * zoomLevel;

  zoomed = true;
  this.container.classList.add('wm-zoom-active');
  document.body.classList.add('wm-is-zoomed');
  this.image.elem.classList.add(this.image.zoomedClass);

  this.moveImage(x, y);
};

WmImageZoom.prototype.startHandler = function (e, taptap = false) {
  e.preventDefault();

  if (this.image.elem.dataset.wmZoomDisable === 'true') {
    console.warn('👉 Zoom disabled.');
    return
  }

  console.info('👉 Start touch.');

  if (e.touches.length === 2) {
    this.zoomOnPinch(e);
    return
  }
  touch.lastX = e.touches[0].clientX;
  touch.lastY = e.touches[0].clientY;

  if (zoomed) {
    swipeStart = performance.now();

    if (sliding) {
      clearInterval(sliding);
      sliding = false;
    }
  }

  const doubleTap = this.isDoubleTap();

  // Stop dragging if double tap
  if (!doubleTap && !taptap) {
    touch.moving = true;

    return false
  }

  if (!touch.moved) {
    this.zoomOnDoubleTap(e);
  }
};

WmImageZoom.prototype.moveHandler = function (e) {
  if (this.image.elem.dataset.wmZoomDisable === 'true') {
    return
  }

  if (pinch.active) {
    pinch.dist = this.pinchGetDist(e);
    zoomLevelLast = zoomLevel;

    if (pinch.dist > pinch.lastDist) {
      zoomLevel = pinch.lastDist * Math.abs(pinch.dist / pinch.startDist); // Zoom is proportional to change
    } else {
      zoomLevel = pinch.lastDist * Math.abs(pinch.startDist / pinch.dist); // Zoom is proportional to change
    }

    if (zoomLevel >= zoomLevelMax) {
      zoomLevel = zoomLevelMax;
    }

    if (zoomLevel < 1) {
      this.resetZoom();
    } else {
      zoomed = true;
      if (zoomed) {
        touch.moving = false;
        this.zoom(pinch.x, pinch.y);
      }
    }
  }

  if (touch.moving && zoomed) {
    touch.moved = false;

    if (performance.now() - swipeStart > 60) {
      touch.moved = true;
    }

    const differenceX = Math.round(touch.lastX - e.touches[0].clientX);
    const differenceY = Math.round(touch.lastY - e.touches[0].clientY);
    touch.lastX = e.touches[0].clientX;
    touch.lastY = e.touches[0].clientY;

    const x = this.image.x - differenceX;
    const y = this.image.y - differenceY;

    this.moveImage(x, y);
  }
};

WmImageZoom.prototype.endHandler = function () {
  pinch.active = false;
  pinch.lastDist = zoomLevel;
  touch.moving = false;
  touch.moved = false;

  console.info('👉 End touch.');
};

const preventPinchZoom = (e) => {
  if (e.touches.length === 2) {
    e.preventDefault();
    return false
  }
};

export { WmImageZoom, preventPinchZoom };
