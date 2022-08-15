import { Player } from "/static/js/player/base.js";
import { GIF } from '/static/js/utils/gif.js';

export class Kyo extends Player {
    constructor(root, info) {
        super(root, info);
        this.init_animations();
    }

    init_animations() {
        let outer = this;
        let offsets = [0, -22, -22, -140, 0, 0, 0];
        //动画一共有七个
        for (let i = 0; i < 7; i++) {
            let gif = GIF();
            gif.load(`/static/images/player/kyo/${i}.gif`);
            //给Map插入键值对，value存到一个结构体里面
            this.animations.set(i, {
                gif: gif,
                //一共多少帧，初始是0，加载完需要重新定义
                frame_cnt: 0,   //总图片数
                //每秒刷多少帧，每秒速率
                frame_rate: 5,  // 每5帧过渡一次
                //偏移量
                offset_y: offsets[i],    // y方向偏移量
                loaded: false,  //是否加载完整 加载完整才可渲染
                scale: 2,   //放大多少倍
            });
            //图片加载完之后，需要更新一下结构体里面的数据
            gif.onload = function () {
                //function里面不能直接用this
                let obj = outer.animations.get(i);
                obj.frame_cnt = gif.frames.length;
                obj.loaded = true;//表示已经被加载出来了

                if (i === 3) {
                    obj.frame_rate = 4; //改成每4帧播放一张，会快一点
                }
            }
        }
    }
}


