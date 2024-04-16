import axios from 'axios';
import { CreateEntryDTO } from '../entities/CreateEntryDTO';
import { SuperQueries } from './SuperQueries';

export class EntryQueries extends SuperQueries {
    static baseUrl = super.baseUrl + 'entry'

    static async fetchAll() {
        const response = await axios.get(this.baseUrl)
        return response.data;
    }

    static async createEntry(entry: CreateEntryDTO) {
        console.log("saving this entry", entry);
        
        const response = await axios.post(this.baseUrl, entry)
        return response.data;
    }
}