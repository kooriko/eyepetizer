class SeriesData {
    constructor (name, value, color) {
        this.name = name;
        this.value = value;
        if (color) {
            this.itemStyle = {
                emphasis: {
                    color: color
                }
            }
        }
    }
}

const arr = [ 1, 2, 3, 4 ,5, 6, 7 ];
const series = {
    data: []
}
arr.forEach((item, index) => {
    if (index === 5) {
        series.data.push(new SeriesData('HELLO', item, 'red'));
    } else {
        series.data.push(new SeriesData('HELLO', item));
    }
});
console.log(series.data);