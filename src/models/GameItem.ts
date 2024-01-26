export default class GameItem {
    image: HTMLImageElement = wx.createImage() as HTMLImageElement;
    imageLoaded: boolean = false;
    constructor() {
        this.image.onload = () => this.imageLoaded = true;
    };
    draw(x: number, y: number, w: number, h: number, ctx: CanvasRenderingContext2D) {
        this.imageLoaded && ctx.drawImage(this.image, x, y, w, h);
    };
    click() {}
}