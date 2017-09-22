let LocalStorage;

if (localStorage) {
  LocalStorage = localStorage;
} else {
  LocalStorage = undefined;
}

export default LocalStorage;
