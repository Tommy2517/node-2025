// console.log('hello');
//
// console.log(__dirname);
// console.log(__filename);
// console.log(process.cwd());
//
// const { func2 } = require('./lessons/lesson-1/services/test')
// func2()
//
//////////////////////////////////////////
////http/////
//////////////////////////////////////////
//
// const http = require("node:http");
//
// const server = http.createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "application/json" });
//
//     if (req.url === "/cars") {
//         switch (req.method) {
//             case 'GET':
//                 return res.end(JSON.stringify({
//                     data:'my-cars'
//                 }))
//             case 'POST':
//                 return res.end(JSON.stringify({
//                     data:'create car'
//                 }))
//
//         }
//     }
// });;

// server.listen(5000)


//////////////////////////////////////////
////path/////
//////////////////////////////////////////

// const path=require('node:path');
//
// const pathTest = path.join('lessons','lesson-1','services','test.js')
// console.log(pathTest);
//
// console.log(path.parse(pathTest)); //path object
// console.log(path.dirname(pathTest)); //path directory
// console.log(path.extname(pathTest)); //path file type
// console.log(path.basename(pathTest)); //file name
// console.log(path.isAbsolute(pathTest)); //full path or no
// console.log(path.normalize('////\\lessons\///\///lesson-1\\//services//test.js')); //repair path


//////////////////////////////////////////
//// read line /////
//////////////////////////////////////////


// const readline = require('node:readline/promises');
//
// const start = async () => {
//     const rlInterface = readline.createInterface({
//         input:process.stdin,
//         output:process.stdout
//     });
//
//     const name = await rlInterface.question('your name?: ');
//     const age = await rlInterface.question('your age?: ');
//     console.log('hello',name,' - ',age);
//     // rlInterface.close();
//     process.exit(0); //if code != 0 > error
// }
//
// start();

//////////////////////////////////////////
//// fs /////
//////////////////////////////////////////

// const fs = require("node:fs/promises");
// const path = require("node:path");
// const readline = require("node:readline/promises");
// const afs = require("node:fs/promises");
//
// const filePath = path.join("lessons", "FileTest.txt");
// const start = async () => {
// await fs.mkdir(path.join('lessons','newDir','newDir2', 'newDir3'), {recursive:true})
// await fs.mkdir(filePath, {recursive:true})
// await fs.writeFile(filePath, 'hello1\n');
// await fs.writeFile(filePath, 'hello1\n');
// await fs.appendFile(filePath, 'hello2\n');
// const dataFromFile = await fs.readFile(filePath, {encoding:'utf-8'});
// console.log(dataFromFile);
// await fs.rename( path.join(process.cwd(),'estFile.txt'), filePath)
// await fs.copyFile(filePath, path.join(path.dirname(filePath),'FileTest.txt'))
// await fs.copyFile(path.join(path.dirname(filePath), "lesson-1", "services", "test.js"), path.join(process.cwd(), "test.js"));
// await fs.unlink(filePath);
// await fs.rm(path.dirname(filePath), {recursive:true})

// await fs.rmdir(filePath)


///copy data from file:
// const fileStream = fs.createReadStream(filePath, "utf-8");
// const rl = readline.createInterface({ input: fileStream });
//
// try{
//     for await (const line of rl){
//         await afs.appendFile('res.txt', `${line} ========\n`)
//     }
// }finally {
//     await rl.close()
// }

// //rewrite img or other
// const readStream = fs.createReadStream(filePath);
// const writeStream = fs.createWriteStream("asss.txt");
//
// // readStream.on("data", (chunk) => {
// //     writeStream.write(chunk);
// // });
// //analog
// readStream.pipe(writeStream)
// };

// start();



////////////////////////////////////////////////////////////////
///// OS ////
////////////////////////////////////////////////////////////////
// const os = require('node:os');            // подключение модуля os

// console.log(os.arch());                  // архитектура процессора
// console.log(os.cpus());                  // информация о CPU
// console.log(os.totalmem()/1024/1024/1024); // общий объём ОЗУ (в ГБ)
// console.log(os.freemem()/1024/1024/1024);  // свободная ОЗУ (в ГБ)
// console.log(os.homedir());               // домашняя папка пользователя
// console.log(os.hostname());              // имя устройства (хоста)
// console.log(os.release());               // версия ядра ОС
// console.log(os.tmpdir());                // путь к временной папке
// console.log(os.type());                  // тип ОС (например, Linux)
// console.log(os.uptime());                // время работы системы (в секундах)
// console.log(os.userInfo());              // информация о пользователе
// console.log(os.version());               // версия ОС
// console.log(os.networkInterfaces());     // сетевые интерфейсы
// console.log(os.platform());              // платформа ОС (например, win32)


////////////////////////////////////////////////////////////////
///// EVENTS ////
////////////////////////////////////////////////////////////////

const emitter = require('node:events');

const em = new emitter.EventEmitter();

em.once('qwe', ()=>{
    console.log('qwe');
});
em.on('qwer', ()=>{
    console.log('qwer');
});
em.emit('qwe');
em.emit('qwe');
em.emit('qwe');
em.emit('qwe');
em.emit('qwer');
em.emit('qwer');
em.emit('qwer');