import { Plus } from "lucide-react";
import { Button } from "./ui/button";

const NewTask = () => {
  return (
    <Button variant="default" size="sm">
      Create new task
      <Plus />
    </Button>
  );
};

export default NewTask;
