export class CardChart {
    constructor(public chartId: string, public title: string, public description: string, public footer: string, public footerIcon: string,
        public headerClassColor: string = 'card-header-success', public descriptionSecond?: string, public descriptionIcon?: string) {
    }
}