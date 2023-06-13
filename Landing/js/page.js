export class Page{

    constructor() {
      this.basePage = 'http://127.0.0.1:5500/Landing/shoesownpage.html'
    }
  
    go(page,query={},path='') {
      window.location = `${this.basePage}${path == '' ? '' : path}${page}.html${!this.isObjEmpty(query)? `?${query.key}=${query.value}`:''}`;
    }
  
  
  
  
    isObjEmpty (obj) {
    return Object.keys(obj).length === 0;
    }
  
  }