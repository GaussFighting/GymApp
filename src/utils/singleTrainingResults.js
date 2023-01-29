import moment from "moment";

const singleTrainingResults = (ex, exerciseId) => {
  let exResults = ex.templateExercises
    .filter((training) => {
      return training.id === exerciseId;
    })
    .map((exercise) => {
      let res = exercise.addedResults.map((set) => {
        if (set.setTime && set.setDistance) {
          let velocity =
            Math.round(
              100 *
                (set.setDistance /
                  1000 /
                  (moment(set.setTime, "HH:mm:ss").diff(
                    moment().startOf("day"),
                    "seconds"
                  ) /
                    3600))
            ) / 100;
          let pace = moment()
            .startOf("day")
            .minutes(3600 / velocity)
            .format("H:mm");

          return { velocity, pace };
        }

        if (!set.setWeight && set.setRepetition) {
          return { repetition: set.setRepetition };
        }
        if (set.setWeight && set.setRepetition) {
          return { repetition: set.setRepetition, weight: set.setWeight };
        }
        if (set.setTime && !set.setDistance) {
          return { duration: set.setTime };
        }
        return {};
      });
      return res;
    });

  return exResults;
};

export default singleTrainingResults;
