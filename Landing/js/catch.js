export class Catch{

    #getItem(key) {
      const store = localStorage.getItem(key) || '[]';
      return JSON.parse(store);
    }
    #setItem(key, value) {
      localStorage.setItem(key, JSON.stringify([value]));
    }
  
  
     checkSplashstate() {
       const state = this.#getItem('spalsh');
       if (state?.[0] == 'on') {
         return true
       } else {
         return false;
       }
    }
  
     setSplashstate(value) {
      this.#setItem('spalsh', value);
    }
  
  
    checkUser() {
      let list = this.#getItem('user');
      return list?.[0] ? true : false; 
    }
  
    getUser() {
      const list = this.#getItem('user');
      return list[0]
    }
  
    setUser(user) {
      this.#setItem('user', user);
    }
  
  }