import {Product} from "./product.js";
import { Request } from "./request.js";
import { Order } from "./order.js";
import { Catch } from "./catch.js";

const storage = new Catch();
const userId = storage.getUser().id;



const request = new Request('http://localhost:3000/');
request.get("orders").then((results)=>{
// console.log(results);
results.forEach((item) => {
    if(item.status==="active"&& item.userId===userId){
console.log(item);
    }
    
});
})