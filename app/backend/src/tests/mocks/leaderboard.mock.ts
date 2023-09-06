const findHomePointsResolves = [
    {
      name: "Santos",
      totalPoints: 9,
      totalGames: 3,
      totalVictories: 3,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 9,
      goalsOwn: 3,
      goalsBalance: 6,
      efficiency: "100.00"
    },
    {
      name: "Palmeiras",
      totalPoints: 7,
      totalGames: 3,
      totalVictories: 2,
      totalDraws: 1,
      totalLosses: 0,
      goalsFavor: 10,
      goalsOwn: 5,
      goalsBalance: 5,
      efficiency: "77.78"
    },
  ]


   const findAwayPointsResolves =  [{
      name: "Palmeiras",
      totalPoints: 6,
      totalGames: 2,
      totalVictories: 2,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 7,
      goalsOwn: 0,
      goalsBalance: 7,
      efficiency: "100.00"
    },
    {
      name: "Corinthians",
      totalPoints: 6,
      totalGames: 3,
      totalVictories: 2,
      totalDraws: 0,
      totalLosses: 1,
      goalsFavor: 6,
      goalsOwn: 2,
      goalsBalance: 4,
      efficiency: "66.67"
    }]

    const findAllMatchesResolves = [
        {
            id: 1,
            homeTeamId: 1,
            homeTeamGoals: 3,
            awayTeamId: 2,
            awayTeamGoals: 1,
            inProgress: false,
            homeTeam: {
                teamName: "Palmeiras"
            },
            awayTeam: {
                teamName: "Corinthians"
            }
          },
          {
            id: 2,
            homeTeamId: 2,
            homeTeamGoals:0,
            awayTeamId: 1,
            awayTeamGoals: 3,
            inProgress: false,
            homeTeam: {
                teamName: "Corinthians"
            },
            awayTeam: {
                teamName: "Palmeiras"
            }
          } ]

          const findAllTeamResolves = [
            {id:1, teamName: "Palmeiras"},
            {id:2, teamName: "Corinthians"}
            ]

            const findAllPointsResolves =  [{
                name: "Palmeiras",
                totalPoints: 6,
                totalGames: 2,
                totalVictories: 2,
                totalDraws: 0,
                totalLosses: 0,
                goalsFavor: 6,
                goalsOwn: 1,
                goalsBalance: 5,
                efficiency: "100.00"
              },
              {
                name: "Corinthians",
                totalPoints: 0,
                totalGames: 2,
                totalVictories: 0,
                totalDraws: 0,
                totalLosses: 2,
                goalsFavor: 1,
                goalsOwn: 6,
                goalsBalance: -5,
                efficiency: "0.00"
              }]

  export default { 
    findHomePointsResolves,
    findAwayPointsResolves,
    findAllMatchesResolves,
    findAllTeamResolves,
    findAllPointsResolves
  }