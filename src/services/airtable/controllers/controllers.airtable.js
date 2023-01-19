import AirtableConfig from "../config/config.airtable.js";
import create from "./methods/create.airtable.js";
import deleteData from "./methods/delete.airtable.js";
import read from "./methods/read.airtable.js";
import update from "./methods/update.airtable.js";

export default class AirtableData{
    constructor(table, view) {
        this.base = AirtableConfig.getBase();
        this.table = table
        this.view = view || 'Grid view'
    }

    checkData(){
        console.log('base :',this.base);
        console.log('table :',this.table);
        console.log('view :',this.view);
    }
    async read(action){
        return await read(this.base, this.table, this.view, action)
    }
    async create(datas, action){
        return await create(this.base, datas, this.table, action)
    }
    async update(datas, action){
        return await update(this.base ,datas, this.table, action)
    }
    async delete(id, action){
        return await deleteData(this.base, id, this.table, action)
    }
}