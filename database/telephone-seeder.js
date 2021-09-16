const db = require("../models")

const phone = db.telephone

module.exports = {
    seederPhone: function () {
        phone.create({
            id: 1,
            systExploitation: "iOS 8",
            stockage: 128,
            technologie: "LCD",
            tailleAffichage: "4,7 Pouces",
            dualSim: false,
            ram: "1 Go",
            modeleId: 6,
        });
        phone.create({
            id: 2,
            systExploitation: "iOS 10",
            stockage: 32,
            technologie: "LCD",
            tailleAffichage: "4,7 Pouces",
            dualSim: false,
            ram: "2 Go",
            modeleId: 12,
        });
        phone.create({
            id: 3,
            systExploitation: "iOS 11",
            stockage: 64,
            technologie: "LCD",
            tailleAffichage: "4,7 Pouces",
            dualSim: false,
            ram: "2 Go",
            modeleId: 14,
        });
        phone.create({
            id: 4,
            systExploitation: "iOS 13",
            stockage: 128,
            technologie: "LCD",
            tailleAffichage: "6,1 Pouces",
            dualSim: false,
            ram: "4 Go",
            modeleId: 20,
        });
        phone.create({
            id: 5,
            systExploitation: "iOS 14",
            stockage: 256,
            technologie: "LCD",
            tailleAffichage: "6,1 Pouces",
            dualSim: true,
            ram: "4 Go",
            modeleId: 24,
        });
        phone.create({
            id: 6,
            systExploitation: "iOS 11",
            stockage: 64,
            technologie: "OLED",
            tailleAffichage: "5,8 Pouces",
            dualSim: false,
            ram: "3 Go",
            modeleId: 16,
        });
        phone.create({
            id: 7,
            systExploitation: "iOS 12",
            stockage: 128,
            technologie: "LCD",
            tailleAffichage: "6,1 Pouces",
            dualSim: false,
            ram: "3 Go",
            modeleId: 17,
        });
        phone.create({
            id: 8,
            systExploitation: "Android 9.0",
            stockage: 256,
            technologie: "OLED",
            tailleAffichage: "4,59 Pouces",
            dualSim: true,
            ram: "12 Go",
            modeleId: 69,
        });
        phone.create({
            id: 9,
            systExploitation: "Android 10 Q",
            stockage: 512,
            technologie: "Super AMOLED",
            tailleAffichage: "6,59 Pouces",
            dualSim: true,
            ram: "16 Go",
            modeleId: 67,
        });
        phone.create({
            id: 10,
            systExploitation: "Android 6.0 (Marshmallow)",
            stockage: 32,
            technologie: "LCD",
            tailleAffichage: "5,5 Pouces",
            dualSim: true,
            ram: "3 Go",
            modeleId: 73,
        });
        phone.create({
            id: 11,
            systExploitation: "Android 7.1 Nougat",
            stockage: 64,
            technologie: "LCD",
            tailleAffichage: "5,5 Pouces",
            dualSim: true,
            ram: "4 Go",
            modeleId: 72,
        });
        phone.create({
            id: 12,
            systExploitation: "Android 8.0",
            stockage: 128,
            technologie: "LCD",
            tailleAffichage: "6,2 Pouces",
            dualSim: true,
            ram: "6 Go",
            modeleId: 71,
        });
        phone.create({
            id: 13,
            systExploitation: "Android 9.0",
            stockage: 256,
            technologie: "LCD",
            tailleAffichage: "6,4 Pouces",
            dualSim: true,
            ram: "8 Go",
            modeleId: 70,
        });
        phone.create({
            id: 14,
            systExploitation: "Android 10 Q",
            stockage: 256,
            technologie: "AMOLED",
            tailleAffichage: "6,67 Pouces",
            dualSim: true,
            ram: "8 Go",
            modeleId: 68,
        });
        phone.create({
            id: 15,
            systExploitation: "Android 8.0",
            stockage: 128,
            technologie: "OLED",
            tailleAffichage: "6,3 Pouces",
            dualSim: true,
            ram: "6 Go",
            modeleId: 77,
        });
        phone.create({
            id: 16,
            systExploitation: "Android 11",
            stockage: 64,
            technologie: "LCD",
            tailleAffichage: "6,5 Pouces",
            dualSim: true,
            ram: "4 Go",
            modeleId: 78,
        });
        phone.create({
            id: 17,
            systExploitation: "Android 8.1",
            stockage: 128,
            technologie: "OLED",
            tailleAffichage: "6,4 Pouces",
            dualSim: true,
            ram: "6 Go",
            modeleId: 76,
        });
        phone.create({
            id: 18,
            systExploitation: "Android 7.0 Nougat",
            stockage: 64,
            technologie: "OLED",
            tailleAffichage: "5,8 Pouces",
            dualSim: false,
            ram: "4 Go",
            modeleId: 75,
        });
        phone.create({
            id: 19,
            systExploitation: "Android 10 Q",
            stockage: 64,
            technologie: "LCD",
            tailleAffichage: "6,3 Pouces",
            dualSim: true,
            ram: "4 Go",
            modeleId: 79,
        });
        phone.create({
            id: 20,
            systExploitation: "Android 10 Q",
            stockage: 256,
            technologie: "Super AMOLED",
            tailleAffichage: "7,6 Pouces",
            dualSim: true,
            ram: "12 Go",
            modeleId: 74,
        });
    }
}
