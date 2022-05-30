import {loadLocalStorage, saveLocalStorage} from "./lib";

test('', () => {
  saveLocalStorage("key1",JSON.stringify({a: 1, b: 'bb'}))
});
