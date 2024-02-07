import Overlay from 'https://cdn.skypack.dev/ol/Overlay.js';
import {toLonLat} from 'https://cdn.skypack.dev/ol/proj.js';
import {toStringHDMS} from 'https://cdn.skypack.dev/ol/coordinate.js';
import {getLayerByName, getLayerByDisplay} from './customFunctions.js'
//import { get } from 'jquery';

const map=$('#map').data('map');

/**
 * Elements that make up the popup.
 */
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

/**
 * Create an overlay to anchor the popup to the map.
 */
const overlay = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

const key = 'Get your own API key at https://www.maptiler.com/cloud/';
const attributions =
  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';


map.addOverlay(overlay);

/**
 * Add a click handler to the map to render the popup.
 */
map.on('singleclick', function (evt) {
  const coordinate = evt.coordinate;
  const hdms = toStringHDMS(toLonLat(coordinate));

  const view=map.getView();
  const resolution=view.getResolution();
  const projection=view.getProjection();

  // bnm
  const bogInfo=$('#bog-info');
  bogInfo.html('');
  // corine-18
  const polInfo=$('#ol-info');
  polInfo.html('');
  // default
  const noFeatures=$('#no-features');
  noFeatures.html('<p>No features</p>');

  // getting the layer source: getting the layer itself
  const bogLayer=getLayerByName('corine');
  const bogSource=bogLayer.getSource();
  const bogUrl=bogSource.getFeatureInfoUrl(coordinate, resolution, projection,
    {'INFO_FORMAT':'application/json'});

    if(bogUrl){
        $.ajax({
            url:bogUrl,
            method:'GET',
            success:function(result){
                const bog=result.features[0];
                if(bog){
                    const crnClass=bog.properties.soil_type;

                    bogInfo.html(
                      `<p>Type: ${crnClass}</p>`);
                    noFeatures.html('');
                    }

            }
        })
    }

  overlay.setPosition(coordinate);
});
