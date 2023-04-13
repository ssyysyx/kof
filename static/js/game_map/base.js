import { Controller } from '/kof/static/js/controller/base.js';
import { AcGameObject } from '/kof/static/js/ac_game_object/base.js';

class GameMap extends AcGameObject {
    constructor(root) {
        super();

        this.root = root;
        this.$canvas = $('<canvas width="1280" height="720" tabindex=0></canvas>');
        //$canvas是一个object数组
        this.ctx = this.$canvas[0].getContext('2d');//2d表示2d图像
        this.root.$kof.append(this.$canvas);//将canvas加到div里面
        this.$canvas.focus();//聚焦canvas
        this.controller = new Controller(this.$canvas);

        this.root.$kof.append($(`<div class="kof-head">
            <div class="kof-head-hp-0"><div><div></div></div></div>
            <div class="kof-head-timer">60</div>
            <div class="kof-head-hp-1"><div><div></div></div></div>
        </div>`));

        this.time_left = 60000; //单位：ms
        this.$timer = this.root.$kof.find(".kof-head-timer");
    }

    start() {

    }

    update() { //一般update()里面都会特别长，所以一般update里面不直接写逻辑，除非逻辑特别短
        this.time_left -= this.timedelta; //timedelta是自己定义的距离上一帧的时间间隔
        if (this.time_left <= 0) {
            this.time_left = 0;

            let [a, b] = this.root.players;
            if (a.status !== 6 && b.status !== 6) {
                a.status = b.status = 6;
                a.frame_current_cnt = b.frame_current_cnt = 0;
                a.vx = b.vx = 0;
            }

        }
        this.$timer.text(parseInt(this.time_left / 1000));
        this.render();
    }

    render() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // this.ctx.fillStyle = 'black';
        // this.ctx.fillRect(0, 0, this.$canvas.width(), this.$canvas.height());
    }

}

export {
    GameMap
}
