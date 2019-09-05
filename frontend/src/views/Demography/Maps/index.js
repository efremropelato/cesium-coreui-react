import React, { Component } from 'react'
import './main.css';

import axios from 'axios';
import _ from 'lodash';

const Cesium = window.Cesium;

Cesium.BingMapsApi.defaultKey = "Ap0W6odHjJevR3N0negWqj_bLEgV85fraicFJUMnZLvzEYz9XMYg72rbU_KMRB9I";

const mapInitConfig = {
  timeline: false,
  animation: false,
  targetFrameRate: 10,
  fullscreenButton: true,
  // fullscreenElement: document.getElementById("root"),
  homeButton: false,
  sceneModePicker: true,
  baseLayerPicker: true,
  navigationHelpButton: false,
  geocoder: true,
  navigationInstructionsInitiallyVisible: false,
  infoBox: true,
  selectionIndicator: true,
  shadows: false,
  // requestRenderMode: true,
  // maximumRenderTimeChange: Infinity
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color;
}

class Map extends Component {
  constructor(props){
    super(props)
    this.state = {};

    this.viewer = null;
  }

  componentDidMount(){
    const _this = this;

    const data =  axios.get('http://localhost:8080/api/Demographies');
    const geojson = axios.get('http://localhost:8080/data/ticino_Polygon.geojson')

    Promise.all([data, geojson])
    .then(response => { 
      const newData = _.map(response[0].data, (d)=>{ return {...d, value: parseInt(d.Valori)}})

        const newGeoJson = _.map(response[1].data.features, (d)=>{
          const newColor = getRandomColor();

          const valueByYear = _(newData)
            .groupBy('Anno')
            .map((items, year) => { 
              if (year) return {
                "Anno": year,
                "Popolazione": _.sumBy(items, (o)=> { return o.value; })
                }
            }).value();

          return {...d, 
                  properties: {
                    ...d.properties, 
                    "stroke": newColor,
                    "stroke-width": 4,
                    "stroke-opacity": 1,
                    "fill": newColor,
                    "fill-opacity": 0.75,
                    "Popolazione": valueByYear
                  }
                };
        })
        _this.setState({geoJson: {type: "FeatureCollection", features: newGeoJson}, features: newGeoJson, data: newData}, ()=>{
           _this.viewer = new Cesium.Viewer('cesiumContainer', mapInitConfig);
          
          const promise = Cesium.GeoJsonDataSource.load(_this.state.geoJson, {clampToGround : true})
          promise.then(function(dataSource) {

              _this.viewer.dataSources.add(dataSource);
    
              const entities = dataSource.entities.values;
              _.forEach(entities, (e)=> {
                var entity = e;
                entity.polygon.outline = false;
                entity.label = {
                  text: entity.name,
                  font: '12pt Eniline',
                  style: Cesium.LabelStyle.FILL,
                  outlineWidth: 15,
                  verticalOrigin: Cesium.VerticalOrigin.TOP,
                  horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                  fillColor: Cesium.Color.DARKRED,
                }
                // entity.polygon.extrudedHeight = 2;
            })
              _this.viewer.zoomTo(dataSource);  
          });
        });
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(function () {
        console.log('Data loaded');
      });
  }
  render() {
    return (
        <div id="cesiumContainer"></div>
    )
  }
}

export default Map;
