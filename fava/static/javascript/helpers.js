// Select a single element.
export function $(expr, con = document) {
  return con.querySelector(expr);
}

// Select multiple elements (and convert NodeList to Array).
export function $$(expr, con = document) {
  return Array.from(con.querySelectorAll(expr));
}

// Execute the callback of the event of given type is fired on something
// matching selector.
$.delegate = function delegate(element, type, selector, callback) {
  element.addEventListener(type, (event) => {
    if (event.target.closest(selector)) {
      callback(event);
    }
  });
};

// Create a new object that has all properties of the arguments.
$.extend = function extend(...args) {
  const newObject = {};
  args.forEach((object) => {
    Object.keys(object).forEach((i) => {
      if ({}.hasOwnProperty.call(object, i)) {
        newObject[i] = object[i];
      }
    });
  });
  return newObject;
};

// Bind an event to element, only run the callback once.
$.once = function once(element, event, callback) {
  function runOnce(...args) {
    element.removeEventListener(event, runOnce);
    callback.apply(element, args);
  }

  element.addEventListener(event, runOnce);
};

$.ready = function ready() {
  return new Promise((resolve) => {
    if (document.readyState !== 'loading') {
      resolve();
    } else {
      document.addEventListener('DOMContentLoaded', resolve());
    }
  });
};