//console.log("custom.js!!");

window.onload = (e) => {
    //console.log("onload!!");
    
    let labelsArr = [],
    dataArr1 = [],
    dataArr2 = [],
    dataArr3 = [];

    const ctx = document.getElementById('myChart').getContext('2d');

    const req = new XMLHttpRequest();
    req.open('get', './data/data.csv', true)
    req.send(null);
    req.onload = function(){
        let tmp = req.responseText.split('\n');

        tmp.forEach((val, idx) => {
            const data = val.split(',').filter(Boolean);
            const data2 = data.filter(Boolean);

            let data1Index = tmp[0].split(',').indexOf('支出');

            labelsArr.push(data2[0]);

            if(data2[data1Index] !== undefined) {
                dataArr1.push(Number(data2[data1Index]));
            }
        });

        //Chart.defaults.global.defaultFontColor = '#000';

        // 各配列の1項目にある見出しを削除
        labelsArr.shift();
        dataArr1.shift();

        // console.log(labelsArr);
        // console.log(dataArr1);

        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labelsArr,
                datasets: [{
                    label: '支出',
                    data: dataArr1,
                    type: 'line',
                    tension: 0,
                    fill: false,
                    borderColor: '#004098'
                }]
            },
            options: {
                tooltips: {
                    mode: 'nearest',
                    intersect: false
                },
                responsive: true,
                elements: {
                    point: {
                        radius: 0 // これを記述するとデータごとの●が消える
                    }
                },
                scales: {
                    y: {
                        // id: 'y-axis-1',
                        position: 'left',
                        ticks: {
                            max:30000,
                            min:0,
                            stepSize: 1000
                        },
                        gridLines: {
                            color: 'transparent',
                            zeroLineColor: '#000'
                        }
                    },
                    x: {
                        gridLines: {
                            color: 'transparent',
                            zeroLineColor: '#000'
                        },
                        barPercentage: 0.7,
                        ticks: {
                            maxTicksLimit: 10,
                            maxRotations: 0,
                            minRotations: 0
                        }
                    }
                }
            }
        });
    };
};
