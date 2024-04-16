<!--
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2024-02-01 19:32:17
 * @LastEditors: Qing Shi
 * @LastEditTime: 2024-04-12 17:18:26
-->
<template>
    <div style="width: 100%; height: 100%;">
        <div style="display: flex; justify-content: center; height: 100%; padding-top: calc(0vh); align-items: center;">
            <div style="font-size: 16px;">
                <span>TARGET: {{ targetElement }}</span>
                <hr style="margin: 15px 0px;">
                <div v-for="(d, i) in selectPattern.row" :key="'row_' + i">
                    <span v-for="(nd, ni) in selectPattern.number" :key="'cnt_' + i + '_' + ni" :style="{
                                    fontWeight: selectElementGroup[i * selectPattern.number + ni] == 1 ? 'bolder' : 'normal',
                                    cursor: 'pointer',
                                    color: '#000000'
                                }" @click="selectElement(i * selectPattern.number + ni)">{{ data[i * selectPattern.number + ni] }}<span v-if="selectPattern.space == 1">&nbsp;</span></span>
                </div>
    
            </div>
        </div>
    </div>
</template>

<script>
import { useDataStore } from "@/stores/counter";
import textData from '../assets/data/data.json';
export default {
    name: "APP",
    props: ["pattern"],
    data() {
        return {
            data: [],
            selectPattern: {},
            patternType: [{
                row: 12,
                number: 8,
                space: 1
            }, {
                row: 12,
                number: 29,
                space: 0
            }, {
                row: 12,
                number: 7,
                space: 1
            }, {
                row: 10,
                number: 25,
                space: 0
            }],
            selectElementGroup: {},
            targetElement: ''
        };
    },
    methods: {
        selectElement(id) {
            if (typeof this.selectElementGroup[id] == 'undefined') {
                this.selectElementGroup[id] = 1;
            } 
            // else {
            //     this.selectElementGroup[id] = !this.selectElementGroup[id];
            // }
        },
        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
        dataProcess(data) {
            let target_index = Math.floor(Math.random() * data.length);
            let targetElement = data[target_index];
            data = data.toSpliced(target_index, 1);
            let select_num = 8;
            for (let i = 0; i < select_num - 1; ++i) {
                let random_index = Math.floor(Math.random() * data.length);
                data = data.toSpliced(random_index, 1);
            }
            data = this.shuffleArray(data);
            for (let i = 0; i < select_num; ++i) {
                let random_index = Math.floor(Math.random() * (data.length - 2 * this.selectPattern.number)) + this.selectPattern.number;
                data = data.toSpliced(random_index, 0, targetElement);
            }
            return [targetElement, data];
        }
    },
    created() {},
    mounted() {
        let data = new Array();
        if (this.pattern == 3) {
            data = textData[1];
        } else {
            data = textData[this.pattern];
        }
        this.selectPattern = this.patternType[this.pattern];
        [this.targetElement, this.data] = this.dataProcess(data);
    },
    watch: {},
    components: {}
}
</script>

<style>

</style>
