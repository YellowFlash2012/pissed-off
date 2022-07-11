import bcrypt from "bcryptjs"

export const users= [
    {
        name: "Hokage",
        email: "edimitru0@squarespace.com",
        password: bcrypt.hashSync("g0wEpyoei!yg25df", 12),
        isAdmin: true,
    },
    {
        name: "Fremont Magog",
        email: "fmagog1@chronoengine.com",
        password: bcrypt.hashSync("KZkhydshfh@g5pEl", 12),
    },
    {
        name: "Lauritz Falck",
        email: "lfalck2@amazon.com",
        password: bcrypt.hashSync("MLXqoh&qgYms1YhG", 12),
    },
    {
        name: "Augusto Lunney",
        email: "alunney3@eepurl.com",
        password: bcrypt.hashSync("Nddgbovq#dfWSQ4", 12),
    },
    {
        name: "Opalina Huckerbe",
        email: "ohuckerbe4@about.me",
        password: bcrypt.hashSync("iI3dghdbsq5h@PK", 12),
    },
    {
        name: "Caresa Wrightim",
        email: "cwrightim5@vk.com",
        password: bcrypt.hashSync("5bjoucxhv!f7KoAa", 12),
    },
    {
        name: "Milissent Cleft",
        email: "mcleft6@nhs.uk",
        password: bcrypt.hashSync("wVUhsbd5i@fpzeOWU", 12),
    },
    {
        name: "Parker Lafford",
        email: "plafford7@statcounter.com",
        password: bcrypt.hashSync("Ulohsdvb&79J8KmQPD", 12),
    },
    {
        name: "Kelci Secrett",
        email: "ksecrett8@kickstarter.com",
        password: bcrypt.hashSync("u3ihdfdfgjWit9Cdh#l", 12),
    },
    {
        name: "Cass Loft",
        email: "cloft9@usnews.com",
        password: bcrypt.hashSync("KUihhdf7XQjSR@dfy7S", 12),
    },
];
