
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {LayerModel} from './layer.model'; 

@Injectable()
export class LayerService {
  
  private baseUrl = 'http://localhost:3003/data/layer/';
  constructor(private http: Http) {}

  // query (GETs a list)
  query(): Promise<LayerModel[]> {

    let prmLayers = this.http.get(this.baseUrl)
      .toPromise()
      .then(res => {
        const jsonLayers = res.json();
        return jsonLayers.map((jsonLayer : any) =>
          new LayerModel(jsonLayer.name, jsonLayer.symbol, jsonLayer.locs, jsonLayer._id,jsonLayer.isShown))
      });

    prmLayers.catch(err => {
      console.log('LayerService::query - Problem talking to server');
    });

    return prmLayers;
  }

  // get (GETs a single)
  get(id: string) : Promise<LayerModel> {
    let prmLayer = this.http.get(this.baseUrl + id)
      .toPromise()
      .then(res => {
        const jsonLayer = res.json();
        return new LayerModel(jsonLayer.name, jsonLayer.symbol, jsonLayer.locs, jsonLayer._id,jsonLayer.isShown);
      });

    prmLayer.catch(err => {
      console.log('LayerService::get - Problem talking to server');
    });
    return prmLayer;

  }

  // DELETE 
  remove(id: string) : Promise<LayerModel[]> {
    let prmLayer = this.http.delete(this.baseUrl + id)
      .toPromise()
      .then(res => {
        return this.query();
      });

    prmLayer.catch(err => {
      console.log('LayerService::remove - Problem talking to server', err);
    });
    return prmLayer;
  }

  // save - Adds (POST) or update (PUT)  
  save(layerData: any, id?: string) : Promise<LayerModel>{

    let response : any;
    let prmLayer : Promise<LayerModel>;

    if (id) {
      const url = this.baseUrl + id;
      response = this.http.put(url, layerData)
    } else {
	    const url = this.baseUrl;
      delete layerData['_id'];
      response = this.http.post(url, layerData)
      console.log('response:',response);
    }

    prmLayer = response.toPromise()
      .then((res : any) => {
          const jsonLayer = res.json();
          return new LayerModel(jsonLayer.name, jsonLayer.symbol, jsonLayer.locs, jsonLayer.id,jsonLayer.isShown);
      });

    prmLayer.catch(err => {
      console.log('LayerService::save - Problem talking to server', err);
    });
    return prmLayer;
  }
}

