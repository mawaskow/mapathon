const map=$('#map').data('map');
const mapLayers=map.getLayers();

export function getLayerByName(layerName){
    let layer=null;

    mapLayers.forEach(lyr => {
        if(lyr.get('name')===layerName)
        layer=lyr;
    });
    return layer;
}

export function getLayerByDisplay(layerDisplayName){
    let layer=null;

    mapLayers.forEach(lyr => {
        if(lyr.get('display')===layerDisplayName)
        layer=lyr;
    });
    return layer;
}

$("#map-pol-size-btn").on('click', function(event){
    let mp = document.getElementById("map");
    let btn = document.getElementById("map-pol-size-btn");
    
    if(mp.style.maxHeight == '50%'){
        mp.style.maxHeight = '100%';
        btn.innerHTML = 'Shrink Map View';
    }else if(mp.style.maxHeight == '100%'){
        mp.style.maxHeight = '50%';
        btn.innerHTML = 'Expand Map View';
    }
});