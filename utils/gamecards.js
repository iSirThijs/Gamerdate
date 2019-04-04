const igdbApi = require('./igdb-api.js');

exports.create = async function (query) {
	if (!query || query.length === 0) {
		throw new Error('Please provide a search querry');
	} else {
		try {
			const promises = [];
			const games = await igdbApi.findGames(query);

			for (let i = 0; i < games.length; i++) {
				promises.push(
					new Promise(async function (resolve) {
						const gameCard = {
							id: games[i].id,
							title: games[i].name,
							img: await igdbApi.coverLink(games[i].cover, 'cover_small')
						};
						resolve(gameCard);
					})
				);
			}
			const gameCards = await Promise.all(promises);
			return gameCards;
		} catch (error) {
			throw error;
		}
	}
};