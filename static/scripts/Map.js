import Map from 'https://cdn.skypack.dev/ol/Map.js';
import View from 'https://cdn.skypack.dev/ol/View.js';
import TileLayer from 'https://cdn.skypack.dev/ol/layer/Tile.js';
import OSM from 'https://cdn.skypack.dev/ol/source/OSM.js';
import ImageLayer from 'https://cdn.skypack.dev/ol/layer/Image.js';
import ImageWMS from 'https://cdn.skypack.dev/ol/source/ImageWMS.js';
import Projection from 'https://cdn.skypack.dev/ol/proj/Projection.js';

const serverURL="http://localhost:8080/geoserver/wms";

const mapProjection=new Projection({
    code:'EPSG:3857',
    units:'m',
    axisOrientation:'neu',
    global:false
});

// Peatland layer
const crnSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"mapathon:corine_peat", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const crnLayer= new ImageLayer({
    source:crnSource,
    // @ts-ignore
    name:'corine',
    display: 'Corine'
});

// Policy Layer
const polSource=new ImageWMS({
    url:serverURL,
    params:{"LAYERS":"mapathon:geopol", "VERSION":"1.1.1", "FORMAT":"image/png"}
});

const polLayer= new ImageLayer({
    source:polSource,
    // @ts-ignore
    name:null,
    display: 'Policies'
});

const osmLayer=new TileLayer({
    source:new OSM(),
    // @ts-ignore
    name:'Basemap',
    display: 'Basemap'
});

const view=new View({
    //extent:[-1189593, 6692152.5, -665102.8125, 7450535], // ireland
    extent:[-2005155, 3723095, 3711745, 8600839], 
    center:[-816308.25,7051300.85],
    zoom:7.5,
    projection: mapProjection
});

const map=new Map({
    target:"map",
    layers:[osmLayer, polLayer, crnLayer],
    view:view
});

$('#map').data('map',map);