<!--
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2022-09-17 23:36:36
 * @LastEditTime: 2024-04-16 17:42:23
-->
<template>
    <div class="common-layout" :style="{width: '100%', height: '100vh', backgroundColor: isRelax ? ' #797775' : '#ffffff'}" v-loading="!initSign" :element-loading-text="loadingText" element-loading-background="rgba(0, 0, 0, 0.8)" @keyup.space="nextRound()"
        tabindex="0">
        <!-- @click.right="nextRoundClick()" -->
        <!-- <Main :msgH="msgH"/> -->
        <div style="height: 100%; width: 100%; margin-top: 0px;">
            <train v-if="!isRelax" :pattern="pattern[patternCnt]"></train>
            <div v-else style="width: 100%; height: 100%; display: flex; justify-content: center; flex-direction: column; padding-top: calc(0vh);">
                <div style="margin-bottom: 10px; font-size: 40px; color: white;">第 {{ (patternCnt + 1) }} 轮</div>
    
                <div style="margin-bottom: 30px; font-size: 20px; color: white;">休息 {{ (timeNote) }} 秒</div>
                <div style="width: 100%; display: flex; justify-content: center;">
                    <!-- <div class="cross"></div> -->
                </div>
            </div>
        </div>
        <!-- <div style="position: absolute; right: 10px; bottom: 20px;">
                <el-button v-if="!isRelax" @click="nextRound()" :color="'#797775'"><span v-if="patternCnt < 3">下一轮</span><span v-else>结束训练</span></el-button>
                <el-button v-else @click="skipRelax()" :color="'#797775'">跳过休息</el-button>
            </div> -->
    </div>
</template>

<script>
import train from '../components/train.vue';

export default {
    name: "home_view",
    data() {
        return {
            msgH: null,
            pattern: [0, 1, 2, 3],
            patternCnt: 0,
            timeCnt: 3,
            timeNote: 0,
            isRelax: true,
            timer: null
        };
    },
    computed: {
        initSign() {
            return 1;
        },
        loadingText() {
            return "Loading"
        }
    },
    mounted() {
        this.msgH = 1;
        this.patternCnt = 0;
        this.timeCountDown()
    },
    methods: {
        nextRound() {
            // console.log(1)
            if (this.isRelax == false) {
                this.patternCnt++;
                if (this.patternCnt != 4)
                    this.isRelax = !this.isRelax;
                this.timeCountDown();
            }
        },
        nextRoundClick() {
            if (!this.isRelax) {
                this.patternCnt++;
                if (this.patternCnt != 4)
                    this.isRelax = !this.isRelax;
                this.timeCountDown();
            } else {
                this.isRelax = !this.isRelax;
                this.skipRelax();
            }
            // console.log(this.patternCnt);
            event.preventDefault();

        },
        timeCountDown() {
            let timeCount = this.timeCnt;
            this.timeNote = timeCount;
            this.timer = setInterval(() => {
                if (timeCount > 0) {
                    timeCount--;
                    this.timeNote = timeCount;
                } else {
                    clearInterval(this.timer);
                    this.startTest();
                }
            }, 1000);
        },
        skipRelax() {
            clearInterval(this.timer);
            this.startTest();
        },
        startTest() {
            this.isRelax = false;
        }
    },
    watch: {
        patternCnt: {
            handler() {
                if (this.patternCnt == 4) {
                    this.$router.push('/beforeStudy')
                }
            }
        }
    },
    components: { train }
};
</script>

<style scoped>
.boundary {
    /*border-style: dashed;*/
    border-style: solid;
    border-color: #d3dce6;
    border-width: 0.5px;
    border-radius: 3px;
}

.cross {
    position: relative;
    width: 50px;
    /* 设置十字的宽度 */
    height: 50px;
    /* 设置十字的高度 */
}

.cross::before,
.cross::after {
    content: '';
    position: absolute;
    background-color: #ffffff;
    /* 设置十字的颜色 */
}

.cross::before {
    top: 50%;
    left: 0;
    width: 100%;
    height: 5px;
    /* 设置水平线的高度 */
    transform: translateY(-50%);
}

.cross::after {
    left: 50%;
    top: 0;
    width: 5px;
    /* 设置垂直线的宽度 */
    height: 100%;
    transform: translateX(-50%);
}
</style>
