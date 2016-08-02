import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {LayerModel} from './layer.model'; 

@Injectable()
export class LayerService {

  private baseUrl = 'http://mrjson.com/data/57926f22fd12d79d3a39aad6/layer/';
  constructor(private http: Http) {}

  // query (GETs a list)
  query(): Promise<LayerModel[]> {

    let prmLayers = this.http.get(this.baseUrl + 'list.json')
      .toPromise()
      .then(res => {
        const jsonLayers = res.json();
        return jsonLayers.map((jsonLayer : LayerModel) =>
          new LayerModel(jsonLayer.name, jsonLayer.symbol, jsonLayer.locs, jsonLayer.id, jsonLayer.isShown))
      });

    prmLayers.catch(err => {
      console.log('LayerService::query - Problem talking to server');
    });

    return prmLayers;
  }

  // get (GETs a single)
  get(id: number) : Promise<LayerModel> {
    let prmLayer = this.http.get(this.baseUrl + id + '.json')
      .toPromise()
      .then(res => {
        const jsonLayer = res.json();
        return new LayerModel(jsonLayer.name, jsonLayer.symbol,jsonLayer.locs, jsonLayer.id, jsonLayer.isShown);
      });

    prmLayer.catch(err => {
      console.log('Problem talking to server');
    });
    return prmLayer;

  }

  // DELETE 
  remove(id: number) : Promise<LayerModel[]> {
    let prmLayer = this.http.delete(this.baseUrl + id + '.json')
      .toPromise()
      .then(res => {
        return this.query();
      });

    prmLayer.catch(err => {
      console.log('Problem talking to server', err);
    });
    return prmLayer;
  }

  // save - Adds (POST) or update (PUT)  
  save(layerData: any, id?: number) : Promise<LayerModel>{

    let response : any;
    let prmLayer : Promise<LayerModel>;

    if (id) {
      const url = this.baseUrl + id + '.json'
      response = this.http.put(url, layerData)
    } else {
	    const url = this.baseUrl + 'item.json';
       response = this.http.post(url, layerData)
    }

    prmLayer = response.toPromise()
      .then((res : any) => {
          const jsonLayer = res.json();
          return new LayerModel(jsonLayer.name,jsonLayer.symbol,  jsonLayer.locs, jsonLayer.id, jsonLayer.isShown);
      });

    prmLayer.catch(err => {
      console.log('Problem talking to server', err);
    });
    return prmLayer;
  }
}
