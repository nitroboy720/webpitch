"use-strict";

const fs = require("fs");
const readFile = require("util").promisify(fs.readFile);
const config = require(__dirname+"/config.json");

build();

async function build(){
    let files = new Array;
    for (const page of config.pages){
        files.push(fs.createWriteStream(__dirname+"/../public"+page.url,"UTF-8"));
    }

    await writeHeads(files);
    await writeBodys(files);
    await files.forEach(file=>file.end());
}

async function writeHeads(files){
    for (let i = 0; i<files.length; i++){

        await files[i].write("<!DOCTYPE HTML>\n<html>");
        await files[i].write("<head>\n");
        for (const headTag of config.pages[i].headTags){
            await files[i].write("\t"+headTag+"\n");
        }
        for (const defaultHeadTag of config.defaultHeadTags){
            await files[i].write("\t"+defaultHeadTag+"\n");
        }
        await files[i].write("</head>\n");
    }
}

async function writeBodys(files){
    for (let i = 0; i<files.length; i++){
        await files[i].write("<body has-navbar-fixed-top>\n");
        for (const path of config.pages[i].bodyFiles){
            await readFile(__dirname+"/components"+path, "UTF-8")
            .then(data=>files[i].write(data+"\n"));
        }
        await files[i].write("</body>\n");
        await files[i].write("</html>\n");
    }
}