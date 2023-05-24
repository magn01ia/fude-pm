var map = new maplibregl.Map({
    container: 'map', // container id
    style: 'https://gsi-cyberjapan.github.io/gsivectortile-mapbox-gl-js/pale.json', // style URL
    center: [140.084556, 36.104611], // starting position [lng, lat]
    zoom: 7, // starting zoom
    maxZoom: 4, // min zoom
    maxZoom: 17 // max zoom
    });  
    map.on('load', function () {
    
  //------------------------------------------------------------------下記水戸ベクトル
  //ベクトルタイル表示、オーバーズーミングしていない？
    map.addSource("mito", {
        type: "vector",
        tiles: [
            "https://magn01ia.github.io/fudevt/mito/xyz/{z}/{x}/{y}.pbf"
        ],
        minzoom: 14,
        maxzoom: 16, //ここでソースのズームレベルを指定してやらないとオーバーズーミングが効かない
    });
    map.addLayer({
        id: "fude",
        type: "fill",
        source: "mito",
        "source-layer": "mito",
        "minzoom": 9,
        "maxzoom": 22,
        paint: {
            "fill-color": "#FF00FF",
            "fill-opacity": 0.3,
            "fill-outline-color": "white"
        }
    });
});

map.addControl(new maplibregl.FullscreenControl());

//PMTilesプラグインの追加
let protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);
const p = new pmtiles.PMTiles("https://x.optgeo.org/ipfs/QmTZHWMAnRC5zNiNvdVuTDacThKkj4jKbwsZtKQkAC4R69")
protocol.add(p);
map.on('load', () => {
      // 法務省地図XMLベクトルタイル追加
      map.addSource("pmtiles", {
        type: "vector",
        url: "pmtiles://https://x.optgeo.org/ipfs/QmTZHWMAnRC5zNiNvdVuTDacThKkj4jKbwsZtKQkAC4R69",
        attribution: '<a href="https://github.com/amx-project">法務省地図XMLアダプトプロジェクト</a>'
    });

//代表点の中身 
map.addLayer({
    "id": "daihyo2",
    "source": "pmtiles",
    "source-layer": "daihyo",
    "type": "circle",
    'paint': {
        'circle-color': '#00CCCC',
        //'circle-radius': 1
        'circle-radius': 2
    }
});
  
//筆ポリゴンのライン
map.addLayer({
    "id": "fude-line",
    "source": "pmtiles",
    "source-layer": "fude",
    "type": "line",
    "paint": {
        'line-color': '#009966',
        'line-width': 2,
    }
});
  
//筆ポリゴン
map.addLayer({
    "id": "fude-poligon",
    "source": "pmtiles",
    "source-layer": "fude",
    "type": "fill",
    "paint": {
        'fill-color': '#00FFCC',
        'fill-opacity': 0.25,
    }
});
});
    
  
  