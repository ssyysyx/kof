let AC_GAME_OBJECTS = [];

class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this);//存下来每一个object
        this.timedelta = 0;
        this.has_call_start = false; //表示该对象还没有执行过has_call_start函数。
    }

    start() { //初始执行一次

    }

    update() { //每一帧执行一次（除了第一帧以外）

    }

    destroy() { //删除当前对象
        for (let i in AC_GAME_OBJECTS) {
            if (AC_GAME_OBJECTS[i] == this) {
                //splice删除从a开始的b个元素
                AC_GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}

//为了能记录相邻两帧的时间间隔，我们需要能够记录上一帧在什么时刻执行的
let last_timestamp;
//每一帧应该执行的内容 AC_GAME_OBJECTS_FRAME是回调函数
let AC_GAME_OBJECTS_FRAME = (timestamp) => {
    for (let obj of AC_GAME_OBJECTS) {
        if (!obj.has_call_start) {
            obj.start();
            obj.has_call_start = true;
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;
    requestAnimationFrame(AC_GAME_OBJECTS_FRAME);
}

requestAnimationFrame(AC_GAME_OBJECTS_FRAME);


export {
    AcGameObject
}