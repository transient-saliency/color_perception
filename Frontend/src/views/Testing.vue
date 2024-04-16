<!--
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2022-09-17 23:36:36
 * @LastEditTime: 2024-04-16 17:42:38
-->
<template>
    <div class="common-layout" :style="{width: '100%', height: '100vh', backgroundColor: isRelax ? ' #797775' : selectBackgroundColor }" v-loading="!initSign" :element-loading-text="loadingText" element-loading-background="rgba(0, 0, 0, 0.8)" @keyup.space="nextRound()"
        tabindex="0">
        <!-- <Main :msgH="msgH"/> -->
        <!-- @click.right="nextRoundClick()" -->
    
        <div style="height: 100%; width: 100%;">
            <test v-if="!isRelax" :pattern="pattern[patternCnt]" :startTime="startTime"></test>
            <div v-else style="width: 100%; height: 100%; display: flex; justify-content: center; flex-direction: column; padding-top: calc(0vh);">
                <div style="margin-bottom: 10px; font-size: 40px; color: white;">第 {{ (patternCnt + 1) }} 轮</div>
    
                <div style="margin-bottom: 30px; font-size: 20px; color: white;">休息 {{ (timeNote) }} 秒</div>
                <div style="width: 100%; display: flex; justify-content: center;">
                    <!-- <div class="cross"></div> -->
                </div>
            </div>
        </div>
        <!-- <div style="position: absolute; right: 10px; bottom: 20px;">
                <el-button v-if="!isRelax && patternCnt < 75" @click="nextRound()" :color="'#797775'">下一轮</el-button>
                <el-button v-if="isRelax && patternCnt <= 75" @click="skipRelax()" :color="'#797775'">跳过休息</el-button>
                <el-button v-if="!isRelax && patternCnt == 75" @click="nextRound()" :color="'#797775'">结束实验</el-button>
            </div> -->
    </div>
</template>

<script>
import axios from 'axios';
import test from '../components/test.vue';
import { saveData } from '../service/module/dataService';
import { useDataStore } from "@/stores/counter";

export default {
    name: "home_view",
    data() {
        return {
            msgH: null,
            pattern: [],
            patternCnt: 0,
            timeCnt: 20,
            timeNote: 0,
            isRelax: true,
            timer: null,
            backgroundColor: ['#FF0017', '#0091FF', '#E3E3DB', '#FF00E3', '#00A88A', '#52A23B', '#B58B00', '#93908F'],
            selectBackgroundColor: '#ffffff',
            startTime: 0,

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
        const dataStore = useDataStore();
        dataStore.allData.data = [];
        this.msgH = 1;
        this.pattern = this.patternProcess();
        console.log(this.pattern)
        this.patternCnt = 0;
        this.selectBackgroundColor = this.backgroundColor[this.pattern[this.patternCnt].backgroundColor];
        this.timeCountDown()
    },
    methods: {
        saveData() {
            const dataStore = useDataStore();
            let data = dataStore.allData;
            // axios.post('https://formspree.io/f/xrgnoavv', {
            axios.post('https://formspree.io/f/xqkrgypr', {
                data: JSON.stringify(data),
                dataType: 'json'
            }).then((res) => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
            this.$router.push('/end');
        },
        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
        patternProcess() {
            let pattern = new Array();
            for (let i = 0; i < 8; ++i) {
                for (let j = 0; j < 3; ++j) {
                    for (let k = 0; k < 3; ++k) {
                        pattern.push({
                            backgroundColor: i,
                            lineHeight: j,
                            textType: k
                        });
                    }
                }
            }
            for (let i = 0; i < 4; ++i) {
                let random_index = Math.floor(Math.random() * 72);
                pattern.push(pattern[random_index]);
            }
            return this.shuffleArray(pattern);
        },
        roundSave(pattern) {
            let roundTime = new Date() - this.startTime;
            const dataStore = useDataStore();
            if (typeof dataStore.tmpAccuracy == 'undefined') {
                dataStore.tmpAccuracy = { right: 0, wrong: 0, sumWord: 0 };
            }
            if (typeof dataStore.eventSeq == 'undefined') {
                dataStore.eventSeq = [];
            }
            dataStore.allData.data.push({
                id: dataStore.allData.data.length,
                startTime: this.startTime,
                time: roundTime,
                accuracy: dataStore.tmpAccuracy,
                pattern: pattern,
                eventSeq: dataStore.eventSeq
            });
            dataStore.tmpAccuracy = { right: 0, wrong: 0, sumWord: 0 }
            dataStore.eventSeq = [];
            console.log(dataStore.allData);
        },
        nextRound() {
            if (this.isRelax == false) {
                this.roundSave(this.pattern[this.patternCnt]);
                this.patternCnt++;
                // if (this.patternCnt != 4)
                if (this.patternCnt != 76) {
                    this.isRelax = !this.isRelax;
                }
                if (this.patternCnt == 76) {
                    this.saveData();
                }
                this.timeCountDown();
            }
        },
        nextRoundClick() {
            if (!this.isRelax) {
                this.roundSave(this.pattern[this.patternCnt]);
                this.patternCnt++;
                if (this.patternCnt != 76) {
                    this.isRelax = !this.isRelax;
                }
                if (this.patternCnt == 76)
                    this.saveData();

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
            this.startTime = new Date();
        }
    },
    watch: {
        patternCnt: {
            handler() {
                if (this.patternCnt < this.pattern.length)
                    this.selectBackgroundColor = this.backgroundColor[this.pattern[this.patternCnt].backgroundColor];
                // if (this.patternCnt == 4) {
                //     this.$router.push('/beforeStudy')
                // }
            }
        }
    },
    components: { test }
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
