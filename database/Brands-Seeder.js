const db = require("../models");

const Brand = db.brand;

module.exports = {
    seedBrands : function(){
        Brand.create({
            name: "Apple"
          });
        
        Brand.create({
            name: "Asus"
          });
        
        Brand.create({
            name: "Google"
          });
        
        Brand.create({
            name: "HTC"
          });
        
        Brand.create({
            name: "Huawei"
          });
        
        Brand.create({
            name: "Lenovo"
          });
        
        Brand.create({
            name: "LG"
          });
        
        Brand.create({
            name: "Meizu"
          });
        
        Brand.create({
            name: "Nokia"
          });
        
        Brand.create({
            name: "Nubia"
          });
        
        Brand.create({
        name: "OnePlus"
        });
        
        Brand.create({
        name: "Oppo"
        });
        
        Brand.create({
        name: "Realme"
        });
        
        Brand.create({
        name: "Samsung"
        });
        
        Brand.create({
            name: "Sony"
          });
        Brand.create({
        name: "Vivo"
        });
        
        Brand.create({
        name: "Xiaomi"
        });
    }
}
