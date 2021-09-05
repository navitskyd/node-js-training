import csv from 'csvtojson'
import fs from 'fs'
import {pipeline} from 'stream'

const csvFilePath = './csv/nodejs-hw1-ex1.csv'

const transform1 = csv({
    noheader: false,
    output: "json"
})
const transform2 = csv({
    noheader: false,
    output: "json"
})
const transform3 = csv({
    noheader: false,
    output: "json"
})

const input1 = fs.createReadStream(csvFilePath)

const output1 = fs.createWriteStream('./csv/json1.txt');
input1.pipe(transform1)
    .on('error', (err) => {
        console.error(err)
    })
    .on('error', (err) => {
        console.error(err)
    })
    .pipe(output1)
    .on('error', (err) => {
        console.error(err)
    })

const output2 = fs.createWriteStream('./csv/json2.txt');
pipeline(
    input1,
    transform2,
    output2,
    (error) => {
        if (error) {
            console.error(error)
        } else {
            console.log('finished')
        }
    }
)

const output3 = fs.createWriteStream('./csv/json3.txt');
input1.pipe(transform3).pipe(output3);
