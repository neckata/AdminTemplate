export class CardStats {
    constructor(public title: string, public category: string, public footer: string, public footerIcon: string, public headerIcon:string,
        public headerClassColor: string = 'card-header-success',public faHeaderIcon?:string) {
    }
}