export const GENERATE_4_RATE = 0.5;

export const ROW_NUM = 4;
export const COLUMN_NUM = 4;

// 绘制相关配置
export const boardSize = 375; // 棋盘大小
export const cornerRadius = 5; // 圆角半径
export const gap = 10; // 格子间隙
export const checkerboardBackgroundColor = 'rgb(187, 171, 159)';
export const emptyGridBackgroundColor = 'rgb(202, 190, 178)';
export const pieceTextColor = ['#776e65', '#f9f6f2'];
export const pieceTextSize = {
    2: 45,
    4: 45,
    8: 45,
    16: 45,
    32: 45,
    64: 45,
    128: 35,
    256: 35,
    512: 35,
    1024: 25,
    2048: 25,
}; // 从浅到深的颜色
export const pieceColors = {
    2: '#eee4da',
    4: '#ede0c8',
    8: '#f2b179',
    16: '#f59563',
    32: '#f67c5f',
    64: '#f65e3b',
    128: '#edcf72',
    256: '#edcc61',
    512: '#edc850',
    1024: '#edc53f',
    2048: '#edc22e',
}; // 从浅到深的颜色;
export const animateTime = 30; // 棋子移动动画持续时间
export const swipeRange = 10; // 超过多少像素认为是滑动，否则是点击