// import mapStatusHTTP from '../utils/mapStatusHTTP.utils';
// import TeamsService from '../services/Teams.service';

// export default class TeamsController {
//   constructor(
//     private teamService = new TeamsService(),
//   ) { }

//   public async getAllTeams(_req: Request, res: Response): Promise<Response> {
//     console.log(res);

//     const serviceResponse = await this.teamService.getAllTeams();
//     return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
//   }
// }
