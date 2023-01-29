let twoColResRend = (ex, exerciseId) => {
  return ex.templateExercises
    .filter((exercise) => {
      return exercise.id === exerciseId;
    })
    .map((element) => {
      let totalVolumeOfTraining = 0;
      let totalRepetitionsOfTraining = 0;
      let distanceOfTraining = 0;
      let durationOfTraining = 0;
      let totalVolumeOfTrainingByWeight = 0;
      let allRepetitions = [];
      let sortedAllRepetitions = [];
      for (let i = 0; i < element.addedResults.length; i++) {
        const elAddRes = element.addedResults;
        totalVolumeOfTraining +=
          elAddRes[i].setWeight * elAddRes[i].setRepetition;
        totalRepetitionsOfTraining += elAddRes[i].setRepetition;
        distanceOfTraining = elAddRes[0].setDistance;
        durationOfTraining = elAddRes[0].setTime;
        totalVolumeOfTrainingByWeight = totalVolumeOfTraining / ex.bodyWeight;
        allRepetitions = [...allRepetitions, elAddRes[i].setRepetition];
        sortedAllRepetitions = allRepetitions.sort().reverse();
      }
      let res = { element };
      if (totalVolumeOfTraining) {
        res.totalVolumeOfTraining = totalVolumeOfTraining;
        res.totalVolumeOfTrainingByWeight =
          totalVolumeOfTrainingByWeight.toFixed(2);
      }
      if (totalRepetitionsOfTraining) {
        res.totalRepetitionsOfTraining = totalRepetitionsOfTraining;
        res.maxSetRepetition = sortedAllRepetitions[0];
      }
      if (distanceOfTraining) {
        res.distanceOfTraining = distanceOfTraining;
      }
      if (durationOfTraining) {
        res.durationOfTraining = durationOfTraining;
      }
      return res;
    })[0];
};

export default twoColResRend;
