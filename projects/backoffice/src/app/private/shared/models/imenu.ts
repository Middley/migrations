export interface IMenu {
    text: string,
    icon: string,
    routerLink?: string;
    children: IMenuItem[]
    roles: string[]
}
export interface IMenuItem {
    text: string,
    icon: string,
    routerLink: string;
}