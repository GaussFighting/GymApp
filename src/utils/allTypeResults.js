import moment from "moment";

let allTypeResults = (results, exerciseId) => {
  let arrayOfFilteredExercises = [];
  results.forEach((training) => {
    training.templateExercises.forEach((exercise) => {
      if (exercise.id === exerciseId) {
        arrayOfFilteredExercises = [
          ...arrayOfFilteredExercises,
          {
            setsList: exercise.addedResults,
            bodyWeight: training.bodyWeight,
          },
        ];
      }
    });
  });

  let arrayOfWeightOfAllRepetitions = [];
  let arrayOfWeightByWeightOfAllRepetitions = [];
  let arrayOfSetsVolume = [];
  let arrayOfSetsVolumeByWeight = [];
  let arrayOfBestExerciseVolume = [];
  let arrayOfBestExerciseVolumeByWeight = [];
  let arrayOfRepetitionInSet = [];
  let arrayOfBestSumRepetitionInTraining = [];
  let arrayOfAllDistances = [];
  let arrayOfAllDurations = [];
  let durationMaxInHHMMSS = "";

  arrayOfFilteredExercises.forEach((exercise) => {
    let sumVolume = 0;
    let sumRepetition = 0;

    exercise.setsList.forEach((set) => {
      arrayOfWeightOfAllRepetitions = [
        ...arrayOfWeightOfAllRepetitions,
        set.setWeight,
      ];
      arrayOfWeightByWeightOfAllRepetitions = [
        ...arrayOfWeightByWeightOfAllRepetitions,
        set.setWeight / exercise.bodyWeight,
      ];
      arrayOfSetsVolume = [
        ...arrayOfSetsVolume,
        set.setWeight * set.setRepetition,
      ];

      arrayOfSetsVolumeByWeight = [
        ...arrayOfSetsVolumeByWeight,
        (set.setWeight * set.setRepetition) / exercise.bodyWeight,
      ];

      sumVolume += set.setWeight * set.setRepetition;

      arrayOfBestExerciseVolume = [...arrayOfBestExerciseVolume, sumVolume];
      arrayOfBestExerciseVolumeByWeight = [
        ...arrayOfBestExerciseVolumeByWeight,
        sumVolume / exercise.bodyWeight,
      ];

      arrayOfRepetitionInSet = [...arrayOfRepetitionInSet, set.setRepetition];

      sumRepetition += set.setRepetition;

      arrayOfBestSumRepetitionInTraining = [
        ...arrayOfBestSumRepetitionInTraining,
        sumRepetition,
      ];

      arrayOfAllDistances = [...arrayOfAllDistances, set.setDistance];
      if (set.setTime) {
        let timeAsArray = set.setTime.split(":");

        let timeInSeconds =
          parseInt(timeAsArray[0], 10) * 3600 +
          parseInt(timeAsArray[1], 10) * 60 +
          parseInt(timeAsArray[2], 10);

        arrayOfAllDurations = [...arrayOfAllDurations, timeInSeconds];

        let durationMax = Math.max(...arrayOfAllDurations);

        durationMaxInHHMMSS = moment()
          .startOf("day")
          .seconds(durationMax)
          .format("H:mm:ss");
      }
    });
  });

  return {
    repetitionMax: Math.max(...arrayOfWeightOfAllRepetitions),
    repetitionMaxByWeight: Math.max(
      ...arrayOfWeightByWeightOfAllRepetitions
    ).toFixed(2),
    bestSetVolume: Math.max(...arrayOfSetsVolume).toFixed(2),
    bestTotalVolumeByMass: parseFloat(
      Math.max(...arrayOfSetsVolumeByWeight).toFixed(2)
    ),
    bestTotalVolume: parseInt(
      Math.max(...arrayOfBestExerciseVolume).toFixed(2)
    ),
    volumeBestTotalByWeight: parseFloat(
      Math.max(...arrayOfBestExerciseVolumeByWeight).toFixed(2)
    ),
    repetitionBestSet: Math.max(...arrayOfRepetitionInSet),
    bestTotalRepetitions: Math.max(...arrayOfBestSumRepetitionInTraining),
    distanceMax: Math.max(...arrayOfAllDistances),
    durationMax: durationMaxInHHMMSS,
  };
};

export default allTypeResults;
