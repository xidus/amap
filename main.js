
// Initialise when page is loaded
window.onload = init;

// Overlay-image dimensions and path
const w = 1442;
const h = 860;
const url_image = 'krs-blaa-omraade.jpg';

// Map and image-overlay bounds
const bounds = [[0, 0], [h, w]];

// Marker-icon setup
const arrow_w = 464;
const arrow_h = 341;

const marker_icon_options = {
  iconUrl: 'arrow-dropshadow.png',
  //shadowUrl: 'leaf-shadow.png',

  // size of the icon
  // [width, height]
  iconSize: [arrow_w, arrow_h],

  //shadowSize:   [50, 64], // size of the shadow
  // point of the icon which will correspond to marker's location
  // [x, y]
  // iconAnchor: [arrow_w - 411, arrow_h - 290],
  iconAnchor: [411, 290],

  // the same for the shadow
  //shadowAnchor: [4, 62],

  // point from which the popup should open relative to the iconAnchor
  popupAnchor: [arrow_w - 411, arrow_h - 290],

};
const marker_icon = L.icon(marker_icon_options);


function get_marker_position() {
  let hash = window.location.hash.substring(1);
  if ('' === hash) {
    // return [w - 50, h - 50];
    return [h / 2, 50];
    // return [0, 0];
  }

  let params = {};
  hash.split('&').map(key_value_pair => {
    let [key, value] = key_value_pair.split('=');
    params[key] = value;
  });
  //console.log(params);
  return [params.y, params.x];
}

function onDragEnd(e) {
  window.location.hash = 'y=' + e.target._latlng.lat + '&x=' + e.target._latlng.lng;
}

function init() {

  // Create the map
  let map_options = {
    minZoom: -2,
    maxZoom: 3,
    center: [0, 0],
    zoom: 0,
    crs: L.CRS.Simple,
  };
  let map = L.map('map', map_options);

  attribution = 'Made by <a href="mailto:jmor@ufst.dk">Joachim Mortensen</a>, Image &copy; UFST';
  map.attributionControl.addAttribution(attribution);

  // Add image overlay that covers the entire map
  L.imageOverlay(url_image, bounds).addTo(map);
  // Make the map have the same size as the image
  map.setMaxBounds(bounds);

  // var marker_position = L.latLng([103.75, 324.5]);
  let marker_position = get_marker_position();
  let marker_options = {
    title: 'The location',
    icon: marker_icon,
    clickable: true,
    draggable: true,
  }
  var marker = L.marker(marker_position, marker_options).addTo(map);
  marker.on('dragend', onDragEnd);
  marker.bindtooltip({

  })
}
