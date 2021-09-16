const db = require("../models")

const Laptop = db.ordinateurportable

module.exports = {
    seederLaptop: function () {
        Laptop.create({
            systExploitation: "Linux Linpus Lite",
            stockage: 80,
            processor: "Intel Atom N270",
            tailleAffichage: "8,9 Pouces",
            hdmi: false,
            ram: "512 Mo",
            modeleId: 80,
        });
        Laptop.create({
            systExploitation: "Windows Vista Edition Professionnelle",
            stockage: 250,
            processor: "Intel Core 2 Duo P9400",
            tailleAffichage: "13,3 Pouces",
            hdmi: false,
            ram: "8 Go",
            modeleId: 86,
        });
        Laptop.create({
            systExploitation: "Windows 10 Home",
            stockage: 256,
            processor: "Intel Core i7-820QM",
            tailleAffichage: "14,7 pouces x 9,9 pouces",
            hdmi: true,
            ram: "8 Go",
            modeleId: 93,
        });
        Laptop.create({
            systExploitation: "Windows 10 Professionnel 64 bits",
            stockage: 256,
            processor: "Intel Core i5-1035G1",
            tailleAffichage: "14 Pouces",
            hdmi: true,
            ram: "16 Go",
            modeleId: 93,
        });
        Laptop.create({
            systExploitation: "Windows 10 Famille 64 bits",
            stockage: 256,
            processor: "Intel Core i5",
            tailleAffichage: "15,6 Pouces",
            hdmi: true,
            ram: "8 Go",
            modeleId: 83,
        });
        
    }
}
