import moment from "moment";

let singleTrainingResults = (ex, exerciseId) => {
  ex.templateExercises
    .filter((asdf) => {
      return asdf.id === exerciseId;
    })
    .map((element, index) => {
      let exResults = element.addedResults.map((element2, idx) => {
        console.log(element2);
        if (element2.setDistance) {
          let arrayTime = element2.setTime.split(":");
        }
      });
    });
};

export default singleTrainingResults;
