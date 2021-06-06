export class CardList {
    constructor(public header: string, public headreClass: string, public tabs: CardListTab[], public contents: CardListContent[]) {
    }
}

export class CardListTab {
    constructor(public title: string, public icon: string, public href: string) {
    }
}

export class CardListContent {
    constructor(public id: string, public data: CardListContentLine[]) {
    }
}

export class CardListContentLine {
    constructor(public id: number, public checked: boolean, public text: string) {
    }
}