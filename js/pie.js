(function () {
    var pie = {
        init() {
            this.getData();

            this.option = {
                title: {
                    text: '',
                    subtext: '纯属虚构',
                    left: 'center'
                },
                legend: {
                    data: [],
                    orient: 'vertical',
                    left: 'left',
                },
                series: {
                    name: '',
                    type: 'pie',
                    data: [],
                    radius: '55%',
                    center: ['50%', '60%'],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0,0,0,.5)'
                        }
                    }
                }
            }
        },
        getData() {
            var This = this;

            $.ajax({
                url: 'http://api.duyiedu.com/api/student/findAll?appkey=kaivon_1574822824764',
                success: function (data) {
                    //console.log(data);
                    var list = JSON.parse(data).data;
                    // console.log(list);

                    if (list.length > 0) {
                        //绘制图表
                        This.areaChart(list);
                        This.sexChart(list);
                    } else {
                        alert('亲，没有数据哦~');
                    }
                }
            })
        },
        areaChart(data) {
            var myChart = echarts.init($('.areaChart')[0]);
            var legendData = [];
            var seriesData = [];

            var newData = {};

            data.forEach(function (item) {
                if (!newData[item.address]) {
                    //如果这个条件满足说明这个地名是第一次出现
                    newData[item.address] = 1;
                    legendData.push(item.address);
                } else {
                    newData[item.address]++;
                }
            });

            for (var prop in newData) {
                seriesData.push({
                    name: prop,
                    value: newData[prop]
                });
            }


            this.option.title.text = '学生地区分布统计';
            this.option.legend.data = legendData;
            this.option.series.name = '地区分布';
            this.option.series.data = seriesData;

            myChart.setOption(this.option);
        },
        sexChart(data) {
            var myChart = echarts.init($('.sexChart')[0]);
            var legendData = ['男', '女'];

            /*
                legend的数据格式为['北京','上海','广州']
                series的数据格式为[{ value: 1, name: '北京' },...]
            */

            var newData = {};

            data.forEach(function (item) {
                if (!newData[item.sex]) {
                    newData[item.sex] = 1;
                } else {
                    newData[item.sex]++;
                }
            });

            var seriesData = [
                { name: '男', value: newData[0] },
                { name: '女', value: newData[1] },
            ];

            this.option.title.text = '学生性别分布统计';
            this.option.legend.data = legendData;
            this.option.series.name = '性别分布';
            this.option.series.data = seriesData;

            myChart.setOption(this.option);
        }
    }

    pie.init();
})();