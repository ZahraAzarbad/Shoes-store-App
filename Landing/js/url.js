export class Url{
    constructor() {
      this.url = new URLSearchParams(window.location.search);
    }
  
    params(param) {
      let entries = this.url.entries();
      return Object.fromEntries(entries)[param];
    }
  }