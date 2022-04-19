import AddNewTemplate from "./AddNewTemplate";
import StartAnEmptyWorkout from "./StartAnEmptyWorkout";
import TemplatesList from "./TemplatesList";

function StartWorkout() {
  return (
    <div>
      Quick Start
      <StartAnEmptyWorkout />
      Templates
      <AddNewTemplate />
      Example Templates
      <TemplatesList />
    </div>
  );
}

export default StartWorkout;
