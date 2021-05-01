import {BaseAppService} from '../../base-app/base-app.service';
import {ApiService} from '../../api/api-service/api.service';
import {AccountPlannerService} from './account-planner.service';
import {AccountClientService} from './account-client.service';

export const accountServiceFactory = (app: BaseAppService, api: ApiService) => {
  if (app.isPlanner) {
    console.log('AccountPlannerService via Factory');
    return new AccountPlannerService(api, app);
  } else {
    console.log('AccountClientService via Factory');
    return new AccountClientService(api, app);
  }
};
