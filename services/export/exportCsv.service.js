import fs from 'fs'
import path from "path";

import { createObjectCsvWriter } from 'csv-writer'
import db from '../../models/index.js'

const BATCH_SIZE = 5000;

export const exportGamesToCsv = async (job) => {
    const rootDir = process.cwd();

    const filePath = path.join(rootDir, "assets", `games-${Date.now()}.csv`);

    const csvWriter = createObjectCsvWriter({
        path: filePath, //where to save
        header: [ //columns dbfields:csv column
            { id: "id", title: "ID" },
            { id: "name", title: "NAME" },
            { id: "createdAt", title: "CREATED_AT" }
        ],
        append: false //to write header only once
    })

    // test fetch
    
    // const rows = await db.Games.findAll({
    //     limit: 100,
    //     order: [["id", "ASC"]],
    //     raw: true,
    // });

    // await csvWriter.writeRecords(rows);

    // await job.updateProgress(100);

    // for all

    let offset = 0;
    let totalProcessed = 0;

    while(true){
        const rows = await db.Games.findAll({
            limit: BATCH_SIZE, //for all 
            offset,
            raw: true //plain js object
        })

        if(rows.length === 0) break;

        await csvWriter.writeRecords(rows); //converts into csv rows

        offset += BATCH_SIZE;
        totalProcessed += rows.length;

        await job.updateProgress(totalProcessed);
    }

    return filePath
}