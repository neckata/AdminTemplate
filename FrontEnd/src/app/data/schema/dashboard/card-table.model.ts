import { Colum } from "../colum";

export class CardTable {
    constructor(public title: string, public description: string, public displayColumns: Colum[], public data: any[],
        public headerClassColor: string = 'card-header-success', public columnClassColor: string = "text-warning") {
    }
}