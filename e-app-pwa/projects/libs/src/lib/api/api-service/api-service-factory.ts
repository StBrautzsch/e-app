import {HttpClient} from '@angular/common/http';
import {BaseAppService} from '../../base-app/base-app.service';
import {ApiPlannerService} from './api-planner.service';
import {ApiClientService} from './api-client.service';


export const apiServiceFactory = (app: BaseAppService, http: HttpClient) => {
  if (app.isPlanner) {
    console.log('ApiPlannerService via Factory');
    return new ApiPlannerService(http, app);
  } else {
    console.log('ApiClientService via Factory');
    return new ApiClientService(http, app);
  }
};
