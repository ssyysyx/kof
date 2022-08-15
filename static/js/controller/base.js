export class Controller {
    constructor($canvas) {
        this.$canvas = $canvas;
        this.pressed_keys = new Set();
        this.start();
    }

    start() {
        let outer = this;
        this.$canvas.keydown(function (e) {
            //这里面用不了this 所以要在上面定义一个outer
            outer.pressed_keys.add(e.key);
            console.log(e.key);
        });

        this.$canvas.keyup(function (e) {
            outer.pressed_keys.delete(e.key);
        });
    }
}


