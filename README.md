# Color Perception
## Data Structure
```json
{
    info: { // 基础信息
        code: 编号,
        gender: 性别,
        age: 年龄
    },
    data: [ // 交互信息
        {
            id: 这轮的id，
            startTime: 这轮的开始时间,
            time: 这轮的时间 (ms)，
            patter: { // 本轮的测试组合，对应下面的 Pattern Type
                backgroundColor: 背景颜色, 
                lineHeight: 行高, 
                textType: 字符种类 // 0 - 数字, 1 - 中文, 2 - 英文
            }, 
            accuracy: { // 结束本轮结果统计
                right: 选对数量,
                wrong: 选错数量,
                sumWord: 这个分类的总数量，0 则代表根本没有点击过
            },
            eventSeq: [ // 本轮的点击信息
                {
                    tag: 选择是否正确, // 1 - 选择正确, -1 - 选择错误,
                    clickTime: 点击的时间,
                    fromStart: 从本轮开始到本次点击的时间,
                    fromLast: 从上一次点击到本次点击的时间,
                    clickItem: 点击的对象,
                    targetItem: 目标对象
                }
            ]
        }
    ]
}
```

## Pattern Type
```json
backgroundColor: ['#FF0017', '#0091FF', '#E3E3DB', '#FF00E3', '#00A88A', '#52A23B', '#B58B00', '#93908F'] // 背景颜色
fontColor: ['#FFFFFF', '#FFFFFF', '#93908F', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'] // 字体颜色
lineHeight: [1.5, 2, 2.5] // 行高
textType: [0, 1, 2] // 0 - 数字，1 - 中文，2 - 英文
```