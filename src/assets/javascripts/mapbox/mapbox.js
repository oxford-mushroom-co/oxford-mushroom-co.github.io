/* global mapboxgl */
import config from './../config.js'

const renderMap = () => {
  mapboxgl.accessToken = config.mapbox.accessToken

  const markerElement = document.createElement('div')
  const popupElement = document.createElement('div')
  const farmLongLat = [-1.2759754, 51.7389587]
  const mapId = 'map'

  // drop out img fallback
  document.getElementById(mapId).innerHTML = ''

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: farmLongLat,
    zoom: 12,
    trackResize: true,
    failIfMajorPerformanceCaveat: true
  })

  map.addControl(new mapboxgl.NavigationControl())

  markerElement.className = 'marker'
  popupElement.className = 'popup'
  popupElement.textContent = 'Oxford Mushroom Co.'

  new mapboxgl.Marker(markerElement)
    .setLngLat(farmLongLat)
    .addTo(map)

  new mapboxgl.Popup()
    .setLngLat(farmLongLat)
    .setDOMContent(popupElement)
    .addTo(map);
}

const init = () => {
  if (typeof mapboxgl !== 'undefined' && mapboxgl.supported()) {
    renderMap()
  }
}

export default init
