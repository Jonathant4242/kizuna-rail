// updated new path for model import
import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {
   // Load dropdown options and all train routes.
    const regions = await getListOfRegions();
    const seasons = await getListOfSeasons();
    const allRoutes = await getAllRoutes();

    // get region and season from query parameters
    const { region, season } = req.query;

    // filter by region, season, or both
    const routes = allRoutes.filter(route => {
        //check region
        const matchesRegion =
            !region || region === 'all' || route.region === region;

        // check season
        const matchesSeason =
            !season || season === 'all' || route.bestSeason === season;

        return matchesRegion && matchesSeason;
    });

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons
    });
};